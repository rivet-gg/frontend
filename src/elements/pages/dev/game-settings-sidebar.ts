import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { cssify } from '../../..//utils/css';
import styles from './game-settings-sidebar.scss';
import routes from '../../../routes';
import * as cloud from '@rivet-gg/cloud';
import global from '../../../utils/global';
import timing, { Debounce } from '../../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';

interface VersionFolder {
	versions: cloud.VersionSummary[];
	open: boolean;
}

@customElement('game-settings-sidebar')
export default class GameSettingsSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	game: cloud.GameFull = null;

	@property({ type: String })
	gameId: string;

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
		let gameIdStr = this.gameId;

		return html`
			<rvt-sidebar-group title="General">
				<rvt-sidebar-button
					?current=${this.pageId == 'general'}
					href=${routes.devGameSettings.build({
						gameId: this.game.gameId,
                        tab: 'general'
					})}
					icon="regular/square-info"
					>General</rvt-sidebar-button
				>
				<rvt-sidebar-button
					?current=${this.pageId == 'tokens'}
					href=${routes.devGameSettings.build({
						gameId: this.game.gameId,
                        tab: 'tokens'
					})}
					icon="solid/key"
					>Tokens</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'billing'}
					href=${routes.devGameSettings.build({
						gameId: this.game.gameId,
                        tab: 'billing'
					})}
					icon="solid/square-dollar"
					>Billing</rvt-sidebar-button
				>
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
