import { customElement, property, query } from 'lit/decorators.js';
import { html, LitElement, PropertyValues } from 'lit';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './group.scss';
import routes, { responses } from '../../routes';
import global from '../../utils/global';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import { showAlert } from '../../ui/helpers';
import UIRouter from '../root/ui-router';

import { groupRouteData } from '../../data/group';
import assets from '../../data/assets';
import * as api from '../../utils/api';

import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { GroupActionEvent } from '../group/group-sidebar';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';
import timing from '../../utils/timing';
import utils from '../../utils/utils';
import { InputUpdateEvent } from '../dev/text-input';
import { ls } from '../../utils/cache';
import { ColorExtractor } from '../../utils/colors';
import { Orientation } from '../common/overlay-positioning';

enum CreateInviteState {
	Create,
	Result
}

const INVITE_TTL_SELECTION: DropDownSelection<number>[] = [
	{
		label: '1 Hour',
		value: timing.hours(1)
	},
	{
		label: '1 Day',
		value: timing.days(1)
	},
	{
		label: '1 Week',
		value: timing.days(7)
	},
	{
		label: '1 Month',
		value: timing.days(30)
	},
	{
		label: 'Never',
		value: 0
	}
];

@customElement('page-group')
export default class GroupPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: Array })
	bannedIdentities: api.group.GroupBannedIdentity[] = [];

	@property({ type: Array })
	members: api.group.GroupMember[] = [];

	@property({ type: Array })
	joinRequests: api.group.GroupJoinRequest[] = [];

	@property({ type: String })
	gameNameId?: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Boolean })
	editModalActive = false;

	// === TRANSFER COMPONENTS ===
	@property({ type: Boolean })
	transferModalActive = false;

	@property({ type: String })
	transferIdentityId: string = null;

	// === INVITE COMPONENTS ===
	@property({ type: Boolean })
	createInviteModalActive = false;

	@property({ type: Number })
	createInviteState: number = CreateInviteState.Create;

	@property({ type: Object })
	createInviteTTLSelection: DropDownSelection<number> = INVITE_TTL_SELECTION[1];

	@property({ type: Number })
	createInviteUseCountValue = 0;

	@property({ type: String })
	inviteCode: string = null;

	@property({ type: String })
	inviteCodeCopyResult = '';

	@query('#result')
	inviteCodeCopyResultElement: HTMLElement;

	inviteCodeCopyResultTimeout: number = null;

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;
	groupBansStream?: api.RepeatingRequest<api.group.GetGroupBansCommandOutput>;
	membersStream?: api.RepeatingRequest<api.group.GetGroupMembersCommandOutput>;
	joinRequestsStream?: api.RepeatingRequest<api.group.GetGroupJoinRequestsCommandOutput>;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);

		if (this.groupStream) this.groupStream.cancel();
		if (this.membersStream) this.membersStream.cancel();
		if (this.joinRequestsStream) this.joinRequestsStream.cancel();
		if (this.groupBansStream) this.groupBansStream.cancel();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if category set
		if (changedProperties.has('groupId')) {
			this.resetGroupData();
			this.fetchGroup();
		}
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		this.colorExtractor.reset();
		this.members.length = 0;
		this.joinRequests.length = 0;
		this.bannedIdentities.length = 0;
	}

	async fetchGroup() {
		let firstFetch = !this.profile;

		if (this.groupStream) this.groupStream.cancel();
		this.groupStream = await GroupProfileCache.watch(this.groupId, res => {
			let firstFetch = !this.profile;

			this.profile = res.group;

			// Fetch after fetching the group because we must check if the current user is
			// the owner or not
			if (firstFetch) this.fetchJoinRequests();
			if (firstFetch) this.fetchColor();
			if (firstFetch) this.fetchBans();

			// Update the title
			UIRouter.shared.updateTitle(this.profile.displayName);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});

		if (firstFetch) this.fetchMembers();
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

			// TODO: Race condition with profile endpoint
			// // Sort by owner/admin and alphabet
			// this.members.sort((a, b) => {
			// 	let isOwnerA = +(a.identity.identityId == this.profile.ownerIdentityId);
			// 	let isOwnerB = +(b.identity.identityId == this.profile.ownerIdentityId);

			// 	return isOwnerA == isOwnerB
			// 		? a.identity.displayName.localeCompare(b.identity.displayName)
			// 		: isOwnerB - isOwnerA;
			// });
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

	async fetchBans() {
		if (this.groupBansStream) this.groupBansStream.cancel();

		if (global.currentIdentity.identityId != this.profile.ownerIdentityId) return;
		this.groupBansStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
			return await global.live.group.getGroupBans(
				{
					groupId: this.groupId,
					watchIndex
				},
				{ abortSignal }
			);
		});

		this.groupBansStream.onMessage(res => {
			this.bannedIdentities = res.bannedIdentities;
		});

		this.groupBansStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	async leaveGroup() {
		// Ask if should leave group
		showAlert(`Are you sure you want to leave ${this.profile.displayName}?`, undefined, [
			{ label: 'Stay' },
			{
				label: 'Leave',
				destructive: true,
				cb: async () => {
					// Leave group
					await global.live.group.leaveGroup({ groupId: this.profile.groupId });
				}
			}
		]);
	}

	async applyForGroup() {
		try {
			await global.live.group.createGroupJoinRequest({ groupId: this.profile.groupId });
		} catch (err) {
			if (err.code == 'GROUP_MEMBER_BANNED') {
				showAlert(
					'Banned from Group',
					html`You have been banned from this group and cannot apply to join.`
				);
			} else {
				this.loadError = err;
			}
		}
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

	async transferGroupOwnership() {
		try {
			await global.live.group.transferGroupOwnership({
				groupId: this.profile.groupId,
				newOwnerIdentityId: this.transferIdentityId
			});
		} catch (err) {
			this.loadError = err;
		}

		this.transferModalClose();
	}

	async createGroupInvite() {
		try {
			let res = await global.live.group.createGroupInvite({
				groupId: this.profile.groupId,
				ttl: this.createInviteTTLSelection.value > 0 ? this.createInviteTTLSelection.value : null,
				useCount: this.createInviteUseCountValue > 0 ? this.createInviteUseCountValue : null
			});

			this.createInviteState = CreateInviteState.Result;
			this.inviteCode = res.code;
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

		if (action.applyForGroup) this.applyForGroup();
		else if (action.openEditModal) this.openEditModal();
		else if (action.inviteToParty) this.inviteToParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.banIdentity) this.banIdentity(action.banIdentity.identityId);
		else if (action.unbanIdentity) this.unbanIdentity(action.unbanIdentity.identityId);
		else if (action.leaveGroup) this.leaveGroup();
		else if (action.resolveJoinRequest) {
			this.resolveJoinRequest(
				action.resolveJoinRequest.identityId,
				action.resolveJoinRequest.resolution
			);
		} else if (action.transferGroupOwnership) this.openTransferModal();
		else if (action.openCreateInviteModal) this.openCreateInviteModal();
	}

	changeTransferIdentitySelection(event: DropDownSelectEvent<string>) {
		this.transferIdentityId = event.selection.value;
	}

	fetchColor() {
		this.colorExtractor.update(this.profile.avatarUrl);
		this.colorExtractor.getPalette().then(() => this.requestUpdate('colorExtractor'));
	}

	onMobile() {
		this.requestUpdate();
	}

	openEditModal() {
		this.editModalActive = true;
	}

	editModalClose() {
		this.editModalActive = false;
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		let isOwner = this.profile
			? global.currentIdentity.identityId == this.profile.ownerIdentityId
			: false;

		return global.isMobile
			? this.renderMobile(profileNotFound, isOwner)
			: this.renderDesktop(profileNotFound, isOwner);
	}

	renderDesktop(profileNotFound: boolean, isOwner: boolean) {
		let bgUrl = assets.asset('/profile-bg/02. Egg Sour.png');
		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			color: this.colorExtractor.createTextColor()
		});

		return html`
			<profile-layout>
				<div id="banner-bg" slot="banner-bg" style=${bgStyles}>
					${when(
						this.profile ? !this.profile.avatarUrl : false,
						() => html`<lazy-img src=${bgUrl}></lazy-img>`
					)}
				</div>

				<div id="banner-center" slot="banner-center">
					${this.buildBackButton()}
					${this.profile ? html`<group-avatar shadow .group=${this.profile}></group-avatar>` : null}
					<div id="main-display-name" style=${nameStyles}>
						${this.profile
							? this.profile.displayName
							: profileNotFound
							? 'Group not found'
							: null}
					</div>
				</div>

				${when(
					this.profile,
					() => html`<group-sidebar
						slot="sidebar"
						.profile=${this.profile}
						.bannedIdentities=${this.bannedIdentities}
						.members=${this.members}
						.joinRequests=${this.joinRequests}
						@event=${this.onActionEvent.bind(this)}
					></group-sidebar>`
				)}
			</profile-layout>

			<!-- TODO: -->
			<!-- ${this.profile && this.gameNameId
				? html`<expanded-game-stats .group=${this.profile} .game=${null}></expanded-game-stats>`
				: null} -->

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<group-profile-edit
					slot="body"
					.profile=${this.profile}
					@close=${this.editModalClose.bind(this)}
				></group-profile-edit>
			</drop-down-modal>

			${this.renderTransferGroupOwnershipModal()}${this.renderCreateInviteModal()}
		`;
	}

	renderMobile(profileNotFound: boolean, isOwner: boolean) {
		let bgUrl = assets.asset('/profile-bg/02. Egg Sour.png');
		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			color: this.colorExtractor.createTextColor()
		});
		return html`
			<!-- Profile info and actions -->
			<div id="banner">
				<div id="banner-bg" slot="banner-bg" style=${bgStyles}>
					${when(
						this.profile ? !this.profile.avatarUrl : false,
						() => html`<lazy-img src=${bgUrl}></lazy-img>`
					)}
				</div>

				<div id="banner-center">
					${this.profile ? html`<group-avatar shadow .group=${this.profile}></group-avatar>` : null}
					<div id="main-display-name" style=${nameStyles}>
						${this.profile
							? this.profile.displayName
							: profileNotFound
							? 'Group not found'
							: null}
					</div>
				</div>
			</div>

			<div id="body">
				<!-- Actions -->
				<info-group-body id="group-actions">
					${this.profile
						? !this.profile.isCurrentIdentityMember
							? this.profile.publicity == api.group.GroupPublicity.OPEN
								? this.profile.isCurrentIdentityRequestingJoin
									? html`<rvt-button id="apply-button" small disabled
											>Application pending</rvt-button
									  >`
									: html`<rvt-button
											id="apply-button"
											small
											.trigger=${this.applyForGroup.bind(this)}
											>Apply</rvt-button
									  >`
								: html`<rvt-button id="apply-button" small disabled
										>Applications closed</rvt-button
								  >`
							: html` <rvt-button
										icon="regular/identity"
										small
										href="${routes.groupMembers.build(groupRouteData(this.profile))}"
									>
										View members
									</rvt-button>
									${this.profile.isCurrentIdentityMember
										? html`<rvt-button
												small
												.trigger=${this.openCreateInviteModal.bind(this)}
												>Create invite</rvt-button
										  >`
										: null}
									${isOwner
										? html`<rvt-button small .trigger=${this.openEditModal.bind(this)}
													>Edit group</rvt-button
												><rvt-button
													id="transfer-ownership"
													small
													.trigger=${this.openTransferModal.bind(this)}
													>Transfer ownership</rvt-button
												>`
										: this.profile.isCurrentIdentityMember
										? html` <rvt-button
												id="leave-button"
												small
												color="#d93636"
												.trigger=${this.leaveGroup.bind(this)}
												>Leave group</rvt-button
										  >`
										: null}`
						: null}
				</info-group-body>

				<!-- Events -->
				<!-- <info-panel-header>
					<div slot="title">Events</div>
				</info-panel-header>

				<info-panel-body>
					<p class="muted">No events</p>
				</info-panel-body> -->

				<!-- Join Requests -->
				<!-- TODO: Mobile -->
			</div>

			<!-- TODO: -->
			${this.profile && this.gameNameId
				? html`<expanded-game-stats .group=${this.profile} .game=${null}></expanded-game-stats>`
				: null}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<group-profile-edit
					slot="body"
					.profile=${this.profile}
					@close=${this.editModalClose.bind(this)}
				></group-profile-edit>
			</drop-down-modal>

			${this.renderTransferGroupOwnershipModal()}${this.renderCreateInviteModal()}
		`;
	}

	// TODO: Make this work with the paginated members endpoint
	renderTransferGroupOwnershipModal() {
		if (!this.profile) return null;

		let members = Array.from(this.members).filter(
			m => m.identity.identityId != global.currentIdentity.identityId
		);
		let identityOptions = members.map(u => ({
			template: html`<identity-tile .identity=${u.identity} light hide-status no-link></identity-tile>`,
			value: u.identity.identityId
		}));

		return html`<drop-down-modal
			id="transfer-ownership-modal"
			?active=${this.transferModalActive}
			@close=${this.transferModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Transfer Ownership</h1>
				<p class="content">
					Are you sure you want to transfer ownership of group
					<span id="group-transfer-name">${this.profile.displayName}</span>? This action
					<b>CANNOT</b> be undone.
					${this.profile.isDeveloper
						? html`<br /><br /><b
									>As a developer group, transferring ownership will cause all billing
									related emails to be sent to the new owner. Your bank account information
									will stay attached to the group unless removed by a Rivet employee.</b
								><br />Contact
								<a class="link" href="https://rivet.gg/support" target="_blank">Support</a>
								for more info.<br />`
						: null}
				</p>
				<drop-down-list
					light
					fixed
					placeholder="Select Identity"
					.options=${identityOptions}
					@select=${this.changeTransferIdentitySelection.bind(this)}
				></drop-down-list>

				<rvt-button
					color="#d4393b"
					.trigger=${this.transferGroupOwnership.bind(this)}
					?disabled=${this.transferIdentityId == null}
					>Transfer</rvt-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	openTransferModal() {
		this.transferModalActive = true;
	}

	transferModalClose() {
		this.transferModalActive = false;
	}

	renderCreateInviteModal() {
		if (!this.profile) return null;

		return html`<drop-down-modal
			id="create-invite-modal"
			?active=${this.createInviteModalActive}
			@close=${this.createInviteModalClose.bind(this)}
		>
			<modal-body slot="body">
				${this.createInviteState == CreateInviteState.Create
					? html`<h1>Create Group Invite</h1>
							<div id="inputs">
								<div class="input-group">
									<h2>Expiration time</h2>
									<drop-down-list
										light
										fixed
										placeholder="Select expiration"
										.selection=${this.createInviteTTLSelection}
										.options=${INVITE_TTL_SELECTION}
										@select=${(ev: DropDownSelectEvent<number>) =>
											(this.createInviteTTLSelection = ev.selection)}
									></drop-down-list>
								</div>
								<div class="input-group">
									<h2>Maximum use count (0 for infinite)</h2>
									<text-input
										light
										number
										placeholder="Maximum uses"
										min="0"
										max="5000"
										@input=${(ev: InputUpdateEvent) =>
											(this.createInviteUseCountValue = parseInt(ev.value))}
									></text-input>
								</div>
							</div>

							<rvt-button
								.trigger=${this.createGroupInvite.bind(this)}
								?disabled=${this.createInviteTTLSelection == null ||
								this.createInviteUseCountValue == null}
								>Create</rvt-button
							>`
					: html`<h1>Group Invite Code</h1>
							<div id="result">
								<h3 id="invite-code">${this.inviteCode}</h3>
								<div id="invite-link-area">
									<a
										class="link"
										id="invite-link"
										href=${routes.groupInvite.build({ code: this.inviteCode })}
										>${routes.groupInvite.build({ code: this.inviteCode })}</a
									>
									<icon-button
										id="copy-button"
										color=${'#252525'}
										highlight-color=${'#18181b'}
										src="solid/copy"
										.trigger=${this.copyInviteCode.bind(this)}
									></icon-button>

									${this.inviteCodeCopyResult
										? html`<div id="copy-result">${this.inviteCodeCopyResult}</div>`
										: null}
								</div>
							</div>
							<p class="content">Share this code or link to allow people to join your group.</p>
							<rvt-button .trigger=${this.createInviteModalClose.bind(this)}
								>Dismiss</rvt-button
							>`}
			</modal-body>
		</drop-down-modal>`;
	}

	openCreateInviteModal() {
		this.createInviteModalActive = true;
	}

	createInviteModalClose() {
		this.createInviteModalActive = false;

		// Reset state
		setTimeout(() => (this.createInviteState = CreateInviteState.Create), 100);
	}

	copyInviteCode() {
		try {
			utils.copyText(routes.groupInvite.build({ code: this.inviteCode }));
			this.inviteCodeCopyResult = 'Copied!';
		} catch (err) {
			logging.error('Unable to copy', err);
			this.inviteCodeCopyResult = 'Failed to copy.';
		}

		// Reset result animation
		if (this.inviteCodeCopyResultElement) {
			this.inviteCodeCopyResultElement.style.display = 'none';
			this.inviteCodeCopyResultElement.offsetHeight;
			this.inviteCodeCopyResultElement.style.display = '';
		}

		// Stop animation from restarting
		window.clearTimeout(this.inviteCodeCopyResultTimeout);
		this.inviteCodeCopyResultTimeout = window.setTimeout(() => {
			this.inviteCodeCopyResult = '';
		}, 1200);
	}

	buildBackButton() {
		// If back navigation is possible, use function rather than link
		if (UIRouter.shared.canGoBack) {
			return html` <rvt-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="rgba(0, 0, 0, 0.5)"
				text="white"
			>
				Back
			</rvt-button>`;
		} else {
			return null;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
