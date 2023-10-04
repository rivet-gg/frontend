import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './context-menu.scss';
import { noContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';
import cloud from '@rivet-gg/cloud';
import global from '../../utils/global';
import logging from '../../utils/logging';
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
	group?: {
		group: api.group.GroupHandle;
		selfIsMember: boolean;
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

	isFetching: boolean = false;

	@property({ type: Boolean, attribute: 'wide' })
	wide = false;

	// NOTE: The context menu gets re-rendered, not recreated. It is important to reset data when updated
	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('ctx')) {
			// Reset data
			this.identitySummary = null;
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
			}
		} catch (err) {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		}

		this.isFetching = false;
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
		if (ctx.groupMember) body = this.renderGroupMemberContextMenu();
		else if (ctx.joinRequest) body = this.renderJoinRequestContextMenu();
		else if (ctx.bannedIdentity) body = this.renderBannedIdentityContextMenu();
		else if (ctx.group) body = this.renderGroupContextMenu();
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

		return html`
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

		return html` <context-action
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

		return html` <context-action
			.trigger=${this.unbanIdentity.bind(this)}
			@triggered=${this.onActionClick.bind(this)}
			>Unban</context-action
		>`;
	}

	renderGroupContextMenu() {
		let ctx = this.ctx.group;
		let group = ctx.group;

		return html`<context-action
			href=${routes.groupSettings.build({ groupId: group.groupId, tab: 'General' })}
			>View profile</context-action
		>`;
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
