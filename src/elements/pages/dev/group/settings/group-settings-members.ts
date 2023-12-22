import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import group from '@rivet-gg/group';
import global from '../../../../../utils/global';
import * as api from '../../../../../utils/api';
import styles from './group-settings-members.scss';
import routes, { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import { map } from 'lit/directives/map.js';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';
import timing from '../../../../../utils/timing';
import { repeat } from 'lit/directives/repeat.js';
import { showAlert, showBannedIdentityContextMenu, tooltip } from '../../../../../ui/helpers';
import { DropDownSelectEvent, DropDownSelection } from '../../../../dev/drop-down-list';
import utils from '../../../../../utils/utils';
import { InputUpdateEvent } from '../../../../dev/text-input';
import clsx from 'clsx';
import { IdentityHandle } from '@rivet-gg/identity';
import { RepeatingRequest } from '../../../../../utils/repeating-request';

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

interface GroupAction {
	applyForGroup?: true;
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

@customElement('page-group-settings-members')
export default class GroupSettingsMembers extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: group.GroupProfile;

	@property({ type: Object })
	loadError?: any;

	// === MEMBER PROPERTIES ===
	@property({ type: Array })
	groupMembers: group.GroupMember[] = null;

	@property({ type: Array })
	joinRequests: api.group.GroupJoinRequest[] = [];

	@property({ type: Array })
	bannedIdentities: api.group.GroupBannedIdentity[] = [];

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

	groupBansStream?: RepeatingRequest<api.group.GetGroupBansCommandOutput>;
	joinRequestsStream?: RepeatingRequest<api.group.GetGroupJoinRequestsCommandOutput>;
	membersStream?: RepeatingRequest<api.group.GetGroupMembersCommandOutput> = null;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('group')) {
			this.resetData();
			this.fetchBans();
			this.fetchMembers();
			this.fetchJoinRequests();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		if (this.membersStream) this.membersStream.cancel();
		if (this.joinRequestsStream) this.joinRequestsStream.cancel();
		if (this.groupBansStream) this.groupBansStream.cancel();
	}

	async applyForGroup() {
		try {
			await global.deprecatedApi.group.createGroupJoinRequest({ groupId: this.group.groupId });
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

	async leaveGroup() {
		// Ask if should leave group
		showAlert(`Are you sure you want to leave ${this.group.displayName}?`, undefined, [
			{ label: 'Stay' },
			{
				label: 'Leave',
				destructive: true,
				cb: async () => {
					// Leave group
					await global.deprecatedApi.group.leaveGroup({ groupId: this.group.groupId });
				}
			}
		]);
	}

	async resolveJoinRequest(identityId: string, resolution: boolean) {
		try {
			await global.deprecatedApi.group.resolveGroupJoinRequest({
				groupId: this.group.groupId,
				identityId,
				resolution
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async transferGroupOwnership(transferIdent: IdentityHandle) {
		try {
			await global.deprecatedApi.group.transferGroupOwnership({
				groupId: this.group.groupId,
				newOwnerIdentityId: transferIdent.identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async createGroupInvite() {
		try {
			let res = await global.deprecatedApi.group.createGroupInvite({
				groupId: this.group.groupId,
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
			await global.deprecatedApi.group.kickGroupMember({
				groupId: this.group.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async banIdentity(identityId: string) {
		try {
			await global.deprecatedApi.group.banGroupIdentity({
				groupId: this.group.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	async unbanIdentity(identityId: string) {
		try {
			await global.deprecatedApi.group.unbanGroupIdentity({
				groupId: this.group.groupId,
				identityId
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	renderCreateInviteModal() {
		if (!this.group) return null;

		return html`<drop-down-modal
			id="create-invite-modal"
			?active=${this.createInviteModalActive}
			@close=${this.createInviteModalClose.bind(this)}
		>
			<modal-body slot="body">
				${this.createInviteState == CreateInviteState.Create
					? html`<h4 class="pb-2 text-2xl font-bold">Create Group Invite</h4>
							<div id="inputs">
								<div class="input-group">
									<h4 class="font-bold text-md pb-1">Expiration Time</h4>
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
								<div class="input-group pb-4">
									<h4 class="font-bold text-md pt-2 pb-1">
										Max Use Count (0 for infinite)
									</h4>
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
					: html`<h4 class="text-2xl font-bold pb-2">Group Invite Code</h4>
							<div id="result">
								<h4 class="text-center text-lg font-semibold my-auto">${this.inviteCode}</h4>
								<div
									id="invite-link-area"
									class="flex flex-row align-middle space-x-2 pt-3 pb-2 relative"
								>
									<a
										class="link my-auto text-main-accent"
										id="invite-link"
										href=${routes.groupInvite.build({ code: this.inviteCode })}
										>${routes.groupInvite.build({ code: this.inviteCode })}</a
									>
									<icon-button
										id="copy-button"
										class="pb-1"
										color=${'#252525'}
										highlight-color=${'#18181b'}
										src="solid/copy"
										.trigger=${this.copyInviteCode.bind(this)}
									></icon-button>

									${this.inviteCodeCopyResult
										? html`<div id="copy-result" class="absolute -right-2.5 -bottom-2">
												${this.inviteCodeCopyResult}
										  </div>`
										: null}
								</div>
							</div>
							<p class="pt-1 pb-4">
								Share this code or link to allow people to join your group.
							</p>
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

	onActionEvent(event: GroupActionEvent) {
		let action = event.action;

		if (action.applyForGroup) this.applyForGroup();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.banIdentity) this.banIdentity(action.banIdentity.identityId);
		else if (action.unbanIdentity) this.unbanIdentity(action.unbanIdentity.identityId);
		else if (action.leaveGroup) this.leaveGroup();
		else if (action.resolveJoinRequest) {
			this.resolveJoinRequest(
				action.resolveJoinRequest.identityId,
				action.resolveJoinRequest.resolution
			);
		} else if (action.openCreateInviteModal) this.openCreateInviteModal();
	}

	fetchMembers() {
		if (!this.group) this.groupMembers = [];

		if (this.membersStream) this.membersStream.cancel();
		this.membersStream = new RepeatingRequest(
			'GroupSettingsMembers.membersStream',
			async (abortSignal, watchIndex) => {
				return await global.deprecatedApi.group.getGroupMembers(
					{ groupId: this.group.groupId, count: 32, watchIndex },
					{ abortSignal }
				);
			}
		);

		this.membersStream.onMessage(res => {
			this.groupMembers = res.members.sort((a, b) =>
				a.identity.displayName.localeCompare(b.identity.displayName)
			);
		});

		this.membersStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	async fetchBans() {
		if (this.groupBansStream) this.groupBansStream.cancel();

		if (global.currentIdentity.identityId != this.group.ownerIdentityId) return;
		this.groupBansStream = new RepeatingRequest(
			'GroupSettingsMembers.groupBansStream',
			async (abortSignal, watchIndex) => {
				return await global.deprecatedApi.group.getGroupBans(
					{
						groupId: this.group.groupId,
						watchIndex
					},
					{ abortSignal }
				);
			}
		);

		this.groupBansStream.onMessage(res => {
			this.bannedIdentities = res.bannedIdentities;
		});

		this.groupBansStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	fetchJoinRequests() {
		if (this.joinRequestsStream) this.joinRequestsStream.cancel();

		if (global.currentIdentity.identityId != this.group.ownerIdentityId) return;
		this.joinRequestsStream = new RepeatingRequest(
			'GroupSettingsMembers.joinRequestsStream',
			async (abortSignal, watchIndex) => {
				return await global.deprecatedApi.group.getGroupJoinRequests(
					{ groupId: this.group.groupId, watchIndex },
					{ abortSignal }
				);
			}
		);

		this.joinRequestsStream.onMessage(res => {
			this.joinRequests = res.joinRequests;
		});

		this.joinRequestsStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	resetData() {
		this.loadError = null;
		this.groupMembers = null;
		this.joinRequests.length = 0;
		this.bannedIdentities.length = 0;
		this.requestUpdate();
	}

	resetBans() {
		this.bannedIdentities.length = 0;
	}

	resetJoinRequests() {
		this.joinRequests.length = 0;
	}

	renderActions(isOwner: boolean): TemplateResult {
		let actions = [];

		if (this.group.isCurrentIdentityMember) {
			actions.push(
				html`<stylized-button .trigger=${this.openCreateInviteModal.bind(this)}
					>Create invite</stylized-button
				>`
			);
			if (!isOwner) {
				actions.push(
					html`<stylized-button color="#d93636" .trigger=${this.leaveGroup.bind(this)}
						>Leave Group</stylized-button
					>`
				);
			}
		}

		return html`
			<div class="flex flex-col space-y-2 md:border-l-2 border-context-menu px-2 pl-8 ml-2">
				${actions.map(action => html` <div class="action mx-auto w-full">${action}</div> `)}
			</div>
		`;
	}

	renderBans(isOwner: boolean) {
		if (!isOwner) return null;

		return html`
			<h1 class="text-2xl pb-2 pt-4 mt-4 border-t-2 border-context-menu">Banned Users</h1>

			<div id="bans w-80">
				${this.bannedIdentities.length
					? repeat(
							this.bannedIdentities,
							ban => ban.identity.identityId,
							ban =>
								html`<identity-tile
									.identity=${ban.identity}
									no-context-menu
									@contextmenu=${showBannedIdentityContextMenu({
										identity: ban.identity,
										groupId: this.group.groupId
									})}
								>
									<div slot="right" class="ban-actions">
										<e-svg
											class="w-5 h-5"
											src="solid/rotate-left"
											@mouseenter=${tooltip('Unban')}
											@click=${this.unbanIdentity.bind(this, ban.identity.identityId)}
										></e-svg>
									</div>
								</identity-tile>`
					  )
					: html`<p class="text-md text-muted-text">No banned users.</p>`}
			</div>
		`;
	}

	confirmBanModal(ident: IdentityHandle) {
		showAlert(
			'Confirm Ban',
			html`
				<div>
					<h4 class="text-lg">Banning User: <strong>${ident.displayName}</strong></h4>
					<h4 class="text-lg">From Group: <strong>${this.group.displayName}</strong></h4>
				</div>
			`,
			[
				{ label: 'Cancel', destructive: true },
				{
					label: 'Confirm',
					color: 'green',
					cb: () => {
						this.banIdentity(ident.identityId);
					}
				}
			]
		);
	}

	transferOwnershipModal(ident: IdentityHandle) {
		showAlert(
			'Transfer Ownership',
			html`
				<div>
					<p class="content">
						Are you sure you want to transfer ownership of group
						<span id="group-transfer-name"
							><strong class="text-md">${this.group.displayName}</strong></span
						>? This action <b>CANNOT</b> be undone.
						${this.group.isDeveloper
							? html`<br /><br /><b
										>As a developer group, transferring ownership will cause all billing
										related emails to be sent to the new owner. Your bank account
										information will stay attached to the group unless removed by a Rivet
										employee.</b
									><br />Contact
									<a class="link" href="https://rivet.gg/support" target="_blank"
										>Support</a
									>
									for more info.<br />`
							: null}
					</p>
					<p class="text-md pt-4">New Owner: <strong>${ident.displayName}</strong></p>
				</div>
			`,
			[
				{ label: 'Cancel', destructive: true },
				{
					label: 'Confirm',
					color: 'green',
					cb: () => {
						this.transferGroupOwnership(ident);
					}
				}
			]
		);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (!this.group) return this.renderPlaceholder();

		let isOwner = this.group ? global.currentIdentity.identityId === this.group.ownerIdentityId : false;

		return html`
			<div class="w-full flex flex-col md:flex-row place-content-between">
				<div class="w-3/4">
					${this.groupMembers
						? html`
								<div>
									<h3 class="text-2xl pb-2">Group Members</h3>
									<ol class="flex flex-col pb-4e">
										${map(this.groupMembers, member => {
											let ident = member.identity;
											return html`
												<!-- ${ident.identityId !== this.group.ownerIdentityId
													? html`<div
															class="my-1 py-px border-t-[1px] border-context-menu "
													  ></div>`
													: null} -->
												<li
													class=${clsx(
														'group px-2 rounded-xl flex flex-row place-content-between space-x-3 py-3 ',
														ident.identityId === this.group.ownerIdentityId
															? 'order-[-100]'
															: '',
														this.group.ownerIdentityId ===
															global.currentIdentity.identityId &&
															ident.identityId !==
																global.currentIdentity.identityId
															? 'hover:bg-raised-bg'
															: ''
													)}
												>
													<div class="flex flex-row">
														${ident.identityId == this.group.ownerIdentityId
															? html`<div class="my-auto pb-1">
																	<e-svg
																		class="owner"
																		src="solid/crown"
																		@mouseenter=${tooltip('Owner')}
																	></e-svg>
															  </div>`
															: html`<div class="my-auto pb-1">
																	<e-svg
																		src="solid/user"
																		@mouseenter=${tooltip('Member')}
																	></e-svg>
															  </div>`}
														<identity-avatar
															class="block w-10 h-10 pl-2 my-auto"
															.identity=${ident}
														>
														</identity-avatar>
														<h4 class="my-auto pl-4">${ident.displayName}</h4>
													</div>
													${isOwner &&
													ident.identityId !== global.currentIdentity.identityId &&
													ident.identityId !== this.group.ownerIdentityId
														? html`
																<div
																	class="invisible group-hover:visible my-auto pr-1"
																>
																	<e-svg
																		class="ban w-5 h-5"
																		src="solid/xmark"
																		@mouseenter=${tooltip('Ban')}
																		@click=${this.confirmBanModal.bind(
																			this,
																			ident
																		)}
																	></e-svg>
																	${ident.isRegistered
																		? html`
																				<e-svg
																					class="pl-1 w-5 h-5"
																					src="solid/arrow-right"
																					@mouseenter=${tooltip(
																						'Transfer Ownership'
																					)}
																					@click=${this.transferOwnershipModal.bind(
																						this,
																						ident
																					)}
																				></e-svg>
																		  `
																		: null}
																</div>
														  `
														: null}
												</li>
											`;
										})}
									</ol>
								</div>
						  `
						: html` <h3>Loading...</h3> `}
				</div>

				${this.renderActions(isOwner)}
			</div>
			${this.renderCreateInviteModal()}
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-right"><loading-placeholder></loading-placeholder></div>
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder><loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder id="placeholder-summary"></loading-placeholder>
			<loading-placeholder id="placeholder-table-header"></loading-placeholder>
			<loading-placeholder id="placeholder-table-row"></loading-placeholder>
		</div>`;
	}
}
