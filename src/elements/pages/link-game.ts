import { LitElement, html, PropertyValues } from 'lit';
import config from '../../config';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './link-game.scss';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
import { global, GlobalStatus } from '../../utils/global';
import routes, { responses } from '../../routes';

import { globalEventGroups, GlobalStatusChangeEvent } from '../../utils/global-events';
import UIRouter from '../root/ui-router';
import settings from '../../utils/settings';
import * as api from '../../utils/api';
import { showAlert, tooltip } from '../../ui/helpers';
import assets from '../../data/assets';
import { GameLinkStatus } from '@rivet-gg/identity';

// Sent to the ui-root so that we can advance the linking page's stage even if it is removed from DOM
// intermittently
export class DeferredStageEvent extends Event {
	constructor(public stage: Stage) {
		super('deferred-stage');
	}
}

export enum Stage {
	Start,
	Register,
	Allow,
	Complete,
	Cancelled
}

@customElement('page-link-game')
export default class LinkGamePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	token: string;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Object })
	gameLinkData: api.identity.GetGameLinkCommandOutput;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Number })
	initStage: Stage;

	@property({ type: Number })
	stage: Stage = Stage.Start;

	preAuthService: api.identity.IdentityService;

	constructor() {
		super();

		this.preAuthService = new api.identity.IdentityService({
			endpoint: config.API_IDENTITY_URL
		});

		// Automatically advance to "allow" stage if registered
		if (global.currentIdentity && global.currentIdentity.isRegistered) {
			this.advanceTo(Stage.Allow);
		}
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		if (this.initStage) {
			this.stage = this.initStage;
		}

		this.fetchData();
	}
	async fetchData() {
		try {
			this.gameLinkData = await this.preAuthService.getGameLink({
				identityLinkToken: this.token
			});

			// Already completed/cancelled
			if (this.gameLinkData.status == GameLinkStatus.COMPLETE) this.advanceTo(Stage.Complete);
			else if (this.gameLinkData.status == GameLinkStatus.CANCELLED) this.advanceTo(Stage.Cancelled);
		} catch (err) {
			this.loadError = err;
		}

		this.isLoading = false;
	}

	async completeGameLink() {
		try {
			await global.live.identity.completeGameLink({
				identityLinkToken: this.token
			});

			this.advanceTo(Stage.Complete);
		} catch (err) {
			this.loadError = err;
		}
	}

	async cancelGameLink() {
		try {
			await global.live.identity.cancelGameLink({
				identityLinkToken: this.token
			});

			this.advanceTo(Stage.Cancelled);
		} catch (err) {
			this.loadError = err;
		}
	}

	startRegistration() {
		this.dispatchEvent(new DeferredStageEvent(Stage.Register));

		if (settings.didConsent) this.advanceTo(Stage.Register);
		else global.grantConsent();
	}

	continueAsGuest() {
		this.dispatchEvent(new DeferredStageEvent(Stage.Allow));

		if (settings.didConsent) this.advanceTo(Stage.Allow);
		else global.grantConsent();
	}

	async logout(): Promise<void> {
		await global.authManager.logout();
		window.location.reload();

		return new Promise(resolve => resolve());
	}

	advanceTo(stage: Stage) {
		this.stage = stage;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return html`<loading-wheel .message=${''}></loading-wheel>`;

		let baseClasses = classMap({
			'has-bg': !!this.gameLinkData.game.bannerUrl
		});
		let bgClasses = classMap({
			hidden: this.stage == Stage.Register
		});

		let body;
		if (this.stage == Stage.Start) body = this.renderStart();
		else if (this.stage == Stage.Register) body = this.renderRegister();
		else if (this.stage == Stage.Allow) body = this.renderAllow();
		else if (this.stage == Stage.Complete) body = this.renderComplete();
		else if (this.stage == Stage.Cancelled) body = this.renderCancelled();

		return html`<div id="base" class=${baseClasses}>
			${this.gameLinkData.game.bannerUrl
				? html`<lazy-img
						id="bg"
						class=${bgClasses}
						src=${this.gameLinkData.game.bannerUrl}
				  ></lazy-img>`
				: null}
			<div id="header">
				<br />
				<div class="actions">
					<stylized-button
						class="gray"
						icon="logo/logo-small"
						href=${routes.home.build({})}
						target="_blank"
						>Open Rivet Hub</stylized-button
					>
					<icon-button
						class="gray"
						src="solid/question"
						custom
						.trigger=${() =>
							showAlert(
								'Rivet Accounts',
								html`<p>
									<b>${this.gameLinkData.game.displayName}</b> uses
									<a class="link" href="https://rivet.gg/" target="_blank">Rivet</a> for
									account login services. You can use the same Rivet account to log in to
									any game using Rivet’s services.
								</p>`
							)}
						@mouseenter=${tooltip("What's this?")}
					></icon-button>
					<icon-button
						class="gray destructive"
						src="solid/xmark"
						custom
						?disabled=${this.stage == Stage.Complete || this.stage == Stage.Cancelled}
						.trigger=${this.cancelGameLink.bind(this)}
						@mouseenter=${tooltip('Cancel login')}
					></icon-button>
				</div>
			</div>
			<div id="scroller">
				<div id="center">${body}</div>
			</div>
			${this.renderFooter()}
		</div>`;
	}

	renderGameIcon() {
		return html`<lazy-img
			id="game-icon"
			bg-size=${this.gameLinkData.game.logoUrl ? 'contain' : 'cover'}
			src=${this.gameLinkData.game.logoUrl ?? assets.asset('/games/blank/logo.png')}
			@mouseenter=${tooltip(this.gameLinkData.game.displayName)}
		></lazy-img>`;
	}

	renderStart() {
		return html`<div id="start-content" class="content">
			<div class="shadow"></div>
			<div class="big-header">
				${this.renderGameIcon()}
				<h1>${this.gameLinkData.game.displayName}</h1>
			</div>
			<div class="content">
				<div class="actions">
					<stylized-button .trigger=${this.startRegistration.bind(this)}
						>Register or Login</stylized-button
					><stylized-button .trigger=${this.continueAsGuest.bind(this)}
						>Continue as Guest</stylized-button
					>
				</div>
			</div>
		</div>`;
	}

	renderRegister() {
		return html`<div id="register-content" class="content">
			<div class="shadow"></div>
			<register-panel
				@close=${this.advanceTo.bind(
					this,
					this.gameLinkData.status == GameLinkStatus.COMPLETE ? Stage.Complete : Stage.Start
				)}
				.gameId=${this.gameLinkData.game.gameId}
			></register-panel>
			${global.currentIdentity.isRegistered
				? html`<div class="actions">
						<stylized-button .trigger=${this.advanceTo.bind(this, Stage.Allow)}
							>Continue</stylized-button
						>
				  </div>`
				: null}
		</div>`;
	}

	renderAllow() {
		return html`<div id="allow-content" class="content">
			<div class="shadow"></div>
			<div id="transfer-display">
				<identity-tile
					.identity=${this.gameLinkData.currentIdentity}
					hide-presence
					hide-status
					no-link
					@mouseenter=${tooltip(`Your ${this.gameLinkData.game.displayName} guest account`)}
				></identity-tile>
				<e-svg src="solid/right"></e-svg>
				<identity-tile
					.identity=${global.currentIdentity}
					hide-presence
					hide-status
					no-link
					@mouseenter=${tooltip(`Your Rivet account`)}
				></identity-tile>
			</div>
			<div class="big-header">
				${this.renderGameIcon()}
				<h1>${this.gameLinkData.game.displayName}</h1>
			</div>
			<h3>Link Guest Account to Rivet</h3>
			<div class="actions">
				<stylized-button .trigger=${this.completeGameLink.bind(this)}>Allow</stylized-button
				><stylized-button class="gray" .trigger=${this.logout.bind(this)}
					>Change Account</stylized-button
				>
			</div>
		</div>`;
	}

	renderComplete() {
		return html`<div id="complete-content" class="content">
			<div class="shadow"></div>
			<e-svg class="big-icon" src="solid/circle-check"></e-svg>
			<div class="result-area">
				<h2>Game Linking Complete</h2>
				<p>
					You may safely close this page and return to
					<b>${this.gameLinkData.game.displayName}</b>.
				</p>
			</div>
		</div>`;
	}

	renderCancelled() {
		return html`<div id="cancelled-content" class="content">
			<div class="shadow"></div>
			<e-svg class="big-icon" src="solid/circle-xmark"></e-svg>
			<div class="result-area">
				<h2>Game Linking Cancelled</h2>
				<p>
					You may safely close this page and return to
					<b>${this.gameLinkData.game.displayName}</b>.
				</p>
			</div>
		</div> `;
	}

	renderFooter() {
		let body;
		if (this.stage == Stage.Start) {
			body = html`<p>
				By clicking "Register or Login" or "Continue as Guest", you agree to the Rivet
				<a class="link" href="https://rivet.gg/terms" target="_blank">Terms of Service</a>
				and
				<a class="link" href="https://rivet.gg/privacy" target="_blank">Privacy Policy</a>.
			</p>`;
		} else if (this.stage == Stage.Register) {
			body = html`<p>
				Your <a class="link" href="https://rivet.gg/" target="_blank">Rivet</a> account can be used on
				<b>${this.gameLinkData.game.displayName}</b> and any other games hosted on Rivet.
			</p>`;
		} else if (this.stage == Stage.Allow) {
			body = html`<div id="services-holder">
				<h3>Allow ${this.gameLinkData.game.displayName} to access:</h3>
				<div id="services">
					<div class="service">
						<e-svg non-icon preserve src="products2/friend-duotone"></e-svg>
						<h4>Friends</h4>
					</div>
					<div class="service">
						<e-svg non-icon preserve src="products2/group-duotone"></e-svg>
						<h4>Groups</h4>
					</div>
					<div class="service">
						<e-svg non-icon preserve src="products2/chat-duotone"></e-svg>
						<h4>Chat</h4>
					</div>
				</div>
			</div>`;
		} else if (this.stage == Stage.Complete && !global.currentIdentity.isRegistered) {
			body = html`<div id="register-holder">
				<p>Add your email to save your account and be able to log in on other devices.</p>
				<stylized-button .trigger=${this.startRegistration.bind(this)}>Register Now</stylized-button>
			</div>`;
		}

		let shadowClasses = classMap({
			light: !body && this.stage != Stage.Cancelled,
			cancelled: this.stage == Stage.Cancelled,
			tall: this.stage == Stage.Cancelled
		});

		return html`<div id="footer">
			<div id="footer-shadow" class=${shadowClasses}></div>
			${body}
		</div>`;
	}
}
