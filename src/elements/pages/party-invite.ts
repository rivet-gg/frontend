import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './party-invite.scss';
import * as api from '../../utils/api';
import routes, { responses } from '../../routes';
import global from '../../utils/global';
import logging from '../../utils/logging';
import { showIdentityContextMenu, tooltip } from '../../ui/helpers';
import assets from '../../data/assets';
import { globalEventGroups, PartyUpdateEvent } from '../../utils/global-events';
import UIRouter from '../root/ui-router';

@customElement('page-party-invite')
export default class PagePartyInvite extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	inviteToken: string;

	@property({ type: Object })
	party: api.party.PartySummary = null;

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Boolean })
	isExpired = false;

	@property({ type: Object })
	loadError?: any = null;

	/// === EVENTS ===
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('party-update', this.handlePartyUpdate);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('inviteToken')) {
			// Clear party
			this.party = null;
			this.loadError = null;

			this.resetPartyData();
			this.fetchParty();
		}

		if (changedProperties.has('listCollapsed')) {
			this.requestUpdate();
		}
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	resetPartyData() {
		// Remove old party data
		this.party = null;
	}

	async fetchParty() {
		try {
			let res = await global.live.party.getPartyFromInvite({ token: this.inviteToken });

			this.party = res.party;

			this.isLoading = false;
		} catch (err) {
			if (err.code == 'PARTY_INVITE_NOT_FOUND') {
				this.isExpired = true;
				this.isLoading = false;
			} else {
				logging.error('Request error', err);
				this.loadError = err;
			}
		}
	}

	async joinParty() {
		try {
			let res = await global.live.party.joinParty({ invite: { token: this.inviteToken } });

			UIRouter.shared.navigate(routes.party.build({ id: res.partyId }));
		} catch (err) {
			logging.error('Error joining party', err);
			this.loadError = err;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return html`<loading-wheel></loading-wheel>`;

		return html`
			<div id="base">
				<div id="center">
					<h1>${this.isExpired ? 'Party Invite Expired :(' : 'Party Invite'}</h1>
					${this.isExpired
						? html`<h2>This party invite has expired or was revoked.</h2>`
						: html`
								${global.currentParty && global.currentParty.partyId == this.party.partyId
									? html`<stylized-button disabled>Already In Party</stylized-button>`
									: html`<stylized-button .trigger=${this.joinParty.bind(this)}
											>Join Party</stylized-button
									  >`}
								${this.renderPartyActivity()}
								${this.party.members.length
									? html`<div id="members">
											${repeat(
												this.party.members,
												m => m.identity.identityId,
												m => this.renderMember(m)
											)}
									  </div>`
									: null}
						  `}
				</div>
			</div>
		`;
	}

	renderPartyActivity() {
		if (this.party.activity.idle) {
			return null;
		} else if (this.party.activity.matchmakerFindingLobby) {
			let game = this.party.activity.matchmakerFindingLobby.game;

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
		} else if (this.party.activity.matchmakerLobby) {
			let game = this.party.activity.matchmakerLobby.game;

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
						<h2>${game.displayName}</h2>
					</div>
					<h3>32 left</h3>
				</div>
			</div>`;
		} else {
			logging.warn('Unknown party activity', this.party.activity);
			return null;
		}
	}

	renderMember(member: api.party.PartyMemberSummary) {
		return html`<identity-tile
			.identity=${member.identity}
			@contextmenu=${showIdentityContextMenu(member.identity)}
		>
			<div slot="right">
				${member.isLeader
					? html`<e-svg class="owner" src="solid/crown" @mouseenter=${tooltip('Leader')}></e-svg>`
					: null}
			</div>
		</identity-tile>`;
	}
}
