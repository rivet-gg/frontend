import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './group-chat.scss';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import { responses } from '../../routes';
import * as api from '../../utils/api';
import { ChatErrorEvent, ChatInitializationEvent } from '../common/chat-view';
import UIRouter from '../root/ui-router';
import { GroupActionEvent } from '../group/group-sidebar';
import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { ls } from '../../utils/cache';
import { showGroupMemberContextMenu } from '../../ui/helpers';
import { globalEventGroups } from '../../utils/global-events';

@customElement('page-group-chat')
export default class GroupChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Object })
	profile: api.group.GroupProfile;

	@property({ type: Array })
	members: api.group.GroupMember[] = [];

	@property({ type: Array })
	joinRequests: api.group.GroupJoinRequest[] = [];

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Boolean })
	initializedChat = false; // True when an identity has just started a new chat

	groupStream: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput> = null;
	membersStream?: api.RepeatingRequest<api.group.GetGroupMembersCommandOutput>;
	joinRequestsStream?: api.RepeatingRequest<api.group.GetGroupJoinRequestsCommandOutput>;

	async onInitialize(event: ChatInitializationEvent) {
		try {
			await global.live.chat.sendChatMessage({
				topic: { groupId: this.groupId },
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

		if (changedProperties.has('groupId') || changedProperties.has('initializedChat')) {
			if (!changedProperties.has('initializedChat')) this.isLoading = true;

			this.resetGroupData();
			this.fetchGroup();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the listener
		if (this.groupStream) this.groupStream.cancel();
		if (this.membersStream) this.membersStream.cancel();
		if (this.joinRequestsStream) this.joinRequestsStream.cancel();
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		this.members.length = 0;
		this.joinRequests.length = 0;
		this.loadError = null;
	}

	async fetchGroup() {
		// Fetch events
		if (this.groupStream) this.groupStream.cancel();
		this.groupStream = await GroupProfileCache.watch(this.groupId, res => {
			this.profile = res.group;

			// Fetch join requests after fetching the group because we must check if the current user is
			// the owner or not
			this.fetchJoinRequests();

			// Update the title
			UIRouter.shared.updateTitle(`Chat – ${this.profile.displayName}`);

			this.isLoading = false;
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);

			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});

		this.fetchMembers();
	}

	fetchMembers() {
		if (this.membersStream) this.membersStream.cancel();
		this.membersStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
			return await global.live.group.getGroupMembers(
				{ groupId: this.groupId, count: 32, watchIndex },
				{ abortSignal }
			);
		});

		this.membersStream.onMessage(res => {
			this.members = res.members;
		});

		this.membersStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	fetchJoinRequests() {
		if (this.joinRequestsStream) this.joinRequestsStream.cancel();

		if (global.currentIdentity.identityId != this.profile.ownerIdentityId) return;
		this.joinRequestsStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
			return await global.live.group.getGroupJoinRequests(
				{ groupId: this.groupId, watchIndex },
				{ abortSignal }
			);
		});

		this.joinRequestsStream.onMessage(res => {
			this.joinRequests = res.joinRequests;
		});

		this.joinRequestsStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	async resolveJoinRequest(identityId: string, resolution: boolean) {
		try {
			await global.live.group.resolveGroupJoinRequest({
				groupId: this.profile.groupId,
				identityId,
				resolution
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async kickMember(identityId: string) {
		try {
			await global.live.group.kickGroupMember({
				groupId: this.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async banIdentity(identityId: string) {
		try {
			await global.live.group.banGroupIdentity({
				groupId: this.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async unbanIdentity(identityId: string) {
		try {
			await global.live.group.unbanGroupIdentity({
				groupId: this.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
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
				topic: { groupId: this.groupId },
				messageBody: { partyInvite: { token: inviteToken } }
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	onActionEvent(event: GroupActionEvent) {
		let action = event.action;

		if (action.inviteToParty) this.inviteToParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.banIdentity) this.banIdentity(action.banIdentity.identityId);
		else if (action.unbanIdentity) this.unbanIdentity(action.unbanIdentity.identityId);
		else if (action.resolveJoinRequest) {
			this.resolveJoinRequest(
				action.resolveJoinRequest.identityId,
				action.resolveJoinRequest.resolution
			);
		} else logging.warn('Group sidebar event not hooked up', action);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<right-sidebar-layout>
					${this.renderChat()}
					<group-sidebar
						slot="sidebar"
						.profile=${this.profile}
						.members=${this.members}
						.joinRequests=${this.joinRequests}
						in-chat
						do-offline-members
						@event=${this.onActionEvent.bind(this)}
					>
						<div slot="extras-top">
							<group-handle-tile .group=${this.profile}></group-handle-tile>
						</div>
						<div slot="extras-bottom">
							<chat-preview-button></chat-preview-button>
						</div>
					</group-sidebar>
				</right-sidebar-layout>
			</div>
		`;
	}

	renderChat() {
		let threadId = this.profile?.threadId ?? null;
		let selfIsOwner = global.currentIdentity.identityId == this.profile?.ownerIdentityId;
		let contextMenu = (sender: api.identity.IdentityHandle) =>
			showGroupMemberContextMenu({
				identity: sender,
				groupId: this.groupId,
				selfIsOwner
			});

		return html`<chat-view
			slot="body"
			.threadId=${threadId}
			.empty=${!this.isLoading && !threadId}
			.identityContextMenu=${contextMenu}
			auto-focus
			@initialize=${this.onInitialize.bind(this)}
			@error=${this.onChatError.bind(this)}
		></chat-view>`;
	}
}
