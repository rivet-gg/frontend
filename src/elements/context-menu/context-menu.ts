import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './context-menu.scss';
import { noContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';
import cloud from '@rivet-gg/cloud';
import global from '../../utils/global';
import logging from '../../utils/logging';
import { identityRouteData } from '../../data/identity';
import routes from '../../routes';
import { globalEventGroups } from '../../utils/global-events';
import UIRoot from '../root/ui-root';
import utils from '../../utils/utils';

export interface Context {
	identity?: {
		identity: api.identity.IdentityHandle;
	};
	groupMember?: {
		identity: api.identity.IdentityHandle;
		groupId: string;
		selfIsOwner: boolean;
	};
	joinRequest?: {
		identity: api.identity.IdentityHandle;
		groupId: string;
	};
	bannedIdentity?: {
		identity: api.identity.IdentityHandle;
		groupId: string;
	};
	partyMember?: {
		partyMember: api.party.PartyMemberSummary;
		selfIsLeader: Boolean;
	};
	group?: {
		group: api.group.GroupHandle;
		selfIsMember: boolean;
	};
	chatThread?: {
		identityId?: string;
		groupId?: string;
	};
	chatMessage?: {
		chatMessage: api.chat.ChatMessage;
		replyCb: (chatMessageId: string) => void;
	};
	lobby?: {
		lobby: cloud.AnalyticsLobbySummary;
		destroyCb: () => void;
		visitLogsCb: () => void;
	};
}

@customElement('context-menu')
export default class ContextMenu extends LitElement {
	static styles = cssify(styles);

	// === RELATED DATA ===
	@property({ type: Number })
	ctx: Context = null;

	// === EXTRA DATA ===
	@property({ type: Object })
	identitySummary: api.identity.IdentitySummary = null;
	// Fake follow state
	@property({ type: Boolean })
	isFollowing: boolean = false;

	isFetching: boolean = false;

	@property({ type: Boolean, attribute: 'wide' })
	wide = false;

	// NOTE: The context menu gets re-rendered, not recreated. It is important to reset data when updated
	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('ctx')) {
			// Reset data
			this.identitySummary = null;
			this.isFollowing = false;
			this.isFetching = false;

			let ctx = this.ctx;
			if (ctx.identity || ctx.groupMember) this.fetchIdentitySummary();
		}

		if (changedProperties.has('group')) {
			this.isFetching = false;
		}
	}

	async fetchIdentitySummary() {
		this.isFetching = true;

		let identity = this.ctx.identity?.identity ?? this.ctx.groupMember.identity;
		let ctxIdentityId = identity.identityId;
		try {
			let res = await global.live.identity.getIdentitySummaries({
				identityIds: [ctxIdentityId]
			});

			let identity = this.ctx.identity?.identity ?? this.ctx.groupMember.identity;
			if (ctxIdentityId == identity.identityId) {
				this.identitySummary = res.identities[0];
				this.isFollowing = this.identitySummary.following;
			}
		} catch (err) {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		}

		this.isFetching = false;
	}

	async toggleFollow() {
		let summary = this.identitySummary;

		try {
			if (summary.following) {
				await global.live.identity.unfollowIdentity({
					identityId: summary.identityId
				});
				this.isFollowing = false;
			} else {
				await global.live.identity.followIdentity({
					identityId: summary.identityId
				});
				this.isFollowing = true;
			}
		} catch (err) {
			logging.error('Error following', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async resolveJoinRequest(resolution: boolean) {
		let ctx = this.ctx.joinRequest;
		let identity = ctx.identity;

		try {
			await global.live.group.resolveGroupJoinRequest({
				groupId: ctx.groupId,
				identityId: identity.identityId,
				resolution
			});
		} catch (err) {
			logging.error('Request Error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async kickPartyMember() {
		let identity = this.ctx.partyMember.partyMember.identity;

		try {
			await global.live.party.kickMember({ identityId: identity.identityId });
		} catch (err) {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async transferPartyOwnership() {
		let identity = this.ctx.partyMember.partyMember.identity;

		try {
			await global.live.party.transferPartyOwnership({ identityId: identity.identityId });
		} catch (err) {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async kickGroupMember() {
		let ctx = this.ctx.groupMember;
		let identity = ctx.identity;

		try {
			await global.live.group.kickGroupMember({
				groupId: ctx.groupId,
				identityId: identity.identityId
			});
		} catch (err) {
			logging.error('Request Error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async banIdentity() {
		let ctx = this.ctx.groupMember;
		let identity = ctx.identity;

		try {
			await global.live.group.banGroupIdentity({
				groupId: ctx.groupId,
				identityId: identity.identityId
			});
		} catch (err) {
			logging.error('Request Error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async unbanIdentity() {
		let ctx = this.ctx.bannedIdentity;
		let identity = ctx.identity;

		try {
			await global.live.group.unbanGroupIdentity({
				groupId: ctx.groupId,
				identityId: identity.identityId
			});
		} catch (err) {
			logging.error('Request Error', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	resolveBody() {
		let ctx = this.ctx;

		let body;
		if (ctx.identity) body = this.renderIdentityContextMenu();
		else if (ctx.groupMember) body = this.renderGroupMemberContextMenu();
		else if (ctx.joinRequest) body = this.renderJoinRequestContextMenu();
		else if (ctx.bannedIdentity) body = this.renderBannedIdentityContextMenu();
		else if (ctx.group) body = this.renderGroupContextMenu();
		else if (ctx.partyMember) body = this.renderPartyMemberContextMenu();
		else if (ctx.chatMessage) body = this.renderChatMessageContextMenu();
		else if (ctx.chatThread) body = this.renderChatThreadContextMenu();
		else if (ctx.lobby) body = this.renderLobbyContextMenu();

		if (!body) logging.warn('invalid context menu body', ctx);

		return body;
	}

	onActionClick() {
		UIRoot.shared.hideContextMenu();
	}

	render() {
		let classes = classMap({
			wide: this.wide
		});

		return html`<div id="base" class=${classes} @contextmenu=${noContextMenu}>
			<div id="scroller">${this.resolveBody()}</div>
		</div>`;
	}

	renderIdentityContextMenu() {
		let ctx = this.ctx.identity;
		let identity = ctx.identity;
		let summary = this.identitySummary;

		let isSelf = identity.identityId == global.currentIdentity.identityId;

		return html`<context-action href=${routes.identity.build(identityRouteData(identity))}
				>View profile</context-action
			>
			${when(
				!isSelf,
				() =>
					html`<context-action href=${routes.identityDirectChat.build(identityRouteData(identity))}
							>Send message</context-action
						><context-action
							class=${classMap({ destructive: this.isFollowing })}
							.trigger=${this.toggleFollow.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							?loading=${!summary}
							>${this.isFollowing ? 'Remove' : 'Add'} friend</context-action
						>`
			)}`;
	}

	renderGroupMemberContextMenu() {
		let ctx = this.ctx.groupMember;
		let identity = ctx.identity;
		let summary = this.identitySummary;

		// Check if this identity is the current identity
		let isSelf = false;
		if (identity.identityId == global.currentIdentity.identityId) {
			isSelf = true;
		}

		let showAdminControls = !isSelf && ctx.selfIsOwner;

		return html`<context-action href=${routes.identity.build(identityRouteData(identity))}
				>View profile</context-action
			>
			${when(
				!isSelf,
				() =>
					html`<context-action href=${routes.identityDirectChat.build(identityRouteData(identity))}
							>Send message</context-action
						><context-action
							class=${classMap({ destructive: this.isFollowing })}
							.trigger=${this.toggleFollow.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							?loading=${!summary}
							>${this.isFollowing ? 'Remove' : 'Add'} friend</context-action
						>`
			)}
			${when(
				showAdminControls,
				() =>
					html`<div class="spacer"></div>
						<context-action
							class="destructive"
							.trigger=${this.kickGroupMember.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							>Kick</context-action
						><context-action
							class="destructive"
							.trigger=${this.banIdentity.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							>Ban</context-action
						>`
			)}`;
	}

	renderJoinRequestContextMenu() {
		let ctx = this.ctx.joinRequest;
		let identity = ctx.identity;

		return html`<context-action href=${routes.identity.build(identityRouteData(identity))}
				>View profile</context-action
			>
			<div class="spacer"></div>
			<context-action
				.trigger=${this.resolveJoinRequest.bind(this, true)}
				@triggered=${this.onActionClick.bind(this)}
				>Accept join request</context-action
			>
			<context-action
				.trigger=${this.resolveJoinRequest.bind(this, false)}
				@triggered=${this.onActionClick.bind(this)}
				>Ignore join request</context-action
			>`;
	}

	renderBannedIdentityContextMenu() {
		let ctx = this.ctx.bannedIdentity;
		let identity = ctx.identity;

		return html`<context-action href=${routes.identity.build(identityRouteData(identity))}
				>View profile</context-action
			>
			<div class="spacer"></div>
			<context-action
				.trigger=${this.unbanIdentity.bind(this)}
				@triggered=${this.onActionClick.bind(this)}
				>Unban</context-action
			>`;
	}

	renderPartyMemberContextMenu() {
		let ctx = this.ctx.partyMember;
		let member = ctx.partyMember;
		let memberIsSelf = global.currentIdentity.identityId == member.identity.identityId;

		return html`<context-action href=${routes.identity.build(identityRouteData(member.identity))}
				>View profile</context-action
			>
			${when(
				!memberIsSelf && ctx.selfIsLeader,
				() =>
					html`<div class="spacer"></div>
						<context-action
							class="destructive"
							.trigger=${this.transferPartyOwnership.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							>Make leader</context-action
						>
						<context-action
							class="destructive"
							.trigger=${this.kickPartyMember.bind(this)}
							@triggered=${this.onActionClick.bind(this)}
							>Kick</context-action
						>`
			)}`;
	}

	renderGroupContextMenu() {
		let ctx = this.ctx.group;
		let group = ctx.group;

		return html`<context-action href=${routes.groupSettings.build({ id: group.groupId })}
				>View profile</context-action
			>
			${when(
				ctx.selfIsMember,
				() =>
					html`<context-action href=${routes.groupChat.build({ id: group.groupId })}
						>Open chat</context-action
					>`
			)}`;
	}

	renderChatThreadContextMenu() {
		let ctx = this.ctx.chatThread;

		return when(
			ctx.identityId,
			() =>
				html`<context-action href=${routes.identity.build({ id: ctx.identityId })}
					>View profile</context-action
				>`,
			() =>
				when(
					ctx.groupId,
					() =>
						html`<context-action href=${routes.groupSettings.build({ id: ctx.groupId })}
							>View profile</context-action
						>`,
					() => html`<p class="muted">No actions available</p>`
				)
		);
	}

	renderChatMessageContextMenu() {
		let ctx = this.ctx.chatMessage;
		let chatMessage = ctx.chatMessage;

		let identity: api.identity.IdentityHandle;
		let isOwnMessage = false;
		if (chatMessage.body.text) {
			identity = chatMessage.body.text.sender;

			isOwnMessage = identity.identityId == global.currentIdentity.identityId;
		}

		return html`
			${when(
				identity,
				() =>
					html`<context-action
						.trigger=${() => ctx.replyCb(chatMessage.chatMessageId)}
						@triggered=${this.onActionClick.bind(this)}
						>Reply to <b>${identity.displayName}</b></context-action
					>`,
				() => html`<p class="muted">No actions available</p>`
			)}
		`;
	}

	renderLobbyContextMenu() {
		let ctx = this.ctx.lobby;
		let lobby = ctx.lobby;

		return html`<context-action
				class="destructive"
				.trigger=${() => ctx.destroyCb()}
				@triggered=${this.onActionClick.bind(this)}
				>Destroy</context-action
			>
			<!-- <context-action @click=${() => ctx.visitLogsCb()}}>Logs</context-action> -->
			<div
				class="data"
				@click=${() => {
					utils.copyText(lobby.lobbyId);
					this.onActionClick();
				}}
			>
				Lobby ID
				<code>${lobby.lobbyId}</code>
			</div>
			<div
				class="data"
				@click=${() => {
					utils.copyText(lobby.lobbyGroupId);
					this.onActionClick();
				}}
			>
				Game Mode ID
				<code>${lobby.lobbyGroupId}</code>
			</div>
			<div class="data">Created <code>${lobby.createTs.toISOString()}</code></div>`;
	}
}
