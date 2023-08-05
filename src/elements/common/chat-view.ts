import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { cache } from 'lit/directives/cache.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './chat-view.scss';
import { styleMap } from 'lit/directives/style-map.js';
import global from '../../utils/global';
import UIRoot from '../root/ui-root';
import {
	showChatMessageContextMenu,
	showIdentityContextMenu,
	showEmojiPickerForInput,
	tooltip,
	showAlert
} from '../../ui/helpers';
import { classMap } from 'lit/directives/class-map.js';
import { responses } from '../../routes';
import timing, { Debounce, Throttle, ThrottleResult } from '../../utils/timing';
import utils, { Deferred } from '../../utils/utils';
import logging from '../../utils/logging';
import * as uuid from 'uuid';
import InlineEmojiPicker from '../overlay/inline-emoji-picker';
import * as api from '../../utils/api';
import { getTwemojiIconName } from '../../utils/emoji';
import { globalEventGroups, PartyUpdateEvent, windowEventGroups } from '../../utils/global-events';
import { ThreadHistoryCache, ThreadLiveCache } from '../../data/cache';
import { ChatMsgCtx, getMessageBody } from '../../utils/chat';
import { chat } from '../../utils/api';
import { ls } from '../../utils/cache';
import { shuffle } from 'd3';

const CHAT_MESSAGE_HISTORY = 128;
const HALF_CHAT_MESSAGE_HISTORY: number = CHAT_MESSAGE_HISTORY / 2;

export class ChatInitializationEvent extends Event {
	constructor(public messageBody: api.chat.SendMessageBody) {
		super('initialize');
	}
}

export class ChatErrorEvent extends Event {
	constructor(public chatError: any) {
		super('error');
	}
}

interface ScrollPosition {
	nearTop: boolean;
	nearBottom: boolean;
	atTop: boolean;
	atBottom: boolean;
}

interface BulkInsertOptions {
	method: PruneMethod;
	live?: boolean;
	ts?: Date;
}

interface IdentityTypingStatusContext {
	identity: api.identity.IdentityHandle;
	status: api.chat.ChatTypingStatus;
	timeout: number;
}

enum ChatEntityType {
	MessageGroup,
	Event,
	Separator
}

enum TypingIndicatorUpdate {
	Neither,
	Typing,
	NotTyping
}

// When inserting new messages...
enum PruneMethod {
	Default, // ... prunes oldest messages, only if scrolled to bottom
	Newest, // ... prunes newest messages
	Oldest, // ... prunes oldest messages
	Center // ... prunes messages around a given timestamp based on distance
}

@customElement('chat-view')
export default class ChatView extends LitElement {
	static styles = cssify(styles);

	@query('#chat-contents-holder')
	chatContentsHolder: HTMLDivElement;

	@query('#main-input')
	mainInput?: HTMLInputElement;

	@queryAll('.chat-input')
	chatInputs: HTMLInputElement[];

	@query('inline-emoji-picker')
	inlineEmojiPicker: InlineEmojiPicker;

	@property({ type: String })
	threadId: string;

	@property({ type: Object, attribute: 'party' })
	party?: api.party.PartySummary;

	// Renders the chat view without an actual thread attached
	@property({ type: Boolean })
	empty = false;

	@property({ type: Boolean, attribute: 'hide-input' })
	hideInput = false;

	@property({ type: Boolean })
	hideChatContents = true;

	@property({ type: Boolean, attribute: 'auto-focus' })
	autoFocus = true;

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Boolean })
	inlineEmojiPickerOpen = false;

	@property({ type: Object })
	msgCtx: ChatMsgCtx;

	lastChatReadTs: Date = null;
	lastActiveTimestamp = 0;
	tabFocused: boolean = document.hasFocus();
	requestComplete = false;

	// === SCROLL INFO ===
	@property({ type: Object })
	scrollPosition: ScrollPosition = { nearTop: false, nearBottom: false, atTop: false, atBottom: false };
	// Whether or not more messages are being loaded (0 = not loading, 1 = either top or bottom loading,
	// 2 = top and bottom loading)
	loadingMoreMessages = 0;
	atOldest = false; // If the chat scrolled up all the way to the first message
	atNewest = false; // If the chat is scrolled down all the way to the latest message

	/// Messages to be rendered.
	chatLog: api.chat.ChatMessage[] = [];
	besideChatLog: api.chat.ChatMessage[] = [];
	@property({ type: String })
	unconfirmedMessageIds: Set<string> = new Set();

	threadStream: api.RepeatingRequest<chat.WatchThreadCommandOutput>;
	cacheLastReadTs: Date = null;
	cacheWatchIndex: api.chat.WatchResponse = null;

	// Passthrough context menu
	identityContextMenu: (sender: api.identity.IdentityHandle) => void;

	// === TYPING INDICATOR ===
	sentTypingStatus: TypingIndicatorUpdate = TypingIndicatorUpdate.Neither;
	typingIndicatorUpdateTimeout: number;
	deleteCount = 0;
	@property({ type: Object })
	typingIndicators: Map<string, IdentityTypingStatusContext> = new Map();

	// === TIMING ===
	flagChatReadDebounce: Debounce<(lastMessage: api.chat.ChatMessage) => void>;
	scrollThrottle: Throttle<Event | HTMLElement>;
	bulkMessageInsertionComplete: Deferred = new Deferred(true);

	RNG: number[] = [...Array(32)].map(Math.random);

	// === EVENT HANDLERS ===
	handlePointerMove: (e: PointerEvent) => void;
	handleBlur: () => void;
	handleFocus: () => void;
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		document.addEventListener('selectionchange', () => {
			// Check if our emoji input had a selection change
			if (
				this.shadowRoot.activeElement &&
				this.shadowRoot.activeElement.classList.contains('chat-input')
			) {
				// Check if the current selection has an emoji
				let input = this.shadowRoot.activeElement as HTMLTextAreaElement;
				this.toggleInlineEmojiPicker(input);

				if (this.inlineEmojiPicker) this.inlineEmojiPicker.updateQuery();
			} else this.inlineEmojiPickerOpen = false;
		});
	}

	constructor() {
		super();

		// Passed to `getMessageBody` when creating messages
		this.msgCtx = {
			isPartyLeader: false,
			actions: {
				joinParty: this.joinParty.bind(this),
				inviteToParty: this.inviteToParty.bind(this)
			}
		};

		this.flagChatReadDebounce = new Debounce({
			delay: timing.milliseconds(100),
			chronological: false,
			cb: this.flagChatReadInner.bind(this)
		});

		this.flagChatReadDebounce.onError(async err => {
			logging.error('Error', err);
			this.propagateError(err);

			if (err.hasOwnProperty('statusText')) this.propagateError(await (err as Response).json());
		});

		this.scrollThrottle = new Throttle({
			rate: timing.milliseconds(50),
			cb: this.onScroll.bind(this)
		});
	}

	async updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Check if we should load the thread
		if (changedProperties.has('threadId')) {
			global.currentThread = this.threadId;

			this.hideChatContents = true;

			if (this.threadId && !this.empty) {
				this.isLoading = true;

				// Parse chat ID
				if (!utils.validateUuid(this.threadId)) this.propagateError('Cannot parse chat ID');

				// Thread id changed, make new seeded randomness function for placeholders
				if (changedProperties.get('threadId') != null) shuffle(this.RNG);

				// Reset chat log
				this.chatLog = [];
				this.requestComplete = false;
				this.propagateError(null);
				this.lastChatReadTs = null;

				// Reset typing indicator
				this.resetTypingIndicator(true);

				// Reset input
				if (this.mainInput) this.mainInput.value = '';
				this.autoGrow();

				// Fetch thread history
				let ctxThreadId = this.threadId;

				// Fetches the watch index from cache
				ThreadLiveCache.get(this.threadId)
					.then(liveRes => {
						// Fetch cached messages
						ThreadHistoryCache.get(this.threadId)
							.then(historyRes => {
								if (!historyRes || this.requestComplete || this.threadId != ctxThreadId)
									return;

								// Insert messages
								this.bulkInsertChatMessages(historyRes.chatMessages, {
									method: PruneMethod.Default
								});

								logging.debug('Cached messages loading');

								// Scroll to the last read message
								this.updateComplete.then(async () => {
									if (lastReadTs !== undefined && this.chatLog.length) {
										let closestMessages = Array.from(this.chatLog);
										closestMessages.sort(
											(a, b) =>
												Math.abs(a.sendTs.getTime() - lastReadTs.getTime()) -
												Math.abs(b.sendTs.getTime() - lastReadTs.getTime())
										);

										this.scrollToMessage(closestMessages[0].chatMessageId);
										this.hideChatContents = false;
									} else this.scrollToBottom();

									logging.debug('Cached messages loaded');
								});

								// Finish loading
								this.isLoading = false;
							})
							.catch(err => {
								if (this.threadId != ctxThreadId) return;

								logging.error('Error', err);
								this.propagateError(err);
							});

						// Get thread history
						let lastReadTs = liveRes?.lastReadTs;
						global.live.chat
							.getThreadHistory({
								threadId: this.threadId,
								count: CHAT_MESSAGE_HISTORY,
								ts: lastReadTs,
								queryDirection: api.chat.QueryDirection.BEFORE_AND_AFTER
							})
							.then(res => {
								if (this.threadId != ctxThreadId) return;

								// Remove messages after loading both the cache and the request based on time
								// distance to the last read message (PruneMethod.Center). Sometimes the cached
								// messages combined with the messages from this request make up more than the max
								// number of messages, which means you have to cull them
								this.bulkInsertChatMessages(res.chatMessages, {
									method: PruneMethod.Center,
									ts: lastReadTs
								});

								// Update cached messages
								ThreadHistoryCache.set(this.threadId, {
									chatMessages: this.chatLog
								});

								// Scroll to the last read message
								this.updateComplete.then(async () => {
									if (lastReadTs !== undefined && this.chatLog.length) {
										let closestMessages = Array.from(this.chatLog);
										closestMessages.sort(
											(a, b) =>
												Math.abs(a.sendTs.getTime() - lastReadTs.getTime()) -
												Math.abs(b.sendTs.getTime() - lastReadTs.getTime())
										);

										this.scrollToMessage(closestMessages[0].chatMessageId);
										this.hideChatContents = false;
									} else {
										this.hideChatContents = false;
										this.scrollToBottom();
									}

									// Call on scroll to make run the handler for detecting if we are at the
									// bottom of the thread or not
									await this.getUpdateComplete();
									this.scrollThrottle.trigger(this.chatContentsHolder);
								});

								// Finish loading
								this.isLoading = false;
								this.requestComplete = true;
							})
							.catch(err => {
								if (this.threadId != ctxThreadId) return;

								logging.error('Error', err);
								this.propagateError(err);
							});

						// Observe chat log
						if (this.threadStream) this.threadStream.cancel();
						this.threadStream = new api.RepeatingRequest(
							async (abortSignal, watchIndex) => {
								return await global.live.chat.watchThread(
									{ threadId: this.threadId, watchIndex },
									{ abortSignal }
								);
							},
							{ watchIndex: liveRes?.watch }
						);

						this.threadStream.onMessage(res => {
							if (this.threadId == ctxThreadId) {
								this.updateLiveCache(null, res.watch);

								// Insert messages
								let didPrune = this.bulkInsertChatMessages(res.chatMessages, {
									method: PruneMethod.Default,
									live: true
								});

								if (didPrune) this.atOldest = false;

								// Update cached messages
								ThreadHistoryCache.set(this.threadId, {
									chatMessages: this.chatLog
								});

								// Only update if res.typingStatuses is present. An empty array is
								// considered present.
								if (res.typingStatuses != undefined) {
									// Reset map
									for (let typingStatus of this.typingIndicators.values()) {
										window.clearTimeout(typingStatus.timeout);
									}
									this.typingIndicators.clear();

									for (let typingStatus of res.typingStatuses) {
										if (this.typingIndicators.has(typingStatus.identity.identityId)) {
											window.clearTimeout(
												this.typingIndicators.get(typingStatus.identity.identityId)
													.timeout
											);
										}

										let timeout = window.setTimeout(() => {
											this.typingIndicators.delete(typingStatus.identity.identityId);
										}, timing.seconds(30));

										this.typingIndicators.set(typingStatus.identity.identityId, {
											identity: typingStatus.identity,
											status: typingStatus.status,
											timeout
										});
									}
								}

								// Update UI
								this.requestUpdate('typingIndicators');
								this.requestUpdate('chatLog');
							}
						});

						this.threadStream.onError(err => {
							logging.error('Request error', err);
							this.propagateError(err);
						});
					})
					.catch(err => {
						if (this.threadId != ctxThreadId) return;

						logging.error('Error', err);
						this.propagateError(err);
					});
			}
		}

		if (changedProperties.has('empty')) {
			if (this.empty) {
				this.isLoading = false;
			}
		}

		// Update `isPartyLeader` property
		if (changedProperties.has('party')) {
			this.msgCtx.isPartyLeader = this.party
				? this.party.members.some(
						member =>
							member.isLeader && global.currentIdentity.identityId == member.identity.identityId
				  )
				: false;

			this.requestUpdate('msgCtx');
		}

		// Focus on text box and scroll to bottom once loaded
		if (changedProperties.has('chatLog')) {
			// If there is a bulk insertion going on, wait for it to complete first
			await this.bulkMessageInsertionComplete.promise;

			if (this.scrollPosition.atBottom && this.atNewest) {
				this.updateComplete.then(async () => {
					// Waiting for this makes sure that the body's scroll height is updated before setting scroll
					// position
					await this.getUpdateComplete();

					// Scroll to bottom
					this.scrollToBottom();
				});
			}
		}
	}

	connectedCallback() {
		super.connectedCallback();

		this.handlePointerMove = this.onPointerMove.bind(this);
		windowEventGroups.add('pointermove', this.handlePointerMove, timing.milliseconds(100));

		this.handleBlur = this.onBlur.bind(this);
		windowEventGroups.add('blur', this.handleBlur);

		this.handleFocus = this.onFocus.bind(this);
		windowEventGroups.add('focus', this.handleFocus);

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (global.currentThread == this.threadId) global.currentThread = null;

		// Dispose of the thread listener
		if (this.threadStream) this.threadStream.cancel();

		// Remove event listeners
		windowEventGroups.remove('pointermove', this.handlePointerMove, timing.milliseconds(100));
		windowEventGroups.remove('blur', this.handleBlur);
		windowEventGroups.remove('focus', this.handleFocus);
	}

	// Use `bulkInsertChatMessages` instead
	private insertChatMessage(newChatMessage: api.chat.ChatMessage, bulk = false, live = false) {
		// Choose which log to insert into based on if this is live and scrolled to bottom or not
		let log = live ? (this.atNewest ? this.chatLog : this.besideChatLog) : this.chatLog;

		if (!newChatMessage) return;
		if (newChatMessage.threadId != this.threadId) return;

		// Remove unconfirmed messages
		if (this.unconfirmedMessageIds.has(newChatMessage.chatMessageId))
			this.unconfirmedMessageIds.delete(newChatMessage.chatMessageId);

		// Remove typing indicator
		if (newChatMessage.body.text) {
			this.typingIndicators.delete(newChatMessage.body.text.sender.identityId);
		}

		// Remove old chat entry in order to prevent duplicates
		let chatMessageIndex = log.findIndex(c => c.chatMessageId == newChatMessage.chatMessageId);
		if (chatMessageIndex != -1) log.splice(chatMessageIndex, 1);

		// Insert at the appropriate date
		let didInsert = false;
		for (let i = log.length - 1; i >= 0; i--) {
			if (log[i].sendTs < newChatMessage.sendTs) {
				log.splice(i + 1, 0, newChatMessage);
				didInsert = true;
				break;
			}
		}
		if (!didInsert) log.unshift(newChatMessage);

		if (!bulk) {
			// Remove oldest messages if scrolled to bottom. This messes up the scroll position when you remove
			// messages while the identity is scrolling.
			if (this.scrollPosition.atBottom && log.length > CHAT_MESSAGE_HISTORY)
				log.splice(0, log.length - CHAT_MESSAGE_HISTORY);

			this.requestUpdate('chatLog');

			this.flagChatRead();
		}
	}

	// Returns true if message pruning was required
	private bulkInsertChatMessages(
		newChatMessages: api.chat.ChatMessage[],
		opts: BulkInsertOptions
	): boolean {
		if (this.loadError) return false;

		let pruned = false;

		this.bulkMessageInsertionComplete.reset();

		for (let msg of newChatMessages) {
			this.insertChatMessage(msg, true, opts.live);
		}

		this.requestUpdate('chatLog');
		if (newChatMessages.length) this.flagChatRead();

		if (!opts.live) {
			// Get scroll area info before new messages are added
			let oldScrollTop = this.chatContentsHolder.scrollTop;
			let oldScrollHeight = this.chatContentsHolder.scrollHeight;

			// Wait for update to complete before pruning. This allows us to keep the identities scroll position
			// in the thread.
			this.updateComplete.then(async () => {
				await this.getUpdateComplete();

				// Calculate new scroll position after messages are added
				let newScrollPosition =
					oldScrollTop +
					(this.chatContentsHolder.scrollHeight - oldScrollHeight) *
						(opts.method == PruneMethod.Newest ? 1 : opts.method == PruneMethod.Oldest ? -1 : 0);
				this.updateScrollPosition(this.chatContentsHolder);

				// Remove messages based on prune method
				if (this.chatLog.length > CHAT_MESSAGE_HISTORY) {
					pruned = true;

					if (opts.method == PruneMethod.Oldest) {
						this.chatLog.splice(0, this.chatLog.length - CHAT_MESSAGE_HISTORY);
					} else if (opts.method == PruneMethod.Newest) {
						this.chatLog.splice(CHAT_MESSAGE_HISTORY, this.chatLog.length - CHAT_MESSAGE_HISTORY);
					}
					// Prunes based on distance to a timestamp
					else if (opts.method == PruneMethod.Center) {
						if (opts.ts !== undefined) {
							// Sort by distance
							let sorted = Array.from(this.chatLog).reverse();
							sorted.sort(
								(a, b) =>
									Math.abs(b.sendTs.getTime() - opts.ts.getTime()) -
									Math.abs(a.sendTs.getTime() - opts.ts.getTime())
							);

							for (let msg of sorted) {
								if (this.chatLog.length <= CHAT_MESSAGE_HISTORY) break;
								let index = this.chatLog.indexOf(msg);

								if (index != -1) this.chatLog.splice(index, 1);
							}

							// Clear sorted array so all remaining references are removed and garbage
							// collected
							sorted.length = 0;
						} else {
							logging.warn(
								'Invalid `bulkInsertChatMessages` prune config (missing `ts` property). No pruning done.'
							);
						}
					} else if (opts.method == PruneMethod.Default && this.scrollPosition.atBottom) {
						this.chatLog.splice(0, this.chatLog.length - CHAT_MESSAGE_HISTORY);
					}
				}

				this.requestUpdate('chatLog');

				this.updateComplete.then(async () => {
					await this.getUpdateComplete();

					// Apply new scroll position after messages are pruned from DOM
					if (oldScrollHeight != 0) {
						this.chatContentsHolder.scrollTop = newScrollPosition;
						this.updateScrollPosition(this.chatContentsHolder);
					}

					this.bulkMessageInsertionComplete.resolve();
				});
			});
		}

		return pruned;
	}

	flagChatRead() {
		let lastMessage = this.chatLog[this.chatLog.length - 1];
		if (lastMessage) this.flagChatReadDebounce.trigger(lastMessage);
		else console.warn('no last message', this.chatLog.length, this.besideChatLog.length);
	}

	private async flagChatReadInner(lastMessage: api.chat.ChatMessage) {
		// Don't update last read ts if inactive for 1.5 minutes or tab is not focused
		if (
			(this.lastActiveTimestamp != 0 && Date.now() - this.lastActiveTimestamp > timing.seconds(90)) ||
			!this.tabFocused
		) {
			global.currentThreadActive = false;
			return;
		}

		this.lastActiveTimestamp = Date.now();
		global.currentThreadActive = true;

		// Send flag if has a new chat message
		if (lastMessage.sendTs > this.lastChatReadTs) {
			this.updateLiveCache(lastMessage.sendTs, null);

			// Do not update read timestamp if it is your own message
			if (
				lastMessage.body.text &&
				lastMessage.body.text.sender.identityId == global.currentIdentity.identityId
			)
				return;

			logging.event('Chat read', lastMessage.chatMessageId);
			this.lastChatReadTs = lastMessage.sendTs;

			await global.live.chat.setThreadRead({
				threadId: lastMessage.threadId,
				lastReadTs: lastMessage.sendTs
			});
			global.readThread(lastMessage.threadId);
		}
	}

	// Flag as active on pointer move
	onPointerMove(event: PointerEvent) {
		this.lastActiveTimestamp = Date.now();
	}

	onBlur() {
		this.tabFocused = false;
		global.currentThreadActive = false;
	}

	onFocus() {
		this.tabFocused = true;
		this.flagChatRead();
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	updateScrollPosition(target: HTMLElement) {
		let scrollValue = target.scrollHeight + target.scrollTop - target.clientHeight;
		let bottom = target.scrollHeight - target.clientHeight;

		this.scrollPosition.nearTop = scrollValue <= 300;
		this.scrollPosition.nearBottom = bottom - scrollValue <= 300;
		this.scrollPosition.atTop = scrollValue <= 1;
		this.scrollPosition.atBottom = bottom - scrollValue <= 1;
	}

	onScroll(result: ThrottleResult<Event | HTMLElement>) {
		this.updateScrollPosition(result.target);

		let ctxThreadId = this.threadId;

		// Handle loading new messages on scroll
		if (this.loadingMoreMessages == 0 && this.chatLog.length) {
			// Load previous messages
			if (this.scrollPosition.nearTop && !this.atOldest) {
				let oldestTimestamp = this.chatLog[0].sendTs;

				this.loadingMoreMessages++;
				global.live.chat
					.getThreadHistory({
						threadId: this.threadId,
						count: HALF_CHAT_MESSAGE_HISTORY,
						ts: oldestTimestamp,
						queryDirection: api.chat.QueryDirection.BEFORE
					})
					.then(res => {
						if (res.chatMessages.length)
							this.bulkInsertChatMessages(res.chatMessages, { method: PruneMethod.Newest });

						// If the set of messages did not contain exactly HALF_CHAT_MESSAGE_HISTORY messages,
						// it is incomplete which means we have reached the start of this thread
						if (res.chatMessages.length != HALF_CHAT_MESSAGE_HISTORY) {
							this.atOldest = true;
						}
						if (res.chatMessages.length != 0) this.atNewest = false;

						logging.event('Added prev messages', res.chatMessages.length);

						this.loadingMoreMessages--;
					})
					.catch(err => {
						if (this.threadId != ctxThreadId) return;

						logging.error('Error', err);
						this.propagateError(err);
					});
			}

			// Load following messages
			if (this.scrollPosition.nearBottom && !this.atNewest) {
				let latestTimestamp = this.chatLog[this.chatLog.length - 1].sendTs;

				this.loadingMoreMessages++;
				global.live.chat
					.getThreadHistory({
						threadId: this.threadId,
						count: HALF_CHAT_MESSAGE_HISTORY,
						ts: latestTimestamp,
						queryDirection: api.chat.QueryDirection.AFTER
					})
					.then(res => {
						this.bulkInsertChatMessages(res.chatMessages, { method: PruneMethod.Oldest });

						// If the set of messages did not contain exactly HALF_CHAT_MESSAGE_HISTORY messages,
						// it is incomplete which means we have reached the end of this thread
						if (res.chatMessages.length != HALF_CHAT_MESSAGE_HISTORY) {
							this.atNewest = true;

							// Merge beside chat log with current one as it holds all of the live chat
							// messages that have not been added while scrolling through chat history
							this.bulkInsertChatMessages(this.besideChatLog, { method: PruneMethod.Oldest });
							this.besideChatLog.length = 0;
						}
						if (res.chatMessages.length != 0) this.atOldest = false;

						logging.event('Added new messages', res.chatMessages.length);

						this.loadingMoreMessages--;
					})
					.catch(err => {
						if (this.threadId != ctxThreadId) return;

						logging.error('Error', err);
						this.propagateError(err);
					});
			}
		}
	}

	// Close inline emoji picker
	chatInputBlur(event: Event) {
		let input = event.currentTarget;

		// Add a timeout incase the element was refocused again quickly (inline-emoji-picker)
		setTimeout(() => {
			if (this.shadowRoot.activeElement != input) this.inlineEmojiPickerOpen = false;
		}, 0);
	}

	// Open inline emoji picker
	chatInputFocus(event: Event) {
		let input = event.currentTarget as HTMLTextAreaElement;

		this.toggleInlineEmojiPicker(input);
	}

	toggleInlineEmojiPicker(input: HTMLTextAreaElement) {
		let emojiMatch = input.value.slice(0, input.selectionStart).match(/:\w+$/);

		this.inlineEmojiPickerOpen = !!emojiMatch;
	}

	chatKeyPress(event: KeyboardEvent) {
		this.lastActiveTimestamp = Date.now();

		let modShift = event.getModifierState('Shift');
		let modCtrl = event.getModifierState('Control');
		let targetInput = event.currentTarget as HTMLTextAreaElement;

		// Update typing indicator
		if (!this.empty) {
			let oldInputLength = targetInput.value.trim().length;

			// TODO: Figure out a way to make this work without waiting 10ms
			setTimeout(() => {
				let indicatorUpdated = false;
				let newInputLength = targetInput.value.trim().length;

				if (newInputLength < oldInputLength) {
					this.deleteCount++;
				} else {
					this.deleteCount = 0;
				}

				if (oldInputLength != newInputLength) {
					// Update typing status to false if text was removed 5 times in a row or if the input is
					// now empty
					if (
						event.key != 'Enter' &&
						this.sentTypingStatus != TypingIndicatorUpdate.NotTyping &&
						oldInputLength &&
						(this.deleteCount >= 5 ? true : newInputLength == 0)
					) {
						this.sentTypingStatus = TypingIndicatorUpdate.NotTyping;
						indicatorUpdated = true;

						global.live.chat
							.setTypingStatus({ threadId: this.threadId, status: { idle: {} } })
							.catch(async err => {
								logging.error('Error', err);
								this.propagateError(err);

								if (err.hasOwnProperty('statusText'))
									this.propagateError(await (err as Response).json());
							});
					}

					if (
						this.sentTypingStatus != TypingIndicatorUpdate.Typing &&
						newInputLength &&
						newInputLength > oldInputLength
					) {
						this.sentTypingStatus = TypingIndicatorUpdate.Typing;
						indicatorUpdated = true;

						global.live.chat
							.setTypingStatus({ threadId: this.threadId, status: { typing: {} } })
							.catch(async err => {
								logging.error('Error', err);
								this.propagateError(err);

								if (err.hasOwnProperty('statusText'))
									this.propagateError(await (err as Response).json());
							});
					}
				}

				// Reset typing indicator
				if (indicatorUpdated) {
					window.clearTimeout(this.typingIndicatorUpdateTimeout);
					this.typingIndicatorUpdateTimeout = window.setTimeout(() => {
						this.sentTypingStatus = TypingIndicatorUpdate.Neither;
					}, timing.seconds(25));
				}
			}, timing.milliseconds(10));
		}

		// Control emoji picker
		if (this.inlineEmojiPicker) {
			// Stop editing
			this.inlineEmojiPicker.control(event);

			// Make sure the emoji picker closes
			setTimeout(() => {
				// Backspace for some reason does not update the `selectionchange` event, this is fallback
				if (event.key == 'Backspace') this.inlineEmojiPicker.updateQuery();

				this.toggleInlineEmojiPicker(targetInput);
			}, 0);
		} else {
			// Check if should send message
			if (event.key == 'Enter' && !modShift && !modCtrl) {
				let message = targetInput.value.trim();

				this.scrollToBottom();

				if (message.length > 0) {
					let fakeId = uuid.v4();

					// For a direct message chat that hasn't been initiated yet
					if (this.empty) {
						this.dispatchEvent(
							new ChatInitializationEvent({
								text: { body: message }
							})
						);
					} else {
						global.live.chat
							.sendChatMessage({
								topic: {
									threadId: this.threadId
								},
								messageBody: {
									text: { body: message }
								}
							})
							.then(res => {
								// Make sure the message has not already been inserted (race condition)
								if (
									!this.chatLog.some(msg => msg.chatMessageId == res.chatMessageId) &&
									!this.besideChatLog.some(msg => msg.chatMessageId == res.chatMessageId)
								) {
									// Swap ids in the `unconfirmedMessageIds` set
									this.unconfirmedMessageIds.add(res.chatMessageId);
									this.unconfirmedMessageIds.delete(fakeId);

									// Swap ids in the fake message
									let msg = this.chatLog.find(msg => msg.chatMessageId == fakeId);
									if (msg) msg.chatMessageId = res.chatMessageId;
								}
								// If the message was received from the server before `sendChatMessage` returned
								// a response (very unlikely), simply remove the fake message
								else {
									let index = this.chatLog.findIndex(msg => msg.chatMessageId == fakeId);

									if (index != -1) {
										this.chatLog.splice(index, 1);
									} else {
										let index = this.besideChatLog.findIndex(
											msg => msg.chatMessageId == fakeId
										);

										if (index != -1) this.besideChatLog.splice(index, 1);
									}
								}
							})
							.catch(err => {
								logging.error('Error', err);
								this.propagateError(err);
							});
					}

					// Create an unconfirmed message that will be confirmed by the server. This makes new
					// messages immediately present in chat on the client side
					this.bulkInsertChatMessages(
						[
							{
								chatMessageId: fakeId,
								threadId: this.threadId,
								sendTs: new Date(),
								body: {
									text: {
										sender: global.currentIdentity as api.chat.IdentityHandle,
										body: message
									}
								}
							}
						],
						{
							method: PruneMethod.Default,
							live: true
						}
					);
					this.unconfirmedMessageIds.add(fakeId);
				}

				this.resetTypingIndicator();

				// Clear the chat box
				targetInput.value = '';

				// Prevent default
				event.preventDefault();

				// Reset chatbox size
				this.autoGrow();
			} else if (event.key == 'Backspace') {
				setTimeout(() => {
					this.toggleInlineEmojiPicker(targetInput);
				}, 0);
			}
		}
	}

	resetTypingIndicator(clearIndicators = false) {
		if (clearIndicators) this.typingIndicators = new Map();
		this.sentTypingStatus = TypingIndicatorUpdate.Neither;
		window.clearTimeout(this.typingIndicatorUpdateTimeout);
		this.deleteCount = 0;
	}

	autoGrow() {
		this.chatInputs.forEach(chatInput => {
			if (!chatInput) return;

			chatInput.style.height = '0';
			chatInput.style.height = `${chatInput.scrollHeight}px`;
		});
	}

	transferFocus(event: MouseEvent) {
		let textarea = (event.currentTarget as HTMLInputElement).querySelector('textarea');
		if (textarea) textarea.focus();
	}

	scrollToBottom() {
		this.chatContentsHolder.scrollTop = this.chatContentsHolder.scrollHeight;
	}

	scrollToMessage(id: string) {
		let messages = Array.from(this.renderRoot.querySelectorAll('#chat-contents .message'));

		let message = messages.find(msg => msg.getAttribute('data-message-id') == id);
		if (message) {
			message.scrollIntoView({
				block: 'center',
				inline: 'center'
			});
		}
	}

	emojiInput(event: MouseEvent) {
		let textarea = this.mainInput;
		showEmojiPickerForInput(event.currentTarget as HTMLElement, textarea);
	}

	replyToMessage(id: string) {
		let i = this.chatLog.findIndex(msg => id == msg.chatMessageId);

		if (i != -1) {
			let msg = this.chatLog[i];

			if (msg.body.text) {
				this.mainInput.focus();

				// Format reply
				let quotedContent = msg.body.text.body
					.split(/[\n\r]/)
					.filter((text: string) => text.trim().length)
					.map((text: string) => '> ' + text)
					.join('\n');

				// Add reply to main input
				this.mainInput.value = quotedContent + '\n\n' + this.mainInput.value;

				this.autoGrow();
			}
		}
	}

	async joinParty(token: string) {
		try {
			await global.live.party.joinParty({ invite: { token } });
		} catch (err) {
			logging.error('Error joining party', err);
			this.propagateError(err);
		}
	}

	// Assumes current identity is leader
	async inviteToParty(identityId: string) {
		try {
			let inviteToken;
			if (!global.currentParty) {
				// Read publicity from cache
				let publicity: api.party.CreatePartyPublicityConfig = {};
				try {
					publicity = JSON.parse(ls.getString('party-publicity', '{}'));
				} catch {}

				let partyRes = await global.live.party.createParty({
					partySize: 4,
					publicity,
					invites: [{}]
				});

				inviteToken = partyRes.invites[0].token;
			} else {
				inviteToken = (await global.live.party.createPartyInvite({})).invite.token;
			}

			// Send invite chat message
			await global.live.chat.sendChatMessage({
				topic: { identityId },
				messageBody: { partyInvite: { token: inviteToken } }
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let chatContentsHolderClasses = classMap({
			hidden: this.hideChatContents
		});
		let inputDisabled = this.isLoading && !this.empty;

		return html`
			<div id="chat-panel">
				<!-- Placeholder -->
				${when(
					this.isLoading,
					() => this.renderPlaceholderChat(),
					() =>
						when(
							this.empty,
							() =>
								html`<div id="empty-chat"><h1>No messages in this chat. Say hello!</h1></div>`
						)
				)}

				<!-- Chat view -->
				<div
					id="chat-contents-holder"
					class=${chatContentsHolderClasses}
					@scroll=${this.scrollThrottle.trigger.bind(this.scrollThrottle)}
				>
					<div id="chat-contents">${this.renderMessages()}</div>
				</div>

				<!-- Mobile typing status -->
				${global.isMobile ? this.renderTypingIndicator() : null}

				<!-- Chat controls -->
				${cache(
					!this.hideInput
						? html`
								<div class="chat-controls">
									<div class="chat-and-inline">
										${this.mainInput &&
										this.inlineEmojiPickerOpen &&
										this.shadowRoot.activeElement == this.mainInput
											? html` <div class="position-above">
													<inline-emoji-picker
														.input=${this.mainInput}
													></inline-emoji-picker>
											  </div>`
											: null}

										<div
											class="chat-input-holder"
											@click=${this.transferFocus.bind(this)}
										>
											<!-- Input -->
											<textarea
												id="main-input"
												class="chat-input"
												maxlength="2048"
												placeholder="Message..."
												?disabled=${inputDisabled}
												@input=${this.autoGrow.bind(this)}
												@focus=${this.chatInputFocus.bind(this)}
												@blur=${this.chatInputBlur.bind(this)}
												@keydown=${this.chatKeyPress.bind(this)}
											></textarea>
										</div>
									</div>

									<!-- Actions -->
									<div class="actions">
										<icon-button
											class="emoji-button"
											preserve
											src="emoji/${getTwemojiIconName('😄')}"
											custom
											?disabled=${inputDisabled}
											.trigger=${this.emojiInput.bind(this)}
											@mouseenter=${tooltip('Emoji')}
										></icon-button>
										<!-- <icon-button
											class="party-button"
											src="regular/party-horn"
											custom
											?disabled=${inputDisabled}
											@mouseenter=${tooltip('Invite to Party')}
										></icon-button> -->
									</div>
								</div>
						  `
						: null
				)}

				<!-- Typing status -->
				${global.isMobile ? null : this.renderTypingIndicator()}
			</div>
		`;
	}

	renderTypingIndicator() {
		let typingMessage: TemplateResult;
		let typingStatuses = Array.from(this.typingIndicators.values()).filter(
			({ identity }) => identity.identityId != global.currentIdentity.identityId
		);

		// Render list of identities
		if (typingStatuses.length <= 3) {
			typingMessage = html`${repeat(
				typingStatuses,
				ts => ts.identity.identityId,
				(ts, i) => {
					let status = ts.status;

					return html`<identity-name no-link .identity=${ts.identity}></identity-name>${i ==
						typingStatuses.length - 2
							? ', and '
							: i != typingStatuses.length - 1
							? ', '
							: ''}`;
				}
			)}
			${typingStatuses.length == 1 ? 'is' : 'are'} typing...`;
		}
		// More than 3 identities typing
		else typingMessage = html`Multiple people are typing...`;

		return html`<div
			id="status-bar"
			class=${classMap({ hidden: global.isMobile ? typingStatuses.length <= 0 : false })}
		>
			${typingStatuses.length > 0
				? html`<div id="loading-dot-holder">
							<div class="loading-dot"></div>
							<div class="loading-dot"></div>
							<div class="loading-dot"></div>
						</div>
						${typingMessage}`
				: null}
		</div>`;
	}

	renderMessages() {
		let messageGroups: { type: ChatEntityType; messages: api.chat.ChatMessage[] }[] = [];
		let newestGroup: api.chat.ChatMessage[] = [];
		let lastMessage: api.chat.ChatMessage = null;

		let insertNewGroup = () => {
			if (newestGroup.length) {
				messageGroups.push({
					type: ChatEntityType.MessageGroup,
					messages: Array.from(newestGroup)
				});
				newestGroup.length = 0;
			}
		};

		// Collect identity chat messages into groups
		for (let message of this.chatLog) {
			// Determine if we should place a duration separator between the messages
			let msgDate = new Date(message.sendTs);
			let lastMsgDate = lastMessage ? new Date(lastMessage.sendTs) : new Date(0);

			// Insert separator between changes in day (Note this is not the UTC change in day, it should be
			// relative to the user)
			if (
				msgDate.getDate() != lastMsgDate.getDate() ||
				msgDate.getMonth() != lastMsgDate.getMonth() ||
				msgDate.getFullYear() != lastMsgDate.getFullYear()
			) {
				// Insert current new group
				insertNewGroup();

				messageGroups.push({
					type: ChatEntityType.Separator,
					messages: [message]
				});
			}

			if (message.body.text || message.body.deleted) {
				let sender = message.body.text?.sender ?? message.body.deleted.sender;
				let lastSender =
					lastMessage?.body?.text?.sender ?? lastMessage?.body?.deleted?.sender ?? null;

				// Determine if we should place a separator between the messages
				let newMessageGroup =
					lastMessage == null || // No previous message
					sender.identityId != lastSender?.identityId || // Different sender
					message.sendTs.getTime() - lastMessage.sendTs.getTime() > timing.minutes(7); // Been a long time since the last message

				// Insert current new group and empty it
				if (newMessageGroup && newestGroup.length) insertNewGroup();

				newestGroup.push(message);
			} else {
				// Insert current new group before event
				if (newestGroup.length) insertNewGroup();

				messageGroups.push({
					type: ChatEntityType.Event,
					messages: [message]
				});
			}

			lastMessage = message;
		}

		// Insert latent new group
		if (newestGroup.length) insertNewGroup();

		return repeat(
			messageGroups,
			messageGroup => messageGroup.messages[0].chatMessageId,
			messageGroup => {
				if (messageGroup.type == ChatEntityType.MessageGroup) {
					let firstMessage = messageGroup.messages[0];
					let sender = firstMessage.body.text
						? firstMessage.body.text.sender
						: firstMessage.body.deleted
						? firstMessage.body.deleted.sender
						: null;

					return html`<div class="message-group">
						<div class="avatar-area">
							<!-- Avatar -->
							<identity-avatar
								class="message-avatar"
								.identity=${sender}
								hide-status
								link
								@contextmenu=${this.identityContextMenu
									? this.identityContextMenu(sender)
									: showIdentityContextMenu(sender)}
							></identity-avatar>
						</div>
						<div class="message-area">
							${repeat(
								messageGroup.messages,
								message => message.chatMessageId,
								(message, index) => this.renderMessage(message, index == 0)
							)}
						</div>
					</div>`;
				} else if (messageGroup.type == ChatEntityType.Separator) {
					let message = messageGroup.messages[0];
					return this.renderSeparator(message.sendTs);
				} else {
					let message = messageGroup.messages[0];
					return this.renderMessage(message, true);
				}
			}
		);
	}

	renderSeparator(ts: Date) {
		let differentYear = ts.getUTCFullYear() != new Date().getUTCFullYear();

		return html`<div class="duration-separator">
			<div class="bar-left"></div>
			<span>${differentYear ? utils.formatDateShort(ts) : utils.formatDay(ts)}</span>
			<div class="bar-right"></div>
		</div>`;
	}

	renderMessage(message: api.chat.ChatMessage, isFirstInGroup: boolean) {
		let body = getMessageBody(message, this.msgCtx);
		// Match the message kind
		// if (message.body.custom) {
		// 	return body;
		// } else
		if (message.body.text) {
			return this.renderIdentityMessage(message, message.body.text.sender, body, isFirstInGroup);
		} else if (message.body.chatCreate) {
			return this.renderEventMessage(message, body);
		} else if (message.body.deleted) {
			return this.renderIdentityMessage(
				message,
				message.body.deleted.sender,
				'message deleted',
				isFirstInGroup
			);
		} else if (message.body.identityFollow) {
			return body;
		} else if (message.body.groupJoin) {
			return this.renderEventMessage(message, body);
		} else if (message.body.groupLeave) {
			return this.renderEventMessage(message, body);
		} else if (message.body.groupMemberKick) {
			return this.renderEventMessage(message, body);
		} else if (message.body.partyJoin) {
			return this.renderEventMessage(message, body);
		} else if (message.body.partyLeave) {
			return this.renderEventMessage(message, body);
		} else if (message.body.partyInvite) {
			return this.renderEventMessage(message, body);
		} else if (message.body.partyJoinRequest) {
			return this.renderEventMessage(message, body);
		} else if (message.body.partyActivityChange) {
			return this.renderEventMessage(message, body);
		} else {
			logging.warn('unknown message kind', message);
			return body;
		}
	}

	renderIdentityMessage(
		message: api.chat.ChatMessage,
		sender: api.identity.IdentityHandle,
		body: string | TemplateResult,
		isFirstInGroup: boolean
	) {
		let isMe = sender.identityId == global.currentIdentity.identityId;

		return html`
			<!-- Message Box -->
			<div
				class=${classMap({
					message: true,
					identity: true,
					unconfirmed: this.unconfirmedMessageIds.has(message.chatMessageId),
					me: isMe,
					first: isFirstInGroup
				})}
				data-message-id=${message.chatMessageId}
				@contextmenu=${showChatMessageContextMenu({
					chatMessage: message,
					replyCb: this.replyToMessage.bind(this)
				})}
			>
				<!-- Header -->
				${!isMe && isFirstInGroup
					? html`<div class="message-header">
							<identity-name
								class="message-identity-name"
								.identity=${sender}
								@contextmenu=${this.identityContextMenu
									? this.identityContextMenu(sender)
									: showIdentityContextMenu(sender)}
							></identity-name>
					  </div>`
					: null}

				<!-- Body -->
				<div class="message-body">
					<!-- Text -->
					<rich-text class="message-text" .timestamp=${message.sendTs} .content=${body}></rich-text>
					<!-- TODO: Embed -->
				</div>
			</div>
		`;
	}

	renderEventMessage(message: api.chat.ChatMessage, event: string | TemplateResult) {
		// TODO: Show date
		return html`
			<div class="message event" data-message-id=${message.chatMessageId}>
				<div class="event-text">${event}</div>
			</div>
		`;
	}

	renderPlaceholderChat() {
		return html`<div id="chat-contents-placeholder">
			<div id="chat-placeholder">
				${repeat(
					Array(20),
					(_, i) => i,
					(_, i) => {
						return html`<div class="placeholder-message-group">
							<div class="placeholder-avatar-area">
								<loading-placeholder></loading-placeholder>
							</div>
							<div class="placeholder-message-area">
								${repeat(
									Array(
										this.RNG[i % 32] < 0.5
											? 1
											: 1 + Math.round(this.RNG[(i + 10) % 32] * 3)
									),
									(_, j) => j,
									(_, j) => {
										let width = 30 + this.RNG[(i + j) % 32] * 600;
										let styles = styleMap({
											width: `${Math.min(550, width)}px`,
											height: `${30 * (1 + Math.floor(width / 550))}px`
										});

										return html`<loading-placeholder
											not-fixed
											style=${styles}
										></loading-placeholder>`;
									}
								)}
							</div>
						</div>`;
					}
				)}
			</div>
		</div> `;
	}

	updateLiveCache(lastReadTs: Date, watchIndex: api.chat.WatchResponse) {
		if (!this.threadId) return;

		if (lastReadTs != null) this.cacheLastReadTs = lastReadTs;
		if (watchIndex != null) this.cacheWatchIndex = watchIndex;

		// Update cache if both are set
		if (this.cacheLastReadTs != null && this.cacheWatchIndex != null) {
			ThreadLiveCache.set(this.threadId, {
				lastReadTs: this.cacheLastReadTs,
				watch: this.cacheWatchIndex
			});
		}
	}

	propagateError(error: any) {
		this.loadError = error;

		this.dispatchEvent(new ChatErrorEvent(error));
	}
}

@customElement('chat-preview-button')
export class ChatPreviewButton extends LitElement {
	onChatPreview() {
		showAlert(
			'Rivet Chat Alpha',
			html`
				<p>This is a preview of Rivet Chat, this is not intended to be a complete product.</p>
				<p>Stay tuned for many more features coming soon!</p>
			`
		);
	}

	render() {
		return html`
			<rvt-button
				style="margin: 0 auto;"
				color="white"
				icon="regular/screwdriver-wrench"
				.trigger=${this.onChatPreview.bind(this)}
				>Chat is in alpha!</rvt-button
			>
		`;
	}
}

// Seeded randomness
function xmur3(str: string) {
	let h = 1779033703 ^ str.length;
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
		h = (h << 13) | (h >>> 19);
	}

	return () => {
		h = Math.imul(h ^ (h >>> 16), 2246822507);
		h = Math.imul(h ^ (h >>> 13), 3266489909);
		return (h ^= h >>> 16) >>> 0;
	};
}

function sfc32(str: string) {
	let seed = xmur3(str);
	let a = seed();
	let b = seed();
	let c = seed();
	let d = seed();

	return function () {
		a >>>= 0;
		b >>>= 0;
		c >>>= 0;
		d >>>= 0;
		let t = (a + b) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >>> 11);
		d = (d + 1) | 0;
		t = (t + d) | 0;
		c = (c + t) | 0;
		return (t >>> 0) / 4294967296;
	};
}
