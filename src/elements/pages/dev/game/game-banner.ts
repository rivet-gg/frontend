import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
				bg-size="contain"
				src=${game.logoUrl ?? assets.asset('/games/blank/blankgame.svg')}
			></lazy-img>
		`;
	}

	render() {
		return html`
			<div class="relative my-5 md:my-10 mx-auto bg-zinc-700 h-72 rounded-2xl">
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
