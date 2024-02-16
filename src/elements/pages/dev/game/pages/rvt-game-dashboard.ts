import { customElement, property } from 'lit/decorators.js';
import { html, LitElement, TemplateResult } from 'lit';
import { cssify } from '../../../../../utils/css';
import styles from './game.scss';
import { responses } from '../../../../../routes';
import RvtRouter from '../../../../root/rvt-router';
import { GameCacheController } from '../../../../../controllers';

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

	private game = new GameCacheController('DevGame.game', this)
		.setVariables(() => ({ gameId: this.gameId }))
		.setEnabled(() => !!this.gameId);

	get namespace() {
		return this.game?.data.game.namespaces.find(x => x.namespaceId == this.namespaceId);
	}

	resetData() {
		this.game = null;
	}

	render() {
		if (this.game.error) return responses.renderError(this.game.error);
		if (!this.game.data?.game) return this.renderPlaceholder();

		let namespace = this.namespace;
		if (!namespace) return responses.renderError(new Error(`Namespace not found: ${this.namespaceId}`));

		let body = null;

		let pageId = null; // Used for sidebar with pages that don't have a specific ID

		let namespaceName = this.game.data.game.namespaces.find(
			n => n.namespaceId == this.config.namespace?.namespaceId || this.config.namespaceId
		)?.displayName;

		if (this.config.summary) {
			body = html`<rvt-namespace-summary
				.game=${this.game.data.game}
				.namespaceId=${this.namespaceId}
			></rvt-namespace-summary>`;

			RvtRouter.shared.updateTitle(this.game.data.game.displayName);

			pageId = 'summary';
		} else if (this.config.billing) {
			body = html`<page-dev-game-billing .game=${this.game.data.game}></page-dev-game-billing>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – Billing`);

			pageId = 'billing';
		} else if (this.config.namespace) {
			body = html`<page-dev-game-namespace
				.game=${this.game.data.game}
				.namespaceId=${this.config.namespace.namespaceId}
			></page-dev-game-namespace>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – ${namespaceName}`);
		} else if (this.config.versionSettings) {
			body = html`<rvt-namespace-settings .game=${this.game.data.game} .namespaceId=${this.namespaceId}>
			</rvt-namespace-settings>`;
			pageId = 'namespaceSettings';
			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – ${namespaceName}`);
		} else if (this.config.versionSummary) {
			body = html`<page-dev-namespace-version
				.game=${this.game.data.game}
				.namespaceId=${this.namespaceId}
			></page-dev-namespace-version>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – Versions`);
		} else if (this.config.tokens) {
			body = html`<page-dev-game-tokens
				.game=${this.game.data.game}
				.namespace=${namespace}
			></page-dev-game-tokens>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – Tokens`);

			pageId = 'tokens';
		} else if (this.config.logs) {
			body = html`<page-dev-game-logs
				.game=${this.game.data.game}
				.namespaceId=${this.namespaceId}
				.lobbyId=${this.config.logsLobbyId ?? null}
			>
			</page-dev-game-logs>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – Logs`);

			pageId = 'logs';
		} else if (this.config.lobbies) {
			body = html`<page-dev-game-lobbies .game=${this.game.data.game} .namespaceId=${this.namespaceId}>
			</page-dev-game-lobbies>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – Lobbies`);

			pageId = 'lobbies';
		} else if (this.config.kv) {
			body = html`<page-dev-game-kv .game=${this.game.data.game} .namespaceId=${this.namespaceId}>
			</page-dev-game-kv>`;

			RvtRouter.shared.updateTitle(`${this.game.data.game.displayName} – KV`);
			pageId = 'kv';
		}

		return html`
			<rvt-sidebar-layout> ${this.renderSidebar(pageId)}${this.renderBody(body)} </rvt-sidebar-layout>
		`;
	}

	renderSidebar(pageId: string) {
		return html`<div id="tabs" slot="sidebar">
			<rvt-game-dashboard-sidebar
				.game=${this.game.data.game}
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
