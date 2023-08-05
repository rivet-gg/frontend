import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './game-overlay.scss';
import * as api from '../../utils/api';
import { responses } from '../../routes';
import assets from '../../data/assets';
import timing from '../../utils/timing';

@customElement('game-overlay')
export default class GameOverlay extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: api.identity.GameSummary;

	@property({ type: Array })
	friends: api.identity.IdentityHandle[] = [];

	@property({ type: Object })
	loadError?: any;

	@property({ type: Boolean })
	isPlaying: boolean = false;

	@property({ type: Boolean })
	delayedMessage: boolean = false;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Reset state
		if (changedProperties.has('game') && !this.game) {
			this.isPlaying = false;
			this.delayedMessage = false;
		}
	}

	playGame() {
		window.open(`http://${this.game.url}`, '_blank');
		this.isPlaying = true;

		// Show a "don't see the game?" message after 3 seconds
		setTimeout(() => {
			this.delayedMessage = true;
		}, timing.seconds(3));
	}

	render() {
		if (!this.game) return null;
		if (this.loadError) return responses.renderError(this.loadError);

		let friendsPlaying = this.friends.filter(
			a => a.presence?.gameActivity?.game?.gameId == this.game.gameId
		);

		let centerClasses = classMap({
			'with-friends': !!friendsPlaying.length
		});

		return html`<div id="base">
			${this.game.bannerUrl ? html`<lazy-img id="bg" src=${this.game.bannerUrl} bg-size="cover"></lazy-img>` : null}
			<div id="header">
				<!-- <div class="stat">
					<span>Playtime <b>13 hours, 3 minutes</b></span>
				</div> -->
			</div>
			<div id="center" class=${centerClasses}>
				<lazy-img
					id="logo"
					bg-size=${this.game.logoUrl ? 'contain' : 'cover'}
					src=${this.game.logoUrl ?? assets.asset('/games/blank/logo.png')}
				></lazy-img>
				<h1>${this.game.displayName}</h1>
				<div id="actions">
					<rvt-button .trigger=${this.playGame.bind(this)}
					?disabled=${this.isPlaying}>
					${when(
						this.isPlaying,
						() => 'Playing',
						() => 'Play'
					)}</rvt-button>
				</div>
					${when(
						this.delayedMessage,
						() =>
							html`<p class="delayed">
								Don't see the game? Use
								<a class="link" href=${this.game.url}>this link</a> instead.
							</p>`
					)}
			</div>
			${
				friendsPlaying.length
					? html`<div id="friends">
							<h3>Friends Playing Now</h3>
							<avatar-collage .identities=${friendsPlaying}></avatar-collage>
					  </div>`
					: null
			}
			</div>
		</div>`;
	}

	closeModal() {
		this.dispatchEvent(new Event('close'));
	}
}
