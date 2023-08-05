import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './main-sidebar.scss';
import routes from '../../routes';
import IdentityStatusController from './identity-status-controller';
import global from '../../utils/global';
import * as api from '../../utils/api';
import { when } from 'lit/directives/when.js';

import logging from '../../utils/logging';
import assets from '../../data/assets';
import { showActionSheet, showChatThreadContextMenu, tooltip } from '../../ui/helpers';
import {
	globalEventGroups,
	ThreadUpdateEvent,
	ThreadReadEvent,
	IdentityChangeEvent,
	PartyUpdateEvent,
	RecentFollowersUpdateEvent
} from '../../utils/global-events';
import { getMessageBody } from '../../utils/chat';
import UIRouter from '../root/ui-router';
import { GroupCreateEvent } from '../modals/create-group';
import UIRoot from '../root/ui-root';
import { isDeveloper } from '../../utils/identity';

export const CHAT_THREAD_HISTORY = 64;

export const enum MainMenuItem {
	HOME = 'home',
	ARCADE = 'arcade',
	GROUPS = 'groups',
	DEVELOPER = 'developer'
}

export type MenuItem =
	| { kind: 'MainMenu'; content: { item: MainMenuItem } }
	| { kind: 'Direct'; content: { otherIdentityId: string } }
	| { kind: 'Group'; content: { groupId: string } }
	| { kind: 'Party'; content: { partyId: string } };

@customElement('main-sidebar')
export default class MainSidebar extends LitElement {
	static styles = cssify(styles);

	@query('identity-status-controller')
	identityStatus: IdentityStatusController;

	@property({ type: Object })
	activeMenu: MenuItem = null;

	@property({ type: Object })
	unreadMessages: Map<string, number> = new Map();

	@property({ type: Object })
	chatsLoadError?: any = null;

	@property({ type: Boolean })
	onHomePage = false;

	@property()
	createGroupModalActive = false;

	@property()
	createPartyModalActive = false;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;
	handleThreadUpdate: (e: ThreadUpdateEvent) => void;
	handlePartyUpdate: (e: PartyUpdateEvent) => void;
	handleThreadRead: (e: ThreadReadEvent) => void;
	handleRecentFollowersUpdate: (e: RecentFollowersUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);

		this.handleThreadUpdate = this.onThreadUpdate.bind(this);
		globalEventGroups.add('thread-update', this.handleThreadUpdate);

		// Handle thread read (from a chat-view)
		this.handleThreadRead = this.onThreadRead.bind(this);
		globalEventGroups.add('thread-read', this.handleThreadRead);

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);

		this.handleRecentFollowersUpdate = this.onRecentFollowersUpdate.bind(this);
		globalEventGroups.add('recent-followers-update', this.handleRecentFollowersUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
		globalEventGroups.remove('thread-update', this.handleThreadUpdate);
		globalEventGroups.remove('thread-read', this.handleThreadRead);
		globalEventGroups.remove('party-update', this.handlePartyUpdate);
		globalEventGroups.remove('recent-followers-update', this.handleRecentFollowersUpdate);
	}

	onIdentityChange() {
		this.requestUpdate();
	}
	onThreadRead() {
		this.requestUpdate();
	}
	onThreadUpdate() {
		this.requestUpdate();
	}
	onPartyUpdate() {
		this.requestUpdate();
	}
	onRecentFollowersUpdate() {
		this.requestUpdate();
	}

	onFindFriends() {
		UIRoot.shared.openSearchPanel({
			filter: { identities: true },
			active: true
		});
	}

	promptCreate(event: PointerEvent) {
		// Get the status selection
		showActionSheet(event.target as HTMLElement, [
			{
				type: 'action',
				label: 'New Message',
				icon: Math.random() > 0.99 ? 'solid/user-alien' : 'solid/user',
				cb: () => {
					// Jump to chat
					UIRoot.shared.openSearchPanel({
						filter: { identities: true },
						selectionCb(item) {
							item = item as api.identity.IdentityHandle;

							UIRouter.shared.navigate(
								routes.identityDirectChat.build({ id: item.identityId })
							);
						},
						active: true
					});
				}
			},
			{
				type: 'action',
				label: 'New Group',
				icon: 'regular/user-group',
				cb: () => {
					this.createGroupModalActive = true;
				}
			}
			// {
			// 	type: 'action',
			// 	label: 'New Party',
			// 	icon: 'regular/party-horn',
			// 	cb: () => {
			// 		this.createPartyModalActive = true;
			// 	}
			// }
		]);
	}

	render() {
		let isRegistered = global.currentIdentity.isRegistered;

		// Create menu items
		let menuItems: { id: MainMenuItem; name: string; url: string; icon: string }[] = [
			{ id: MainMenuItem.HOME, name: 'Home', url: routes.home.build({}), icon: 'regular/gamepad' }
			// { id: MainMenuItem.ARCADE, name: 'Arcade', url: routes.arcade.build({}), icon: 'regular/gamepad' }
			// { id: MainMenuItem.GROUPS, name: 'Groups', url: routes.groups.build({}), icon: 'regular/identity-group' },
		];
		if (isDeveloper(global.currentIdentity)) {
			menuItems.push({
				id: MainMenuItem.DEVELOPER,
				name: 'Developer',
				url: routes.devDashboard.build({}),
				icon: 'regular/square-code'
			});
		}

		return html`
			<div id="base">
				<!-- Scrolling Content -->
				<div id="scroller">
					<!-- Logo -->
					<a id="main-logo" href=${routes.home.build({})}>
						<e-svg src="logo/logo-small" class="logo-icon" preserve></e-svg>
					</a>

					<!-- Identity Status -->
					<identity-status-controller></identity-status-controller>

					<!-- Registration Banner -->
					${when(
						!isRegistered && !this.onHomePage,
						() => html`<registration-banner></registration-banner>`
					)}

					<!-- Search Bar -->
					<search-bar></search-bar>

					<!-- Menu Items -->
					${repeat(
						menuItems,
						m => m.id,
						item => html`
							<sidebar-button
								href=${item.url}
								.isActive=${this.activeMenu &&
								this.activeMenu.kind == 'MainMenu' &&
								item.id === this.activeMenu.content.item}
							>
								<e-svg slot="icon" src=${item.icon}></e-svg>
								<h1 slot="title">${item.name}</h1>
							</sidebar-button>
						`
					)}

					<!-- Social Header -->
					<sidebar-header id="social-header">
						<div id="social-title" slot="title">
							<h1>Social</h1>
							${when(
								global.recentFollowers.length != 0,
								() =>
									html`<rvt-button
										small
										icon="solid/envelope"
										href=${routes.recentFollowers.build({})}
										@mouseenter=${tooltip('View recent followers')}
										>${global.recentFollowers.length > 30
											? '30+'
											: global.recentFollowers.length}</rvt-button
									>`
							)}
						</div>
						<icon-button
							slot="action"
							src="solid/square-plus"
							size="26"
							color="#ececec80"
							.trigger=${this.promptCreate.bind(this)}
							@mouseenter=${tooltip('Create...')}
						></icon-button>
					</sidebar-header>

					<!-- Chats -->
					<div id="chat-list">
						${when(
							global.recentThreads.length == 0,
							() => html`<div id="no-chats">
								<lazy-img
									id="icon"
									src=${assets.asset('graphics/chat-bubble.png')}
								></lazy-img>

								<p>Invite your friends to start chatting!</p>

								<rvt-button
									small
									color="#404040"
									icon="solid/user"
									.trigger=${this.onFindFriends.bind(this)}
									>Find Friends</rvt-button
								>
								<rvt-button
									small
									color="#404040"
									icon="solid/user-group"
									.trigger=${() => (this.createGroupModalActive = true)}
									>Create Group</rvt-button
								>
								<!-- <rvt-button
									small
									color="#404040"
									icon="solid/party-horn"
									.trigger=${() => (this.createPartyModalActive = true)}
									>Create Party</rvt-button
								> -->
							</div>`,
							() => html`<div>
								${repeat(
									[...global.recentThreads].reverse(),
									t => t.threadId,
									thread => this.renderThread(thread)
								)}
							</div>`
						)}
						${when(this.chatsLoadError, () => html`<p id="error">Error loading chats</p>`)}
					</div>
				</div>
			</div>

			<modal-create-group
				.active=${this.createGroupModalActive}
				@create=${(event: GroupCreateEvent) =>
					UIRouter.shared.navigate(
						routes.groupSettings.build({
							id: event.groupId
						})
					)}
				@close=${() => (this.createGroupModalActive = false)}
			></modal-create-group>
			<modal-create-party
				.active=${this.createPartyModalActive}
				@active-change=${() => (this.createPartyModalActive = false)}
				@close=${() => (this.createPartyModalActive = false)}
			></modal-create-party>
		`;
	}

	renderThread(thread: api.identity.ChatThread) {
		// Handle the context
		if (thread.topic.group) {
			let groupHandle = thread.topic.group.group;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Group' &&
				this.activeMenu.content.groupId == groupHandle.groupId;

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.groupChat.build({ id: groupHandle.groupId })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu({ groupId: groupHandle.groupId })}
				>
					<group-avatar slot="icon" .group=${groupHandle}></group-avatar>
					<div slot="content">
						<h1 class="sidebar-button-title thread">${groupHandle.displayName}</h1>

						<h2 class="sidebar-button-subtitle">
							${when(
								thread.tailMessage.body.text,
								() => html`
									<span class="message-prefix"
										>${when(
											thread.tailMessage.body.text.sender.identityId ==
												global.currentIdentity.identityId,
											() => 'You',
											() => html`<identity-name
												.identity=${thread.tailMessage.body.text.sender}
												no-link
											></identity-name>`
										)}:&nbsp;</span
									>
									<br />
									<rich-text
										class="message-text"
										inline
										.content=${thread.tailMessage.body.text.body}
									></rich-text>
								`,
								() => html`<span class="message-body"
									>${getMessageBody(thread.tailMessage)}</span
								>`
							)}
						</h2>
					</div>
					${when(
						global.currentThread &&
							thread.threadId == global.currentThread &&
							global.currentThreadActive,
						() => null,
						() =>
							when(
								thread.unreadCount,
								() => html`<div slot="badge">
									${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
								</div>`
							)
					)}
				</social-sidebar-button>
			`;
		} else if (thread.topic.direct) {
			let directChat = thread.topic.direct;
			let otherIdentity =
				directChat.identityA.identityId == global.currentIdentity.identityId
					? directChat.identityB
					: directChat.identityA;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Direct' &&
				this.activeMenu.content.otherIdentityId == otherIdentity.identityId;

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.identityDirectChat.build({ id: otherIdentity.identityId })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu({ identityId: otherIdentity.identityId })}
				>
					<identity-avatar slot="icon" .identity=${otherIdentity}></identity-avatar>
					<div slot="content">
						<identity-name
							class="sidebar-button-title"
							.identity=${otherIdentity}
							no-link
						></identity-name>
						<h2 class="sidebar-button-subtitle">
							${when(
								thread.tailMessage.body.text,
								() => html`<rich-text
									class="message-text"
									inline
									.content=${thread.tailMessage.body.text.body}
								></rich-text>`,
								() => html`<span class="message-body"
									>${getMessageBody(thread.tailMessage)}</span
								>`
							)}
						</h2>
					</div>
					${when(
						global.currentThread &&
							thread.threadId == global.currentThread &&
							global.currentThreadActive,
						() => null,
						() =>
							when(
								thread.unreadCount,
								() => html`<div slot="badge">
									${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
								</div>`
							)
					)}
				</social-sidebar-button>
			`;
		} else if (thread.topic.party) {
			let partyChat = thread.topic.party.party;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Party' &&
				this.activeMenu.content.partyId == partyChat.partyId;

			let partyIcon = null;
			if (
				partyChat.activity &&
				(partyChat.activity.matchmakerFindingLobby || partyChat.activity.matchmakerLobby)
			) {
				let game =
					partyChat.activity.matchmakerFindingLobby?.game ||
					partyChat.activity.matchmakerLobby?.game;
				partyIcon = html`<div slot="icon" class="game-icon">
					<lazy-img src=${assets.gameLogoUrl(game.nameId)} bg-size="contain"></lazy-img>
				</div>`;
			} else {
				partyIcon = html`<div slot="icon" class="game-icon">
					<e-svg slot="icon" class="game-icon" src="solid/party-horn"></e-svg>
				</div>`;
			}

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.party.build({ id: partyChat.partyId })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu({})}
				>
					${partyIcon}
					<div slot="content">
						<h1 class="sidebar-button-title thread">Party</h1>
						<h2 class="sidebar-button-subtitle">
							${when(
								thread.tailMessage.body.text,
								() => html`<span class="message-prefix"
										>${when(
											thread.tailMessage.body.text.sender.identityId ==
												global.currentIdentity.identityId,
											() => 'You',
											() => html`<identity-name
												.identity=${thread.tailMessage.body.text.sender}
												no-link
											></identity-name>`
										)}:&nbsp;</span
									>
									<br />
									<rich-text
										class="message-text"
										inline
										.content=${thread.tailMessage.body.text.body}
									></rich-text> `,
								() => html`<span class="message-body"
									>${getMessageBody(thread.tailMessage)}</span
								>`
							)}
						</h2>
					</div>
					${when(
						global.currentThread &&
							thread.threadId == global.currentThread &&
							global.currentThreadActive,
						() => null,
						() =>
							when(
								thread.unreadCount,
								() => html`<div slot="badge">
									${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
								</div>`
							)
					)}
				</social-sidebar-button>
			`;
		} else {
			logging.warn('Unable to handle chat', thread);
			return null;
		}
	}
}
