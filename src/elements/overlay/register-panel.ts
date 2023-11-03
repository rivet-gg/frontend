import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './register-panel.scss';
import global from '../../utils/global';
import { classMap } from 'lit/directives/class-map.js';
import { responses } from '../../routes';
import logging from '../../utils/logging';
import { default as timing, wait } from '../../utils/timing';
import TextInput from '../dev/text-input';
import { clearCache } from '../../utils/cache';
import * as api from '../../utils/api';
import * as broadcast from '../../data/broadcast';
import RvtRoot from '../root/rvt-root';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';

export const VALIDATE_EMAIL =
	/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

@customElement('register-panel')
export default class RegisterPanel extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	email = '';

	@property({ type: String })
	code = '';

	@property({ type: String })
	verificationId: string = null;

	@property({ type: String })
	emailError = '';

	@property({ type: String })
	codeError = '';

	@property({ type: String })
	loadingMessage = '';

	@property({ type: Boolean })
	isCompleting = false;

	@property({ type: Boolean })
	codeAreaActive = false;

	@property({ type: Boolean })
	wait = false;

	@property({ type: Boolean, attribute: 'light' })
	light = false;

	@property({ type: String, attribute: 'title' })
	title: string;

	@property({ type: String, attribute: 'description' })
	description: string;

	@property({ type: Boolean, attribute: 'no-back' })
	noBackButton = false;

	// Used for customizing the email
	@property({ type: String })
	gameId: string = null;

	@property({ type: Object })
	loadError?: any;

	@query('#email-input')
	emailInput: TextInput;

	@query('#code-input')
	codeInput: TextInput;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	onIdentityChange() {
		this.requestUpdate();
	}

	emailChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.email = target.value;

		if (!VALIDATE_EMAIL.test(this.email)) {
			this.email = '';
			this.emailError = 'Invalid email';
		} else this.emailError = null;
	}

	emailKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.emailError == null && event.key == 'Enter') {
			this.requestCaptcha();
			this.emailInput.blur();
		}
	}

	codeChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.code = target.value;

		if (!this.code.trim().length) {
			this.codeError = 'Invalid code';
		} else this.codeError = null;
	}

	codeKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.codeError == null && event.key == 'Enter') this.completeEmailVerification();
	}

	async requestCaptcha() {
		return new Promise<void>(res => {
			RvtRoot.shared.openCaptcha(
				async token => {
					// Artificial wait time
					await wait(timing.seconds(1));

					RvtRoot.shared.closeCaptcha();
					this.startEmailVerification(token);
					res();
				},
				err => {
					this.loadError = err;
					res();
				}
			);
		});
	}

	async startEmailVerification(clientResponse: string) {
		this.wait = true;
		this.codeError = null;

		try {
			let res = await global.auth.startEmailVerification({
				email: this.email.trim(),
				captcha: {
					turnstile: { clientResponse }
				},
				gameId: this.gameId
			});

			this.verificationId = res.verificationId;

			this.wait = false;
			this.codeAreaActive = true;
		} catch (err) {
			this.loadError = err;

			this.codeAreaClose();
		}
	}

	async completeEmailVerification() {
		this.isCompleting = true;

		try {
			let res = await global.auth.completeEmailVerification({
				verificationId: this.verificationId,
				code: this.code.trim()
			});

			this.isCompleting = false;
			this.codeError = null;
			this.code = null;

			if (res.status == api.auth.CompleteStatus.SWITCH_IDENTITY) {
				this.codeAreaClose();

				this.wait = true;
				this.loadingMessage = 'Switching accounts...';
				this.verificationId = null;

				// Identity changed, clear cache
				await clearCache();

				// Refresh all sessions
				global.broadcast.postMessage(broadcast.refresh());
				window.location.reload();
			} else if (res.status == api.auth.CompleteStatus.LINKED_ACCOUNT_ADDED) {
				this.codeAreaClose();

				this.wait = true;
				this.loadingMessage = 'Success! Updating account status...';
				this.verificationId = null;

				// Refresh all sessions
				global.broadcast.postMessage(broadcast.refresh());
				window.location.reload();
			} else if (res.status == api.auth.CompleteStatus.ALREADY_COMPLETE) {
				this.codeError = 'This verification session has already been completed.';
			} else if (res.status == api.auth.CompleteStatus.EXPIRED) {
				this.codeError = 'This verification session has expired. Please try again.';
			} else if (res.status == api.auth.CompleteStatus.TOO_MANY_ATTEMPTS) {
				this.codeError = 'Too many failed attempts. Try again later.';
			} else if (res.status == api.auth.CompleteStatus.INCORRECT) {
				this.codeError = 'The verification code given is incorrect.';
			} else {
				this.codeError = 'Unknown error';
				logging.error('Unknown error', res.status);
			}
		} catch (err) {
			this.loadError = err;

			this.codeAreaClose();
		}
	}

	codeAreaClose() {
		this.codeAreaActive = false;
		this.code = '';
		this.verificationId = null;
		if (this.codeInput) this.codeInput.clear();
	}

	focusInput() {
		if (this.emailInput) this.emailInput.focus();
	}

	resetRegister() {
		this.email = '';
		this.code = '';
		this.emailError = '';
		this.codeError = '';

		if (this.codeAreaActive) {
			this.emailInput.clear();
			this.codeInput.clear();
			this.codeAreaClose();
		}
	}

	// === RENDER ===
	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		let classes = classMap({
			hidden: this.wait,
			light: this.light
		});

		return html`
			<div id="base" class=${classes}>
				${this.codeAreaActive ? this.renderCodeArea() : this.renderEmailArea()}
				${this.wait
					? html` <div id="loading-overlay">
							<loading-wheel .message=${this.loadingMessage}></loading-wheel>
					  </div>`
					: null}
			</div>
		`;
	}

	async logout(): Promise<void> {
		await global.authManager.logout();
		window.location.reload();

		return new Promise(resolve => resolve());
	}

	closeRegisterPanel() {
		this.dispatchEvent(new Event('close'));
	}

	renderEmailArea() {
		// Get email from current identity
		let identity = global.currentIdentity.linkedAccounts.find(a => a.email);
		// Check if registered (with email)
		let isRegistered = global.currentIdentity.isRegistered && !!identity;

		return html`<div id="email-area">
			<h1>${this.title ?? 'Register or Login'}</h1>
			${isRegistered
				? html`<div id="registered">
						<p>
							Your account is already registered.<br /><span id="email"
								>Email: ${identity.email.email}</span
							>
						</p>
						<stylized-button
							icon="regular/arrow-right-from-bracket"
							color="#db3939"
							.trigger=${this.logout.bind(this)}
							>Log out</stylized-button
						>
				  </div>`
				: html`<p>
							${this.description ??
							html`Enter your email below to register a Rivet account or login to an existing
							account.`}
						</p>
						<div id="input-area">
							<h3>Email</h3>
							<text-input
								id="email-input"
								.light=${this.light}
								?disabled=${isRegistered}
								placeholder="Enter email here..."
								maxlength="320"
								@keydown=${this.emailKeyPress.bind(this)}
								@input=${this.emailChange.bind(this)}
							></text-input>
						</div>

						<div class="actions">
							${this.noBackButton
								? null
								: html`<stylized-button
										color="gray"
										.trigger=${this.closeRegisterPanel.bind(this)}
										>Back</stylized-button
								  >`}
							<stylized-button
								?disabled=${this.emailError != null}
								.trigger=${this.requestCaptcha.bind(this)}
								>Continue</stylized-button
							>
						</div>
						${this.emailError != null ? html`<p id="error">${this.emailError}</p>` : null}
						<p class="muted">
							All of the data on your current guest account will be transferred automatically.
						</p>`}
		</div>`;
	}

	renderCodeArea() {
		return html`<div id="code-area">
			<e-svg non-icon preserve src="graphics/email"></e-svg>
			<h1>Email Verification Code</h1>
			<p>
				Check your email <b>(${this.email})</b> for a verification code from <b>hello@rivet.gg</b> and
				paste it into the area below.
			</p>
			<text-input
				id="code-input"
				.light=${this.light}
				placeholder=""
				maxlength="8"
				@input=${this.codeChange.bind(this)}
				@keydown=${this.codeKeyPress.bind(this)}
				.filter=${(value: string) => value.replace(/[^a-z0-9]/gi, '').toUpperCase()}
			>
			</text-input>
			${this.codeError != null ? html`<p id="error">${this.codeError}</p>` : null}
			<div class="actions">
				<stylized-button color="gray" .trigger=${this.codeAreaClose.bind(this)}>Back</stylized-button>
				<stylized-button
					.trigger=${this.completeEmailVerification.bind(this)}
					?disabled=${this.codeError != null}
					?loading=${this.isCompleting}
					>Continue</stylized-button
				>
			</div>
		</div>`;
	}
}
