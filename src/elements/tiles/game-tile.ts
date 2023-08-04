import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import timing from '../../utils/timing';
import { bodyEventGroups, GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import styles from './game-tile.scss';
import routes from '../../routes';

import { identityRouteData } from '../../data/identity';
import assets from '../../data/assets';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';

@customElement('game-tile')
export default class GameTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: api.portal.GameSummary;

	@property({ type: Boolean, attribute: 'small' })
	isSmall = false;

	@property({ type: Boolean })
	showClip = false;

	@property({ type: String })
	snapshotSize: [number, number] = [640, 480];

	@property({ type: Number })
	snapshotId: number = 1 + Math.floor(Math.random() * 8);

	hideClipTimeout: any;

	// Mobile information
	@property({ type: Number })
	mobileHover = false;

	// === EVENT HANDLERS ===
	handleScroll: (e: Event) => void;
	handleMobile: (e: GlobalMobileChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);

		// Throttled scroll event handler
		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll, timing.milliseconds(200));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		bodyEventGroups.remove('scroll', this.handleScroll, timing.milliseconds(200));
		globalEventGroups.remove('mobile', this.handleMobile);
	}

	firstUpdated(p: PropertyValues) {
		super.firstUpdated(p);

		// Update mobile hover property
		if (global.isMobile) {
			this.updateMobileHover(document.body);
		}
	}

	renderDeveloper(identity: api.identity.IdentityHandle) {
		return html`
			<a href=${routes.identity.build(identityRouteData(identity))} class="developer">
				<identity-avatar
					class="developer-avatar"
					.identity=${identity}
					link
					hide-status
				></identity-avatar>
				<div>${identity.displayName}</div>
			</a>
		`;
	}

	toggleClipVisibility(show: boolean) {
		// Clear hide timeout
		clearTimeout(this.hideClipTimeout);

		// Update state
		if (show) {
			this.showClip = true;
		} else {
			// Hide after delay so fade works
			this.hideClipTimeout = setTimeout(() => (this.showClip = false), timing.milliseconds(400));
		}
	}

	onScroll(event: Event) {
		if (global.isMobile) {
			this.updateMobileHover((event.currentTarget || event.target) as HTMLElement);
		}
	}

	// Update on mobile change
	onMobile() {
		this.requestUpdate();
	}

	updateMobileHover(scroller: HTMLElement) {
		let distanceToCenter = Math.abs(
			scroller.scrollTop + scroller.offsetHeight / 2 - this.offsetTop - this.offsetHeight / 2
		);

		// Check if the game tile is near the center of the screen
		this.mobileHover = distanceToCenter < scroller.offsetHeight * 0.33;
	}

	render() {
		let classes = classMap({
			small: this.isSmall,
			'mobile-hover': this.mobileHover
		});

		// Autoplay video muted: https://stackoverflow.com/a/17994667
		return html`
			<div
				id="base"
				class=${classes}
				@pointerenter=${this.toggleClipVisibility.bind(this, true)}
				@pointerleave=${this.toggleClipVisibility.bind(this, false)}
				@pointercancel=${this.toggleClipVisibility.bind(this, false)}
			>
				<!-- Graphic -->
				<a id="base-link">
					<lazy-img
						id="bg"
						src="${assets.gameSnapshotUrl(this.game.nameId, this.snapshotSize, this.snapshotId)}"
					></lazy-img>
					<div id="clip-holder">
						${this.showClip || this.mobileHover
				? html`<video
									id="clip"
									autoplay
									muted
									disablePictureInPicture
									disableRemotePlayback
									loop
									playsinline
							  >
									<source
										src=${assets.gameClipUrl(this.game.nameId, this.snapshotSize)}
										type="video/mp4"
									/>
							  </video>`
				: null}
					</div>
					<div id="fader"></div>
					<lazy-img
						id="thumbnail"
						src=${assets.gameLogoUrl(this.game.nameId)}
						bg-size="contain"
					></lazy-img>
				</a>

				<!-- Game name -->
				<div id="name-popup">
					<span id="name">${this.game.displayName}</span>
					${global.isMobile
				? html`<span id="developers">by ${this.game.developer.displayName}</span>`
				: html`<a
								id="developers"
								href=${routes.groupSettings.build(groupRouteData(this.game.developer))}
								>by ${this.game.developer.displayName}</a
						  >`}
				</div>
			</div>
		`;
	}
}
