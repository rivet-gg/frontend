import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-tile.scss';
import routes from '../../routes';
import cloud from '@rivet-gg/cloud';
import numbro from 'numbro';
import assets from '../../data/assets';
import * as api from '../../utils/api';

@customElement('dev-game-tile')
export default class DevGameTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameSummary;

	@property({ type: Object })
	group: api.group.GroupProfile;

	render() {
		return html`
			<a id="base" href=${routes.devGame.build({ gameId: this.game.gameId })}>
				<div id="info">
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
						<h1>${this.game.displayName}</h1>
						${this.group
							? html`<div id="group">
									<group-avatar .group=${this.group}></group-avatar>
									<p id="group-name">By <b>${this.group.displayName}</b></p>
							  </div>`
							: html`<loading-placeholder class="group"></loading-placeholder>`}
					</div>
				</div>
			</a>
		`;
	}
}
