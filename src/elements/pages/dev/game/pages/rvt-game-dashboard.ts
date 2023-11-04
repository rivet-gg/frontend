import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { cssify } from '../../../../../utils/css';
import styles from './game.scss';
import { responses } from '../../../../../routes';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../../../utils/api';
import UIRouter from '../../../../root/ui-router';
import { CloudGameCache } from '../../../../../data/cache';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';

export interface DevGameRootConfig {
	summary?: true;
	billing?: true;
	versionSummary?: true;
	versionSettings?: true;
	version?: {
		versionId: string;
	};
	versions?: true;
	namespace?: {
		namespaceId: string;
	};
	settings?: true;
	versionDraft?: true;
	tokens?: true;
	sites?: true;
	builds?: true;
	logs?: true;
	namespaceId?: string; // Used by logs, lobbies, etc for namespace selection
	logsLobbyId?: string;
	lobbies?: true;
	kv?: true;
}

@customElement('rvt-game-dashboard')
export default class DevGame extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	gameId: string;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	config: DevGameRootConfig = { summary: true };

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

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.game == null) return this.renderPlaceholder();

		let body = null;

		let pageId = null; // Used for sidebar with pages that don't have a specific ID

		// Namespace options for certain pages
		let namespaceOptions = this.game.namespaces.map(n => ({
			label: n.displayName,
			value: n.namespaceId
		}));

		if (this.config.summary) {
			body = html`<rvt-namespace-summary
				.game=${this.game}
				.namespaceId=${this.namespaceId}
			></rvt-namespace-summary>`;

			UIRouter.shared.updateTitle(this.game.displayName);

			pageId = 'summary';
		} else if (this.config.billing) {
			body = html`<page-dev-game-billing .game=${this.game}></page-dev-game-billing>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Billing`);

			pageId = 'billing';
		} else if (this.config.versionSummary) {
			body = html`<page-dev-namespace-version
				.game=${this.game}
				.namespaceId=${this.namespaceId}
			></page-dev-namespace-version>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Versions`);

			pageId = 'versionSummary';
		} else if (this.config.version) {
			body = html`<page-dev-game-version
				.game=${this.game}
				.versionId=${this.config.version.versionId}
			></page-dev-game-version>`;

			let version = this.game.versions.find(v => v.versionId == this.config.version.versionId);
			let versionName = version ? version.displayName : 'Unknown version';

			UIRouter.shared.updateTitle(`${this.game.displayName} – ${versionName}`);
		} else if (this.config.namespace) {
			body = html`<page-dev-game-namespace
				.game=${this.game}
				.namespaceId=${this.config.namespace.namespaceId}
			></page-dev-game-namespace>`;

			let namespaceName = this.game.namespaces.find(
				n => n.namespaceId == this.config.namespace.namespaceId
			).displayName;

			UIRouter.shared.updateTitle(`${this.game.displayName} – ${namespaceName}`);
		} else if (this.config.versionSettings) {
			body = html`<rvt-namespace-settings .game=${this.game} .namespaceId=${this.namespaceId}>
			</rvt-namespace-settings>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Settings`);
			pageId = 'namespaceSettings';
		} else if (this.config.versionDraft) {
			body = html`<page-dev-game-version-draft .game=${this.game}></page-dev-game-version-draft>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Version Draft`);

			pageId = 'draft';
		} else if (this.config.tokens) {
			body = html`<page-dev-game-tokens
				.game=${this.game}
				.namespaceId=${this.namespaceId}
			></page-dev-game-tokens>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Tokens`);

			pageId = 'tokens';
		} else if (this.config.logs) {
			body = html`<page-dev-game-logs
				.game=${this.game}
				.namespaceId=${this.namespaceId}
				.lobbyId=${this.config.logsLobbyId ?? null}
			>
			</page-dev-game-logs>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Logs`);

			pageId = 'logs';
		} else if (this.config.lobbies) {
			body = html`<page-dev-game-lobbies .game=${this.game} .namespaceId=${this.namespaceId}>
			</page-dev-game-lobbies>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Lobbies`);

			pageId = 'lobbies';
		} else if (this.config.kv) {
			body = html`<page-dev-game-kv .game=${this.game} .namespaceId=${this.namespaceId}>
			</page-dev-game-kv>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – KV`);
			pageId = 'kv';
		}

		return html`
			<rvt-sidebar-layout> ${this.renderSidebar(pageId)}${this.renderBody(body)} </rvt-sidebar-layout>
		`;
	}

	renderSidebar(pageId: string) {
		return html`<div id="tabs" slot="sidebar">
			<rvt-game-dashboard-sidebar
				.game=${this.game}
				.gameId=${this.gameId}
				.namespaceId=${this.namespaceId}
				.versionId=${this.config.version ? this.config.version.versionId : null}
				.pageId=${pageId}
			></rvt-game-dashboard-sidebar>
		</div>`;
	}

	renderBody(body: TemplateResult) {
		return html`<rvt-sidebar-body id="body" slot="body"> ${body} </rvt-sidebar-body>`;
	}

	renderPlaceholder() {
		return html`
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
