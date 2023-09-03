import { LitElement, html } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import styles from './game-tokens.scss';
import * as cloud from '@rivet-gg/cloud';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';
import global from '../../../utils/global';
import { showAlert } from '../../../ui/helpers';
import logging from '../../../utils/logging';
import utils from '../../../utils/utils';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import timing, { Debounce } from '../../../utils/timing';

const PORT_PROTOCOLS: DropDownSelection<cloud.ProxyProtocol>[] = [
	{
		label: 'HTTP',
		value: cloud.ProxyProtocol.HTTP
	},
	{
		label: 'HTTPS',
		value: cloud.ProxyProtocol.HTTPS
	}
];

@customElement('page-dev-game-tokens')
export default class DevGameTokens extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	loadError?: any;

	// === DEV TOKEN COMPONENTS ===
	activeNamespaceId: string;

	@property({ type: Boolean })
	devTokenModalActive = false;

	@property({ type: String })
	devTokenValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.DEV_TOKEN);

	@property({ type: Boolean })
	isCreatingDevToken = false;

	@property({ type: Array })
	devTokenPorts: cloud.LobbyGroupRuntimeDockerPort[] = [
		{
			label: 'default',
			targetPort: 8080,
			proxyProtocol: cloud.ProxyProtocol.HTTP
		}
	];

	@property({ type: String })
	devTokenHostname = '127.0.0.1';

	@queryAll('.port-input > text-input')
	portInputs: HTMLElement[];

	@property({ type: Boolean })
	devTokensValid = true;

	// === DEBOUNCE INFO ===
	validateConfigDebounce: Debounce<
		() => ReturnType<typeof global.cloud.validateGameNamespaceTokenDevelopment>
	>;

	constructor() {
		super();

		this.validateConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.cloud.validateGameNamespaceTokenDevelopment({
					gameId: this.game.gameId,
					namespaceId: this.activeNamespaceId,
					hostname: this.devTokenHostname,
					lobbyPorts: this.devTokenPorts
				});
			},
			completeCb: res => {
				// Save errors
				this.devTokenValidationErrors.load(res.errors.map(err => err.path));
				this.devTokensValid = this.devTokenValidationErrors.isEmpty();
				this.loadError = null;
			}
		});

		this.validateConfigDebounce.onError(async err => {
			this.loadError = err;
			this.devTokensValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	async createPublicToken(namespaceId: string) {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenPublic({
				gameId: this.game.gameId,
				namespaceId
			});

			showAlert(
				'Namespace Public Token Creation',
				html` <span
						>Copy this token to your clipboard. You will not be able to access this token
						again.</span
					>
					<br />
					<copy-area light confidential>
						<code class="no-ligatures thick">${createRes.token}</code>
					</copy-area>`
			);
		} catch (err) {
			logging.error('Failed to create public token', err);
		}
	}

	async createDevToken() {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenDevelopment({
				gameId: this.game.gameId,
				namespaceId: this.activeNamespaceId,
				hostname: this.devTokenHostname,
				lobbyPorts: this.devTokenPorts
			});

			this.devTokenModalClose();

			showAlert(
				'Namespace Development Token Creation',
				html` <span
						>Copy this token to your clipboard. You will not be able to access this token
						again.</span
					>
					<br />
					<copy-area light confidential>
						<code class="no-ligatures thick">${createRes.token}</code>
					</copy-area>
					<br />
					<stylized-button
						@click=${this.downloadEnvFile.bind(this, createRes.token)}
						color="#4D4D4D"
						>Download Environment File</stylized-button
					>
					<p class="light muted">
						Rename this file to <code class="inline">.env</code> for use in conjunction with the
						<a class="link" target="_blank" href="https://github.com/motdotla/dotenv">dotenv</a>
						library.
					</p>`
			);
		} catch (err) {
			this.devTokenModalClose();
		}
	}

	openDevTokenModal(namespaceId: string) {
		this.activeNamespaceId = namespaceId;
		this.devTokenModalActive = true;
	}

	devTokenModalClose() {
		this.devTokenModalActive = false;
	}

	downloadEnvFile(token: string) {
		utils.downloadData('_env', `RIVET_TOKEN=${token}`);
	}

	changeHostName(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.devTokenHostname = target.value;

		this.validateConfigDebounce.trigger();
	}

	// MARK: Port
	updatePort(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.devTokenPorts[idx].targetPort = value;

		this.validateConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortLabel(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.devTokenPorts[idx].label = target.value;

		this.validateConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortProtocol(idx: number, event: DropDownSelectEvent<cloud.ProxyProtocol>) {
		this.devTokenPorts[idx].proxyProtocol = event.selection.value;

		this.validateConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	removePort(idx: number) {
		this.devTokenPorts.splice(idx, 1);

		this.validateConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	createPort() {
		this.devTokenPorts.push({
			label: 'default',
			targetPort: 8080,
			proxyProtocol: cloud.ProxyProtocol.HTTP
		});

		this.validateConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.portInputs[this.portInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		return html`
			<div id="base">
				<h1>Generate Namespace Tokens</h1>
				<div id="namespaces">
					${this.renderNamespace(
						this.game.namespaces.find(ns => ns.namespaceId === this.namespaceId)
					)}
				</div>
			</div>

			${this.renderCreateDevTokenModal()}
		`;
	}

	renderNamespace(namespace: cloud.NamespaceSummary) {
		return html`
			<div class="namespace-tokens">
				<h2>${namespace.displayName}</h2>
				<stylized-button
					icon="solid/ticket"
					.trigger=${this.createPublicToken.bind(this, namespace.namespaceId)}
					>Create Public Token</stylized-button
				>
				<stylized-button
					icon="solid/lock"
					.trigger=${this.openDevTokenModal.bind(this, namespace.namespaceId)}
					>Create Development Token</stylized-button
				>
			</div>
		`;
	}

	renderCreateDevTokenModal() {
		let errors = this.devTokenValidationErrors.findShallowFormatted();

		return html` <drop-down-modal
			id="create-dev-token-modal"
			?active=${this.devTokenModalActive}
			@close=${this.devTokenModalClose.bind(this)}
		>
			<div slot="body">
				<h1>Create Development Token</h1>
				<div class="input-group">
					<h2>Hostname</h2>
					<text-input
						light
						placeholder="Enter host URL"
						.init=${this.devTokenHostname}
						maxlength="64"
						@change=${this.changeHostName.bind(this)}
					></text-input>
					<h2>Ports</h2>
					${errors.length ? html`<error-list .errors=${errors}></error-list>` : null}
					<div id="port-mapping" class="light-scrollbar">
						<table id="ports">
							${this.devTokenPorts.length
								? html`<tr>
											<th>Label</th>
											<th>Port</th>
											<th>Protocol</th>
										</tr>
										${this.devTokenPorts.map((p, i) => {
											let portErrors = this.devTokenValidationErrors.findFormatted(
												'ports',
												i
											);

											return html` ${portErrors.length
													? html`<tr>
															<td colspan="4">
																<error-list
																	.errors=${portErrors}
																></error-list>
															</td>
													  </tr>`
													: null}
												<tr>
													<td class="port-input">
														<text-input
															class="port short"
															placeholder="Label"
															light
															.init=${p.label}
															@input=${this.updatePortLabel.bind(this, i)}
														></text-input>
													</td>
													<td>
														<text-input
															class="port short"
															placeholder="Port"
															light
															number
															.min=${1}
															.max=${65535}
															.init=${p.targetPort.toString()}
															@input=${this.updatePort.bind(this, i)}
														></text-input>
													</td>
													<td>
														<drop-down-list
															light
															.selection=${PORT_PROTOCOLS.find(
																pr => pr.value == (p.proxyProtocol as string)
															)}
															.options=${PORT_PROTOCOLS}
															@select=${this.updatePortProtocol.bind(this, i)}
														></drop-down-list>
													</td>
													<td>
														<icon-button
															src="solid/xmark"
															small
															.trigger=${this.removePort.bind(this, i)}
														></icon-button>
													</td>
												</tr>`;
										})}`
								: null}
						</table>
						${this.devTokenPorts.length < 16
							? html`<dashed-button
									id="create-port"
									class="short"
									light
									centered
									icon="solid/plus"
									.trigger=${this.createPort.bind(this)}
									>Add port</dashed-button
							  >`
							: null}
					</div>
				</div>
				<stylized-button
					.trigger=${this.createDevToken.bind(this)}
					?disabled=${!this.devTokensValid}
					?loading=${this.isCreatingDevToken}
					>Create</stylized-button
				>
			</div>
		</drop-down-modal>`;
	}
}
