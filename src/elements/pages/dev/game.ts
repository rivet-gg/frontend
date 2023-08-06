import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { cssify } from '../../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import styles from './game.scss';
import routes, { responses } from '../../../routes';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../utils/api';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import UIRouter from '../../root/ui-router';
import { CloudGameCache } from '../../../data/cache';
import logging from '../../../utils/logging';
import { Orientation } from '../../common/overlay-positioning';
import { globalEventGroups } from '../../../utils/global-events';

export interface DevGameRootConfig {
	summary?: true;
	billing?: true;
	version?: {
		versionId: string;
	};
	namespace?: {
		namespaceId: string;
	};
	versionDraft?: true;
	tokens?: true;
	sites?: true;
	builds?: true;
	logs?: true;
	namespaceId?: string; // Used by logs, lobbies, etc for namespace selection
	logsLobbyId?: string;
	lobbies?: true;
	kv?: true;
	mobileSummary?: true; // Summary page for mobile
}

@customElement('page-dev-game')
export default class DevGame extends LitElement {
	static styles = cssify(styles);

	@query('#ns-display-name-input')
	namespaceDisplayName: HTMLInputElement;

	@query('#ns-name-id-input')
	namespaceNameId: HTMLInputElement;

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	config: DevGameRootConfig = { summary: true };

	@property({ type: Object })
	namespaceSelection: DropDownSelection<string> = null;

	@property({ type: Object })
	game: cloud.GameFull = null;

	@property({ type: Object })
	loadError?: any;

	gameStream?: api.RepeatingRequest<cloud.GetGameByIdCommandOutput>;

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('gameId')) {
			this.resetData();
			this.fetchData();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.gameStream) this.gameStream.cancel();
	}

	resetData() {
		this.game = null;
	}

	async fetchData() {
		if (this.gameStream) this.gameStream.cancel();

		// Fetch events
		this.gameStream = await CloudGameCache.watch(this.gameId, res => {
			this.game = res.game;

			// Sort game versions by timestamp descending
			this.game.versions.sort((a, b) => b.createTs.getTime() - a.createTs.getTime());
		});

		this.gameStream.onError(err => {
			logging.error('Request error', err);

			if (this.game) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	changeNamespaceSelection(event: DropDownSelectEvent<string>) {
		let routeParameterConfig = { gameId: this.gameId };
		let routeSearchConfig = { namespaceId: event.selection.value };

		// Navigate to new route with the selected namespace id
		if (this.config.logs) {
			UIRouter.shared.navigate(routes.devLogs.build(routeParameterConfig, routeSearchConfig), {
				replaceHistory: true
			});
		} else if (this.config.lobbies) {
			UIRouter.shared.navigate(routes.devLobbies.build(routeParameterConfig, routeSearchConfig), {
				replaceHistory: true
			});
		} else if (this.config.kv) {
			UIRouter.shared.navigate(routes.devKv.build(routeParameterConfig, routeSearchConfig), {
				replaceHistory: true
			});
		} else {
			this.namespaceSelection = event.selection;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.game == null) return this.renderPlaceholder();

		let body = null;
		let title = html`Loading...`;

		let pageId = null; // Used for sidebar with pages that don't have a specific ID

		// Namespace options for certain pages
		let namespaceOptions = this.game.namespaces.map(n => ({
			label: n.displayName,
			value: n.namespaceId
		}));

		if (this.config.namespaceId) {
			this.namespaceSelection = namespaceOptions.find(
				option => option.value == this.config.namespaceId
			);
		}
		// Default to first namespace for selection
		if (!this.namespaceSelection) {
			this.namespaceSelection = namespaceOptions[0];
		}

		let namespaceSelect = html`<div id="namespace-select-area">
			<h3>Namespace</h3>
			<drop-down-list
				id="logs-namespace-select"
				.options=${namespaceOptions}
				.selection=${this.namespaceSelection}
				.orientation=${Orientation.TopRight}
				@select=${this.changeNamespaceSelection.bind(this)}
			></drop-down-list>
		</div>`;

		if (this.config.summary) {
			if (!global.isMobile || this.config.mobileSummary) {
				body = html`<page-dev-game-summary .game=${this.game}></page-dev-game-summary>`;

				title = html`<e-svg src="regular/square-info"></e-svg>
					<h1>${this.game.displayName}</h1>`;

				UIRouter.shared.updateTitle(this.game.displayName);

				pageId = 'summary';
			}
		} else if (this.config.billing) {
			body = html`<page-dev-game-billing .game=${this.game}></page-dev-game-billing>`;

			title = html`<e-svg src="solid/square-dollar"></e-svg>
				<h1>Billing</h1>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Billing`);

			pageId = 'billing';
		} else if (this.config.namespace) {
			body = html`<page-dev-game-namespace
				.game=${this.game}
				.namespaceId=${this.config.namespace.namespaceId}
			></page-dev-game-namespace>`;

			let namespaceName = this.game.namespaces.find(
				n => n.namespaceId == this.config.namespace.namespaceId
			).displayName;
			title = html`<h1>${namespaceName}</h1>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – ${namespaceName}`);
		} else if (this.config.version) {
			body = html`<page-dev-game-version
				.game=${this.game}
				.versionId=${this.config.version.versionId}
			></page-dev-game-version>`;

			let version = this.game.versions.find(v => v.versionId == this.config.version.versionId);
			let versionName = version ? version.displayName : 'Unknown version';
			title = html`<h1>${versionName}</h1>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – ${versionName}`);
		} else if (this.config.versionDraft) {
			body = html`<page-dev-game-version-draft .game=${this.game}></page-dev-game-version-draft>`;

			title = html`<e-svg src="regular/file"></e-svg>
				<h1>New Version Draft</h1>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Version Draft`);

			pageId = 'draft';
		} else if (this.config.tokens) {
			body = html`<page-dev-game-tokens .game=${this.game}></page-dev-game-tokens>`;

			title = html`<e-svg src="solid/key"></e-svg>
				<h1>Tokens</h1>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Tokens`);

			pageId = 'tokens';
		} else if (this.config.logs) {
			body = html`<page-dev-game-logs
				.game=${this.game}
				.namespaceId=${this.namespaceSelection ? this.namespaceSelection.value : null}
				.lobbyId=${this.config.logsLobbyId ?? null}
			></page-dev-game-logs>`;

			title = html`
				<e-svg src="solid/book"></e-svg>
				<h1>Logs</h1>
				${namespaceSelect}
			`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Logs`);

			pageId = 'logs';
		} else if (this.config.lobbies) {
			body = html`<page-dev-game-lobbies
				.game=${this.game}
				.namespaceId=${this.namespaceSelection ? this.namespaceSelection.value : null}
			></page-dev-game-lobbies>`;

			title = html`
				<e-svg src="solid/table-rows"></e-svg>
				<h1>Lobbies</h1>
				${namespaceSelect}
			`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Lobbies`);

			pageId = 'lobbies';
		} else if (this.config.kv) {
			body = html`<page-dev-game-kv
				.game=${this.game}
				.namespaceId=${this.namespaceSelection ? this.namespaceSelection.value : null}
			></page-dev-game-kv>`;

			title = html`
				<e-svg src="solid/table-list"></e-svg>
				<h1>Key Value</h1>
				${namespaceSelect}
			`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – KV`);

			pageId = 'kv';
		}

		return html`
			<rvt-sidebar-layout
				>${this.renderSidebar(pageId)}${this.renderBody(title, body)}</rvt-sidebar-layout
			>
		`;
	}

	renderSidebar(pageId: string) {
		return html`<div id="tabs" slot="sidebar">
			<dev-game-sidebar
				.game=${this.game}
				.gameId=${this.gameId}
				.namespaceId=${this.config.namespace ? this.config.namespace.namespaceId : null}
				.versionId=${this.config.version ? this.config.version.versionId : null}
				.pageId=${pageId}
				.configNamespaceId=${this.config.namespaceId ?? this.namespaceSelection
					? this.namespaceSelection.value
					: null}
			></dev-game-sidebar>
		</div>`;
	}

	renderBody(title: TemplateResult, body: TemplateResult) {
		return html`<rvt-sidebar-body id="body" slot="body">
			<!-- Header -->
			<page-header>${title}</page-header>

			${body}
		</rvt-sidebar-body>`;
	}

	renderPlaceholder() {
		return global.isMobile
			? html`<div id="placeholder">
					<div id="placeholder-body" slot="body">
						<div id="placeholder-centered-body">
							<loading-placeholder class="placeholder-page-header"></loading-placeholder>
							<loading-placeholder class="placeholder-group"></loading-placeholder>
							<div>
								<loading-placeholder class="placeholder-text"></loading-placeholder>
								<loading-placeholder class="placeholder-text small"></loading-placeholder>
							</div>
						</div>
					</div>
			  </div>`
			: html`
					<h-tab-layout id="placeholder">
						<div id="placeholder-sidebar" slot="tabs">
							<loading-placeholder class="placeholder-logo"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<div class="placeholder-subtitle">
								<loading-placeholder></loading-placeholder>
							</div>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<div class="placeholder-subtitle">
								<loading-placeholder></loading-placeholder>
							</div>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
							<loading-placeholder class="placeholder-rack"></loading-placeholder>
						</div>
						<div id="placeholder-body" slot="body">
							<div id="placeholder-centered-body">
								<loading-placeholder class="placeholder-page-header"></loading-placeholder>
								<loading-placeholder class="placeholder-group"></loading-placeholder>
								<div>
									<loading-placeholder class="placeholder-text"></loading-placeholder>
									<loading-placeholder class="placeholder-text small"></loading-placeholder>
								</div>
							</div>
						</div>
					</h-tab-layout>
			  `;
	}
}
