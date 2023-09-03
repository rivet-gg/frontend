import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './namespace-summary.scss';
import * as cloud from '@rivet-gg/cloud';
import { globalEventGroups } from '../../../utils/global-events';
import logging from '../../../utils/logging';
import global from '../../../utils/global';
import { when } from 'lit/directives/when.js';
import utils from '../../../utils/utils';
import routes from '../../../routes';

@customElement('page-dev-namespace-summary')
export default class DevNamespaceSummary extends LitElement {
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
		} catch (err) {
			logging.error('Error fetching data', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	renderVisitButton(): TemplateResult {
		let visitHost: string;
		let visitUrl: string;
		if (this.namespace.nameId == 'prod') {
			visitHost = `${this.game.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		} else {
			visitHost = `${this.game.nameId}--${this.namespace.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		}

		// when(
		// 	this.version.config.cdn,
		// 	() =>
		// 		html`<stylized-button
		// 			id="visit-button"
		// 			right-icon="solid/arrow-right"
		// 			.href=${visitUrl}
		// 			>Visit</stylized-button
		// 		>`
		// )

		// return html`asdfasdf`;
		return html`<stylized-button id="visit-button" right-icon="solid/arrow-right" .href=${visitUrl}>
			Visit
		</stylized-button>`;
	}

	// renderModules() {
	// 	return html`
	// 		<div class="pt-12 ">
	// 			<h3 class="text-xl text-slate-200">Modules</h3>
	// 			<dev-version-info
	// 				.game=${this.game}
	// 				.tiers=${this.tiers}
	// 				.config=${this.version.config}
	// 			></dev-version-info>
	// 			<div class="flex place-content-center mx-auto pt-4">
	// 				<stylized-button
	// 				right-icon="solid/arrow-right"
	// 				> Add Module </stylized-button>
	// 			</div>
	// 		</div>
	// 	`
	// }

	render() {
		return html`
			${when(
				this.namespace,
				() => html`
					<div class="flex flex-col px-16 pt-6 text-slate-300">
						<div class="flex flex-row place-content-end">
							<div>
								<h3 class="text-3xl text-white">${this.namespace.displayName}</h3>
								<div class="flex flex-col text-lg">
									<h4 class="font-light italic text-white/40">
										${this.getNamespaceVersion(this.namespace).displayName}
									</h4>
									<h4 class="font-light italic text-white/40">
										${utils.formatDateLong(
											this.getNamespaceVersion(this.namespace).createTs
										)}
									</h4>
								</div>
							</div>
							<div class="ml-auto">${this.renderVisitButton()}</div>
						</div>

						<div class="pt-6 space-y-2">
							<p class="text-md text-slate-200 font-bold">Deploy new version:</p>
							<div class="flex flex-row space-x-6 pb-2 text-purple-400 font-semibold">
								<!-- <a class="transition hover:text-white hover:underline" href="https://rivet.gg/learn/unity">Unity</a>
							<a class="transition  hover:text-white hover:underline" href="https://rivet.gg/learn/unreal">Unreal</a>
							<a class="transition  hover:text-white hover:underline" href="https://rivet.gg/learn/html5">HTML5</a> -->
								<a
									class="border-transparent text-white hover:border-white hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-md font-medium opacity-90"
									href="https://rivet.gg/learn/unity"
									><span
										class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-cyan-300 to-cyan-500"
										>Unity</span
									></a
								>
								<a
									class="border-transparent text-white hover:border-white hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-md font-medium opacity-90"
									href="https://rivet.gg/learn/unreal"
									><span
										class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-rose-400 to-rose-600"
										>Unreal</span
									></a
								>
								<a
									class="border-transparent text-white hover:border-white hover:opacity-100 lh-full flex h-full shrink-0 items-center gap-1 whitespace-nowrap border-b-2 pt-1 text-md font-medium opacity-90"
									href="https://rivet.gg/learn/html5"
									aria-current="page"
									><span
										class="bg-clip-text bg-gradient-to-r text-transparent font-semibold from-orange-400 to-orange-600"
										>HTML5</span
									></a
								>
							</div>
							<code class="text-md text-slate-300 italic">rivet deploy -n prod</code>
						</div>

						<div class="pt-6">
							<stylized-button
								class="mt-auto"
								href=${routes.devVersionSummary.build({
									gameId: this.game.gameId,
									namespaceId: this.namespaceId
								})}
								>Manage Version</stylized-button
							>
						</div>
					</div>
				`
			)}
		`;
	}
}
