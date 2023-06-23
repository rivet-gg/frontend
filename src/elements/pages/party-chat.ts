import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './party-chat.scss';
import { cssify } from '../../utils/css';

import global from '../../utils/global';
import routes, { responses } from '../../routes';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { ChatErrorEvent } from '../common/chat-view';
import { PartyActionEvent } from '../party/party-sidebar';
import { DropDownSelectEvent } from '../dev/drop-down-list';
import UIRouter from '../root/ui-router';
import PartyInvitePanel from '../party/invite-panel';
import timing from '../../utils/timing';
import { PartyProfileCache } from '../../data/cache';
import { ls } from '../../utils/cache';
import { globalEventGroups, PartyUpdateEvent } from '../../utils/global-events';

@customElement('page-party-chat')
export default class PartyChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	partyId: string;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Object })
	party: api.party.PartyProfile = null;

	@property({ type: Boolean })
	transferModalActive = false;

	@property({ type: String })
	transferIdentityId: string = null;

	@query('party-invite-panel')
	invitePanel: PartyInvitePanel;

	@property({ type: Boolean })
	inviteModalActive = false;

	@property({ type: String })
	createdInviteToken: string = null;

	partyStream: api.RepeatingRequest<api.party.GetPartyProfileCommandOutput>;

	// === EVENT HANDLERS ===
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	async onChatError(event: ChatErrorEvent) {
		globalEventGroups.dispatch('error', event.chatError);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('partyId')) {
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

	connectedCallback() {
		super.connectedCallback();

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the listener
		if (this.partyStream) this.partyStream.cancel();
	}

	onPartyUpdate(e: PartyUpdateEvent) {
		// Go back to home page when there is no longer a party
		if (!e.value) {
			console.debug('party removed');
			UIRouter.shared.navigate(routes.home.build({}), { replaceHistory: true });
		}
	}

	resetPartyData() {
		// Remove old party data
		this.party = null;
	}

	async fetchParty() {
		let ctxPartyId = this.partyId;

		// Fetch events
		if (this.partyStream) this.partyStream.cancel();
		this.partyStream = await PartyProfileCache.watch(this.partyId, res => {
			if (this.partyId != ctxPartyId) return;

			this.party = res.party;
			this.party.invites.sort((a, b) => b.createTs.getTime() - a.createTs.getTime());

			this.isLoading = false;
		});

		this.partyStream.onError(err => {
			logging.error('Request error', err);

			if (this.party) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	async kickMember(identityId: string) {
		try {
			await global.live.party.kickMember({ identityId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}
	}

	async transferPartyOwnership(identityId: string) {
		try {
			await global.live.party.transferPartyOwnership({ identityId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}

		this.transferModalClose();
	}

	async leaveParty() {
		try {
			this.party = null;
			this.partyStream.cancel();

			await global.live.party.leaveParty({});

			UIRouter.shared.navigate(routes.home.build({}));
		} catch (err) {
			logging.error('Error leaving party', err);
		}
	}

	async revokeInvite(inviteId: string) {
		try {
			await global.live.party.revokePartyInvite({ inviteId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}

		this.transferModalClose();
	}

	async updatePublicity(publicityValues: api.party.SetPartyPublicityCommandInput) {
		try {
			await global.live.party.setPartyPublicity(publicityValues);

			// Save party publicity in cache for reuse
			ls.setString(
				'party-publicity',
				JSON.stringify({
					public: publicityValues.public ?? this.party.publicity.public,
					friends: publicityValues.mutualFollowers ?? this.party.publicity.mutualFollowers,
					groups: publicityValues.groups ?? this.party.publicity.groups
				})
			);
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}
	}

	async createInvite() {
		try {
			let res = await global.live.party.createPartyInvite({});

			this.createdInviteToken = res.invite.token;
		} catch (err) {
			logging.error(err);
		}
	}

	async setIdle() {
		try {
			await global.live.party.setPartyToIdle({});
		} catch (err) {
			logging.error(err);
		}
	}

	onActionEvent(event: PartyActionEvent) {
		let action = event.action;

		if (action.transferPartyOwnership) this.openTransferModal();
		else if (action.leaveParty) this.leaveParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.inviteIdentity) this.openInviteModal();
		else if (action.revokeInvite) this.revokeInvite(action.revokeInvite.inviteId);
		else if (action.updatePublicity) this.updatePublicity(action.updatePublicity);
		else if (action.setIdle) this.setIdle();
		else logging.warn('Party sidebar event not hooked up', action);
	}

	changeTransferIdentitySelection(event: DropDownSelectEvent<string>) {
		this.transferIdentityId = event.selection.value;
	}

	openTransferModal() {
		this.transferModalActive = true;
	}

	transferModalClose() {
		this.transferModalActive = false;
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
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return null;

		return html`
			<div id="base">
				${global.isMobile
					? this.renderChat()
					: html`<right-sidebar-layout>
							${this.renderChat()}
							${this.party
								? html`<party-sidebar
										slot="sidebar"
										.party=${this.party}
										@event=${this.onActionEvent.bind(this)}
								  >
										<div slot="extras-bottom">
											<chat-preview-button></chat-preview-button>
										</div>
								  </party-sidebar>`
								: null}
					  </right-sidebar-layout>`}
			</div>

			${this.renderTransferPartyOwnershipModal()}
			<!-- Invite modal -->
			<drop-down-modal .active=${this.inviteModalActive} @close=${this.inviteModalClose.bind(this)}>
				<modal-body slot="body">
					<party-invite-panel .inviteToken=${this.createdInviteToken}></party-invite-panel>
				</modal-body>
			</drop-down-modal>
		`;
	}

	renderChat() {
		let threadId = this.party?.threadId ?? null;

		return html`<chat-view
			slot="body"
			.threadId=${threadId}
			.empty=${threadId}
			.party=${this.party}
			auto-focus
			@error=${this.onChatError.bind(this)}
		></chat-view>`;
	}

	renderTransferPartyOwnershipModal() {
		if (!this.party) return null;

		let members = Array.from(this.party.members).filter(
			m => m.identity.identityId != global.currentIdentity.identityId
		);
		let identityOptions = members.map(m => ({
			template: html`<identity-tile .identity=${m.identity} light hide-status no-link></identity-tile>`,
			value: m.identity.identityId
		}));

		return html`<drop-down-modal
			id="transfer-ownership-modal"
			?active=${this.transferModalActive}
			@close=${this.transferModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Transfer Ownership</h1>
				<p class="content">
					Are you sure you want to transfer ownership of this party? This action
					<b>CANNOT</b> be undone.
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
					.trigger=${this.transferPartyOwnership.bind(this)}
					?disabled=${this.transferIdentityId == null}
					>Transfer</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
