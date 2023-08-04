import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { cssify } from '../../utils/css';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import styles from './home.scss';
import global, { WindowSize } from '../../utils/global';
import * as api from '../../utils/api';
import routes, { responses } from '../../routes';
import assets from '../../data/assets';
import { showGroupContextMenu, showIdentityContextMenu, tooltip } from '../../ui/helpers';
import UIRoot from '../root/ui-root';
import {
	bodyEventGroups,
	globalEventGroups,
	GlobalMobileChangeEvent,
	windowEventGroups
} from '../../utils/global-events';
import logging from '../../utils/logging';
import numbro from 'numbro';
import utils from '../../utils/utils';
import { ColorExtractor } from '../../utils/colors';
import { ActivitiesCache } from '../../data/cache';

interface Splash {
	render: (name: TemplateResult) => TemplateResult;
	weight: number;
}

const SPLASHES: Splash[] = [
	{
		render: name => html`Welcome to Rivet,<br />${name}`,
		weight: 1
	}
];

@customElement('page-home')
export default class HomePage extends LitElement {
	static styles = cssify(styles);

	@query('video#bg')
	videoBg: HTMLVideoElement;

	@property({ type: Object })
	activeGame: api.identity.GameSummary = null;

	@property({ type: Array })
	friends: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	parties: api.party.PartySummary[] = [];

	@property({ type: Array })
	recentGames: api.identity.GameSummary[] = [];

	@property({ type: Array })
	suggestedPlayers: api.identity.IdentityHandle[] = [];

	@property({ type: Array })
	suggestedGroups: api.group.GroupSummary[] = [];

	@property({ type: Boolean })
	gameModalActive = false;

	@property({ type: Boolean })
	friendsExpanded = false;
	@property({ type: Boolean })
	partiesExpanded = false;
	@property({ type: Boolean })
	suggestedGroupsExpanded = false;
	@property({ type: Boolean })
	suggestedPlayersExpanded = false;

	@property({ type: Boolean })
	isLoading = true;

	@property({ type: Number })
	windowWidth: number = window.innerWidth;

	@property({ type: Object })
	activitiesStream: api.RepeatingRequest<api.identity.ListActivitiesCommandOutput>;

	@property({ type: Object })
	loadError?: any;

	splashSeed: number = Math.random();

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colors: Map<string, ColorExtractor> = new Map();

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	handleResize: (e: Event) => void;
	handleScroll: (e: Event) => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);

		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize);

		// Handle scroll
		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);
		windowEventGroups.remove('resize', this.handleResize);
		bodyEventGroups.remove('scroll', this.handleScroll);

		if (this.activitiesStream) this.activitiesStream.cancel();
	}

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.activitiesStream = await ActivitiesCache.watch(res => {
			this.friends = res.identities;
			this.recentGames = res.games;
			this.parties = res.parties;
			this.suggestedGroups = res.suggestedGroups;
			this.suggestedPlayers = res.suggestedPlayers;

			this.isLoading = false;
		});

		this.activitiesStream.onError(err => {
			logging.error('Request error', err);

			globalEventGroups.dispatch('error', err);
		});
	}

	onMobile() {
		this.requestUpdate();
	}

	onResize() {
		this.windowWidth = window.innerWidth;
		this.updateVideoPosition(document.body);
	}

	onScroll(e: Event) {
		let target = (e.currentTarget || e.target) as HTMLElement;

		this.updateVideoPosition(target);
	}

	updateVideoPosition(target: HTMLElement) {
		if (this.videoBg && !(target instanceof Window)) {
			this.videoBg.style.transform = `translateY(${target.scrollTop}px)`;
		}
	}

	toggleFriendsList() {
		this.friendsExpanded = !this.friendsExpanded;
	}

	togglePartiesList() {
		this.partiesExpanded = !this.partiesExpanded;
	}

	toggleSuggestedGroupsList() {
		this.suggestedGroupsExpanded = !this.suggestedGroupsExpanded;
	}

	toggleSuggestedPlayersList() {
		this.suggestedPlayersExpanded = !this.suggestedPlayersExpanded;
	}

	openGameModal(game: api.identity.GameSummary) {
		this.activeGame = game;
		this.gameModalActive = true;
	}

	gameModalClose() {
		this.activeGame = null;
		this.gameModalActive = false;
	}

	fetchColorFor(id: string, url: string) {
		let extractor: ColorExtractor;
		if (!this.colors.has(id)) {
			extractor = new ColorExtractor();
			this.colors.set(id, extractor);
		} else {
			extractor = this.colors.get(id);
		}

		if (url != extractor.imageUrl) {
			extractor.update(url);
			extractor.getPalette().then(() => {
				this.requestUpdate('colors');
			});
		}
	}

	// TODO: Add some sort of content for when there is no data to display
	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		// Don't ever need to deliver anything above 960x540 since it's a
		// blurred video and the content has a max width
		let bannerVideoUrl =
			this.windowWidth > 1200
				? assets.asset('graphics/home-banner/banner-960x540.mp4')
				: assets.asset('graphics/home-banner/banner-640x360.mp4');
		let bannerVideoSpeed = 0.7;

		return html`<div id="base">
			<div id="centered-body">
				<div id="banner" class="block">
					<div id="banner-bg-crop">
						<video
							id="banner-bg"
							src=${bannerVideoUrl}
							autoplay
							muted
							disablePictureInPicture
							disableRemotePlayback
							loop
							playsinline
							.playbackRate=${bannerVideoSpeed}
						></video>
					</div>

					<!-- Header -->
					<div id="banner-content">
						<identity-avatar
							hide-status
							shadow
							.identity=${global.currentIdentity}
						></identity-avatar>
						<div id="banner-text">
							<h1>${this.renderSplashText()}</h1>
						</div>
					</div>
				</div>

				<!-- Guest Banner -->
				${when(
			!global.currentIdentity.isRegistered,
			() => html`<div id="guest-banner" class="block">
						<e-svg id="guest-image" src="graphics/computer" non-icon preserve></e-svg>

						<div id="guest-content">
							<h2>Looks like you're logged in as a guest</h2>
							<p>
								Registering with Rivet gives you access to <b>joining groups</b>,
								<b>editing your profile</b>, <b>adding friends</b>, and much more.
							</p>
							<div id="guest-actions">
								<stylized-button .trigger=${() => UIRoot.shared.openRegisterPanel()}
									>Register Now</stylized-button
								>
							</div>
						</div>
					</div>`
		)}
				${when(
			this.isLoading,
			() => html`<div id="columns">
						<div id="left">
							<div class="placeholder-users">
								<loading-placeholder></loading-placeholder>
								<loading-placeholder></loading-placeholder>
								<loading-placeholder></loading-placeholder>
							</div>
							<div class="placeholder-parties">
								<loading-placeholder></loading-placeholder>
								<loading-placeholder></loading-placeholder>
							</div>
						</div>
						<div id="right">
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
						</div>
					</div>`,
			() => html`<div id="columns">
						<div id="left">
							<!-- Recent Games (on small displays) -->
							${when(this.windowWidth <= WindowSize.Large, () => this.renderRecentGames())}

							<!-- Friends -->
							${this.renderFriends()}

							<!-- Live Parties -->
							${this.renderLiveParties()}

							<!-- Suggested Groups -->
							${this.renderSuggestedGroups()}

							<!-- Suggested Players -->
							${this.renderSuggestedPlayers()}
						</div>
						${this.windowWidth > WindowSize.Large
					? html`<div id="right">
									<!-- Recent Games (on small displays) -->
									${this.renderRecentGames()}
							  </div>`
					: null}
					</div>`
		)}

				<!-- Game modal -->
				<drop-down-modal .active=${this.gameModalActive} @close=${this.gameModalClose.bind(this)}>
					<game-overlay
						slot="body"
						.game=${this.activeGame}
						.friends=${this.friends}
					></game-overlay>
				</drop-down-modal>
			</div>
		</div>`;
	}

	renderFriends() {
		let amountOfFriends = global.isMobile
			? this.windowWidth >= 765
				? 4
				: this.windowWidth >= 580
					? 3
					: 2
			: this.windowWidth >= 1450
				? 4
				: this.windowWidth > WindowSize.Large
					? 3
					: this.windowWidth >= 1050
						? 3
						: 2;
		let canExpand = this.friends.length > amountOfFriends * 2; // 2 rows

		return html`<div class="info-header">
				<div class="label">
					<e-svg src="solid/user-group"></e-svg>
					<h3>Friends</h3>
				</div>
				${when(
			canExpand,
			() => html`<div class="actions">
						<h4 @click=${this.toggleFriendsList.bind(this)}>
							${this.friendsExpanded ? 'See Less' : 'See More'}
						</h4>
					</div>`
		)}
			</div>
			<info-panel-body noindent>
				${when(
			!this.friends.length,
			() => html`<p class="no-friends muted">No friends active :(</p>`,
			() => html`<div id="friends">
						<div class="row">
							${repeat(
				this.friends.slice(0, this.friendsExpanded ? undefined : amountOfFriends * 2),
				i => i.identityId,
				identity => this.renderIdentityCard(identity, amountOfFriends)
			)}
						</div>
					</div>`
		)}
			</info-panel-body>`;
	}

	renderLiveParties() {
		if (this.parties && this.parties.length == 0) return null;

		let amountOfParties = global.isMobile
			? this.windowWidth >= 730
				? 3
				: 2
			: this.windowWidth >= 1480
				? 3
				: this.windowWidth > WindowSize.Large
					? 2
					: this.windowWidth >= 1142
						? 3
						: this.windowWidth >= 900
							? 2
							: 1;
		let canExpand = this.parties.length > amountOfParties;

		return html`<div class="info-header">
				<div class="label">
					<e-svg src="solid/party-horn"></e-svg>
					<h3>Live Parties</h3>
				</div>

				${when(
			canExpand,
			() => html`<div class="actions">
						<h4 @click=${this.togglePartiesList.bind(this)}>
							${this.partiesExpanded ? 'See Less' : 'See More'}
						</h4>
					</div>`
		)}
			</div>
			<info-panel-body noindent>
				<div id="live-parties">
					${repeat(
			this.parties.slice(0, this.partiesExpanded ? undefined : amountOfParties),
			p => p.partyId,
			party => this.renderParty(party, this.partiesExpanded ? amountOfParties : undefined)
		)}
				</div>
			</info-panel-body>`;
	}

	renderParty(party: api.party.PartySummary, amountOfParties: number) {
		let leader = party.members.find(m => m.isLeader)?.identity;
		let classes = classMap({
			party: true,
			block: true,
			half: amountOfParties && amountOfParties == 2,
			third: amountOfParties && amountOfParties == 3,
			quarter: amountOfParties && amountOfParties >= 4,
			idle: !!party.activity.idle
		});

		let partyBg;
		if (party.activity.idle) {
			partyBg = null;
		} else if (party.activity.matchmakerFindingLobby) {
			let game = party.activity.matchmakerFindingLobby.game;
			partyBg = game.bannerUrl
				? html`<lazy-img class="party-bg" src=${game.bannerUrl}></lazy-img>`
				: null;
		} else if (party.activity.matchmakerLobby) {
			let game = party.activity.matchmakerLobby.game;
			partyBg = game.bannerUrl
				? html`<lazy-img class="party-bg" src=${game.bannerUrl}></lazy-img>`
				: null;
		}

		return html`<div class=${classes}>
			${partyBg}
			<div class="party-content">
				<div class="info">
					<h1 class="title"><identity-name no-link .identity=${leader}></identity-name>'s Party</h1>
				</div>
				<div class="members">
					<avatar-collage
						max="6"
						.identities=${party.members.map(m => m.identity)}
					></avatar-collage>
				</div>
				${this.renderPartyActivity(party.activity)}
			</div>
		</div>`;
	}

	renderPartyActivity(activity: api.party.PartyActivity) {
		if (activity.idle) {
			return null;
		} else if (activity.matchmakerFindingLobby) {
			let game = activity.matchmakerFindingLobby.game;

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
							<h2>Finding lobby...</h2>
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

	renderSuggestedGroups() {
		if (this.suggestedGroups && this.suggestedGroups.length == 0) return null;

		let amountOfGroups = global.isMobile
			? this.windowWidth >= 730
				? 3
				: 2
			: this.windowWidth >= 1480
				? 3
				: this.windowWidth > WindowSize.Large
					? 2
					: this.windowWidth >= 1142
						? 3
						: this.windowWidth >= 900
							? 2
							: 1;
		let canExpand = this.suggestedGroups.length > amountOfGroups;

		return html`<div class="info-header">
				<div class="label">
					<e-svg src="solid/users"></e-svg>
					<h3>Suggested Groups</h3>
				</div>

				${when(
			canExpand,
			() => html`<div class="actions">
						<h4 @click=${this.toggleSuggestedGroupsList.bind(this)}>
							${this.suggestedGroupsExpanded ? 'See Less' : 'See More'}
						</h4>
					</div>`
		)}
			</div>
			<info-panel-body noindent>
				<div id="groups">
					${repeat(
			this.suggestedGroups.slice(
				0,
				this.suggestedGroupsExpanded ? undefined : amountOfGroups
			),
			g => g.groupId,
			group =>
				this.renderGroupCard(
					group,
					this.suggestedGroupsExpanded ? amountOfGroups : undefined
				)
		)}
				</div>
			</info-panel-body>`;
	}

	renderGroupCard(group: api.group.GroupSummary, amountOfGroups: number) {
		this.fetchColorFor(group.groupId, group.avatarUrl);
		let colorExtractor = this.colors.get(group.groupId);

		let bgUrl = assets.asset('/profile-bg/02. Egg Sour.png');
		let bgStyles = styleMap({
			backgroundImage: colorExtractor?.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			color: colorExtractor?.createTextColor()
		});

		let classes = classMap({
			'group-card': true,
			block: true,
			half: amountOfGroups && amountOfGroups == 2,
			third: amountOfGroups && amountOfGroups == 3,
			quarter: amountOfGroups && amountOfGroups >= 4
		});
		let formattedMemberCount =
			group.memberCount >= 2000
				? numbro(group.memberCount).format('0,0.0a')
				: numbro(group.memberCount).format('0,0');

		return html`<div
			class=${classes}
			@contextmenu=${showGroupContextMenu({ group, selfIsMember: group.isCurrentIdentityMember })}
		>
			<a class="link" href=${routes.groupSettings.build({ id: group.groupId })}></a>

			<div class="group-content">
				<div class="group-header">
					<div class="group-bg" style=${bgStyles}>
						${when(!group.avatarUrl, () => html`<lazy-img src=${bgUrl}></lazy-img>`)}
					</div>
					<group-avatar shadow .group=${group}></group-avatar>
				</div>
				<div class="group-info">
					<div class="details">
						<h2 style=${nameStyles}>${group.displayName}</h2>
						<h3 class="member-count"><e-svg src="solid/user"></e-svg>${formattedMemberCount}</h3>
					</div>
				</div>
			</div>
		</div>`;
	}

	renderSuggestedPlayers() {
		if (this.suggestedPlayers && this.suggestedPlayers.length == 0) return null;

		let amountOfPlayers = global.isMobile
			? this.windowWidth >= 765
				? 4
				: this.windowWidth >= 580
					? 3
					: 2
			: this.windowWidth >= 1450
				? 4
				: this.windowWidth > WindowSize.Large
					? 3
					: this.windowWidth >= 1050
						? 3
						: 2;
		let canExpand = this.suggestedPlayers.length > amountOfPlayers;

		return html`<div class="info-header">
				<div class="label">
					<e-svg src="solid/screen-users"></e-svg>
					<h3>Suggested Players</h3>
				</div>

				${when(
			canExpand,
			() => html`<div class="actions">
						<h4 @click=${this.toggleSuggestedPlayersList.bind(this)}>
							${this.suggestedPlayersExpanded ? 'See Less' : 'See More'}
						</h4>
					</div>`
		)}
			</div>
			<info-panel-body noindent>
				<div id="players">
					${repeat(
			this.suggestedPlayers.slice(
				0,
				this.suggestedPlayersExpanded ? undefined : amountOfPlayers
			),
			i => i.identityId,
			identity => {
				return this.renderIdentityCard(
					identity,
					this.suggestedPlayersExpanded ? amountOfPlayers : undefined,
					null
				);
			}
		)}
				</div>
			</info-panel-body>`;
	}

	renderIdentityCard(identity: api.identity.IdentityHandle, amountOfCards: number, relation?: string) {
		this.fetchColorFor(identity.identityId, identity.avatarUrl);

		let classes = classMap({
			'identity-card': true,
			block: true,
			half: amountOfCards && amountOfCards == 2,
			third: amountOfCards && amountOfCards == 3,
			quarter: amountOfCards && amountOfCards == 4,
			fifth: amountOfCards && amountOfCards >= 5
		});

		// Determine text color and gradient based on color of avatar
		let colorExtractor = this.colors.get(identity.identityId);
		let textColor = colorExtractor?.createTextColor();
		let styles = styleMap({
			backgroundImage: colorExtractor?.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			'--color': textColor
		});
		let activityStyles = styleMap({
			color: textColor
		});

		return html`<div class=${classes} style=${styles} @contextmenu=${showIdentityContextMenu(identity)}>
			<a class="link" href=${routes.identity.build({ id: identity.identityId })}></a>

			<div class="identity-center">
				<identity-avatar .identity=${identity}></identity-avatar>
				<div class="identity-info">
					<identity-name .identity=${identity} style=${nameStyles}></identity-name>
					${when(
			relation,
			() => html`<h2 class="activity" style=${activityStyles}>${relation}</h2>`,
			() =>
				when(
					identity.presence && relation !== null,
					() => html`<h2 class="activity" style=${activityStyles}>
									${utils.formatActivity(identity.presence, identity.party)}
								</h2>`
				)
		)}
				</div>
			</div>
		</div>`;
	}

	renderRecentGames() {
		return html`<div class="info-header">
				<div class="label">
					<e-svg src="solid/gamepad"></e-svg>
					<h3>Games</h3>
				</div>
			</div>
			<info-panel-body noindent>
				${!this.recentGames.length
				? html`<p class="no-recent-games muted">No recent games</p>`
				: html`<div id="recent-games">
							${repeat(
					this.recentGames,
					g => g.nameId,
					g => this.renderGame(g)
				)}
					  </div>`}
			</info-panel-body>`;
	}

	renderGame(game: api.identity.GameSummary) {
		let friendsPlaying = this.friends.reduce(
			(s, a) => s + (a.presence?.gameActivity?.game?.gameId == game.gameId ? 1 : 0),
			0
		);
		let formattedFriendsPlaying =
			friendsPlaying >= 2000
				? numbro(friendsPlaying).format('0,0.0a')
				: numbro(friendsPlaying).format('0,0');

		return html`<div class="game block" @click=${this.openGameModal.bind(this, game)}>
			${when(game.bannerUrl, () => html`<lazy-img class="game-bg" src=${game.bannerUrl}></lazy-img>`)}

			<lazy-img
				class="game-logo"
				bg-size=${game.logoUrl ? 'contain' : 'cover'}
				src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
			></lazy-img>

			<div class="game-details">
				<!-- Player Count -->
				${when(
			friendsPlaying,
			() =>
				html`<h2
							class="game-player-count"
							@mouseenter=${tooltip(
					`${formattedFriendsPlaying} friend${friendsPlaying == 1 ? '' : 's'
					} playing now`
				)}
						>
							<e-svg src="solid/user"></e-svg>${formattedFriendsPlaying}
						</h2>`
		)}
			</div>
		</div>`;
	}

	renderSplashText() {
		let name = html`<identity-name no-link .identity=${global.currentIdentity}></identity-name>`;

		let totalWeight = SPLASHES.reduce((s, a) => s + a.weight, 0);
		let movingWeight = 0;

		for (let splash of SPLASHES) {
			movingWeight += splash.weight / totalWeight;
			if (this.splashSeed <= movingWeight) return splash.render(name);
		}

		return SPLASHES[0].render(name);
	}
}
