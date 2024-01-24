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
				class="mx-auto w-28 h-28 z-10"
				bg-size=${game ? (game.logoUrl ? 'contain' : 'cover') : 'cover'}
				src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
			></lazy-img>
		`;
	}

	render() {
		return html`
			<div
				class=${clsx(
					'relative my-5 md:my-10 mx-auto h-72 border-2 border-white',
					this.game && this.game.bannerUrl ? 'bg-gray-900 overflow-hidden' : 'bg-zinc-900'
				)}
			>
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
								<rvt-button
									class="absolute top-6 right-10"
									type="a"
									href=${routes.devGameSettings.build({
										gameId: this.game.gameId,
										tab: 'general'
									})}
								>
									Settings
								</rvt-button>
								${this.renderGameIcon(this.game)}
								<h1 class="text-2xl mt-8 z-10">${this.game.displayName}</h1>
						  `
						: html``}
				</div>
			</div>
		`;
	}
}
