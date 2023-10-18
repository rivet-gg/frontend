import { html, LitElement, PropertyValues } from 'lit';
import { cssify } from '../../../utils/css';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { Rivet } from '@rivet-gg/api-internal';
import styles from './version-info-matchmaker.scss';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { ToggleSwitchEvent } from '../../common/toggle-switch';
import { DropDownSelectEvent, DropDownSelection } from '../drop-down-list';
import { SelectBuildEvent } from '../builds';
import * as ext from './ext';

export const HCAPTCHA_DIFFICULTIES: DropDownSelection<Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel>[] =
	[
		{
			label: 'Easy',
			value: Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel.Easy
		},
		{
			label: 'Moderate',
			value: Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel.Moderate
		},
		{
			label: 'Difficult',
			value: Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel.Difficult
		},
		{
			label: 'Always On',
			value: Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel.AlwaysOn
		}
	];

const PORT_PROTOCOLS: DropDownSelection<Rivet.cloud.version.matchmaker.PortProtocol>[] = [
	{
		label: 'HTTP',
		value: Rivet.cloud.version.matchmaker.PortProtocol.Http
	},
	{
		label: 'HTTPS',
		value: Rivet.cloud.version.matchmaker.PortProtocol.Https
	},
	{
		label: 'UDP',
		value: Rivet.cloud.version.matchmaker.PortProtocol.Udp
	}
];

const NETWORK_MODES: DropDownSelection<Rivet.cloud.version.matchmaker.NetworkMode>[] = [
	{
		label: 'Bridge',
		value: Rivet.cloud.version.matchmaker.NetworkMode.Bridge
	},
	{
		label: 'Host',
		value: Rivet.cloud.version.matchmaker.NetworkMode.Host
	}
];

const MIN_HOST_PORT = 26000;
const MAX_HOST_PORT = 31999;

@customElement('version-info-matchmaker')
export default class VersionInfoMatchmaker extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@property({ type: Object })
	config: Rivet.cloud.version.Config;

	@property({ type: Object })
	configExt: ext.MatchmakerConfigExt = { config: null, gameModes: [], docker: null };

	@property({ type: Object })
	tiers: Rivet.cloud.RegionTier[] = [];

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@queryAll('.arg-input > text-input')
	argInputs: HTMLElement[];

	@queryAll('.port-input > text-input')
	portInputs: HTMLElement[];

	@queryAll('.env-input > text-input')
	envInputs: HTMLElement[];

	get dockerRuntime() {
		return this.configExt.docker.docker;
	}

	get dockerRuntimeExt() {
		return this.configExt.docker;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Initialize configExt
		if (changedProperties.has('config') && this.config && !this.configExt.config) {
			let docker =
				Object.values(this.config.matchmaker.gameModes ?? {})[0]?.docker ??
				this.config.matchmaker.docker;

			this.configExt = {
				config: this.config.matchmaker,
				gameModes: [],
				docker: {
					docker,
					env: [],
					ports: []
				}
			};

			// Convert config to configExt
			for (let [nameId, gameMode] of Object.entries(this.config.matchmaker.gameModes ?? {})) {
				let regions = [];

				for (let [regionNameId, region] of Object.entries(gameMode.regions)) {
					regions.push({
						nameId: regionNameId,
						region
					});
				}

				this.configExt.gameModes.push({
					nameId,
					gameMode,
					regions
				});
			}

			if (docker) {
				for (let [key, value] of Object.entries(docker.env)) {
					this.configExt.docker.env.push({ key, value });
				}

				for (let [label, port] of Object.entries(docker.ports)) {
					this.configExt.docker.ports.push({ label, port });
				}
			}
		}
	}

	updateConfig() {
		this.requestUpdate('configExt');

		// Convert configExt to config
		this.configExt.config.gameModes = {};
		for (let gameMode of this.configExt.gameModes) {
			gameMode.gameMode.regions = {};
			for (let region of gameMode.regions) {
				gameMode.gameMode.regions[region.nameId] = region.region;
			}

			this.configExt.config.gameModes[gameMode.nameId] = gameMode.gameMode;
		}

		if (this.configExt.docker) {
			this.configExt.config.docker.env = {};

			for (let { key, value } of this.configExt.docker.env) {
				this.configExt.config.docker.env[key] = value;
			}

			this.configExt.config.docker.ports = {};
			for (let { label, port } of this.configExt.docker.ports) {
				this.configExt.config.docker.ports[label] = port;
			}
		}

		this.config.matchmaker = this.configExt.config;

		this.dispatchEvent(new Event('update'));
	}

	// Propagate event
	toggle(e: ToggleSwitchEvent) {
		this.dispatchEvent(new ToggleSwitchEvent(e.value));
	}

	toggleMatchmakerCaptcha(e: ToggleSwitchEvent) {
		if (e.value) {
			this.configExt.config.captcha = {
				hcaptcha: {
					level: Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel.Easy
				},
				requestsBeforeReverify: 15,
				verificationTtl: 3600000
			};
		} else {
			this.configExt.config.captcha = undefined;
		}

		this.updateConfig();
	}

	changeHcaptchaDifficulty(
		event: DropDownSelectEvent<Rivet.cloud.version.matchmaker.CaptchaHcaptchaLevel>
	) {
		this.configExt.config.captcha.hcaptcha.level = event.selection.value;

		this.updateConfig();
	}

	changeCaptchaRequestsBeforeReverify(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.configExt.config.captcha.requestsBeforeReverify = value;

		this.updateConfig();
	}

	changeCaptchaVerificationTtl(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.configExt.config.captcha.verificationTtl = value * 60 * 1000;

		this.updateConfig();
	}

	selectBuild(event: SelectBuildEvent) {
		this.dockerRuntime.image = event.buildId;
		this.updateConfig();
	}

	createGameMode() {
		if (!this.configExt.config) return;

		let nameId = `game-mode-${this.configExt.gameModes.length + 1}`;
		if (this.configExt.gameModes.length > 0) {
			let gameMode = JSON.parse(
				JSON.stringify(this.configExt.gameModes[this.configExt.gameModes.length - 1])
			);
			gameMode.nameId = nameId;
			this.configExt.gameModes.push(gameMode);
		} else {
			// Initiate runtime
			this.config.matchmaker.docker = {
				image: undefined,
				args: [],
				networkMode: Rivet.cloud.version.matchmaker.NetworkMode.Bridge
			};
			this.configExt.docker = {
				docker: this.config.matchmaker.docker,
				ports: [
					{
						label: 'default',
						port: {
							port: 80,
							protocol: Rivet.cloud.version.matchmaker.PortProtocol.Https
						}
					}
				],
				env: [
					{
						key: 'PORT',
						value: '80'
					}
				]
			};

			this.configExt.gameModes.push({
				nameId: 'default',
				// Makes all regions active immediately
				regions: this.game.availableRegions.map(a => ({
					nameId: a.regionNameId,
					region: {
						idleLobbies: {
							min: 0,
							max: 0
						}
					}
				})),
				gameMode: {
					maxPlayers: 16,
					maxPlayersDirect: 16,
					maxPlayersParty: 16,
					tier: 'basic-1d2',
					regions: {}
				}
			});
		}

		this.updateConfig();
	}

	removeGameMode(idx: number) {
		if (!this.configExt.config) return;

		this.configExt.gameModes.splice(idx, 1);

		this.updateConfig();
	}

	updateNetworkMode(event: DropDownSelectEvent<Rivet.cloud.version.matchmaker.NetworkMode>) {
		this.dockerRuntime.networkMode = event.selection.value;

		this.updateConfig();
	}

	// MARK: Arg
	updateArg(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.dockerRuntime.args[idx] = target.value;

		this.updateConfig();
	}

	removeArg(idx: number) {
		this.dockerRuntime.args.splice(idx, 1);
		this.updateConfig();
	}

	createArg() {
		this.dockerRuntime.args.push('');
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.argInputs[this.argInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	// MARK: Port
	updatePort(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.dockerRuntimeExt.ports[idx].port.port = value;

		this.updateConfig();
	}

	updatePortRange(idx: number, key: keyof Rivet.cloud.version.matchmaker.PortRange, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.dockerRuntimeExt.ports[idx].port.portRange[key] = value;

		this.updateConfig();
	}

	updatePortLabel(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.dockerRuntimeExt.ports[idx].label = target.value;

		this.updateConfig();
	}

	updatePortProtocol(idx: number, event: DropDownSelectEvent<Rivet.cloud.version.matchmaker.PortProtocol>) {
		// Switch from target port to port range and vice versa
		if (
			this.dockerRuntimeExt.ports[idx].port.protocol !=
				Rivet.cloud.version.matchmaker.PortProtocol.Udp &&
			event.selection.value == Rivet.cloud.version.matchmaker.PortProtocol.Udp
		) {
			this.dockerRuntimeExt.ports[idx].port.port = undefined;
			this.dockerRuntimeExt.ports[idx].port.portRange = {
				min: MIN_HOST_PORT,
				max: MAX_HOST_PORT
			};
		} else if (
			this.dockerRuntimeExt.ports[idx].port.protocol ==
				Rivet.cloud.version.matchmaker.PortProtocol.Udp &&
			event.selection.value != Rivet.cloud.version.matchmaker.PortProtocol.Udp
		) {
			this.dockerRuntimeExt.ports[idx].port.port = 80;
			this.dockerRuntimeExt.ports[idx].port.portRange = undefined;
		}

		this.dockerRuntimeExt.ports[idx].port.protocol = event.selection.value;

		this.updateConfig();
	}

	removePort(idx: number) {
		this.dockerRuntimeExt.ports.splice(idx, 1);
		this.updateConfig();
	}

	createPort() {
		this.dockerRuntimeExt.ports.push({
			label: '',
			port: { port: 80, protocol: Rivet.cloud.version.matchmaker.PortProtocol.Https }
		});
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.portInputs[this.portInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	// MARK: Env var
	updateEnvVar(idx: number, key: 'key' | 'value', event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.dockerRuntimeExt.env[idx][key] = target.value;
		this.updateConfig();
	}

	removeEnvVar(idx: number) {
		this.dockerRuntimeExt.env.splice(idx, 1);
		this.updateConfig();
	}

	createEnvVar() {
		this.dockerRuntimeExt.env.push({ key: '', value: '' });
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.envInputs[this.envInputs.length - 2];

			if (lastInput) lastInput.focus();
		});
	}

	render() {
		return html`<service-card
			.domain=${'services'}
			?editing=${this.editing}
			?active=${!!this.configExt.config}
			?error=${!this.errors.isEmpty()}
			@toggle=${this.toggle.bind(this)}
		>
			<e-svg slot="icon" preserve non-icon src="/products2/matchmaker-duotone"></e-svg>
			<h2 slot="title">Matchmaker</h2>
			<div id="content" slot="content">
				${this.renderErrors()}${this.configExt.config ? this.renderBody() : null}
			</div>
		</service-card>`;
	}

	renderBody() {
		let captchaClasses = classMap({
			active: !!this.configExt.config.captcha
		});
		let captchaErrors = this.errors.findFormatted('captcha');
		let gameModeMetaErrors = this.errors.findFormatted('game-modes-meta');

		return html`
			${this.configExt.config.captcha || this.editing
				? html`<div id="captcha-area" class=${captchaClasses}>
						<div class="toggle-header">
							${
								this.editing
									? html`<toggle-switch
											?value=${!!this.configExt.config.captcha}
											@toggle=${this.toggleMatchmakerCaptcha.bind(this)}
									  ></toggle-switch>`
									: null
							}
							<h3>Captcha Verification</h3>
						</div>
						${captchaErrors.length ? html`<error-list .errors=${captchaErrors}></error-list>` : null}
						${this.configExt.config.captcha ? this.renderCaptchaConfig() : null}
				  </div>
				</div>`
				: html`<h3 class="pb-1 text-lg">Captcha Verification</h3>
						<p class="muted">No captcha</p>`}

			<h3 class="pt-3 pb-1 text-lg">Runtime</h3>
			${this.renderRuntimeConfig()}

			<h3 class="pt-3 pb-1 text-lg">Game Modes</h3>
			${gameModeMetaErrors.length
				? html`<error-list .errors=${gameModeMetaErrors}></error-list>`
				: null}
			${this.configExt.gameModes.length
				? html`<div id="game-modes">
						${map(
							this.configExt.gameModes,
							(gm, i) => html`
								<dev-version-info-game-mode
									class="game-mode"
									.game=${this.game}
									.tiers=${this.tiers}
									.config=${gm}
									.errors=${this.errors.branch('game-modes', `*${gm.nameId}*`)}
									?editing=${this.editing}
									@update=${this.updateConfig.bind(this)}
									@remove=${this.removeGameMode.bind(this, i)}
								>
								</dev-version-info-game-mode>
							`
						)}
				  </div>`
				: this.editing
				? null
				: html`<p class="muted">No lobby groups created</p>`}
			${this.editing && this.configExt.gameModes.length < 32
				? html`<div class="large-create" @click=${this.createGameMode.bind(this)}>
						<div class="large-create-content">
							<e-svg src="solid/plus"></e-svg>
							Create a new game mode
						</div>
				  </div>`
				: null}
		`;
	}

	renderCaptchaConfig() {
		let hcaptchaDifficultySelection = HCAPTCHA_DIFFICULTIES.find(
			v => v.value == this.configExt.config.captcha.hcaptcha.level
		);

		return html`<div id="captcha-config">
			<div class="column-split">
				<div class="column">
					<div class="captcha-input">
						<h5>Requests before required reverification</h5>
						${this.editing
							? html`<text-input
									class="short"
									number
									placeholder="Count"
									.min=${0}
									.max=${600}
									.init=${this.configExt.config.captcha.requestsBeforeReverify.toString()}
									@input=${this.changeCaptchaRequestsBeforeReverify.bind(this)}
							  ></text-input>`
							: html`<p class="immut-info short">
									${this.configExt.config.captcha.requestsBeforeReverify}
							  </p>`}
					</div>
					<div class="captcha-input">
						<h5>Captcha Difficulty</h5>
						${this.editing
							? html`<drop-down-list
									.selection=${hcaptchaDifficultySelection}
									.options=${HCAPTCHA_DIFFICULTIES}
									@select=${this.changeHcaptchaDifficulty.bind(this)}
							  ></drop-down-list>`
							: html`<p class="immut-info medium">${hcaptchaDifficultySelection.label}</p>`}
					</div>
				</div>
				<div class="column">
					<div class="captcha-input">
						<h5>Time before required reverification (minutes)</h5>
						${this.editing
							? html`<text-input
									class="short"
									number
									placeholder="Count"
									.min=${0}
									.max=${12 * 60}
									.init=${Math.floor(
										this.configExt.config.captcha.verificationTtl / (60 * 1000)
									).toString()}
									@input=${this.changeCaptchaVerificationTtl.bind(this)}
							  ></text-input>`
							: html`<p class="immut-info short">
									${Math.floor(this.configExt.config.captcha.verificationTtl / (60 * 1000))}
							  </p>`}
					</div>
				</div>
			</div>
		</div>`;
	}

	renderRuntimeConfig() {
		if (!this.configExt?.gameModes.length) {
			return html`<div id="runtime-area" class="empty">
				<p class="muted">No game modes</p>
			</div>`;
		}

		let firstGameModeNameId = `*${this.configExt.gameModes[0].nameId}*`;
		let runtimeError = this.errors.findFormatted('game-modes', firstGameModeNameId, 'no-runtime')[0];
		let buildError = this.errors.findFormatted('game-modes', firstGameModeNameId, 'no-build')[0];
		let tooManyArgs = this.errors.findFormatted('game-modes', firstGameModeNameId, 'args-too-many')[0];
		let tooManyPorts = this.errors.findFormatted('game-modes', firstGameModeNameId, 'ports-too-many')[0];
		let tooManyEnvVars = this.errors.findFormatted(
			'game-modes',
			firstGameModeNameId,
			'env-vars-too-many'
		)[0];

		let buildClasses = classMap({
			'no-upload': !this.editing
		});

		let portsClasses = classMap({
			'immut-ports': !this.editing
		});

		return html`<div id="runtime-area">
			<h4>Build</h4>
			${this.editing
				? html`${runtimeError ? html`<error-list .errors=${[runtimeError]}></error-list>` : null}
				  ${buildError ? html`<error-list .errors=${[buildError]}></error-list>` : null}`
				: null}
			<div id="builds-area" class="row scrollbar-gutter">
				<dev-builds
					class=${buildClasses}
					.game=${this.game}
					?selectable=${this.editing}
					?uploadable=${this.editing}
					.selectedBuildId=${this.dockerRuntime.image}
					@select-build=${this.selectBuild.bind(this)}
				>
				</dev-builds>
				<div id="spacer"></div>
			</div>

			<h4>Network Mode</h4>
			${this.editing
				? html`<drop-down-list
						.selection=${NETWORK_MODES.find(pr => pr.value == this.dockerRuntime.networkMode)}
						.options=${NETWORK_MODES}
						@select=${this.updateNetworkMode.bind(this)}
				  ></drop-down-list>`
				: html`<p class="immut-info">
						${NETWORK_MODES.find(pr => pr.value == this.dockerRuntime.networkMode).label}
				  </p>`}

			<div id="args">
				<h4>Ports</h4>
				${tooManyPorts ? html`<error-list .errors=${[tooManyPorts]}></error-list>` : null}
				<div id="ports-list" class="list">
					<table id="ports" class=${portsClasses}>
						${this.dockerRuntimeExt.ports.length
							? html`<tr>
										<th>Label</th>
										<th>Port</th>
										<th>Protocol</th>
									</tr>
									${map(this.dockerRuntimeExt.ports, (p, i) => this.renderPort(p, i))}`
							: this.editing
							? null
							: html`<p class="muted">No ports defined</p>`}
					</table>
					${this.editing && this.dockerRuntimeExt.ports.length < 16
						? html`<dashed-button
								id="create-port"
								icon="solid/plus"
								.trigger=${this.createPort.bind(this)}
								>Add port</dashed-button
						  >`
						: null}
				</div>
				<div class="column-split">
					<div class="column">
						<h4>Env Vars</h4>
						${tooManyEnvVars ? html`<error-list .errors=${[tooManyEnvVars]}></error-list>` : null}
						<div id="env-vars-list" class="list">
							${this.dockerRuntimeExt.env.length
								? html`<div>
										${map(this.dockerRuntimeExt.env, (v, i) => {
											if (this.editing) {
												let envVarErrors = this.errors.findFormatted(
													'game-modes',
													firstGameModeNameId,
													'env-vars',
													`*${v.key}*`
												);

												return html`
													${envVarErrors.length
														? html`<error-list
																.errors=${envVarErrors}
														  ></error-list>`
														: null}
													<div class="item env-var env-input">
														<!-- maxlength is > 64 so that identities pasting in content can see the "too long" error -->
														<text-input
															.init=${v.key}
															placeholder="Var name"
															maxlength="65"
															@input=${this.updateEnvVar.bind(this, i, 'key')}
														></text-input>
														<span>=</span>
														<!-- maxlength is > 512 so that identities pasting in content can see the "too long" error -->
														<text-input
															.init=${v.value}
															placeholder="Var value"
															maxlength="513"
															@input=${this.updateEnvVar.bind(this, i, 'value')}
														></text-input>
														<icon-button
															src="solid/xmark"
															small
															.trigger=${this.removeEnvVar.bind(this, i)}
														></icon-button>
													</div>
												`;
											} else {
												return html`<p class="immut-info">${v.key} = ${v.value}</p>`;
											}
										})}
								  </div>`
								: this.editing
								? null
								: html`<p class="muted">No environment variables defined</p>`}
							${this.editing && this.dockerRuntimeExt.env.length < 64
								? html`<dashed-button
										icon="solid/plus"
										.trigger=${this.createEnvVar.bind(this)}
										>Add Env Var</dashed-button
								  >`
								: null}
						</div>
					</div>
					<div class="column">
						<h4>Arguments</h4>
						${tooManyArgs ? html`<error-list .errors=${[tooManyArgs]}></error-list>` : null}
						<div id="args-list" class="list">
							${this.dockerRuntime.args.length
								? html`<div>
										${map(this.dockerRuntime.args, (arg, i) => {
											if (this.editing) {
												let argErrors = this.errors.findFormatted(
													'game-modes',
													firstGameModeNameId,
													'args',
													i
												);

												return html`${argErrors.length
														? html`<error-list .errors=${argErrors}></error-list>`
														: null}
													<div class="item arg-input">
														<!-- maxlength is > 128 so that anyone pasting in content can see the "too long" error -->
														<text-input
															.init=${arg}
															placeholder="Argument"
															maxlength="129"
															@input=${this.updateArg.bind(this, i)}
														></text-input>
														<icon-button
															src="solid/xmark"
															small
															.trigger=${this.removeArg.bind(this, i)}
														></icon-button>
													</div>`;
											} else {
												return html`<p class="immut-info">${arg}</p>`;
											}
										})}
								  </div>`
								: this.editing
								? null
								: html`<p class="muted">No arguments defined</p>`}
							${this.editing && this.dockerRuntime.args.length < 64
								? html`<dashed-button icon="solid/plus" .trigger=${this.createArg.bind(this)}
										>Add argument</dashed-button
								  >`
								: null}
						</div>
					</div>
				</div>
			</div>
		</div>`;
	}

	renderPort(p: ext.GameModeRuntimeDockerPortExt, i: number) {
		if (this.editing) {
			let firstGameModeNameId = `*${this.configExt.gameModes[0].nameId}*`;
			let portErrors = this.errors.findFormatted(
				'game-modes',
				firstGameModeNameId,
				'ports',
				`*${p.label}*`
			);

			return html`${portErrors.length
					? html`<tr>
							<td colspan="4">
								<error-list .errors=${portErrors}></error-list>
							</td>
					  </tr>`
					: null}
				<tr>
					<td class="port-input">
						<text-input
							class="port"
							placeholder="Label"
							.init=${p.label}
							@input=${this.updatePortLabel.bind(this, i)}
						></text-input>
					</td>
					<td>
						${p.port.protocol == Rivet.cloud.version.matchmaker.PortProtocol.Udp
							? html`<div class="port-range">
									<text-input
										class="port short"
										placeholder="Start"
										number
										.min=${MIN_HOST_PORT}
										.max=${MAX_HOST_PORT}
										.init=${p.port.portRange.min.toString()}
										@input=${this.updatePortRange.bind(this, i, 'min')}
									></text-input
									><span>-</span
									><text-input
										class="port short"
										placeholder="End"
										number
										.min=${MIN_HOST_PORT}
										.max=${MAX_HOST_PORT}
										.init=${p.port.portRange.max.toString()}
										@input=${this.updatePortRange.bind(this, i, 'max')}
									></text-input>
							  </div>`
							: html`<text-input
									class="port short"
									placeholder="Port"
									number
									.min=${1}
									.max=${65535}
									.init=${p.port.port.toString()}
									@input=${this.updatePort.bind(this, i)}
							  ></text-input>`}
					</td>
					<td>
						<drop-down-list
							.selection=${PORT_PROTOCOLS.find(pr => pr.value == p.port.protocol)}
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
		} else {
			return html`<tr>
				<td>
					<div class="immut-info">
						<p class="label">${p.label}</p>
					</div>
				</td>
				<td>
					${p.port.protocol == Rivet.cloud.version.matchmaker.PortProtocol.Udp
						? html`<p class="immut-info">${p.port.portRange.min} - ${p.port.portRange.max}</p>`
						: html`<p class="immut-info">${p.port.port}</p>`}
				</td>
				<td>
					<p class="immut-info protocol">${p.port.protocol.toUpperCase()}</p>
				</td>
			</tr>`;
		}
	}

	renderErrors() {
		let errors = this.errors.findShallowFormatted();

		return errors.length ? html`<error-list .errors=${errors}></error-list>` : null;
	}
}
