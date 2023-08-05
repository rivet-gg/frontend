import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './identity.scss';
import routes, { responses } from '../../routes';
import UIRouter from '../root/ui-router';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import { showAlert } from '../../ui/helpers';
import global from '../../utils/global';

import { padAccountNumber, identityRouteData } from '../../data/identity';
import * as api from '../../utils/api';
import { IdentityProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { IdentityActionEvent } from '../identity/identity-sidebar';
import { ls } from '../../utils/cache';
import { ColorExtractor } from '../../utils/colors';
import UIRoot from '../root/ui-root';

@customElement('page-identity')
export default class IdentityPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	identityId: string;

	@property({ type: String })
	gameNameId?: string;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: Array })
	followers: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	following: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	mutualFriends: api.identity.IdentityHandle[] = [];

	@property({ type: Boolean })
	editModalActive: boolean = false;

	@property({ type: Object })
	loadError?: any;

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	identityStream?: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose events
		if (this.identityStream) this.identityStream.cancel();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if category set
		if (changedProperties.has('identityId')) {
			this.resetIdentityData();
			this.fetchIdentity();
		}
	}

	resetIdentityData() {
		// Remove old identity data
		this.profile = null;
		this.colorExtractor.reset();
		this.followers.length = 0;
		this.following.length = 0;
		this.mutualFriends.length = 0;
	}

	async fetchIdentity() {
		// Fetch events
		if (this.identityStream) this.identityStream.cancel();
		this.identityStream = await IdentityProfileCache.watch(this.identityId, res => {
			// Re-fetch followers when updated
			if (this.profile) {
				if (this.profile.followerCount != res.identity.followerCount) this.fetchFollowers();
				if (this.profile.followingCount != res.identity.followingCount) this.fetchFollowing();
			}

			this.profile = res.identity;
			this.fetchColor();

			// Update the title
			UIRouter.shared.updateTitle(
				`${this.profile.displayName}#${padAccountNumber(this.profile.accountNumber)}`
			);
		});

		this.identityStream.onError(err => {
			logging.error('Request error', err);

			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});

		this.fetchFollowers();
		this.fetchFollowing();
		this.fetchMutualFriends();
	}

	// Fetch followers/following/mutuals
	fetchFollowers() {
		global.live.identity
			.listFollowers({
				identityId: this.identityId
			})
			.then(res => {
				this.followers = res.identities;
			})
			.catch(err => {
				logging.error('Request error', err);
				this.loadError = err;
			});
	}
	fetchFollowing() {
		global.live.identity
			.listFollowing({
				identityId: this.identityId
			})
			.then(res => {
				this.following = res.identities;
			})
			.catch(err => {
				logging.error('Request error', err);
				this.loadError = err;
			});
	}
	async fetchMutualFriends() {
		try {
			let res = await global.live.identity.listMutualFriends({
				identityId: this.identityId
			});

			this.mutualFriends = res.identities;
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}
	}

	fetchColor() {
		this.colorExtractor.update(this.profile.avatarUrl);
		this.colorExtractor.getPalette().then(() => this.requestUpdate('colorExtractor'));
	}

	onMobile() {
		this.requestUpdate();
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
				topic: { identityId: this.identityId },
				messageBody: { partyInvite: { token: inviteToken } }
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	async requestToJoinParty() {
		try {
			await global.live.party.sendJoinRequest({
				partyId: this.profile.party.partyId
			});
		} catch (err) {
			logging.error('Error requesting to join party', err);
			this.loadError = err;
		}
	}

	async joinParty(partyId: string) {
		try {
			await global.live.party.joinParty({
				invite: { partyId }
			});
		} catch (err) {
			logging.error('Error joining party', err);
			this.loadError = err;
		}
	}

	async toggleFollow() {
		try {
			if (this.profile.following) {
				await global.live.identity.unfollowIdentity({
					identityId: this.profile.identityId
				});
			} else {
				await global.live.identity.followIdentity({
					identityId: this.profile.identityId
				});
			}
		} catch (err) {
			logging.error('Error following', err);
			this.loadError = err;
		}
	}

	openEditModal() {
		if (global.currentIdentity.isRegistered) {
			this.editModalActive = true;
		} else {
			showAlert(
				'Account not registered',
				html`Profile editing is only available for registered accounts.`,
				[
					{
						label: 'Dismiss'
					},
					{
						label: 'Register now',
						cb: () => UIRoot.shared.openRegisterPanel()
					}
				]
			);
		}
	}

	editModalClose() {
		this.editModalActive = false;
	}

	onActionEvent(event: IdentityActionEvent) {
		let action = event.action;

		if (action.inviteToParty) {
			this.inviteToParty();
		} else if (action.openEditModal) {
			this.openEditModal();
		} else if (action.requestToJoinParty) {
			this.requestToJoinParty();
		} else if (action.joinParty) {
			this.joinParty(action.joinParty.partyId);
		} else if (action.toggleFollow) {
			this.toggleFollow();
		} else logging.warn('Identity sidebar event not hooked up', action);
	}

	render() {
		// TODO: `profileNotFound` does not work with new smithy client
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		return global.isMobile ? this.renderMobile(profileNotFound) : this.renderDesktop(profileNotFound);
	}

	renderDesktop(profileNotFound: boolean) {
		let identity = this.profile;

		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			'--color': this.colorExtractor.createTextColor()
		});

		return html`
			<profile-layout>
				<div id="banner-bg" slot="banner-bg" style=${bgStyles}></div>

				<!-- Profile info and actions -->
				<div id="banner-center" slot="banner-center">
					${this.buildBackButton()}
					${when(
						this.profile,
						() => html`<identity-avatar
							id="main-avatar"
							shadow
							hide-status
							.identity=${identity}
						></identity-avatar>`,
						() => html`<loading-placeholder id="main-avatar-placeholder"></loading-placeholder>`
					)}
					<div id="main-display-name">
						${when(
							this.profile,
							() => html`<identity-name
								style=${nameStyles}
								.identity=${identity}
								no-link
								show-number
								inline
							></identity-name>`,
							() =>
								when(
									profileNotFound,
									() => html`<span>Profile not found</span>`,
									() => html`<loading-placeholder></loading-placeholder>`
								)
						)}
					</div>
				</div>

				<identity-sidebar
					slot="sidebar"
					.profile=${this.profile}
					.mutualFriends=${this.mutualFriends}
					.followers=${this.followers}
					.following=${this.following}
					?not-found=${profileNotFound}
					@event=${this.onActionEvent.bind(this)}
				></identity-sidebar>

				<div slot="body">
					<!-- Games -->
					<info-panel-header>
						<div slot="title">Games</div>
					</info-panel-header>

					<info-panel-body id="games-body" noindent>
						${when(!profileNotFound, () => this.renderGames())}
					</info-panel-body>
				</div>
			</profile-layout>

			<!-- TODO: Fetch the game instead of using games[0] -->
			${when(
				this.profile && this.gameNameId,
				() => html`<expanded-game-stats
					.identity=${this.profile}
					.game=${this.profile.games[0]}
				></expanded-game-stats>`
			)}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
	}

	// TODO: Abstract this as a mobile profile layout so it's shared with the group layout
	renderMobile(profileNotFound: boolean) {
		let identity = this.profile;
		let isSelf = this.profile && this.profile.identityId == global.currentIdentity.identityId;

		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			'--color': this.colorExtractor.createTextColor()
		});

		return html`
			<!-- Profile info and actions -->
			<div id="banner">
				<div id="banner-bg" slot="banner-bg" style=${bgStyles}></div>

				<div id="banner-center">
					<icon-button
						id="mobile-nav-back"
						src="regular/chevron-left"
						small
						color="white"
						.trigger=${this.navigateBack.bind(this)}
					></icon-button>

					${when(
						this.profile,
						() => html`<identity-avatar
							id="main-avatar"
							shadow
							hide-status
							.identity=${identity}
						></identity-avatar>`,
						() => html`<loading-placeholder id="main-avatar-placeholder"></loading-placeholder>`
					)}
					<div id="main-display-name">
						${when(
							this.profile,
							() => html`<identity-name
								style=${nameStyles}
								.identity=${identity}
								no-link
								show-number
								inline
							></identity-name>`,
							() =>
								when(
									profileNotFound,
									() => 'Profile not found',
									() => html`<loading-placeholder></loading-placeholder>
										<loading-placeholder></loading-placeholder>`
								)
						)}
					</div>
				</div>
			</div>

			<div id="body">
				<!-- Actions -->
				<info-group-body id="identity-actions">
					${when(
						this.profile,
						() =>
							when(
								isSelf,
								() => html`<rvt-button
									icon="regular/user-pen"
									id="edit-profile"
									small
									.trigger=${this.openEditModal.bind(this)}
									>Edit profile</rvt-button
								>`,
								() => html`<rvt-button
										icon="regular/message"
										small
										href=${routes.identityDirectChat.build({
											id: this.identityId
										})}
										>Message</rvt-button
									>
									<rvt-button
										icon="regular/user-plus"
										small
										.trigger=${this.toggleFollow.bind(this)}
										>${this.profile.following ? 'Unfollow' : 'Follow'}</rvt-button
									>
									${when(
										!isSelf,
										() => html`<rvt-button
											icon="regular/chart-network"
											small
											href="${routes.identityFriends.build(
												identityRouteData(identity)
											)}"
											>View mutuals</rvt-button
										>`
									)}`
							),
						() => html`<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>`
					)}
				</info-group-body>

				<!-- About -->
				<info-panel-header>
					<div slot="title">Bio</div>
				</info-panel-header>

				<info-panel-body id="about">${this.renderAbout()}</info-panel-body>

				<!-- Groups -->
				<info-panel-header>
					<div slot="title">Groups</div>
				</info-panel-header>

				<info-panel-body id="groups">${this.renderGroups()}</info-panel-body>

				<!-- Games -->
				<info-panel-header>
					<div slot="title">Games</div>
				</info-panel-header>

				<info-panel-body id="games-body" noindent>${this.renderGames()}</info-panel-body>
			</div>

			<!-- TODO: Fetch the game instead of using games[0] -->
			${when(
				this.profile && this.gameNameId,
				() => html`<expanded-game-stats
					.identity=${this.profile}
					.game=${this.profile.games[0]}
				></expanded-game-stats>`
			)}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					.identity=${this.profile}
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
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

	renderGroups() {
		if (this.profile) {
			if (this.profile.groups && this.profile.groups.length) {
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

	renderGames() {
		if (!this.profile) return null;

		return when(
			this.profile.games.length,
			() => html`<div id="games">
				${repeat(
					this.profile.games,
					game => game.game.gameId,
					game => html`<game-stats .identity=${this.profile} .data=${game}></game-stats>`
				)}
			</div>`,
			() => html`<p class="no-content">
				<b>${this.profile.displayName}</b> has no games on their profile
			</p>`
		);
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
