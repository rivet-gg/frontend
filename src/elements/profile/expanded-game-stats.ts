import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './expanded-game-stats.scss';
import format from '../../utils/stat-format';
import routes, { responses } from '../../routes';
import UIRouter from '../root/ui-router';
import assets from '../../data/assets';
import numbro from 'numbro';
import { identityRouteData } from '../../data/identity';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';

const DISPLAY_STAT_COUNT = 6;
const DISPLAY_ACHIEVEMENT_COUNT = 3;

@customElement('expanded-game-stats')
export default class ExpandedGameStats extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity?: api.identity.IdentityHandle;

	@property({ type: Object })
	group?: api.group.GroupHandle;

	@property({ type: Object })
	game: api.portal.GameProfile;

	@property({ type: Object })
	// data: api.identity.GameExpandedStatSummary;
	data: { game: any; stats: any[] };

	@property({ type: Object })
	loadError?: any;

	firstUpdated(p: PropertyValues) {
		super.firstUpdated(p);

		if (this.identity) {
			// Fetch profile data
			let request = {
				identity_id: this.identity.identityId,
				game_id: this.game
			};

			// global.live.getExpandedGameStats(request)
			// 	.then((gameData: client.game.ExpandedStatSummary) => {
			// 		this.data = gameData;
			// 	})
			// 	.catch((err: Error) => this.loadError = err);
		}
		// TODO: Change request to be group-specific
		else if (this.group) {
			// Fetch profile data
			let request = {
				identity_id: this.group.isDeveloper,
				game_id: this.game
			};

			// global.live.getExpandedGameStats(request)
			// 	.then((gameData: client.game.ExpandedStatSummary) => {
			// 		this.data = gameData;
			// 	})
			// 	.catch((err: Error) => this.loadError = err);
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (!this.data) return null;

		let ownerRoute = this.identity
			? routes.identity.build(identityRouteData(this.identity))
			: this.group
			? routes.groupSettings.build(groupRouteData(this.group))
			: null;

		return html`
			${UIRouter.shared.canGoBack
				? html`<div id="close" @click=${this.navigateBack.bind(this)}></div>`
				: html`<a id="close" href=${ownerRoute}></a>`}
			<div id="base">
				<div id="scrollbase">
					<div id="header">
						${this.buildBackButton(ownerRoute)}
						<div id="game-name">${this.data.game.displayName} stats</div>
						${this.identity
							? html`<div id="identity">
									<identity-avatar
										id="main-avatar"
										.identity=${this.identity}
										hide-status
									></identity-avatar>
									<div id="main-display-name">
										<identity-name
											.identity=${this.identity}
											no-link
											show-number
											inline
										></identity-name>
									</div>
							  </div>`
							: this.group
							? html`<div id="identity">
									<div id="main-thumbnail"></div>
									<div id="main-display-name">${this.group.displayName}</div>
							  </div>`
							: null}
						<div id="actions">
							<stylized-button
								icon="regular/link-simple"
								small
								.trigger=${() => alert('UNIMPLEMENTED')}
								>Copy link</stylized-button
							>
							<stylized-button
								icon="regular/link-simple"
								small
								.trigger=${() => alert('UNIMPLEMENTED')}
								>Export</stylized-button
							>
						</div>
						<a id="game-logo"
							><lazy-img
								src=${assets.gameLogoUrl(this.data.game.nameId)}
								bg-size="contain"
							></lazy-img
						></a>
					</div>

					<!-- Stats -->
					<div id="stats">
						${repeat(
							this.data.stats.slice(0, DISPLAY_STAT_COUNT),
							s => s.config.recordId,
							stat => this.renderStat(stat)
						)}
					</div>
				</div>
			</div>
		`;
	}

	// renderStat(stat: api.portal.GameExpandedStat) {
	renderStat(stat: any) {
		// Combine X and Y arrays
		let zipped = stat.timelineX.map((a: number, i: number) => [a, stat.timelineY[i]]);

		let percent = (100 - stat.rating.position / stat.rating.total || 0).toFixed();

		return html` <div class="stat">
			<div class="stat-header">
				<div class="name">${stat.config.displayName}</div>
				<div class="value">${format.richFormatValue(stat) || '--'}</div>
				<div class="rating">
					${numbro(stat.rating.position).format('0,0')} /
					${numbro(stat.rating.total).format('0,0')}<br />TOP ${percent}%
				</div>
			</div>
			<div class="content">
				<graph-view .data=${zipped}></graph-view>
			</div>
		</div>`;
	}

	buildBackButton(ownerRoute: string) {
		// If back navigation is possible, use function rather than link
		if (UIRouter.shared.canGoBack) {
			return html` <a @click=${this.navigateBack.bind(this)}>
				<stylized-button
					icon="regular/chevron-left"
					id="nav-back"
					small
					color="transparent"
					text="white"
				>
					Back
				</stylized-button>
			</a>`;
		} else {
			return html` <a href=${ownerRoute}>
				<stylized-button
					icon="regular/chevron-left"
					id="nav-back"
					small
					color="transparent"
					text="white"
				>
					Back
				</stylized-button>
			</a>`;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
