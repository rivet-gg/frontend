import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './namespace-version.scss';
import * as cloud from '@rivet-gg/cloud';
import global from '../../../utils/global';
import logging from '../../../utils/logging';
import { globalEventGroups } from '../../../utils/global-events';
import { responses } from '../../../routes';
import utils from '../../../utils/utils';
import { when } from 'lit/directives/when.js';

enum displayVersion {
	PRODUCTION = 'PRODUCTION',
	ALL = 'ALL',
}

@customElement('page-dev-namespace-version')
export default class DevNamespaceVersion extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull = null;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	// TODO: Add type here
	@property({ type: Object })
	versionHistory: any[] = [];

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	displayVersion: displayVersion = displayVersion.PRODUCTION;
	
	firstUpdated() {
		this.fetchData();
	}

	updated(changedProperties: PropertyValues) {
		// Request data if category set
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

			let [versionRes, versionHistoryRes] = await Promise.all([
				global.cloud.getGameVersionById({
					gameId: this.game.gameId,
					versionId: namespaceRes.namespace.versionId
				}),
				global.api.cloud.games.namespaces.getGameNamespaceVersionHistoryList(
					this.game.gameId,
					this.namespaceId,
					{ limit: 10 }
				),
			]);

			this.namespace = namespaceRes.namespace;
			this.version = versionRes.version;
			this.versionHistory = versionHistoryRes.versions;
			console.log("ns:", this.namespace)
			console.log("verison:", this.version)
			console.log("verisonhist:", this.versionHistory)

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
		</div>
		`;
	}


	// renderVersion(version: cloud.VersionSummary) {
	// 	// Collect active versions
	// 	let activeVersions = new Map<string, string[]>();
	// 	for (let namespace of this.game.namespaces) {
	// 		if (activeVersions.has(namespace.versionId))
	// 			activeVersions.get(namespace.versionId).push(namespace.displayName);
	// 		else activeVersions.set(namespace.versionId, [namespace.displayName]);
	// 	}
	// 	let isActive = activeVersions.has(version.versionId);
	// 	let classes = classMap({
	// 		version: true,
	// 		selected: version.versionId == this.versionId
	// 	});
	// 	let statusClasses = classMap({
	// 		status: true,
	// 		active: isActive
	// 	});

	// 	let activeNamespaces = Array.from(activeVersions.get(version.versionId) || []);

	// 	// Truncate list to 3
	// 	if (activeNamespaces.length > 3) {
	// 		let truncation = `and ${activeNamespaces.length - 3} more`;
	// 		activeNamespaces.length = 3;
	// 		activeNamespaces.push(truncation);
	// 	}

	// 	return html`<stylized-button
	// 		class=${classes}
	// 		href=${routes.devVersion.build({
	// 			gameId: this.game.gameId,
	// 			versionId: version.versionId
	// 		})}
	// 	>
	// 		<span class="display-name">${version.displayName}</span>
	// 		<div
	// 			class=${statusClasses}
	// 			@mouseenter=${isActive
	// 				? tooltip(`Active in: ${activeNamespaces.join(', ')}`)
	// 				: tooltip('No active namespaces')}
	// 		></div>
	// 	</stylized-button>`;
	// }

	renderVersionEntry(version: cloud.VersionFull | cloud.VersionSummary, showRollback: boolean = true, extraInfo: boolean = false): TemplateResult {
		return html`
			<div class="flex flex-row place-content-between py-2">
				<div class="mr-auto align-middle flex flex-row space-x-8 py-2">
					<h4 class="my-auto text-slate-200 text-lg font-semibold">${version.displayName}</h4>
					<h4 class="my-auto text-white/40 text-lg font-extralight italic">${utils.formatDateLong(version.createTs)}</h4>
				</div>
				${
					when(showRollback, () => {
						return html`
							<stylized-button @click=${() => this.updateVersion(version.versionId)}>Rollback</stylized-button>
						`
					})
				}
			</div>
		`
	}

	renderPreviousVersions(): TemplateResult {
		return html`
			${
				[...this.versionHistory, this.version].sort((a, b) => b.createTs.getTime() - a.createTs.getTime()).map(version => {
					return html`${this.renderVersionEntry(version, this.version.versionId !== version.versionId)}`
				})
			}
		`;
	}

	renderAllVersions(): TemplateResult {
		return html`
			${this.game.versions.sort((a, b) => b.createTs.getTime() - a.createTs.getTime()).map(version => {
			return html`${this.renderVersionEntry(version, this.version.versionId !== version.versionId, true)}`
			})}
		`;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		return html`
			<div class="flex flex-col px-16 pt-6 text-slate-300">
				<div class="flex flex-row place-content-end mr-auto">
					<div>
						<h3 class="text-3xl text-white">${this.namespace.displayName}</h3>
						<div class="flex flex-col text-lg">
							<h4 class="font-light italic text-white/40">${this.version.displayName}</h4>
							<h4 class="font-light italic text-white/40">${utils.formatDateLong(this.version.createTs)}</h4>
						</div>
					</div>
				</div>

				<div class="py-6 flex flex-row w-1/2 space-x-3">
					<stylized-button class="mt-auto" @click=${ () => { this.displayVersion=displayVersion.PRODUCTION }}>Previous Production Versions</stylized-button>
					<stylized-button class="mt-auto" @click=${ () => { this.displayVersion=displayVersion.ALL }}>All Versions</stylized-button>
				</div>

				<div class="space-y-2">
					<h2 class="text-white text-xl">Previous Versions</h2>
					${
						when( this.displayVersion as displayVersion === displayVersion.PRODUCTION, 
							() => {
								return this.renderPreviousVersions();
							}, 
							() => {
								return this.renderAllVersions();
							}
						)
					}
				</div>
			</div>
		`;
	}
}
