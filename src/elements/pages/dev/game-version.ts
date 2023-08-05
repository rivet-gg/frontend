import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../../utils/css';
import styles from './game-version.scss';
import routes, { responses } from '../../../routes';
import global from '../../../utils/global';
import * as cloud from '@rivet-gg/api-internal/api/resources/cloud';
import { showAlert } from '../../../ui/helpers';
import settings from '../../../utils/settings';
import UIRouter from '../../root/ui-router';
import { DropDownSelectEvent } from '../../dev/drop-down-list';
import { globalEventGroups } from '../../../utils/global-events';
import { Orientation } from '../../common/overlay-positioning';

@customElement('page-dev-game-version')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	versionId: string;

	@property({ type: Object })
	version: cloud.version.Full = null;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: String })
	namespaceSelection: string = null;

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch tier options
		let res = await global.api.cloud.tiers.getRegionTiers();
		this.tiers = res.tiers;
	}

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('versionId')) {
			this.resetData();
			this.fetchData();
		}
	}

	resetData() {
		this.version = null;
		this.loadError = null;
	}

	async fetchData() {
		try {
			let res = await global.api.cloud.games.versions.getGameVersionById(
				this.game.gameId,
				this.versionId
			);
			this.version = res.version;
		} catch (err) {
			this.loadError = err;
		}
	}

	changeNamespaceSelection(event: DropDownSelectEvent<string>) {
		this.namespaceSelection = event.selection.value;

		showAlert(
			'Deploy version',
			html`<p>
				Are you sure you want to deploy version <b>${this.version.displayName}</b> to namespace
				<b>${event.selection.label}</b>?
			</p>`,
			[
				{
					label: 'No'
				},
				{
					label: 'Yes',
					cb: this.deployToNamespace.bind(this)
				}
			]
		);
	}

	async deployToNamespace() {
		await global.cloud.updateGameNamespaceVersion({
			gameId: this.game.gameId,
			namespaceId: this.namespaceSelection,
			versionId: this.version.versionId
		});
	}

	async overwriteAlert() {
		showAlert(
			'Duplicate version',
			html`You currently have a version draft in progress. Duplicating this version will overwrite the
			saved draft.`,
			[
				{
					label: 'Cancel',
					cb: () => globalEventGroups.dispatch('alert-panel-close', false)
				},
				{
					label: 'Continue',
					destructive: true,
					cb: () => globalEventGroups.dispatch('alert-panel-close', true)
				}
			]
		);

		// Use either a button press or dim area click to resolve promise
		return globalEventGroups.await('alert-panel-close');
	}

	// Duplicate latest version
	async duplicateVersion() {
		let strDraft = settings.getVersionConfigDraft(this.game.gameId);

		// Ask the identity if they want to overwrite the current saved draft
		if (strDraft && strDraft.length != 0) {
			let res = (await this.overwriteAlert()).value;

			if (!res) return;
		}

		let nextBuildName;
		let buildNoMatch = this.version.displayName.trim().match(/\(\s*\d+\s*\)$/);

		// Check for a build number in the title
		if (buildNoMatch) {
			let buildNo = parseInt(buildNoMatch[0].slice(1));
			nextBuildName = `${this.version.displayName.replace(/\s*\(\s*\d+\s*\)$/, '')} (${buildNo + 1})`;
		} else {
			nextBuildName = `${this.version.displayName} (2)`;
		}

		// Update version draft that we'll render
		settings.setVersionConfigDraft(
			this.game.gameId,
			JSON.stringify({
				displayName: nextBuildName,
				config: this.version.config
			})
		);

		// Switch to draft view
		UIRouter.shared.navigate(routes.devVersionDraft.build({ gameId: this.game.gameId }));
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.version == null) return this.renderPlaceholder();

		let namespaceOptions = this.game.namespaces
			.filter(n => n.versionId != this.version.versionId)
			.map(n => ({
				label: n.displayName,
				value: n.namespaceId
			}));

		return html`
			<div id="base">
				<div id="subtitle-area">
					<p id="date">
						Created: <date-display .timestamp=${this.version.createTs}></date-display>
					</p>
					<stylized-button
						id="duplicate-button"
						icon="regular/clone"
						.trigger=${this.duplicateVersion.bind(this)}
						>Duplicate</stylized-button
					>
				</div>
				<h2>Active namespaces</h2>
				<div id="namespaces">
					${repeat(
						this.game.namespaces.filter(n => n.versionId == this.version.versionId),
						n => n.namespaceId,
						n => html` <a
							class="namespace"
							href=${routes.devNamespace.build({
								gameId: this.game.gameId,
								namespaceId: n.namespaceId
							})}
						>
							<div class="font-semibold">${n.displayName}</div>
							<e-svg src="solid/arrow-right"></e-svg>
						</a>`
					)}
					<div id="deploy-namespace">
						<div class="font-semibold">Deploy to namespace:</div>
						<drop-down-list
							.options=${namespaceOptions}
							.orientation=${Orientation.TopRight}
							@select=${this.changeNamespaceSelection.bind(this)}
						></drop-down-list>
					</div>
				</div>

				<h2>Services</h2>
				<dev-version-info
					.game=${this.game}
					.tiers=${this.tiers}
					.config=${this.version.config}
				></dev-version-info>
			</div>
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-subtitle-area">
				<loading-placeholder id="placeholder-date"></loading-placeholder>
				<loading-placeholder id="placeholder-duplicate"></loading-placeholder>
			</div>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<div id="placeholder-namespaces">
				<loading-placeholder></loading-placeholder>
				<loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder class="placeholder-service"></loading-placeholder>
			<loading-placeholder class="placeholder-service"></loading-placeholder>
		</div> `;
	}
}
