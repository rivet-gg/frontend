import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { choose } from 'lit/directives/choose.js';
import { cssify } from '../../../../utils/css';
import styles from './rvt-namespace-settings.scss';
import routes, { responses } from '../../../../routes';
import global from '../../../../utils/global';
import * as cloud from '@rivet-gg/cloud';
import utils from '../../../../utils/utils';
import { DropDownSelectEvent, DropDownSelection } from '../../../dev/drop-down-list';
import { showAlert, tooltip } from '../../../../ui/helpers';
import { styleMap } from 'lit/directives/style-map.js';
import logging from '../../../../utils/logging';
import * as uuid from 'uuid';
import TextInput, { InputChangeEvent, InputUpdateEvent } from '../../../dev/text-input';
import timing, { Debounce } from '../../../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../utils/traversable-errors';
import { ToggleSwitchEvent } from '../../../common/toggle-switch';
import bcrypt from 'bcryptjs';
import { Orientation } from '../../../common/overlay-positioning';
import { globalEventGroups } from '../../../../utils/global-events';

const DOMAIN_REGEX = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
const PROTOCOL_REGEX = /^\w+:/;
const SALT = bcrypt.genSaltSync(10);

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

const LOBBY_COUNT_MAX = 32768 - 1;

const CDN_AUTH_USER_MAX = 32;

@customElement('rvt-namespace-settings')
export default class RvtNamespaceSettings extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;
	// TODO: add type back
	@property({ type: Object })
	versionHistory: any[] = [];
	@property({ type: Object })
	loadError?: any;

	// === DEV TOKEN INFO ===
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

	@property({ type: Array })
	devTokenPortIds: string[] = [];

	@property({ type: String })
	devTokenHostname = '127.0.0.1';

	@queryAll('.port-input > text-input')
	portInputs: HTMLElement[];

	@property({ type: Boolean })
	devTokensValid = true;

	// === MAX COUNTS INFO ===
	@property({ type: String })
	mmConfigValidationErrors: TraversableErrors = new TraversableErrors(
		VALIDATION_ERRORS.GAME_NAMESPACE_CONFIG
	);

	@property({ type: Boolean })
	mmConfigAreValid = false;

	@property({ type: Number })
	lobbyCountMax = 0;
	@property({ type: Number })
	maxPlayerCountPerClient = 0;

	// === DEBOUNCE INFO ===
	validateDevTokenConfigDebounce: Debounce<
		() => ReturnType<typeof global.cloud.validateGameNamespaceTokenDevelopment>
	>;
	validateMmConfigConfigDebounce: Debounce<
		() => ReturnType<typeof global.cloud.validateGameNamespaceMatchmakerConfig>
	>;

	// === CUSTOM DOMAIN INFO ===
	@query('#custom-domain-input')
	customDomainInput: TextInput;

	@property({ type: Boolean })
	tooManyPendingHostnames = false;

	@property({ type: Boolean })
	hostnameTaken = false;

	@property({ type: Boolean })
	customHostnameModalActive = false;

	@property({ type: String })
	customHostnameValue: string = null;

	@property({ type: Boolean })
	isCreatingCustomHostname = false;

	// === CUSTOM AUTH USER INFO ===
	@queryAll('#auth-users text-input')
	authUserInputs: HTMLElement[];

	@property({ type: Array })
	authUserIds: string[] = [];

	@property({ type: Object })
	authUserPasswords: Map<string, string> = new Map();

	@property({ type: Object })
	savedAuthUserIndicators: Set<string> = new Set();

	constructor() {
		super();

		this.validateDevTokenConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.cloud.validateGameNamespaceTokenDevelopment({
					gameId: this.game.gameId,
					namespaceId: this.namespaceId,
					hostname: this.devTokenHostname,
					lobbyPorts: this.devTokenPorts
				});
			},
			completeCb: res => {
				// Save errors
				this.devTokenValidationErrors.load(res.errors.map(err => err.path));
				this.devTokensValid = this.devTokenValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('devTokenValidationErrors');
			}
		});
		this.validateDevTokenConfigDebounce.onError(err => {
			globalEventGroups.dispatch('error', err);
			this.devTokensValid = false;
		});

		this.validateMmConfigConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.cloud.validateGameNamespaceMatchmakerConfig({
					gameId: this.game.gameId,
					namespaceId: this.namespace.namespaceId,
					lobbyCountMax: this.lobbyCountMax,
					maxPlayers: this.maxPlayerCountPerClient
				});
			},
			completeCb: async res => {
				// Save errors
				this.mmConfigValidationErrors.load(res.errors.map(err => err.path));
				this.mmConfigAreValid = this.mmConfigValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('mmConfigValidationErrors');

				// Automatically update values if valid
				if (this.mmConfigAreValid) {
					try {
						await global.cloud.updateGameNamespaceMatchmakerConfig({
							gameId: this.game.gameId,
							namespaceId: this.namespace.namespaceId,
							lobbyCountMax: this.lobbyCountMax,
							maxPlayers: this.maxPlayerCountPerClient
						});
					} catch (err) {
						globalEventGroups.dispatch('error', err);
					}
				}
			}
		});
		this.validateMmConfigConfigDebounce.onError(async err => {
			globalEventGroups.dispatch('error', err);
			this.devTokensValid = false;
		});
	}

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchData();
		}
	}

	resetData() {
		this.namespace = null;
		this.version = null;
		this.versionHistory.length = 0;

		this.loadError = null;
	}

	async fetchData() {
		try {
			let namespaceRes = await global.cloud.getGameNamespaceById({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId
			});

			let [versionRes] = await Promise.all([
				global.cloud.getGameVersionById({
					gameId: this.game.gameId,
					versionId: namespaceRes.namespace.versionId
				})
				// global.api.cloud.games.namespaces.getGameNamespaceVersionHistoryList(
				// 	this.game.gameId,
				// 	this.namespaceId,
				// 	{ limit: 10 }
				// )
			]);

			this.namespace = namespaceRes.namespace;
			this.version = versionRes.version;
			// this.versionHistory = versionHistoryRes.versions;

			this.authUserIds = this.namespace.config.cdn.authUserList.map(() => uuid.v4());

			this.lobbyCountMax = this.namespace.config.matchmaker.lobbyCountMax;
			this.maxPlayerCountPerClient = this.namespace.config.matchmaker.maxPlayersPerClient;
		} catch (err) {
			logging.error('Error fetching data', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async updateVersion(versionId: string) {
		try {
			await global.cloud.updateGameNamespaceVersion({
				gameId: this.game.gameId,
				namespaceId: this.namespace.namespaceId,
				versionId
			});

			this.resetData();
			this.fetchData();
		} catch (err) {
			logging.error('Error updating version', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async createPublicToken() {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenPublic({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId
			});

			showAlert(
				'Namespace Public Token Creation',
				html` <span
						>Copy this token to your clipboard. You will not be able to access this token
						again.</span
					>
					<br />
					<copy-area light confidential>
						<code class="no-ligatures">${createRes.token}</code>
					</copy-area>`
			);
		} catch (err) {
			logging.error('error creating public token', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async createDevToken() {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenDevelopment({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				hostname: this.devTokenHostname,
				lobbyPorts: this.devTokenPorts
			});

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
			globalEventGroups.dispatch('error', err);
		} finally {
			this.devTokenModalClose();
		}
	}

	openDevTokenModal() {
		this.devTokenModalActive = true;
	}

	devTokenModalClose() {
		this.devTokenModalActive = false;
	}

	downloadEnvFile(token: string) {
		utils.downloadData('_env', `RIVET_TOKEN=${token}`);
	}

	validateDomain(domain: string) {
		if (PROTOCOL_REGEX.test(domain)) return 'Do not include web protocol in domain';

		if (!DOMAIN_REGEX.test(domain)) return 'Invalid domain';

		let dupeCount = this.namespace.config.cdn.domains.reduce(
			(s, d) => s + (d.domain == domain ? 1 : 0),
			0
		);
		if (dupeCount) return 'Domain not unique';

		return null;
	}

	customHostnameInput(event: InputUpdateEvent) {
		this.customHostnameValue = event.value.trim();
		this.hostnameTaken = false;
	}

	async addCustomHostname() {
		let domain = this.customHostnameValue;

		try {
			this.hostnameTaken = false;
			this.tooManyPendingHostnames = false;

			await global.cloud.addNamespaceDomain({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				domain
			});

			this.fetchData();
			this.customHostnameModalClose();
		} catch (err) {
			logging.error('error creating domain', err);

			if (err.code == 'CLOUD_TOO_MANY_PENDING_HOSTNAMES_FOR_GROUP') {
				this.tooManyPendingHostnames = true;
				this.customHostnameModalClose();
			} else if (err.code == 'CLOUD_HOSTNAME_TAKEN') {
				this.hostnameTaken = true;
			} else {
				globalEventGroups.dispatch('error', err);
			}
		}
	}

	async removeCustomHostname(domain: string) {
		try {
			this.hostnameTaken = false;
			this.tooManyPendingHostnames = false;

			await global.cloud.removeNamespaceDomain({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				domain
			});

			let idx = this.namespace.config.cdn.domains.findIndex(d => d.domain == domain);
			if (idx != -1) this.namespace.config.cdn.domains.splice(idx, 1);

			this.requestUpdate();
		} catch (err) {
			logging.error('error removing domain', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	openCustomHostnameModal() {
		this.customHostnameModalActive = true;
	}

	customHostnameModalClose() {
		this.customHostnameModalActive = false;
		this.customHostnameValue = '';

		this.customDomainInput.clear();
	}

	async toggleEnableDomainPublicAuth(e: ToggleSwitchEvent) {
		try {
			await global.cloud.toggleNamespaceDomainPublicAuth({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				enabled: e.value
			});
		} catch (err) {
			logging.error('error toggling domain public auth', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	validateAuthUserUsername(authUsername: string) {
		if (!authUsername || !authUsername.trim()) return 'Invalid username';

		let dupeCount = this.namespace.config.cdn.authUserList.reduce(
			(s, u) => s + (u.user == authUsername ? 1 : 0),
			0
		);

		if (dupeCount > 1) return 'Username not unique';

		return null;
	}

	validateAuthUserPassword(authPassword: string) {
		if (!authPassword || !authPassword.trim()) return 'Invalid password';

		return null;
	}

	async authUserChanged(idx: number, isPassword: boolean, event: InputChangeEvent) {
		let value = event.value.trim();

		let id = this.authUserIds[idx];
		let oldUsername = this.namespace.config.cdn.authUserList[idx].user;
		let oldPassword = this.authUserPasswords.get(id);

		// Value updated before validation for visual error
		if (isPassword) this.authUserPasswords.set(id, value);
		else this.namespace.config.cdn.authUserList[idx].user = value;

		this.requestUpdate();

		try {
			let username = isPassword ? oldUsername : value;
			let password = isPassword ? value : oldPassword;

			// Remove old value, if it was valid
			if (!isPassword && oldUsername.trim() && this.validateDomain(oldUsername) === null) {
				await global.cloud.removeNamespaceCdnAuthUser({
					gameId: this.game.gameId,
					namespaceId: this.namespaceId,
					user: oldUsername
				});
			}

			// Update/add value if its valid
			if (
				value &&
				this.validateAuthUserUsername(username) === null &&
				this.validateAuthUserPassword(password) === null
			) {
				await global.cloud.updateNamespaceCdnAuthUser({
					gameId: this.game.gameId,
					namespaceId: this.namespaceId,
					user: username,
					password: bcrypt.hashSync(password, SALT)
				});

				// Add indicator to list
				this.savedAuthUserIndicators.add(id);
				this.requestUpdate('savedAuthUserIndicators');

				// Fade indicator after 2 seconds
				setTimeout(() => {
					this.savedAuthUserIndicators.delete(id);
					this.requestUpdate('savedAuthUserIndicators');
				}, timing.seconds(2));
			}
		} catch (err) {
			logging.error('error updating auth user', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async authUserKeyDown(idx: number, isPassword: boolean, event: KeyboardEvent) {
		let target = event.target as HTMLInputElement;
		let value = target.value.trim();

		let id = this.authUserIds[idx];
		let oldUsername = this.namespace.config.cdn.authUserList[idx].user;
		let oldPassword = this.authUserPasswords.get(id);

		let username = isPassword ? oldUsername : value;
		let password = isPassword ? value : oldPassword;

		if (value && event.key == 'Tab') {
			// Value updated before validation for visual error
			if (isPassword) this.authUserPasswords.set(id, value);
			else this.namespace.config.cdn.authUserList[idx].user = value;

			this.requestUpdate();
		}

		if (
			this.validateAuthUserUsername(username) === null &&
			this.validateAuthUserPassword(password) === null &&
			(event.key == 'Enter' || event.key == 'Tab')
		) {
			event.preventDefault();
			target.blur();
			this.addAuthUser();
		}
	}

	addAuthUser() {
		this.namespace.config.cdn.authUserList.push({
			user: ''
		});
		this.authUserIds.push(uuid.v4());

		this.requestUpdate();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.authUserInputs[this.authUserInputs.length - 2];
			if (lastInput) lastInput.focus();
		});
	}

	async removeAuthUser(idx: number) {
		let authUser = this.namespace.config.cdn.authUserList[idx].user;

		let dupeCount = this.namespace.config.cdn.authUserList.reduce(
			(s, u) => s + (u.user == authUser ? 1 : 0),
			0
		);

		// Do not send any removal requests if this user is a duplicate, removing
		// it like this will leave the original
		if (dupeCount > 1) {
			this.namespace.config.cdn.authUserList.splice(idx, 1);
			this.authUserIds.splice(idx, 1);

			this.requestUpdate();

			return;
		}

		try {
			// Only send request if not empty
			if (authUser.trim()) {
				await global.cloud.removeNamespaceCdnAuthUser({
					gameId: this.game.gameId,
					namespaceId: this.namespaceId,
					user: authUser
				});
			}

			this.namespace.config.cdn.authUserList.splice(idx, 1);
			this.authUserIds.splice(idx, 1);

			this.requestUpdate();
		} catch (err) {
			logging.error('error removing auth user', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	async toggleCdnBasicAuth(e: ToggleSwitchEvent) {
		try {
			let newAuthType = e.value ? cloud.CdnAuthType.BASIC : cloud.CdnAuthType.NONE;
			await global.cloud.setNamespaceCdnAuthType({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				authType: newAuthType
			});

			// Fake update the value
			this.namespace.config.cdn.authType = newAuthType;
			this.requestUpdate('namespace');
		} catch (err) {
			logging.error('error setting cdn auth type', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	changeHostName(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.devTokenHostname = target.value;

		this.validateDevTokenConfigDebounce.trigger();
	}

	// MARK: Port
	updatePort(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.devTokenPorts[idx].targetPort = value;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortLabel(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.devTokenPorts[idx].label = target.value;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortProtocol(idx: number, event: DropDownSelectEvent<cloud.ProxyProtocol>) {
		this.devTokenPorts[idx].proxyProtocol = event.selection.value;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	removePort(idx: number) {
		this.devTokenPorts.splice(idx, 1);
		this.devTokenPortIds.splice(idx, 1);

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	createPort() {
		this.devTokenPorts.push({
			label: 'default',
			targetPort: 8080,
			proxyProtocol: cloud.ProxyProtocol.HTTP
		});
		this.devTokenPortIds.push(uuid.v4());

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.portInputs[this.portInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	updateLobbyCountMax(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.lobbyCountMax = value;

		this.validateMmConfigConfigDebounce.trigger();
	}

	updateMaxPlayersPerClient(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.maxPlayerCountPerClient = value;

		this.validateMmConfigConfigDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		// Version select
		let currentVersionName = this.game.versions.find(
			v => this.namespace.versionId == v.versionId
		).displayName;
		let version = {
			label: currentVersionName || 'null',
			value: this.namespace.versionId
		};
		let versionOptions = this.game.versions.map(v => ({
			label: v.displayName,
			value: v.versionId
		}));

		// Create visit link
		let visitHost: string;
		let visitUrl: string;
		if (this.namespace.nameId == 'prod') {
			visitHost = `${this.game.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		} else {
			visitHost = `${this.game.nameId}--${this.namespace.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		}

		return html`
			<div id="base" class="flex flex-col px-16 pt-6 text-slate-300 flex-wrap overflow-x-scroll">
				<rvt-namespace-header
					.game=${this.game}
					.namespace=${this.namespace}
					.version=${this.version}
					class="mb-6"
				></rvt-namespace-header>
				<h1>Version</h1>
				<a
					id="version"
					href=${routes.devVersion.build({
						gameId: this.game.gameId,
						versionId: this.namespace.versionId,
						namespaceId: this.namespace.namespaceId
					})}
				>
					<h3>${currentVersionName}</h3>
					<e-svg src="solid/arrow-right"></e-svg>
				</a>
				${this.renderVersionHistory()}
				<div id="version-select">
					<h2>Deploy version</h2>
					<drop-down-list
						.selection=${version}
						.options=${versionOptions}
						.orientation=${Orientation.TopRight}
						@select=${async (event: DropDownSelectEvent<string>) => {
							await this.updateVersion(event.selection.value);
						}}
					></drop-down-list>
				</div>

				<h1>Overview</h1>

				${this.renderMatchmakerSettings()} ${this.renderCdnSettings(visitHost)}

				<h1>Tokens</h1>
				<div id="tokens">
					<stylized-button .trigger=${this.createPublicToken.bind(this)}
						>Create Public Token</stylized-button
					>
					<stylized-button .trigger=${this.openDevTokenModal.bind(this)}
						>Create Development Token</stylized-button
					>
				</div>
			</div>

			${this.renderCreateCustomHostnameModal()} ${this.renderCreateDevTokenModal()}
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<loading-placeholder id="placeholder-visit"></loading-placeholder>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder id="placeholder-version"></loading-placeholder>
			<loading-placeholder id="placeholder-version-history"></loading-placeholder>
			<loading-placeholder id="placeholder-version-select"></loading-placeholder>
			<loading-placeholder class="placeholder-controller"></loading-placeholder>
			<loading-placeholder class="placeholder-controller"></loading-placeholder>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder class="placeholder-button"></loading-placeholder>
		</div>`;
	}

	renderVersionHistory() {
		if (!this.versionHistory.length) return null;

		return html`<div id="version-history">
			<h2>Version History</h2>
			<table>
				<tr>
					<th></th>
					<th></th>
					<th></th>
				</tr>
				${repeat(
					this.versionHistory,
					v => v.versionId,
					v => {
						let displayName = this.game.versions.find(
							v2 => v2.versionId == v.versionId
						).displayName;

						return html`<tr class="version">
							<td><h3>${displayName}</h3></td>
							<td><date-display .timestamp=${v.deployTs}></date-display></td>
							<td>
								<div class="right">
									<stylized-button
										?disabled=${this.version.versionId == v.versionId}
										.trigger=${this.updateVersion.bind(this, v.versionId)}
										>Revert</stylized-button
									>
								</div>
							</td>
						</tr>`;
					}
				)}
			</table>
		</div>`;
	}

	renderMatchmakerSettings() {
		if (!this.version.config.matchmaker) return null;

		let mmConfigErrors = this.mmConfigValidationErrors.findFormatted();

		return html`<div class="setting">
				<div class="setting-content">
					<h2>
						<e-svg
							preserve
							non-icon
							src="/products2/matchmaker-duotone"
							@mouseenter=${tooltip('Matchmaker')}
						></e-svg>
						Max Lobby Count
					</h2>
					<p>Control the total maximum lobby count for this namespace.</p>
					${when(
						mmConfigErrors.length,
						() => html`<error-list .errors=${mmConfigErrors}></error-list>`
					)}
					<div id="counts">
						<div class="count">
							<h5>Max Lobby Count</h5>
							<text-input
								class="short"
								number
								placeholder="Count"
								.init=${this.namespace.config.matchmaker.lobbyCountMax}
								.min=${1}
								.max=${LOBBY_COUNT_MAX}
								@input=${this.updateLobbyCountMax.bind(this)}
							></text-input>
						</div>
					</div>
				</div>
			</div>
			<div class="setting">
				<div class="setting-content">
					<h2>
						<e-svg
							preserve
							non-icon
							src="/products2/matchmaker-duotone"
							@mouseenter=${tooltip('Matchmaker')}
						></e-svg>
						Max Player Count Per IP
					</h2>
					<p>Control the maximum player count per IP.</p>
					${when(
						mmConfigErrors.length,
						() => html`<error-list .errors=${mmConfigErrors}></error-list>`
					)}
					<div id="counts">
						<div class="count">
							<h5>Max Player Count</h5>
							<text-input
								class="short"
								number
								placeholder="Count"
								.init=${this.namespace.config.matchmaker.maxPlayersPerClient}
								.min=${1}
								@input=${this.updateMaxPlayersPerClient.bind(this)}
							></text-input>
						</div>
					</div>
				</div>
			</div>`;
	}

	renderCdnSettings(visitHost: string) {
		if (!this.version.config.cdn) return null;

		let customHostnameErrors: string[] = [];
		if (this.tooManyPendingHostnames) {
			customHostnameErrors.push(
				'Too many pending domains for this developer group. Please wait until they are verified before adding more domains.'
			);
		}

		let authUserListClasses = classMap({
			'input-list': true,
			disabled: this.namespace.config.cdn.authType == cloud.CdnAuthType.NONE
		});

		return html`<div class="setting">
				<div class="setting-content">
					<h2>
						<e-svg
							preserve
							non-icon
							src="/products2/cdn-duotone"
							@mouseenter=${tooltip('CDN')}
						></e-svg>
						Custom Domains
					</h2>
					${when(
						customHostnameErrors.length,
						() => html`<error-list .errors=${customHostnameErrors}></error-list>`
					)}
					<ol class="selectable">
						<li>
							Add a <code>CNAME</code> record pointed at <code>${visitHost}</code> to your
							domain's DNS config.
						</li>
						<li>Add your domain below.</li>
						<li>
							Once added, your domain will be verified by Cloudflare. This should take around 5
							minutes.
						</li>
					</ol>
					<table id="domains">
						${when(
							this.namespace.config.cdn.domains.length,
							() =>
								html`<tr>
										<th>Hostname</th>
										<th>Created</th>
										<th>Status</th>
										<th>
											<icon-button
												id="refresh-button"
												src="solid/rotate-left"
												custom
												@mouseenter=${tooltip('Refresh')}
												.trigger=${this.fetchData.bind(this)}
											></icon-button>
										</th>
									</tr>
									${this.namespace.config.cdn.domains.map((d, i) =>
										this.renderDomain(d, i)
									)}`
						)}
					</table>

					${when(
						this.namespace.config.cdn.domains.length < 10,
						() =>
							html`<dashed-button
								id="add-domain"
								icon="solid/plus"
								.trigger=${this.openCustomHostnameModal.bind(this)}
								>Add domain</dashed-button
							>`
					)}
				</div>
			</div>
			<div class="setting">
				<toggle-switch
					?value=${this.namespace.config.cdn.enableDomainPublicAuth}
					@toggle=${this.toggleEnableDomainPublicAuth.bind(this)}
				></toggle-switch>
				<div class="setting-content">
					<h2>
						<e-svg
							preserve
							non-icon
							src="/products2/cdn-duotone"
							@mouseenter=${tooltip('CDN')}
						></e-svg>
						Domain-based authentication
					</h2>
					<p>
						Allows for clients to authenticate with this namespace based on the domain they make
						requests from. This should only be used for namespaces intended to be publicly
						accessible.
						<br />
						<a
							class="link learn-more"
							href="https://docs.rivet.gg/general/concepts/domain-based-authentication"
							target="_blank"
							>Learn More</a
						>
					</p>
				</div>
			</div>
			<div class="setting">
				<toggle-switch
					?value=${this.namespace.config.cdn.authType != cloud.CdnAuthType.NONE}
					@toggle=${this.toggleCdnBasicAuth.bind(this)}
				></toggle-switch>
				<div class="setting-content">
					<h2>
						<e-svg
							preserve
							non-icon
							src="/products2/cdn-duotone"
							@mouseenter=${tooltip('CDN')}
						></e-svg>
						Password authentication
					</h2>
					<p>
						Restricts CDN access to select authenticated users. Authentication is done via HTTP
						basic access authentication. Once this page is refreshed, none of the entered
						passwords will show up here. You can edit the password for any given user by inputting
						a new one.
					</p>
					<div id="auth-users" class=${authUserListClasses}>
						${repeat(
							this.namespace.config.cdn.authUserList,
							(_, i) => this.authUserIds[i],
							(u, i) => {
								let id = this.authUserIds[i];
								let password = this.authUserPasswords.get(id);
								let errors = [
									this.validateAuthUserUsername(u.user),
									...(this.authUserPasswords.has(id)
										? [this.validateAuthUserPassword(password)]
										: [])
								].filter(Boolean);
								let indicatorStyle = styleMap({
									opacity: this.savedAuthUserIndicators.has(id) ? '1' : '0'
								});

								return html`<div class="input-row">
									<div class="input-controller">
										<text-input
											placeholder="Username"
											.init=${u.user}
											@keydown=${this.authUserKeyDown.bind(this, i, false)}
											@change=${this.authUserChanged.bind(this, i, false)}
										></text-input>
										<text-input
											placeholder="Password"
											.init=${password ?? ''}
											.maxlength=${72}
											@keydown=${this.authUserKeyDown.bind(this, i, true)}
											@change=${this.authUserChanged.bind(this, i, true)}
										></text-input>
										<icon-button
											src="solid/xmark"
											small
											.trigger=${this.removeAuthUser.bind(this, i)}
										></icon-button>
										<div class="status saved" style=${indicatorStyle}>
											<e-svg src="solid/check"></e-svg> Saved
										</div>
									</div>
									${when(
										u.user.trim() && errors.length,
										() => html`<error-list .errors=${errors}></error-list>`
									)}
								</div>`;
							}
						)}
						${when(
							this.namespace.config.cdn.authUserList.length < CDN_AUTH_USER_MAX,
							() =>
								html`<dashed-button
									id="add-auth-user"
									icon="solid/plus"
									.trigger=${this.addAuthUser.bind(this)}
									>Add user</dashed-button
								>`
						)}
					</div>
				</div>
			</div>`;
	}

	renderDomain(d: cloud.CdnNamespaceDomain, i: number) {
		let errors = d.verificationErrors;
		let statusClasses = classMap({
			status: true,
			active: d.verificationStatus == cloud.CdnNamespaceDomainVerificationStatus.ACTIVE,
			pending: d.verificationStatus == cloud.CdnNamespaceDomainVerificationStatus.PENDING,
			failed: d.verificationStatus == cloud.CdnNamespaceDomainVerificationStatus.FAILED
		});

		return html`${when(
				d.domain.trim() && errors.length,
				() =>
					html`<tr>
						<td colspan="4">
							<error-list .errors=${errors}></error-list>
						</td>
					</tr>`
			)}
			<tr>
				<td>
					<h2>${d.domain}</h2>
				</td>
				<td>
					<p class="timestamp">
						<date-display .timestamp=${d.createTs}></date-display>
					</p>
				</td>
				<td>
					<h3 class=${statusClasses}>
						${choose(d.verificationStatus, [
							[
								cloud.CdnNamespaceDomainVerificationStatus.ACTIVE,
								() => html`<e-svg src="solid/check"></e-svg> Active`
							],
							[
								cloud.CdnNamespaceDomainVerificationStatus.PENDING,
								() => html`<loading-wheel custom></loading-wheel> Pending`
							],
							[
								cloud.CdnNamespaceDomainVerificationStatus.FAILED,
								() => html`<e-svg src="solid/xmark"></e-svg> Failed`
							]
						])}
					</h3>
				</td>
				<td>
					<icon-button
						src="solid/xmark"
						small
						.trigger=${this.removeCustomHostname.bind(this, d.domain)}
					></icon-button>
				</td>
			</tr>`;
	}

	renderCreateCustomHostnameModal() {
		let validationError = this.validateDomain(this.customHostnameValue);
		if (!validationError && this.hostnameTaken) {
			validationError = `Hostname has already been taken.`;
		}

		return html`<drop-down-modal
			id="create-custom-hostname-modal"
			?active=${this.customHostnameModalActive}
			@close=${this.customHostnameModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Add a custom domain</h1>
				<div class="input-group">
					<h2>Domain Address</h2>
					<text-input
						id="custom-domain-input"
						light
						placeholder="example.com"
						maxlength="64"
						@input=${this.customHostnameInput.bind(this)}
					></text-input>
					${when(
						validationError && this.customHostnameValue?.trim(),
						() => html`
							<span id="create-custom-hostname-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${validationError}</li>
							</span>`
					)}
				</div>
				<stylized-button .trigger=${this.addCustomHostname.bind(this)} ?disabled=${!!validationError}
					>Add</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
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
					${when(errors.length, () => html`<error-list .errors=${errors}></error-list>`)}
					<div id="port-mapping" class="light-scrollbar">
						<table id="ports">
							${when(
								this.devTokenPorts.length,
								() =>
									html`<tr>
											<th>Label</th>
											<th>Port</th>
											<th>Protocol</th>
										</tr>
										${repeat(
											this.devTokenPorts,
											(_, i) => this.devTokenPortIds[i],
											(p, i) => {
												let portErrors = this.devTokenValidationErrors.findFormatted(
													'ports',
													i
												);

												return html`${portErrors.length
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
																	pr => pr.value == p.proxyProtocol
																)}
																.options=${PORT_PROTOCOLS}
																.orientation=${Orientation.TopRight}
																@select=${this.updatePortProtocol.bind(
																	this,
																	i
																)}
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
											}
										)}`
							)}
						</table>
						${when(
							this.devTokenPorts.length < 16,
							() =>
								html`<dashed-button
									id="create-port"
									class="short"
									light
									centered
									icon="solid/plus"
									.trigger=${this.createPort.bind(this)}
									>Add port</dashed-button
								>`
						)}
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
