import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './identity-status-controller.scss';
import {
	showActionSheet,
	showPartyMemberContextMenu,
	showIdentityContextMenu,
	tooltip
} from '../../ui/helpers';
import global from '../../utils/global';
import routes from '../../routes';
import { identityRouteData, padAccountNumber } from '../../data/identity';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { globalEventGroups, IdentityChangeEvent, PartyUpdateEvent } from '../../utils/global-events';
import TextInput from '../dev/text-input';
import timing from '../../utils/timing';
import PartyInvitePanel from '../party/invite-panel';
import assets from '../../data/assets';

@customElement('identity-status-controller')
export default class IdentityStatusController extends LitElement {
	static styles = cssify(styles);

	@query('#invite-input')
	inviteInputElement: TextInput;

	@query('party-invite-panel')
	invitePanel: PartyInvitePanel;

	@property({ type: Boolean })
	inviteModalActive = false;
	@property({ type: String })
	createdInviteToken: string = null;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
		globalEventGroups.remove('party-update', this.handlePartyUpdate);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}

	onIdentityChange() {
		this.requestUpdate();
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	async leaveParty() {
		try {
			await global.live.party.leaveParty({});
		} catch (err) {
			logging.error('Error leaving party', err);
		}
	}

	promptStatus(event: PointerEvent) {
		// Get the status selection
		showActionSheet(event.target as HTMLElement, [
			{
				type: 'action',
				label: 'Online',
				icon: 'solid/circle',
				color: 'status-online',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'online' });
				}
			},
			{
				type: 'action',
				label: 'Away',
				icon: 'solid/circle-dot',
				color: 'status-away',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'away' });
				}
			},
			{
				type: 'action',
				label: 'Offline',
				icon: 'regular/circle-dashed',
				color: 'status-offline',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'offline' });
				}
			}
		]);
	}

	async createInvite() {
		try {
			let res = await global.live.party.createPartyInvite({});

			this.createdInviteToken = res.invite.token;
		} catch (err) {
			logging.error(err);
		}
	}

	async kickMember(identityId: string) {
		try {
			await global.live.party.kickMember({ identityId });
		} catch (err) {
			logging.error(err);
		}
	}

	async transferPartyOwnership(identityId: string) {
		try {
			await global.live.party.transferPartyOwnership({ identityId });
		} catch (err) {
			logging.error(err);
		}
	}

	async openInviteModal() {
		if (!this.createdInviteToken) await this.createInvite();
		this.inviteModalActive = true;

		// Focus input
		this.updateComplete.then(async () => {
			await this.getUpdateComplete();

			this.invitePanel.focusInput();
		});
	}

	inviteModalClose() {
		this.inviteModalActive = false;
		this.createdInviteToken = null;

		// Clear after animation is complete
		setTimeout(() => {
			if (this.invitePanel) {
				this.invitePanel.clearSearch();
			}
		}, timing.milliseconds(300));
	}

	render() {
		let identity = global.currentIdentity;
		let party = global.currentParty;
		let leader = party ? party.members.find(member => member.isLeader) : null;
		let isLeader = party ? identity.identityId == leader.identity.identityId : false;

		return html`
			<div id="base">
				<div id="identity-base" @contextmenu=${showIdentityContextMenu(identity)}>
					<div id="content">
						<a id="link" href=${routes.identity.build(identityRouteData(identity))}></a>
						<!-- Avatar -->
						<identity-avatar
							.identity=${identity}
							@click=${this.promptStatus.bind(this)}
							@mouseenter=${tooltip('Change Status')}
						></identity-avatar>

						<!-- Name -->
						<div id="name">
							<identity-name .identity=${identity} no-link></identity-name>
						</div>
					</div>

					<!-- Actions -->
					<div id="actions">
						<icon-button
							src="regular/gear"
							small
							color="#ececec80"
							href=${routes.settings.build({})}
							@mouseenter=${tooltip('Settings')}
						></icon-button>
					</div>
				</div>
				${party != null
					? html` <div id="party-base">
							<div id="party-header">
								<h1>
									<a href=${routes.party.build({ id: party.partyId })}
										>${isLeader
											? 'Your'
											: html`<identity-name
														no-link
														.identity=${leader.identity}
													></identity-name
													>'s`}
										party</a
									>
								</h1>
								<div id="party-actions">
									<div id="chat-button">
										<icon-button
											src="solid/message"
											color="#ececec80"
											href=${routes.party.build({ id: party.partyId })}
											@mouseenter=${tooltip('Open Chat')}
											custom
										></icon-button>
										<!-- <div id="chat-indicator"></div> -->
									</div>
									<icon-button
										custom
										src="solid/arrow-right-from-bracket"
										color="#ececec80"
										.trigger=${this.leaveParty.bind(this)}
										@mouseenter=${tooltip('Leave')}
									></icon-button>
								</div>
							</div>
							<div id="party-members">
								<div id="identity-collection">
									${repeat(
										party.members,
										m => m.identity.identityId,
										m =>
											html`<identity-avatar
												class="member"
												.identity=${m.identity}
												hide-status
												link
												@contextmenu=${showPartyMemberContextMenu({
													partyMember: m,
													selfIsLeader: isLeader
												})}
												@mouseenter=${tooltip(
													`${m.identity.displayName}#${padAccountNumber(
														m.identity.accountNumber
													)}`
												)}
											></identity-avatar>`
									)}
									${isLeader
										? html` <icon-button
												.isDisabled=${party.members.length >= party.partySize}
												class="member-add"
												src="solid/plus"
												custom
												.trigger=${this.openInviteModal.bind(this)}
												@mouseenter=${tooltip(
													party.members.length >= party.partySize
														? 'Party full'
														: 'Invite'
												)}
										  ></icon-button>`
										: null}
								</div>
							</div>
							${this.renderPartyActivity(party)}
					  </div>`
					: null}
			</div>

			<!-- Invite modal -->
			<drop-down-modal .active=${this.inviteModalActive} @close=${this.inviteModalClose.bind(this)}>
				<modal-body slot="body">
					<party-invite-panel .inviteToken=${this.createdInviteToken}></party-invite-panel>
				</modal-body>
			</drop-down-modal>
		`;
	}

	renderPartyActivity(party: api.party.PartySummary) {
		if (party.activity.idle) {
			return null;
		} else if (party.activity.matchmakerFindingLobby) {
			let game = party.activity.matchmakerFindingLobby.game;

			return html`<div id="party-activity">
				${game.bannerUrl
					? html`<lazy-img id="party-activity-bg" src=${game.bannerUrl} bg-size="cover"></lazy-img>`
					: null}
				}
				<lazy-img
					id="game-logo"
					bg-size=${game.logoUrl ? 'contain' : 'cover'}
					src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
					@mouseenter=${tooltip(game.displayName)}
				></lazy-img>
				<div id="description">
					<div id="description-title">
						<h2>Finding lobby...</h2>
						<loading-wheel custom></loading-wheel>
					</div>
				</div>
			</div>`;
		} else if (party.activity.matchmakerLobby) {
			let game = party.activity.matchmakerLobby.game;

			return html`<div id="party-activity">
				${game.bannerUrl
					? html`<lazy-img id="party-activity-bg" src=${game.bannerUrl} bg-size="cover"></lazy-img>`
					: null}
				}
				<lazy-img
					id="game-logo"
					bg-size=${game.logoUrl ? 'contain' : 'cover'}
					src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
				></lazy-img>
				<div id="description">
					<div id="description-title">
						<h2>${game.displayName}</h2>
					</div>
					<h3>32 left</h3>
				</div>
			</div>`;
		} else {
			logging.warn('Unknown party activity', party.activity);
			return null;
		}
	}
}
