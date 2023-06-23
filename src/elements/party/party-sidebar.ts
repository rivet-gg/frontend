import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './party-sidebar.scss';
import global from '../../utils/global';
import { showPartyMemberContextMenu } from '../../ui/helpers';
import { tooltip } from '../../ui/helpers';

import numbro from 'numbro';
import * as api from '../../utils/api';
import utils from '../../utils/utils';
import routes from '../../routes';
import timing from '../../utils/timing';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';

interface PartyAction {
	leaveParty?: true;
	inviteIdentity?: true;
	kickMember?: { identityId: string };
	transferPartyOwnership?: true;
	revokeInvite?: { inviteId: string };
	updatePublicity?: {
		public?: api.party.PartyPublicityLevel;
		mutualFollowers?: api.party.PartyPublicityLevel;
		groups?: api.party.PartyPublicityLevel;
	};
	setIdle?: true;
}

export class PartyActionEvent extends Event {
	constructor(public action: PartyAction) {
		super('event');
	}
}

const PUBLICITY: DropDownSelection<api.party.PartyPublicityLevel>[] = [
	{
		label: 'Closed',
		value: api.party.PartyPublicityLevel.NONE
	},
	{
		label: 'View Only',
		value: api.party.PartyPublicityLevel.VIEW
	},
	{
		label: 'Open',
		value: api.party.PartyPublicityLevel.JOIN
	}
];

@customElement('party-sidebar')
export default class PartySidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	party?: api.party.PartyProfile;

	@property({ type: String })
	copiedInviteToken: string = null;

	copyTimeoutId: number = null;

	lessThanPublicPublicityOptions: DropDownSelection<api.party.PartyPublicityLevel>[] = Array.from(
		PUBLICITY
	).map(v => Object.assign({}, v));

	leaveParty() {
		this.dispatchEvent(new PartyActionEvent({ leaveParty: true }));
	}

	kickMember(identityId: string) {
		this.dispatchEvent(new PartyActionEvent({ kickMember: { identityId } }));
	}

	transferPartyOwnership() {
		this.dispatchEvent(new PartyActionEvent({ transferPartyOwnership: true }));
	}

	inviteIdentity() {
		this.dispatchEvent(new PartyActionEvent({ inviteIdentity: true }));
	}

	revokeInvite(inviteId: string) {
		this.dispatchEvent(new PartyActionEvent({ revokeInvite: { inviteId } }));
	}

	copyLink(token: string) {
		utils.copyText(routes.partyInvite.build({ token }));
		this.copiedInviteToken = token;

		window.clearTimeout(this.copyTimeoutId);
		window.setTimeout(() => {
			this.copiedInviteToken = null;
		}, timing.seconds(1));
	}

	changePublicPublicity(event: DropDownSelectEvent<api.party.PartyPublicityLevel>) {
		let value = event.selection.value;

		// Automatically raises the publicity of mutuals and groups
		let mutualFollowers;
		let groups;
		if (value == api.party.PartyPublicityLevel.VIEW) {
			mutualFollowers =
				this.party.publicity.mutualFollowers == api.party.PartyPublicityLevel.NONE ? value : null;
			groups = this.party.publicity.groups == api.party.PartyPublicityLevel.NONE ? value : null;
		} else if (value == api.party.PartyPublicityLevel.JOIN) {
			mutualFollowers = value;
			groups = value;
		}

		this.dispatchEvent(
			new PartyActionEvent({
				updatePublicity: { public: event.selection.value, mutualFollowers, groups }
			})
		);
	}

	changeMutualFollowersPublicity(event: DropDownSelectEvent<api.party.PartyPublicityLevel>) {
		this.dispatchEvent(
			new PartyActionEvent({ updatePublicity: { mutualFollowers: event.selection.value } })
		);
	}

	changeGroupsPublicity(event: DropDownSelectEvent<api.party.PartyPublicityLevel>) {
		this.dispatchEvent(new PartyActionEvent({ updatePublicity: { groups: event.selection.value } }));
	}

	setIdle() {
		this.dispatchEvent(new PartyActionEvent({ setIdle: true }));
	}

	render() {
		let isLeader = this.party
			? this.party.members.some(
					member =>
						member.isLeader && global.currentIdentity.identityId == member.identity.identityId
			  )
			: false;

		return html`<div id="base">
			<slot name="extras-top"></slot>

			<!-- Actions -->
			${this.party
				? html`<info-panel-header>
							<div slot="title">Actions</div>
						</info-panel-header>
						<info-panel-body id="actions">${this.renderActions(isLeader)}</info-panel-body>`
				: null}

			<!-- Members -->
			<info-panel-header>
				<div slot="title">
					<span id="member-count"
						>${this.party ? numbro(this.party.members.length).format('0,0') : null}</span
					>
					${this.party && this.party.members.length == 1 ? 'Member' : 'Members'}
				</div>
			</info-panel-header>

			<info-panel-body id="members">
				${this.party && this.party.members.length
					? html`<div>
							${repeat(
								this.party.members,
								m => m.identity.identityId,
								m => this.renderMember(m, isLeader)
							)}
					  </div>`
					: null}
			</info-panel-body>

			<!-- Invites -->
			${this.party && isLeader && this.party.invites.length
				? html`<info-panel-header>
							<div slot="title">Invites</div>
						</info-panel-header>

						<info-panel-body id="invites">${this.renderInvites()}</info-panel-body>`
				: null}

			<slot name="extras-bottom"></slot>
		</div>`;
	}

	renderActions(isLeader: boolean) {
		let actions = [];

		if (isLeader) {
			let publicPublicitySelection = PUBLICITY.find(v => v.value == this.party.publicity.public);

			// Disable options that are below the current public publicity
			this.lessThanPublicPublicityOptions.forEach(v => {
				if (publicPublicitySelection.value == api.party.PartyPublicityLevel.NONE) {
					v.disabled = false;
				} else {
					v.disabled =
						v.value == api.party.PartyPublicityLevel.NONE ||
						(publicPublicitySelection.value == api.party.PartyPublicityLevel.VIEW
							? false
							: v.value == api.party.PartyPublicityLevel.VIEW);
				}
			});

			let friendsPublicitySelection = this.lessThanPublicPublicityOptions.find(
				v => v.value == this.party.publicity.mutualFollowers
			);
			let groupsPublicitySelection = this.lessThanPublicPublicityOptions.find(
				v => v.value == this.party.publicity.groups
			);

			actions.push(html`<div id="publicity">
				<h2>Publicity</h2>
				<div class="drop-down">
					Anyone
					<drop-down-list
						.selection=${publicPublicitySelection}
						.options=${PUBLICITY}
						@select=${this.changePublicPublicity.bind(this)}
					></drop-down-list>
				</div>
				<div class="drop-down">
					Friends
					<drop-down-list
						.selection=${friendsPublicitySelection}
						.options=${this.lessThanPublicPublicityOptions}
						@select=${this.changeMutualFollowersPublicity.bind(this)}
					></drop-down-list>
				</div>
				<div class="drop-down">
					Groups
					<drop-down-list
						.selection=${groupsPublicitySelection}
						.options=${this.lessThanPublicPublicityOptions}
						@select=${this.changeGroupsPublicity.bind(this)}
					></drop-down-list>
				</div>
			</div>`);

			actions.push(html`<stylized-button
				?disabled=${!!this.party.activity.idle}
				.trigger=${this.setIdle.bind(this)}
				>Set party to idle</stylized-button
			>`);

			actions.push(html`<stylized-button .trigger=${this.inviteIdentity.bind(this)}
				>Invite others</stylized-button
			>`);

			actions.push(html`<stylized-button
				id="transfer-ownership"
				.trigger=${this.transferPartyOwnership.bind(this)}
				>Transfer ownership</stylized-button
			>`);
		}

		actions.push(html`<stylized-button
			id="leave-button"
			color="#d4393b"
			.trigger=${this.leaveParty.bind(this)}
			>Leave party</stylized-button
		>`);

		return actions;
	}

	renderMember(member: api.party.PartyMemberSummary, isLeader: boolean) {
		return html`<identity-tile
			@contextmenu=${showPartyMemberContextMenu({ partyMember: member, selfIsLeader: isLeader })}
			.partyState=${member.state}
			.identity=${member.identity}
		>
			<div slot="right">
				${member.isLeader
					? html`<e-svg class="owner" src="solid/crown" @mouseenter=${tooltip('Leader')}></e-svg>`
					: null}
			</div>
		</identity-tile>`;
	}

	renderInvites() {
		return repeat(
			this.party.invites,
			i => i.inviteId,
			invite => {
				return html`<div class="invite">
					<div class="info">
						<h2>Invite</h2>
						<h3>${utils.formatDateLong(invite.createTs)}</h3>
					</div>
					<div class="actions">
						<icon-button
							src=${this.copiedInviteToken == invite.token
								? 'solid/check'
								: 'solid/link-simple'}
							@mouseenter=${this.copiedInviteToken == invite.token
								? null
								: tooltip('Copy Link')}
							.trigger=${this.copyLink.bind(this, invite.token)}
						></icon-button>
						<icon-button
							src="solid/xmark"
							@mouseenter=${tooltip('Revoke')}
							.trigger=${this.revokeInvite.bind(this, invite.inviteId)}
						></icon-button>
					</div>
				</div>`;
			}
		);
	}
}
