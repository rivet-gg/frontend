import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../../../../utils/css';
import styles from './game-version-draft.scss';
import { Rivet } from '@rivet-gg/api-internal';
import settings from '../../../../../utils/settings';
import logging from '../../../../../utils/logging';
import global from '../../../../../utils/global';
import UIRouter from '../../../../root/ui-router';
import routes from '../../../../../routes';
import { showAlert } from '../../../../../ui/helpers';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../../utils/traversable-errors';
import timing, { Debounce, wait } from '../../../../../utils/timing';
import { globalEventGroups } from '../../../../../utils/global-events';

export class UpdateConfigEvent extends Event {
	constructor(public config: Rivet.cloud.version.Config) {
		super('update');
	}
}

interface DraftSettings {
	config?: Rivet.cloud.version.Config;
	displayName?: string;
}

@customElement('page-dev-game-version-draft')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	tiers: Rivet.cloud.RegionTier[] = [];

	@property({ type: Boolean })
	isPublishing = false;

	@property({ type: Object })
	publishError?: any;
	@property({ type: Object })
	validateError?: any;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@property({ type: Object })
	publishNamespaces: Set<string> = new Set();

	nameValue = '';
	versionConfig: Rivet.cloud.version.Config;

	@property({ type: Boolean })
	versionIsValid = false;

	// === DEBOUNCE INFO ===
	validateConfigDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGameVersion>>;

	constructor() {
		super();

		this.validateConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = (this.nameValue || '').trim();

				return await global.api.cloud.games.versions.validateGameVersion(this.game.gameId, {
					displayName: displayName,
					config: this.versionConfig
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.versionIsValid = this.validationErrors.isEmpty();
				this.validateError = null;

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateConfigDebounce.onError((err: any) => {
			this.versionIsValid = false;
			this.validateError = err.body ?? err;
		});
	}

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch tier options
		let res = await global.api.cloud.tiers.getRegionTiers();
		this.tiers = res.tiers;

		this.versionConfig = this.readDraft().config;
		this.validateConfigDebounce.trigger();
	}

	readDraft(): DraftSettings {
		let strDraft = settings.getVersionConfigDraft(this.game.gameId);

		if (!strDraft || strDraft.length == 0) {
			// Duplicate latest version
			if (this.game.versions.length) this.getLatestVersion();

			// Blank draft
			return {};
		}

		try {
			let draft = JSON.parse(strDraft) as DraftSettings;
			this.migrateDraft(draft.config);

			this.nameValue = draft.displayName;

			return draft;
		} catch (err) {
			logging.warn('Failed to parse version config draft', err);
			return {};
		}
	}

	migrateDraft(config: Rivet.cloud.version.Config) {
		if (config.cdn) {
			if (!config.cdn.routes) config.cdn.routes = [];
		}

		if (config.matchmaker) {
			// Delete deprecated
			delete config.matchmaker.lobbyGroups;
		}
	}

	async saveDraft(config: Rivet.cloud.version.Config = this.versionConfig) {
		this.versionConfig = config;

		settings.setVersionConfigDraft(
			this.game.gameId,
			JSON.stringify({
				displayName: this.nameValue,
				config: config
			})
		);

		this.validateConfigDebounce.trigger();
	}

	clearDraft() {
		settings.setVersionConfigDraft(this.game.gameId, '');
	}

	confirmClearDraft() {
		showAlert(
			'Confirm Clear Draft',
			html`Are you sure you want to delete this draft? This action cannot be undone.`,
			[
				{
					label: 'No',
					cb: () => globalEventGroups.dispatch('alert-panel-close', false)
				},
				{
					label: 'Yes',
					destructive: true,
					cb: () => globalEventGroups.dispatch('alert-panel-close', true)
				}
			]
		);

		return globalEventGroups.await('alert-panel-close');
	}

	async clearDraftAction() {
		if ((await this.confirmClearDraft()).value) {
			this.nameValue = 'Blank Version';
			this.versionConfig = {};
			this.publishNamespaces.clear();
			this.saveDraft();

			this.requestUpdate('versionConfig');
		}
	}

	async getLatestVersion() {
		try {
			// Sort game versions by timestamp descending, get latest version
			this.game.versions.sort((a, b) => b.createTs.getTime() - a.createTs.getTime());
			let latest = this.game.versions[0];

			// Fetch full version config
			let config = (
				await global.api.cloud.games.versions.getGameVersionById(this.game.gameId, latest.versionId)
			).version.config;

			let nextBuildName;
			let buildNoMatch = latest.displayName.trim().match(/\(\s*\d+\s*\)$/);

			// Check for a build number in the title
			if (buildNoMatch) {
				let buildNo = parseInt(buildNoMatch[0].slice(1));
				nextBuildName = `${latest.displayName.replace(/\s*\(\s*\d+\s*\)$/, '')} (${buildNo + 1})`;
			} else {
				nextBuildName = `${latest.displayName} (2)`;
			}

			this.nameValue = nextBuildName;
			this.saveDraft(config);

			this.versionConfig = this.readDraft().config;
			this.validateConfigDebounce.trigger();
		} catch (err) {
			logging.error(err);
		}
	}

	async noNamespaceAlert() {
		showAlert(
			'Publish version',
			html`You have not selected any namespaces to deploy this new version to. Are you sure you want to
			publish without deploying?`,
			[
				{
					label: 'No',
					cb: () => globalEventGroups.dispatch('alert-panel-close', false)
				},
				{
					label: 'Yes',
					cb: () => globalEventGroups.dispatch('alert-panel-close', true)
				}
			]
		);

		return globalEventGroups.await('alert-panel-close');
	}

	async publishConfirmationAlert() {
		showAlert(
			`Confirm Publish ${this.nameValue}`,
			html`<version-publish-summary
				.game=${this.game}
				.tiers=${this.tiers}
				.namespaces=${Array.from(this.publishNamespaces)}
				.config=${this.versionConfig}
			></version-publish-summary>`,
			[
				{
					label: 'Cancel',
					cb: () => globalEventGroups.dispatch('alert-panel-close', false)
				},
				{
					label: 'Publish',
					cb: () => globalEventGroups.dispatch('alert-panel-close', true)
				}
			]
		);

		return globalEventGroups.await('alert-panel-close');
	}

	async publishVersion() {
		if (!this.versionIsValid) return;

		// Fetch publish namespaces before removing them from the DOM
		let publishNamespaces = this.publishNamespaces;

		// Ask identity if they want to deploy without any selected namespaces
		if (!publishNamespaces.size && this.game.namespaces.length) {
			if (!(await this.noNamespaceAlert()).value) return;

			// Stop alerts from colliding
			await wait(timing.milliseconds(325));
		}

		if (!(await this.publishConfirmationAlert()).value) return;

		this.publishError = null;
		this.isPublishing = true;

		try {
			// Create version
			let config = this.readDraft().config;
			logging.net('publishing version', this.game, config);

			let res = await global.api.cloud.games.versions.createGameVersion(this.game.gameId, {
				displayName: this.nameValue,
				config
			});

			let versionId = res.versionId;

			// Update namespaces
			console.log('ns', this.publishNamespaces);

			for (let namespaceId of publishNamespaces.values()) {
				logging.net('publishing namespace', namespaceId, versionId);

				await global.cloud.updateGameNamespaceVersion({
					gameId: this.game.gameId,
					namespaceId,
					versionId
				});
			}

			// Redirect to version page
			UIRouter.shared.navigate(
				routes.devVersion.build({
					gameId: this.game.gameId,
					versionId,
					namespaceId: this.namespaceId
				})
			);

			// Reset the stored draft
			this.clearDraft();
		} catch (err) {
			this.publishError = err;
			this.isPublishing = false;

			if (err.hasOwnProperty('statusText')) this.publishError = await err.json();
		}
	}

	nameInputChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.nameValue = target.value;

		// Save name
		this.saveDraft();
	}

	toggleNamespace(namespaceId: string) {
		if (this.publishNamespaces.has(namespaceId)) this.publishNamespaces.delete(namespaceId);
		else this.publishNamespaces.add(namespaceId);

		this.requestUpdate();
	}

	onConfigUpdate(event: UpdateConfigEvent) {
		this.saveDraft(event.config);
	}

	render() {
		if (this.isPublishing) return html`<loading-wheel message="Publishing..."></loading-wheel>`;

		let settings = this.readDraft();

		let displayNameErrors = this.validationErrors.findFormatted('display-name');

		return html`
			<div id="base">
				<div id="draft-buttons">
					<stylized-button
						id="publish-button"
						icon="solid/square-up"
						.trigger=${this.publishVersion.bind(this)}
						?disabled=${!this.versionIsValid}
						>Publish</stylized-button
					>
					<stylized-button
						id="clear-button"
						icon="solid/circle-minus"
						.trigger=${this.clearDraftAction.bind(this)}
						>Clear Draft</stylized-button
					>
				</div>
				${this.publishError || this.validateError
				? html`<error-list
							.errors=${[
						`${this.publishError ? 'Error publishing' : 'Validation error'}: ${(this.publishError || this.validateError).message
						}`
					]}
					  ></error-list>`
				: null}
				${displayNameErrors.length
				? html`<error-list .errors=${displayNameErrors}></error-list>`
				: null}
				<h1>Version properties</h1>
				<div id="input-area">
					<h3>Version Name</h3>
					<text-input
						id="display-name-input"
						.init=${settings.displayName || ''}
						placeholder="Enter a version name here"
						@input=${this.nameInputChange.bind(this)}
					></text-input>
				</div>

				${this.game.namespaces.length
				? html` <h1 id="namespace-title">Initiate namespaces</h1>
							<i id="namespace-subtitle">You can change this later</i>
							<div id="namespaces">
								${repeat(
					this.game.namespaces,
					n => n.namespaceId,
					n => {
						let selected = this.publishNamespaces.has(n.namespaceId);
						let classes = classMap({
							namespace: true,
							selected: selected
						});

						return html`<div
											class=${classes}
											@click=${this.toggleNamespace.bind(this, n.namespaceId)}
										>
											<h3>${n.displayName}</h3>
											<check-box ?checked=${selected}></check-box>
										</div>`;
					}
				)}
							</div>`
				: null}

				<h1>Services</h1>
				<dev-version-info
					.game=${this.game}
					.tiers=${this.tiers}
					.config=${settings.config}
					.errors=${this.validationErrors.branch('config')}
					editing
					@update=${this.onConfigUpdate.bind(this)}
				></dev-version-info>
			</div>
		`;
	}
}
