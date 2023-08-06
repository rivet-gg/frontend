import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './identity-direct-chat.scss';

import global from '../../utils/global';
import { responses } from '../../routes';
import { cssify } from '../../utils/css';
import { ChatErrorEvent, ChatInitializationEvent } from '../common/chat-view';
import { padAccountNumber } from '../../data/identity';
import UIRouter from '../root/ui-router';
import { ls } from '../../utils/cache';
import { IdentityActionEvent } from '../identity/identity-sidebar';
import { IdentityProfileCache } from '../../data/cache';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';

@customElement('page-identity-direct-chat')
export default class IdentityChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	identityId: string;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: String })
	threadId: string = null;

	@property({ type: Object })
	loadError: any = null;

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Boolean })
	initializedChat = false; // True when an identity has just started a new chat

	identityStream?: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;

	async onInitialize(event: ChatInitializationEvent) {
		try {
			await global.live.chat.sendChatMessage({
				topic: { identityId: this.identityId },
				messageBody: event.messageBody
			});
			this.initializedChat = true;
		} catch (err) {
			this.loadError = err;
		}
	}

	async onChatError(event: ChatErrorEvent) {
		globalEventGroups.dispatch('error', event.chatError);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('identityId') || changedProperties.has('initializedChat')) {
			if (!changedProperties.has('initializedChat')) this.isLoading = true;

			this.resetIdentityData();

			let cacheKey = `identity-thread-id-${this.identityId}`;
			let cacheThreadId = ls.getString(cacheKey, null);

			if (cacheThreadId) {
				this.threadId = cacheThreadId;
				this.isLoading = false;
			}

			// Fetch direct chat ID
			global.live.chat
				.getDirectThread({ identityId: this.identityId })
				.then(res => {
					this.threadId = res.threadId ?? null;
					if (this.threadId) ls.setString(cacheKey, this.threadId);

					// Update the title
					UIRouter.shared.updateTitle(
						`Chat – ${res.identity.displayName}#${padAccountNumber(res.identity.accountNumber)}`
					);

					this.isLoading = false;
				})
				.catch((err: any) => {
					this.loadError = err;
				});

			this.fetchIdentity();
		}
	}

	resetIdentityData() {
		this.threadId = null;
		this.loadError = null;
		this.profile = null;
		if (this.identityStream) this.identityStream.cancel();
	}

	async fetchIdentity() {
		this.identityStream = await IdentityProfileCache.watch(this.identityId, res => {
			this.profile = res.identity;

			// Update the title
			UIRouter.shared.updateTitle(
				`${this.profile.displayName}#${padAccountNumber(this.profile.accountNumber)}`
			);
		});

		this.identityStream.onError(err => {
			logging.error('Request error', err);

			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	// Assumes current identity is leader
	async inviteToParty() {
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
				topic: { identityId: this.identityId },
				messageBody: { partyInvite: { token: inviteToken } }
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	async requestToJoinParty() {
		try {
			await global.live.party.sendJoinRequest({
				partyId: this.profile.party.partyId
			});
		} catch (err) {
			logging.error('Error requesting to join party', err);
			this.loadError = err;
		}
	}

	async joinParty(partyId: string) {
		try {
			await global.live.party.joinParty({
				invite: { partyId }
			});
		} catch (err) {
			logging.error('Error joining party', err);
			this.loadError = err;
		}
	}

	async toggleFollow() {
		try {
			if (this.profile.following) {
				await global.live.identity.unfollowIdentity({
					identityId: this.profile.identityId
				});
			} else {
				await global.live.identity.followIdentity({
					identityId: this.profile.identityId
				});
			}
		} catch (err) {
			logging.error('Error joining party', err);
			this.loadError = err;
		}
	}

	onActionEvent(event: IdentityActionEvent) {
		let action = event.action;

		if (action.inviteToParty) {
			this.inviteToParty();
		} else if (action.requestToJoinParty) {
			this.requestToJoinParty();
		} else if (action.joinParty) {
			this.joinParty(action.joinParty.partyId);
		} else if (action.toggleFollow) {
			this.toggleFollow();
		} else logging.warn('Identity sidebar event not hooked up', action);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`<div id="base">
			<right-sidebar-layout>
				${this.renderChat()}
				${this.profile
					? html`<identity-sidebar
							slot="sidebar"
							in-chat
							.profile=${this.profile}
							@event=${this.onActionEvent.bind(this)}
					  >
							<div slot="extras-top">
								<identity-tile .identity=${this.profile}></identity-tile>
							</div>
							<div slot="extras-bottom">
								<chat-preview-button></chat-preview-button>
							</div>
					  </identity-sidebar>`
					: null}
			</right-sidebar-layout>
		</div>`;
	}

	renderChat() {
		return html`<chat-view
			slot="body"
			.threadId=${this.threadId}
			.empty=${!this.isLoading && this.threadId == null}
			auto-focus
			@initialize=${this.onInitialize.bind(this)}
			@error=${this.onChatError.bind(this)}
		></chat-view>`;
	}
}
