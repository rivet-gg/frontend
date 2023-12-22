import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../../utils/css';
import styles from './rvt-namespace-summary.scss';
import * as cloud from '@rivet-gg/cloud';
import { globalEventGroups } from '../../../../utils/global-events';
import logging from '../../../../utils/logging';
import global from '../../../../utils/global';
import { when } from 'lit/directives/when.js';
import routes from '../../../../routes';
import { showAlert } from '../../../../ui/helpers';

@customElement('rvt-namespace-summary')
export default class RvtNameSpaceSummary extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchData();
		}

		if (changedProperties.has('versionId')) {
			this.resetData();
			this.fetchData();
		}
	}

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		let res = await global.api.cloud.tiers.getRegionTiers();
		this.tiers = res.tiers;

		this.fetchData();
	}

	resetData() {
		this.namespace = null;
		this.version = null;
		this.loadError = null;
	}

	getNamespaceVersion(namespace: cloud.NamespaceSummary) {
		return this.game.versions.find(v => v.versionId === namespace.versionId);
	}

	async updateVersion(versionId: string) {
		try {
			await global.deprecatedApi.cloud.updateGameNamespaceVersion({
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

	async fetchData() {
		try {
			let namespaceRes = await global.deprecatedApi.cloud.getGameNamespaceById({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId
			});

			let [versionRes] = await Promise.all([
				global.deprecatedApi.cloud.getGameVersionById({
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
		} catch (err) {
			logging.error('Error fetching data', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	showDeployVersionSteps() {
		showAlert(
			'Deploy Version',
			html`
				<div>
					<div class="flex flex-row space-x-6 pb-3 font-semibold">
						<a
							class="border-transparent text-white hover:border-zinc-300 duration-200 transition-all ease-out hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-lg font-medium opacity-90"
							href="https://rivet.gg/learn/unity"
							><span
								class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-cyan-600 to-cyan-800"
								>Unity</span
							></a
						>
						<a
							class="border-transparent text-white hover:border-zinc-300 duration-200 transition ease-out hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-lg font-medium opacity-90"
							href="https://rivet.gg/learn/unreal"
							><span
								class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-rose-400 to-rose-600"
								>Unreal</span
							></a
						>
						<a
							class="border-transparent text-white hover:border-zinc-300 duration-200 transition ease-out hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-lg font-medium opacity-90"
							href="https://rivet.gg/learn/html5"
							aria-current="page"
							><span
								class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-orange-400 to-orange-600"
								>HTML5</span
							></a
						>
					</div>
					<code class="text-md italic">rivet deploy -n prod</code>
				</div>
			`
		);
	}

	renderModules() {
		return html`
			<div class="pt-8">
				<h3 class="text-xl text-slate-100 pb-4">Configuration</h3>
				<dev-version-info
					.game=${this.game}
					.tiers=${this.tiers}
					.config=${this.version.config}
				></dev-version-info>
				<!-- <div class="flex place-content-center mx-auto pt-4">
					<stylized-button
					right-icon="solid/arrow-right"
					> Add Module </stylized-button>
				</div> -->
			</div>
		`;
	}

	render() {
		return html`
			${when(
				this.namespace,
				() => html`
					<div class="flex flex-col px-16 pt-6 flex-wrap overflow-x-scroll">
						<rvt-namespace-header
							.game=${this.game}
							.namespace=${this.namespace}
							.version=${this.version}
						></rvt-namespace-header>
						<div class="pt-6">
							<stylized-button
								class="mt-auto"
								color="var(--rvt-color-raised-bg)"
								border-color="var(--rvt-color-raised-bg-border-color)"
								border-width=".75px"
								icon="solid/code-compare"
								href=${routes.devVersionSummary.build({
									gameId: this.game.gameId,
									namespaceId: this.namespaceId
								})}
								>Manage Versions
							</stylized-button>
						</div>

						${this.renderModules()}
					</div>
				`
			)}
		`;
	}
}
