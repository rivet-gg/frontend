import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-tile.scss';
import routes from '../../routes';
import cloud from '@rivet-gg/cloud';
import numbro from 'numbro';
import assets from '../../data/assets';
import * as api from '../../utils/api';

const GRADIENTS = [
	// "bg-gradient-to-br from-green-300 to-purple-400",
	'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-teal-200 via-violet-600 to-blue-900',
	'bg-gradient-to-b from-pink-400 to-pink-600',
	'bg-gradient-to-br from-purple-500 via-violet-700 to-teal-900',
	'bg-gradient-to-bl from-pink-500 via-pink-600 to-red-400'
];

@customElement('dev-game-tile')
export default class DevGameTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameSummary;

	@property({ type: Object })
	group: api.group.GroupProfile;

	cardGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

	render() {
		return html`
			<a id="base" href=${routes.devGame.build({ gameId: this.game.gameId })}>
				<div id="info" class=${this.cardGradient}>
					${this.game.bannerUrl
						? html`<lazy-img id="bg" src=${this.game.bannerUrl} bg-size="cover"></lazy-img>`
						: null}
					<lazy-img
						id="icon"
						src=${this.game.logoUrl ?? assets.asset('/games/blank/logo.png')}
						bg-size="contain"
					></lazy-img>
					<h2>
						<e-svg src="solid/user"></e-svg> ${numbro(this.game.totalPlayerCount).format('0,0')}
					</h2>
				</div>
				<div id="footer">
					<div id="footer-content">
						<h1 class="py-1 text-lg">${this.game.displayName}</h1>
					</div>
				</div>
			</a>
		`;
	}
}
