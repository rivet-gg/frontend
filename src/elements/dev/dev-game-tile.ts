import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-tile.scss';
import routes from '../../routes';
import cloud from '@rivet-gg/cloud';
import numbro from 'numbro';
import assets from '../../data/assets';
import * as api from '../../utils/api';
import clsx from 'clsx';

const COLORS = [
	'bg-black hover:bg-gray-500',
];

@customElement('dev-game-tile')
export default class DevGameTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameSummary;

	@property({ type: Object })
	group: api.group.GroupProfile;

	private bgColor = COLORS[Math.floor(Math.random() * COLORS.length)];

	render() {
		return html`
			<a
				id="base"
				href=${routes.devGame.build({ gameId: this.game.gameId })}
				class=${clsx(
			!this.game.bannerUrl && this.bgColor,
			'bg-game-tile bg-cover bg-center transition-all'
		)}
			>
				${this.game.bannerUrl
				? html`<lazy-img
							id="bg"
							class="transition-all"
							src=${this.game.bannerUrl}
							bg-size="cover"
					  ></lazy-img>`
				: null}
				<div id="info">
					<lazy-img
						class="h-20 w-4/5 pb-5"
						src=${this.game.logoUrl ?? assets.asset('/games/blank/blankgame.svg')}
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
