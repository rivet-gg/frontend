import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './identity-sidebar.scss';
import global from '../../utils/global';
import { showActionSheet, showJoinRequestContextMenu, tooltip } from '../../ui/helpers';

import * as api from '../../utils/api';
import routes from '../../routes';
import { globalEventGroups, PartyUpdateEvent } from '../../utils/global-events';
import numbro from 'numbro';
import assets from '../../data/assets';
import logging from '../../utils/logging';

interface IdentityAction {
	inviteToParty?: true;
	requestToJoinParty?: true;
	joinParty?: { partyId: string };
	openEditModal?: true;
	toggleFollow?: true;
}

export class IdentityActionEvent extends Event {
	constructor(public action: IdentityAction) {
		super('event');
	}
}

@customElement('identity-sidebar')
export default class IdentitySidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'not-found' })
	profileNotFound: boolean;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: Array })
	followers: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	following: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	mutualFriends: api.identity.IdentityHandle[] = [];

	@property({ type: Boolean, attribute: 'in-chat' })
	inChat = false;

	// === EVENT HANDLERS ===
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	inviteToParty() {
		this.dispatchEvent(new IdentityActionEvent({ inviteToParty: true }));
	}

	requestToJoinParty() {
		this.dispatchEvent(new IdentityActionEvent({ requestToJoinParty: true }));
	}

	joinParty() {
		this.dispatchEvent(new IdentityActionEvent({ joinParty: { partyId: this.profile.party.partyId } }));
	}

	toggleFriend(resolution: boolean) {
		this.dispatchEvent(new IdentityActionEvent({ toggleFollow: true }));
	}

	openEditModal() {
		this.dispatchEvent(new IdentityActionEvent({ openEditModal: true }));
	}

	promptStatus(e: PointerEvent) {
		let target = (e.currentTarget || e.target) as HTMLElement;

		// Get the status selection
		showActionSheet(target, [
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

	render() {
		let actions = this.renderActions();
		let isSelf = this.profile && global.currentIdentity.identityId == this.profile.identityId;

		let followerCount = Math.max(this.profile?.followerCount ?? 0, this.followers.length);
		let followingCount = Math.max(this.profile?.followingCount ?? 0, this.following.length);

		return html`<div id="base">
			<slot name="extras-top"></slot>

			<!-- Actions -->
			${when(
				actions.length,
				() => html`<info-panel-body id="actions" noindent>${actions}</info-panel-body>`
			)}

			<!-- Activity -->
			${this.renderActivity()}

			<!-- About -->
			<info-panel-header>
				<div slot="title">Bio</div>
			</info-panel-header>

			<info-panel-body id="about">
				${when(!this.profileNotFound, () => this.renderAbout())}
			</info-panel-body>

			${when(
				!this.inChat,
				() => html`${when(
						!isSelf,
						() => html`<!-- Friends -->
							<info-panel-header>
								<div slot="title">Mutual friends</div>
							</info-panel-header>

							<info-panel-body
								>${this.renderIdentityList(
									this.mutualFriends,
									html`<p>No friends in common</p>`
								)}</info-panel-body
							>`
					)}
					${when(
						this.profile,
						() => html`<!-- Followers -->
							<info-panel-header>
								<div slot="title">
									${numbro(followerCount).format('0,0')}
									Follower${followerCount != 1 ? 's' : null}
								</div>
							</info-panel-header>

							<info-panel-body
								>${this.renderIdentityList(
									this.followers,
									html`<p>No followers</p>`
								)}</info-panel-body
							>

							<!-- Following -->
							<info-panel-header>
								<div slot="title">${numbro(followingCount).format('0,0')} Following</div>
							</info-panel-header>

							<info-panel-body
								>${this.renderIdentityList(
									this.following,
									html`<p>Not following anyone</p>`
								)}</info-panel-body
							>`
					)}

					<!-- Groups -->
					<info-panel-header>
						<div slot="title">Groups</div>
					</info-panel-header>

					<info-panel-body id="groups" ?noindent=${this.profile?.groups?.length}
						>${when(!this.profileNotFound, () => this.renderGroups())}</info-panel-body
					>`
			)}

			<slot name="extras-bottom"></slot>
		</div>`;
	}

	renderActions() {
		if (!this.profile) return [];

		let isSelf = this.profile && global.currentIdentity.identityId == this.profile.identityId;

		let actions = [];

		if (isSelf) {
			actions.push(html`<stylized-button
				id="edit-profile"
				icon="solid/user-pen"
				.trigger=${this.openEditModal.bind(this)}
				>Edit profile</stylized-button
			>`);
		} else {
			if (!this.inChat) {
				actions.push(html`<stylized-button
					icon="solid/message"
					href=${routes.identityDirectChat.build({
						id: this.profile.identityId
					})}
					>Message</stylized-button
				>`);
			}

			// if (global.currentParty) {
			// 	let isLeader = global.currentParty.members.some(
			// 		member =>
			// 			member.isLeader && member.identity.identityId == global.currentIdentity.identityId
			// 	);

			// 	if (
			// 		isLeader &&
			// 		!global.currentParty.members.some(
			// 			member => member.identity.identityId == this.profile.identityId
			// 		)
			// 	) {
			// 		actions.push(html`<stylized-button .trigger=${this.inviteToParty.bind(this)}
			// 			>Invite to party</stylized-button
			// 		>`);
			// 	}
			// } else {
			// 	actions.push(html`<stylized-button .trigger=${this.inviteToParty.bind(this)}
			// 		>Create party</stylized-button
			// 	>`);
			// }

			// if (this.profile.party) {
			// 	if (!global.currentParty || global.currentParty.partyId != this.profile.party.partyId) {
			// 		if (
			// 			this.profile.isMutualFollowing
			// 				? this.profile.party.publicity.mutualFollowers ==
			// 				  api.party.PartyPublicityLevel.JOIN
			// 				: this.profile.party.publicity.public == api.party.PartyPublicityLevel.JOIN
			// 		) {
			// 			actions.push(html`<stylized-button .trigger=${this.joinParty.bind(this)}
			// 				>Join party</stylized-button
			// 			>`);
			// 		} else {
			// 			actions.push(html`<stylized-button .trigger=${this.requestToJoinParty.bind(this)}
			// 				>Request to join party</stylized-button
			// 			>`);
			// 		}
			// 	}
			// }

			if (this.profile.following) {
				actions.push(html`<stylized-button
					color="#d93636"
					.trigger=${this.toggleFriend.bind(this, false)}
					>Unfollow</stylized-button
				>`);
			} else {
				actions.push(html`<stylized-button .trigger=${this.toggleFriend.bind(this, true)}
					>Follow</stylized-button
				>`);
			}
		}

		return actions;
	}

	renderActivity() {
		if (!this.profile) return null;

		let isSelf = this.profile && global.currentIdentity.identityId == this.profile.identityId;

		let status = this.profile.presence.status;
		let statusText =
			status == api.identity.IdentityStatus.ONLINE
				? 'Online'
				: status == api.identity.IdentityStatus.AWAY
				? 'Away'
				: 'Offline';
		let statusClasses = classMap({
			online: status == api.identity.IdentityStatus.ONLINE,
			away: status == api.identity.IdentityStatus.AWAY
		});
		let statusIcon =
			status == api.identity.IdentityStatus.ONLINE
				? 'solid/circle'
				: status == api.identity.IdentityStatus.AWAY
				? 'solid/circle-dot'
				: 'regular/circle-dashed';

		return html`<info-panel-header>
				<div slot="title">Activity</div>
			</info-panel-header>

			<info-panel-body id="activity" noindent>
				<stylized-button
					id="status"
					class=${statusClasses}
					icon=${statusIcon}
					?no-action=${!isSelf}
					.trigger=${isSelf ? this.promptStatus.bind(this) : null}
					>${statusText}</stylized-button
				>
				${when(
					this.profile.party,
					() => this.renderParty(this.profile.party),
					() =>
						when(this.profile.presence.gameActivity, () =>
							this.renderGameActivity(this.profile.presence.gameActivity)
						)
				)}
			</info-panel-body>`;
	}

	renderParty(party: api.party.PartySummary) {
		return html`<div class="party">
			<div class="info">
				<h1 class="title">In Party</h1>
				<avatar-collage
					class="members"
					max="6"
					.identities=${party.members.map(m => m.identity)}
				></avatar-collage>
			</div>
			${this.renderPartyActivity(party.activity)}
		</div>`;
	}

	renderPartyActivity(activity: api.party.PartyActivity) {
		if (activity.idle) {
			return null;
		} else if (activity.matchmakerFindingLobby) {
			let game = activity.matchmakerFindingLobby.game;

			return html`<div class="activity">
				<a class="activity-link"></a>
				<div class="activity-content">
					<lazy-img
						class="activity-game-logo"
						bg-size=${game.logoUrl ? 'contain' : 'cover'}
						src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
						@mouseenter=${tooltip(game.displayName)}
					></lazy-img>
					<div class="activity-description">
						<div class="activity-description-content">
							<h2>${game.displayName}</h2>
							<h3>Finding lobby...</h3>
						</div>
						<loading-wheel custom></loading-wheel>
					</div>
				</div>
			</div>`;
		} else if (activity.matchmakerLobby) {
			let game = activity.matchmakerLobby.game;

			return html`<div class="activity">
				<div class="activity-content">
					<lazy-img
						class="activity-game-logo"
						bg-size=${game.logoUrl ? 'contain' : 'cover'}
						src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
						@mouseenter=${tooltip(game.displayName)}
					></lazy-img>
					<div class="activity-description">
						<div class="activity-description-content">
							<h2>${game.displayName}</h2>
							<!-- <h3>32 left</h3> -->
						</div>
					</div>
				</div>
			</div>`;
		} else {
			logging.warn('Unknown party activity', activity);
			return null;
		}
	}

	renderGameActivity(gameActivity: api.identity.IdentityGameActivity) {
		let game = gameActivity.game;

		return html`<div class="activity">
			<div class="activity-content">
				<lazy-img
					class="activity-game-logo"
					bg-size=${game.logoUrl ? 'contain' : 'cover'}
					src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
					@mouseenter=${tooltip(game.displayName)}
				></lazy-img>
				<div class="activity-description">
					<div class="activity-description-content">
						<h2>${game.displayName}</h2>
						${when(gameActivity.message, () => html`<h3>${gameActivity.message}</h3>`)}
					</div>
				</div>
			</div>
		</div>`;
	}

	renderAbout() {
		if (!this.profile) return html`<loading-placeholder-text></loading-placeholder-text>`;

		// Get bio
		let bio: TemplateResult;
		if (this.profile.bio) {
			bio = html`<div id="bio-text">${this.profile.bio}</div>`;
		} else {
			bio = html`<div id="bio-text" class="muted">${this.profile.displayName} has not set a bio.</div>`;
		}

		return html`
			<!-- Bio -->
			${bio}

			<!-- Join Date -->
			<div class="joined-timestamp">
				Joined <date-display .timestamp=${this.profile.joinTs}></date-display>
			</div>
		`;
	}

	renderIdentityList(list: api.identity.IdentityHandle[], emptyMsg: TemplateResult) {
		if (this.profile) {
			if (list.length) {
				return repeat(
					list,
					u => u.identityId,
					u => html`<identity-tile .identity=${u}></identity-tile>`
				);
			} else return emptyMsg;
		} else return null;
	}

	renderGroups() {
		if (this.profile) {
			if (this.profile.groups?.length) {
				return html`<div>
					${repeat(
						this.profile.groups,
						group => group.group.groupId,
						group =>
							html`<group-handle-tile class="group" .group=${group.group}></group-handle-tile>`
					)}
				</div>`;
			} else {
				return html`<p class="no-content">
					<b>${this.profile.displayName}</b> is not in any groups
				</p>`;
			}
		} else return null;
	}
}
