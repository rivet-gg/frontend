import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import { cssify } from '../../../../utils/css';
import assets from '../../../../data/assets';
import routes from '../../../../routes';
import clsx from 'clsx';

@customElement('game-banner')
export default class DevGameBanner extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull;

	renderGameIcon(game: cloud.GameFull): TemplateResult {
		return html`
			<lazy-img
<<<<<<< HEAD
				class="mx-auto w-28 h-28"
				bg-size="contain"
				src=${game.logoUrl ?? assets.asset('/games/blank/blankgame.svg')}
=======
				class="mx-auto w-28 h-28 z-10"
				bg-size=${game ? (game.logoUrl ? 'contain' : 'cover') : 'cover'}
				src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
>>>>>>> 4b8b0ea (Improve display of custom-uploaded images)
			></lazy-img>
		`;
	}

	render() {
		return html`
<<<<<<< HEAD
			<div class="relative my-5 md:my-10 mx-auto bg-zinc-700 h-72 rounded-2xl">
=======
			<div
				class=${clsx(
					'relative my-[20px] md:my-[40px] mx-auto h-[18.2rem] rounded-[20px]',
					this.game && this.game.bannerUrl ? 'bg-gray-900 overflow-hidden' : 'bg-zinc-700'
				)}
			>
>>>>>>> 4b8b0ea (Improve display of custom-uploaded images)
				<div class="flex flex-col place-content-center m-auto h-full w-1/2 text-center">
					${this.game
						? html`
								${this.game.bannerUrl
									? html` <lazy-img
											class="absolute left-0 top-0 w-full h-full opacity-40"
											src=${this.game.bannerUrl}
											bg-size="cover"
									  ></lazy-img>`
									: null}
								<stylized-button
									class="absolute top-6 right-10"
									color="gray"
									.href=${routes.devGameSettings.build({ gameId: this.game.gameId })}
								>
									Settings
								</stylized-button>
								${this.renderGameIcon(this.game)}
								<h1 class="text-2xl mt-8 z-10">${this.game.displayName}</h1>
						  `
						: html``}
				</div>
			</div>
		`;
	}
}
