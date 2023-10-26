import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-sidebar.scss';
import routes from '../../routes';
import * as cloud from '@rivet-gg/cloud';
import global from '../../utils/global';
import { Debounce } from '../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';

@customElement('dev-game-sidebar')
export default class DevGameSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	game: cloud.GameFull = null;

	@property({ type: String })
	gameId: string;

	@property({ type: String })
	namespaceId: string;

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

	// === DEBOUNCE INFO ===
	validateNamespaceDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGameNamespace>>;

	constructor() {
		super();
	}

	render() {
		return html`
			<rvt-sidebar>${this.game ? this.renderContent() : this.renderPlaceholder()}</rvt-sidebar>
		`;
	}

	renderContent() {
		let gameIdStr = this.gameId;
		let draft;

		return html`
			<rvt-sidebar-group title="General">
				<rvt-sidebar-button
					?current=${this.pageId == 'summary'}
					href=${routes.devNamespace.build({
						gameId: this.game.gameId,
						namespaceId: this.namespaceId
					})}
					icon="regular/square-info"
					>Overview</rvt-sidebar-button
				>
				<!-- <stylized-button
					?current=${this.pageId == 'billing'}
					href=${routes.devBilling.build({ gameId: this.game.gameId })}
					icon="solid/square-dollar"
					>Billing</stylized-button
				> -->

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
					icon="light/server"
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
