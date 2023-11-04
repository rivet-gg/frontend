import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './rvt-game-dashboard-sidebar.scss';
import routes from '../../routes';
import * as cloud from '@rivet-gg/cloud';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';

@customElement('rvt-game-dashboard-sidebar')
export default class RvtGameDashboardSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	game: cloud.GameFull = null;

	@property({ type: String })
	gameId: string;

	@property({ type: String })
	namespaceId: string;

	@property({ type: String })
	versionId: string;

	// Used when selecting a namespace for logs, lobbies, etc
	@property({ type: String })
	configNamespaceId: string;

	@property({ type: String })
	pageId: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_NAMESPACE);

	@property({ type: Number })
	createTs: number = Date.now();

	constructor() {
		super();
	}

	render() {
		return html`
			<rvt-sidebar>${this.game ? this.renderContent() : this.renderPlaceholder()}</rvt-sidebar>
		`;
	}

	renderContent() {
		return html`
			<rvt-sidebar-group title="General">
				<rvt-sidebar-button
					?current=${this.pageId == 'summary'}
					href=${routes.devNamespace.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/square-info"
					>Overview</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'tokens'}
					href=${routes.devTokens.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/key"
					>Tokens</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'lobbies'}
					href=${routes.devLobbies.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/server"
					>Lobbies</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'logs'}
					href=${routes.devLogs.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/book"
					>Logs</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'kv'}
					href=${routes.devKv.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/table-list"
					>KV</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'namespaceSettings'}
					href=${routes.devVersionSettings.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="solid/gear"
				>
					Settings
				</rvt-sidebar-button>

				<!-- <rvt-sidebar-button href="https://rivet.gg/modules" icon="solid/cubes"
					>Modules</rvt-sidebar-button
				> -->
			</rvt-sidebar-group>
		`;
	}

	// TODO: Fill out more
	renderPlaceholder() {
		return html`
			<div id="title">
				<loading-placeholder></loading-placeholder>
				<loading-placeholder></loading-placeholder>
			</div>
		`;
	}
}
