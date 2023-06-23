import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './game-container.scss';
import logging from '../../utils/logging';
import timing from '../../utils/timing';
import * as api from '../../utils/api';
import assets from '../../data/assets';

@customElement('game-container')
export default class GameContainer extends LitElement {
	static styles = cssify(styles);

	@query('#game-frame')
	gameFrame: HTMLIFrameElement;

	@property({ type: Object })
	game: api.portal.GameProfile;

	@property({ type: Boolean })
	isFrameLoaded = false;

	/// Timeout for if the iframe never loads.
	loadTimeout: any;

	constructor() {
		super();
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Listen for game frame load
		let onFrameLoad = () => this.onFrameLoad();
		this.gameFrame.addEventListener('load', onFrameLoad);

		// Force load after 10 seconds
		this.loadTimeout = setTimeout(() => {
			// Warn
			logging.warn('The game was taking too long to load, displaying anyways.');

			// Load
			this.gameFrame.removeEventListener('load', onFrameLoad);
			onFrameLoad();
		}, timing.seconds(10));
	}

	onFrameLoad() {
		// Clear the timeout waiting the game to load
		clearTimeout(this.loadTimeout);

		// Set as loaded
		this.isFrameLoaded = true;
	}

	render() {
		return html`
			<div id="base">
				<!-- Game Info -->
				<div id="loading-holder" style=${styleMap({ display: this.isFrameLoaded ? 'none' : null })}>
					<lazy-img
						id="loading-thumbnail"
						src="${assets.gameLogoUrl(this.game.nameId)}"
						bg-size="contain"
					></lazy-img>
					<!--<div id="loading-title">${this.game.displayName}</div>-->
					<loading-wheel id="loading-wheel"></loading-wheel>
				</div>

				<!-- Game Frame -->
				<iframe
					src=${this.game.url}
					id="game-frame"
					style=${styleMap({ display: this.isFrameLoaded ? null : 'none' })}
				></iframe>
			</div>
		`;
	}
}
