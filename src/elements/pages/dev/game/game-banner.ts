import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as api from '../../../../utils/api';
import * as cloud from '@rivet-gg/cloud';
import { cssify } from '../../../../utils/css';
import assets from '../../../../data/assets';
import routes from '../../../../routes';

@customElement('game-banner')
export default class DevGameBanner extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull;

	renderGameIcon(game: cloud.GameFull): TemplateResult {
		return html`
			<lazy-img
				class="mx-auto w-28 h-28"
				bg-size=${game ? (game.logoUrl ? 'contain' : 'cover') : 'cover'}
				src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
			></lazy-img>
		`;
	}

	render() {
		return html`
			<div class="relative my-[20px] md:my-[40px] mx-auto bg-zinc-700 h-[18.2rem] rounded-[20px]">
				<div class="flex flex-col place-content-center m-auto h-full w-1/2 text-center">
					${this.game
						? html`
								<stylized-button
									class="absolute top-6 right-10"
									color="gray"
									.href=${routes.devGameSettings.build({ gameId: this.game.gameId })}
								>
									Settings
								</stylized-button>
								${this.renderGameIcon(this.game)}
								<h1 class="text-2xl mt-8">${this.game.displayName}</h1>
						  `
						: html``}
				</div>
			</div>
		`;
	}
}
