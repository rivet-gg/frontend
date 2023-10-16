import { customElement, property, query } from 'lit/decorators.js';
import { html, LitElement, PropertyValues } from 'lit';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../../../utils/css';
import styles from './group.scss';
import routes, { responses } from '../../../../routes';
import global from '../../../../utils/global';
import cloud from '@rivet-gg/cloud';
import { globalEventGroups } from '../../../../utils/global-events';
import { showAlert } from '../../../../ui/helpers';
import UIRouter from '../../../root/ui-router';

import assets from '../../../../data/assets';
import * as api from '../../../../utils/api';

import { CloudDashboardCache, GroupProfileCache } from '../../../../data/cache';
import logging from '../../../../utils/logging';
import { DropDownSelectEvent, DropDownSelection } from '../../../dev/drop-down-list';
import timing, { Debounce } from '../../../../utils/timing';
import utils from '../../../../utils/utils';
import { InputUpdateEvent } from '../../../dev/text-input';
import { ColorExtractor } from '../../../../utils/colors';
import { repeat } from 'lit/directives/repeat.js';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../utils/traversable-errors';

enum CreateInviteState {
	Create,
	Result
}
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

	@property({ type: Array })
	games?: cloud.GameSummary[] = null;

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

	// === GAME COMPONENTS ===
	@property({ type: Boolean })
	gameModalActive = false;

	@property({ type: String })
	gameDisplayNameValue: string = null;

	@property({ type: String })
	gameNameIdValue = '';

	@property({ type: Boolean })
	isCreatingGame = false;

	@property({ type: String })
	gameValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME);

	@property({ type: Boolean })
	gameIsValid = false;

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === DEBOUNCE INFO ===
	validateGameDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGame>>;

	// === EVENT HANDLERS ===
	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;
	groupBansStream?: api.RepeatingRequest<api.group.GetGroupBansCommandOutput>;
	membersStream?: api.RepeatingRequest<api.group.GetGroupMembersCommandOutput>;
	joinRequestsStream?: api.RepeatingRequest<api.group.GetGroupJoinRequestsCommandOutput>;
	gameStream?: api.RepeatingRequest<cloud.GetGamesCommandOutput>;

	constructor() {
		super();

		this.validateGameDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.gameDisplayNameValue ?? '';
				let nameId = this.gameNameIdValue.length
					? this.gameNameIdValue
					: utils.convertStringToId(displayName);

				return await global.cloud.validateGame({
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.gameValidationErrors.load(res.errors.map(err => err.path));
				this.gameIsValid = this.gameValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('gameValidationErrors');
			}
		});
		this.validateGameDebounce.onError(async err => {
			this.loadError = err;
			this.gameIsValid = false;
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		if (this.groupStream) this.groupStream.cancel();
		if (this.gameStream) this.gameStream.cancel();
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
			this.resetGameData();
			this.fetchGames();
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

	resetGameData() {
		if (this.games) this.games.length = 0;
	}

	async fetchGames() {
		if (this.gameStream) this.gameStream.cancel();

		// Fetch events
		this.gameStream = await CloudDashboardCache.watch(data => {
			data.games.sort((a, b) => a.displayName.localeCompare(b.displayName));
			this.games = data.games.filter(a => a.developerGroupId == this.groupId);
		});

		this.gameStream.onError(err => {
			logging.error('Request error', err);

			// Only set `loadError` on initiation
			if (this.games) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
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

	onActionEvent(event: GroupActionEvent) {
		let action = event.action;

		if (action.applyForGroup) this.applyForGroup();
		else if (action.openEditModal) this.openEditModal();
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

	openEditModal() {
		this.editModalActive = true;
	}

	editModalClose() {
		this.editModalActive = false;
	}

	openGameModal(groupId: string) {
		this.gameModalActive = true;
	}

	gameModalClose() {
		this.gameModalActive = false;
	}

	gameDisplayNameInput(event: InputUpdateEvent) {
		this.gameDisplayNameValue = event.value;

		this.validateGameDebounce.trigger();
	}

	gameNameIdInput(event: InputUpdateEvent) {
		this.gameNameIdValue = event.value;

		this.validateGameDebounce.trigger();
	}

	async createGame() {
		if (!this.gameIsValid) return;

		try {
			let displayName = this.gameDisplayNameValue;
			let nameId = this.gameNameIdValue.length
				? this.gameNameIdValue
				: utils.convertStringToId(displayName);

			let res = await global.cloud.createGame({
				nameId,
				displayName,
				developerGroupId: this.profile.groupId
			});

			this.fetchGames();
			this.gameModalClose();

			// Open new game page
			UIRouter.shared.navigate(routes.devGame.build({ gameId: res.gameId }));
		} catch (err) {
			this.loadError = err;
			this.isCreatingGame = false;
		}
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		let isOwner = this.profile
			? global.currentIdentity.identityId == this.profile.ownerIdentityId
			: false;

		return this.renderDesktop(profileNotFound, isOwner);
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
			<div class="mx-auto max-w-contentwidth px-[10px] md:px-5 lg:px-0 pb-8">
				<group-banner .group=${this.profile}></group-banner>
				<div class="flex flex-row w-full space-x-8 max-md:px-4 ">
					${when(
						this.games,
						() =>
							html`<div class="games-list grid grid-cols-4 gap-4">
								<div
									id="create-game"
									class="dashed-border-button"
									@click=${this.openGameModal.bind(this, this.profile.groupId)}
								>
									<div id="create-game-content">
										<div>
											<lazy-img src=${assets.asset('/games/blank/logo.png')}></lazy-img>
											Create a new game
										</div>
									</div>
								</div>
								${repeat(
									this.games,
									g => g.gameId,
									g =>
										html`<dev-game-tile
											.game=${g}
											.group=${this.profile}
										></dev-game-tile>`
								)}
							</div>`,
						() => html``
					)}
				</div>
			</div>

			${this.renderCreateGameModal()}
		`;
	}

	renderCreateGameModal() {
		if (!this.games && !this.profile) return null;

		let displayName = this.gameDisplayNameValue;
		let displayNameErrors = this.gameValidationErrors.findFormatted('display-name');
		let nameIdErrors = this.gameValidationErrors.findFormatted('name-id');

		return html` <drop-down-modal
			id="create-game-modal"
			?active=${this.gameModalActive}
			@close=${this.gameModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1 class="text-2xl font-bold pb-4">Create your new game</h1>
				<div class="input-group px-8">
					<h2 class="text-lg font-semibold">Owner Developer Group</h2>
					<h4 class="text-md pb-2 text-center">${this.profile.displayName}</h4>
					<h2 class="font-semibold py-2">Game Display Name</h2>
					<text-input
						light
						placeholder="Enter a game name..."
						@input=${this.gameDisplayNameInput.bind(this)}
					></text-input>
					${when(
						displayNameErrors.length > 0,
						() => html`
							<span id="create-game-error" class="font-semibold text-center pt-4 text-red-500">
								${displayNameErrors[0]}</li>
							</span>`
					)}
					<h2 class="font-semibold py-2">Game Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName
							? utils.convertStringToId(displayName)
							: 'Enter a name id...'}
						@input=${this.gameNameIdInput.bind(this)}
					></text-input>
					${when(
						nameIdErrors.length > 0,
						() => html`
							<span id="create-game-error" class="font-semibold text-center pt-4 text-red-500">
								${nameIdErrors[0]}</li>
							</span>`
					)}
				</div>
				<p class="content text-center py-5 font-semibold">
					We’ll walk you though the details of editing your game later.
				</p>
				<stylized-button
					.trigger=${this.createGame.bind(this)}
					?disabled=${!this.gameIsValid}
					?loading=${this.isCreatingGame}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	// TODO: Make this work with the paginated members endpoint
	renderTransferGroupOwnershipModal() {
		if (!this.profile) return null;

		let members = Array.from(this.members).filter(
			m => m.identity.identityId != global.currentIdentity.identityId
		);
		let identityOptions = members.map(u => ({
			template: html`<identity-tile .identity=${u.identity} light no-link></identity-tile>`,
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

				<stylized-button
					color="#d4393b"
					.trigger=${this.transferGroupOwnership.bind(this)}
					?disabled=${this.transferIdentityId == null}
					>Transfer</stylized-button
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

							<stylized-button
								.trigger=${this.createGroupInvite.bind(this)}
								?disabled=${this.createInviteTTLSelection == null ||
								this.createInviteUseCountValue == null}
								>Create</stylized-button
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
							<stylized-button .trigger=${this.createInviteModalClose.bind(this)}
								>Dismiss</stylized-button
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
			return html` <stylized-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="rgba(0, 0, 0, 0.5)"
				text="white"
			>
				Back
			</stylized-button>`;
		} else {
			return null;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
