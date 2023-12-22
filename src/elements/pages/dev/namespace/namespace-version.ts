import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../../utils/css';
import styles from './namespace-version.scss';
import * as cloud from '@rivet-gg/cloud';
import global from '../../../../utils/global';
import logging from '../../../../utils/logging';
import { globalEventGroups } from '../../../../utils/global-events';
import { responses } from '../../../../routes';
import utils from '../../../../utils/utils';
import { when } from 'lit/directives/when.js';
import { showAlert, tooltip } from '../../../../ui/helpers';
import clsx from 'clsx';
import RvtRouter from '../../../root/rvt-router';

enum displayVersion {
	PRODUCTION = 'PRODUCTION',
	ALL = 'ALL'
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

	@property({ type: String })
	displayVersion: displayVersion = displayVersion.PRODUCTION;

	firstUpdated() {
		this.fetchData();
	}

	resetData() {
		this.namespace = null;
		this.version = null;
		this.versionHistory.length = 0;

		this.loadError = null;
	}

	async fetchData() {
		try {
			let namespaceRes = await global.deprecatedApi.cloud.getGameNamespaceById({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId
			});

			let [versionRes, versionHistoryRes] = await Promise.all([
				global.deprecatedApi.cloud.getGameVersionById({
					gameId: this.game.gameId,
					versionId: namespaceRes.namespace.versionId
				}),
				global.api.cloud.games.namespaces.getGameNamespaceVersionHistoryList(
					this.game.gameId,
					this.namespaceId,
					{ limit: 20 }
				)
			]);

			let versionHistory = await Promise.all(
				versionHistoryRes.versions.map(v =>
					global.deprecatedApi.cloud.getGameVersionById({
						gameId: this.game.gameId,
						versionId: v.versionId
					})
				)
			);

			this.namespace = namespaceRes.namespace;
			this.version = versionRes.version;
			this.versionHistory = versionHistory.map(v => v.version);
		} catch (err) {
			logging.error('Error fetching data', err);
			globalEventGroups.dispatch('error', err);
		}
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
		</div> `;
	}

	renderActiveCircle(version: cloud.VersionSummary): TemplateResult {
		let activeNamespaces = this.getActiveNamespaceList(version);

		return html`
			<div
				class=${clsx(
					activeNamespaces.namespaceList.length > 0
						? 'pulse duration-100 bg-green-400 border-px border-green-400'
						: ' bg-lowered-bg border-px border-zinc-700',
					'h-4 w-1 md:w-4 pt-1 border rounded-2xl my-auto mr-3'
				)}
				@mouseenter=${activeNamespaces.versionIsActive
					? tooltip(`Active in: ${this.getActiveNamespaceList(version).namespaceList}`)
					: tooltip('No active namespaces')}
			></div>
		`;
	}

	getActiveNamespaceList(version: cloud.VersionSummary): {
		namespaceList: string;
		versionIsActive: boolean;
	} {
		let activeVersions = new Map<string, string[]>();
		for (let namespace of this.game.namespaces) {
			if (activeVersions.has(namespace.versionId))
				activeVersions.get(namespace.versionId).push(namespace.displayName);
			else activeVersions.set(namespace.versionId, [namespace.displayName]);
		}
		let isActive = activeVersions.has(version.versionId);

		let activeNamespaces = Array.from(activeVersions.get(version.versionId) || []);

		// Truncate list to 3
		if (activeNamespaces.length > 3) {
			let truncation = `and ${activeNamespaces.length - 3} more`;
			activeNamespaces.length = 3;
			activeNamespaces.push(truncation);
		}

		return { namespaceList: activeNamespaces.join(', '), versionIsActive: isActive };
	}

	isProduction(): boolean {
		return this.displayVersion === displayVersion.PRODUCTION;
	}

	rollbackConfirmModal(version: cloud.VersionFull | cloud.VersionSummary) {
		showAlert(
			'Confirm Deployment',
			html`
				<div>
					<h4 class="text-lg">From Version: <strong>${this.version.displayName}</strong></h4>
					<h4 class="text-lg">To Version: <strong>${version.displayName}</strong></h4>
				</div>
			`,
			[
				{ label: 'Cancel', destructive: true },
				{
					label: 'Confirm',
					color: 'green',
					cb: () => {
						this.updateVersion(version.versionId);
					}
				}
			]
		);
	}

	renderVersionEntry(version: cloud.VersionFull | cloud.VersionSummary): TemplateResult {
		return html`
			<div class="flex flex-row place-content-between py-2">
				${when(!this.isProduction(), () => {
					return this.renderActiveCircle(version);
				})}
				<div class="w-full align-middle flex flex-row space-x-8 py-2 pr-5">
					<div
						class="mr-auto flex flex-row place-content-between ${clsx(
							this.isProduction() ? 'w-full' : 'w-9/12'
						)}"
					>
						<h4 class="my-auto w-3/5 text-slate-200 text-lg font-semibold">
							${version.displayName}
						</h4>
						<h4
							class="my-auto pl-2 w-2/5 mr-auto text-white/40 text-lg font-extralight italic max-lg:hidden"
						>
							${utils.formatDateLong(version.createTs)}
						</h4>
						<!-- <h4 class="my-auto ml-auto pr-2 text-white/40 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis font-extralight italic hidden sm:block lg:hidden">
							${utils.formatDateShort(version.createTs)}
						</h4> -->
					</div>
					${when(!this.isProduction(), () => {
						return html`
							<h4 class="my-auto ml-auto">
								${this.getActiveNamespaceList(version).namespaceList}
							</h4>
						`;
					})}
				</div>
				${when(
					version.versionId !== this.namespace.versionId,
					() => {
						return html`
							<stylized-button
								class="my-auto"
								.trigger=${this.rollbackConfirmModal.bind(this, version)}
							>
								${this.isProduction() ? html` Rollback ` : html` Deploy `}
							</stylized-button>
						`;
					},
					() => html`
						<stylized-button class="my-auto opacity-50" disabled>
							${this.isProduction() ? html` Rollback ` : html` Deploy `}
						</stylized-button>
					`
				)}
			</div>
		`;
	}

	renderPreviousVersions(): TemplateResult {
		return html`
			${[...this.versionHistory, this.version]
				.filter(
					(v, idx) =>
						[...this.versionHistory, this.version].findIndex(
							vHist => v.versionId === vHist.versionId
						) === idx
				)
				.map(v => {
					return html`${this.renderVersionEntry(v)}`;
				})}
		`;
	}

	renderAllVersions(): TemplateResult {
		return html`
			${this.game.versions
				.filter(v => typeof v.createTs !== 'undefined')
				.sort((a, b) => b.createTs.getTime() - a.createTs.getTime())
				.map(version => {
					return html`${this.renderVersionEntry(version)}`;
				})}
		`;
	}

	navigateBack() {
		RvtRouter.shared.navBack();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		return html`
			<div class="flex flex-col px-2 pt-6 text-slate-300">
				<div class="flex flex-row place-content-end">
					<div class="w-full">
						<div class="flex flex-row place-content-between w-full">
							<h3 class="text-3xl text-white mr-auto">${this.namespace.displayName}</h3>
							<stylized-button .trigger=${this.navigateBack.bind(this)} id="nav-back">
								Back
							</stylized-button>
						</div>
						<div class="flex flex-col text-lg">
							<h4 class="font-light italic text-white/40">${this.version.displayName}</h4>
							<h4 class="font-light italic text-white/40">
								${utils.formatDateLong(this.version.createTs)}
							</h4>
						</div>
					</div>
				</div>

				<div class="pt-6 pb-3 flex flex-row space-x-3 space-y-2 w-full">
					<nav class="mb-2 flex space-x-8 text-md" aria-label="Tabs">
						<a
							no-action=${this.isProduction()}
							@click=${() => {
								this.displayVersion = displayVersion.PRODUCTION;
							}}
							class=${clsx(
								this.isProduction()
									? 'px-4 mx-2 border-b font-semibold pb-1 border-purple-500 text-purple-500'
									: 'font-semibold px-4 pb-1 border-transparent text-white/40 hover:border-white/80 mx-2 hover:cursor-pointer hover:text-white/80'
							)}
							>Rollback</a
						>
						<a
							no-action=${!this.isProduction()}
							@click=${() => {
								this.displayVersion = displayVersion.ALL;
							}}
							class=${clsx(
								!this.isProduction()
									? 'px-3 mx-2 pb-1 font-semibold border-b border-purple-500 text-purple-500'
									: 'font-semibold px-3 pb-1 border-transparent text-white/40 hover:border-white/80 mx-2 hover:cursor-pointer hover:text-white/80'
							)}
							>All Versions</a
						>
					</nav>
				</div>

				<div class="space-y-2">
					<h2 class="text-white text-xl">
						${this.isProduction() ? 'Previous Versions' : 'All Versions'}
					</h2>
					${when(
						this.isProduction(),
						() => {
							return this.renderPreviousVersions();
						},
						() => {
							return this.renderAllVersions();
						}
					)}
				</div>
			</div>
		`;
	}
}
