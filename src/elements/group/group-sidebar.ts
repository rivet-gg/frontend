import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './group-sidebar.scss';
import routes from '../../routes';
import global from '../../utils/global';
import {
	showJoinRequestContextMenu,
	showGroupMemberContextMenu,
	showBannedIdentityContextMenu
} from '../../ui/helpers';
import { tooltip } from '../../ui/helpers';

import numbro from 'numbro';
import * as api from '../../utils/api';
import timing, { wait } from '../../utils/timing';

interface GroupAction {
	applyForGroup?: true;
	openEditModal?: true;
	kickMember?: { identityId: string };
	banIdentity?: { identityId: string };
	unbanIdentity?: { identityId: string };
	leaveGroup?: true;
	transferGroupOwnership?: true;
	resolveJoinRequest?: { identityId: string; resolution: boolean };
	openCreateInviteModal?: true;
}

export class GroupActionEvent extends Event {
	constructor(public action: GroupAction) {
		super('event');
	}
}

// The group actions are BOTH in this element and in the `renderMobile` section of the group page element
@customElement('group-sidebar')
export default class GroupSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: Array })
	members: api.group.GroupMember[] = [];

	@property({ type: Array })
	joinRequests: api.group.GroupJoinRequest[] = [];

	@property({ type: Boolean, attribute: 'do-offline-members' })
	doOfflineMembers = false;

	@property({ type: Array })
	bannedIdentities: api.group.GroupBannedIdentity[] = [];

	connectedCallback() {
		super.connectedCallback();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// TODO: The members list changes order then quickly reorders itself whenever the members property is
		// set. This is because it is unordered when set, the element renders, then it is re-ordered and
		// rendered again
		if (this.profile && (changedProperties.has('members') || changedProperties.has('profile'))) {
			if (this.doOfflineMembers) {
				// Sort by owner/admin, offline status, and alphabet
				this.members.sort((a, b) => {
					let isOwnerA = +(a.identity.identityId == this.profile.ownerIdentityId);
					let isntOfflineA = +(a.identity.presence.status != api.identity.IdentityStatus.OFFLINE);
					let isOwnerB = +(b.identity.identityId == this.profile.ownerIdentityId);
					let isntOfflineB = +(b.identity.presence.status != api.identity.IdentityStatus.OFFLINE);

					return isOwnerA == isOwnerB
						? isntOfflineB == isntOfflineA
							? a.identity.displayName.localeCompare(b.identity.displayName)
							: isntOfflineB - isntOfflineA
						: isOwnerB - isOwnerA;
				});
			} else {
				// Sort by owner/admin and alphabet
				this.members.sort((a, b) => {
					let isOwnerA = +(a.identity.identityId == this.profile.ownerIdentityId);
					let isOwnerB = +(b.identity.identityId == this.profile.ownerIdentityId);

					return isOwnerA == isOwnerB
						? a.identity.displayName.localeCompare(b.identity.displayName)
						: isOwnerB - isOwnerA;
				});
			}
		}
	}

	async applyForGroup() {
		this.dispatchEvent(new GroupActionEvent({ applyForGroup: true }));

		// Artificial wait time to disable the button
		await wait(timing.seconds(3));
	}

	openEditModal() {
		this.dispatchEvent(new GroupActionEvent({ openEditModal: true }));
	}

	leaveGroup() {
		this.dispatchEvent(new GroupActionEvent({ leaveGroup: true }));
	}

	resolveJoinRequest(identityId: string, resolution = false) {
		this.dispatchEvent(new GroupActionEvent({ resolveJoinRequest: { identityId, resolution } }));
	}

	transferGroupOwnership() {
		this.dispatchEvent(new GroupActionEvent({ transferGroupOwnership: true }));
	}

	openCreateInviteModal() {
		this.dispatchEvent(new GroupActionEvent({ openCreateInviteModal: true }));
	}

	kickMember(identityId: string) {
		this.dispatchEvent(new GroupActionEvent({ kickMember: { identityId } }));
	}

	banIdentity(identityId: string) {
		this.dispatchEvent(new GroupActionEvent({ banIdentity: { identityId } }));
	}

	unbanIdentity(identityId: string) {
		this.dispatchEvent(new GroupActionEvent({ unbanIdentity: { identityId } }));
	}

	render() {
		let isOwner = this.profile
			? global.currentIdentity.identityId == this.profile.ownerIdentityId
			: false;

		let actions = this.renderActions(isOwner);

		return html`<div id="base">
			<slot name="extras-top"></slot>

			<!-- Actions -->
			${this.profile && actions.length
				? html`<info-panel-body id="actions" noindent>${actions}</info-panel-body>`
				: null}

			<!-- Events -->
			<!-- <info-panel-header>
				<div slot="title">Events</div>
			</info-panel-header>

			<info-panel-body>
				<p class="muted">No events</p>
			</info-panel-body> -->

			<!-- Join Requests -->
			${this.renderJoinRequests(isOwner)}

			<!-- Members -->
			<info-panel-header>
				<div slot="title">
					<span id="member-count"
						>${this.profile ? numbro(this.profile.memberCount).format('0,0') : null}</span
					>
					${this.profile && this.profile.memberCount == 1 ? 'Member' : 'Members'}
				</div>
			</info-panel-header>

			<info-panel-body id="members">
				${this.members.length
					? html`<div>
							${repeat(
								this.members,
								m => m.identity.identityId,
								m => this.renderMember(m, isOwner)
							)}
					  </div>`
					: html`<p class="muted">Loading...</p>`}
			</info-panel-body>

			<!-- Bans -->
			${isOwner ? this.renderBans() : null}

			<slot name="extras-bottom"></slot>
		</div>`;
	}

	renderActions(isOwner: boolean) {
		if (!this.profile) return [];

		let groupId = this.profile.groupId;

		let actions = [];

		if (!this.profile.isCurrentIdentityMember) {
			if (this.profile.publicity == api.portal.GroupPublicity.OPEN) {
				if (this.profile.isCurrentIdentityRequestingJoin) {
					actions.push(
						html`<stylized-button id="apply-button" disabled
							>Application pending</stylized-button
						>`
					);
				} else {
					actions.push(
						html`<stylized-button id="apply-button" .trigger=${this.applyForGroup.bind(this)}
							>Apply</stylized-button
						>`
					);
				}
			} else {
				actions.push(
					html`<stylized-button id="apply-button" disabled>Applications closed</stylized-button>`
				);
			}
		} else {
			actions.push(
				html`<stylized-button .trigger=${this.openCreateInviteModal.bind(this)}
					>Create invite</stylized-button
				>`
			);

			// if (this.profile.isDeveloper) {
			// 	actions.push(html`<stylized-button
			// 		href=${routes.groupBilling.build({
			// 			groupId: groupId
			// 		})}
			// 		>View billing</stylized-button
			// 	>`);
			// }

			if (!isOwner) {
				actions.push(
					html`<stylized-button
						id="leave-button"
						color="#d93636"
						.trigger=${this.leaveGroup.bind(this)}
						>Leave group</stylized-button
					>`
				);
			}
		}

		if (isOwner) {
			actions.push(
				html`<stylized-button .trigger=${this.openEditModal.bind(this)}>Edit group</stylized-button>`
			);
			actions.push(
				html`<stylized-button
					id="transfer-ownership"
					.trigger=${this.transferGroupOwnership.bind(this)}
					>Transfer ownership</stylized-button
				>`
			);
		}

		return actions;
	}

	renderJoinRequests(isOwner: boolean) {
		if (!isOwner) return null;
		if (!this.joinRequests.length) return null;

		return html`
			<info-panel-header>
				<div slot="title">
					${numbro(this.profile ? this.joinRequests.length : 0).format('0,0')} Join
					Request${this.joinRequests.length == 1 ? '' : 's'}
				</div>
			</info-panel-header>

			<info-panel-body id="join-requests">
				${repeat(
					this.profile ? this.joinRequests : [],
					jr => jr.identity.identityId,
					jr =>
						html`<identity-tile
							.identity=${jr.identity}
							no-context-menu
							@contextmenu=${showJoinRequestContextMenu({
								identity: jr.identity,
								groupId: this.profile.groupId
							})}
						>
							<div slot="right" class="join-request-actions">
								<icon-button
									custom
									src="solid/check"
									.trigger=${this.resolveJoinRequest.bind(
										this,
										jr.identity.identityId,
										true
									)}
								></icon-button>
								<icon-button
									custom
									src="solid/xmark"
									.trigger=${this.resolveJoinRequest.bind(
										this,
										jr.identity.identityId,
										false
									)}
								></icon-button>
							</div>
						</identity-tile>`
				)}
			</info-panel-body>
		`;
	}

	renderBans() {
		if (!this.bannedIdentities.length) return null;

		return html`
			<info-panel-header>
				<div slot="title">
					${numbro(this.bannedIdentities.length).format('0,0')}
					Ban${this.bannedIdentities.length == 1 ? '' : 's'}
				</div>
			</info-panel-header>

			<info-panel-body id="bans">
				${repeat(
					this.bannedIdentities,
					ban => ban.identity.identityId,
					ban =>
						html`<identity-tile
							.identity=${ban.identity}
							no-context-menu
							@contextmenu=${showBannedIdentityContextMenu({
								identity: ban.identity,
								groupId: this.profile.groupId
							})}
						>
							<div slot="right" class="ban-actions">
								<icon-button
									custom
									src="solid/rotate-left"
									@mouseenter=${tooltip('Unban')}
									.trigger=${this.unbanIdentity.bind(this, ban.identity.identityId)}
								></icon-button>
							</div>
						</identity-tile>`
				)}
			</info-panel-body>
		`;
	}

	renderMember(member: api.group.GroupMember, selfIsOwner: boolean) {
		let isOwner = this.profile ? member.identity.identityId == this.profile.ownerIdentityId : false;
		let isAdmin = false;

		return html` <identity-tile
			.identity=${member.identity}
			.offlineOpacity=${this.doOfflineMembers}
			no-context-menu
			@contextmenu=${showGroupMemberContextMenu({
				identity: member.identity,
				groupId: this.profile.groupId,
				selfIsOwner
			})}
		>
			<div slot="right">
				${isOwner
					? html`<e-svg class="owner" src="solid/crown" @mouseenter=${tooltip('Owner')}></e-svg>`
					: isAdmin
					? html`<e-svg
							class="admin"
							src="solid/chevrons-up"
							@mouseenter=${tooltip('Admin')}
					  ></e-svg>`
					: null}
			</div>
		</identity-tile>`;
	}
}
