import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from '../pages/home.scss';
import global from '../../utils/global';
import assets from '../../data/assets';
import { responses } from '../../routes';
import { when } from 'lit/directives/when.js';
import UIRoot from '../root/ui-root';

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

@customElement('user-banner')
export default class UserBanner extends LitElement {
	static styles = cssify(styles);

	@query('video#bg')
	videoBg: HTMLVideoElement;

	@property({ type: Number })
	windowWidth: number = window.innerWidth;

	@property({ type: Object })
	loadError?: any;

	splashSeed: number = Math.random();

	onScroll(e: Event) {
		let target = (e.currentTarget || e.target) as HTMLElement;

		this.updateVideoPosition(target);
	}

	updateVideoPosition(target: HTMLElement) {
		if (this.videoBg && !(target instanceof Window)) {
			this.videoBg.style.transform = `translateY(${target.scrollTop}px)`;
		}
	}

	onResize() {
		this.windowWidth = window.innerWidth;
		this.updateVideoPosition(document.body);
	}

	constructor() {
		super();
	}

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
			</div>
		</div> `;
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
