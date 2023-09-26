import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './game.scss';
import routes, { responses } from '../../routes';
import UIRoot from '../root/ui-root';
import { tooltip, showIdentityContextMenu } from '../../ui/helpers';
import global from '../../utils/global';
import { groupRouteData } from '../../data/group';
import UIRouter from '../root/ui-router';

import assets from '../../data/assets';
import format from '../../utils/stat-format';
import * as api from '../../utils/api';
import logging from '../../utils/logging';

const LOAD_GROUP_COUNT = 5;

@customElement('page-game')
export default class GamePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	nameId: string;

	@property({ type: Object })
	profile?: api.portal.GameProfile;

	@property({ type: Array })
	relatedGames?: api.identity.GameHandle[];

	@property({ type: Object })
	loadError?: any;

	snapshotSize: [number, number] = [640, 480];
	snapshotId: number = 1 + Math.floor(Math.random() * 8);

	friendsFetched = false;
	gameFriends: api.identity.IdentityHandle[] = [];

	@property({ type: String })
	selectedIdentityLeaderboardCategory: string = null;
	@property({ type: String })
	selectedGroupLeaderboardCategory: string = null;
	@property({ type: String })
	leaderboardType = 'identities';
	leaderboardDataCache: Map<
		string,
		{
			columns: api.identity.GameStatConfig[];
			// data: api.identity.GameLeaderboardRow[];
			data: { owner: any; values: any[] }[];
		}
	> = new Map();

	protected updated(changedProperties: PropertyValues): void {
		// Request data if category set
		if (changedProperties.has('nameId')) {
			// TODO: Add the ctxGameId so we throw out this request if the URL changes; search codebase for "let ctx"
			global.live.portal
				.getGameProfile({ gameNameId: this.nameId })
				.then(res => {
					// Update the title
					UIRouter.shared.updateTitle(res.game.displayName);

					// Save game
					this.profile = res.game;

					if (this.profile.identityLeaderboardCategories.length) {
						this.selectedIdentityLeaderboardCategory =
							this.profile.identityLeaderboardCategories[0].displayName;
						this.selectedGroupLeaderboardCategory =
							this.profile.groupLeaderboardCategories[0].displayName;
					}

					// TODO:
					// Fetch online friends
					// global.live.getGameFriends({ nameId: this.nameId })
					// 	.then(({identities}: {identities: api.identity.IdentityHandle[]}) => {
					// 		this.gameFriends = identities;
					// 		this.friendsFetched = true;

					// 		this.requestUpdate();
					// 	})
					// 	.catch((err: any) => this.loadError = err);
				})
				.catch(err => {
					logging.error('Request error', err);
					this.loadError = err;
				});
		}

		if (
			changedProperties.has('selectedIdentityLeaderboardCategory') ||
			changedProperties.has('selectedGroupLeaderboardCategory') ||
			changedProperties.has('leaderboardType')
		) {
			// Fetch leaderboard data
			let selection =
				this.leaderboardType == 'identities'
					? this.selectedIdentityLeaderboardCategory
					: this.selectedGroupLeaderboardCategory;
			let leaderboardLabel = `${this.leaderboardType} ${selection}`;

			// Don't fetch if the selected leaderboard has already been fetched
			if (!this.leaderboardDataCache.has(leaderboardLabel)) {
				// global.live.getGameLeaderboard({ nameId: this.nameId, leaderboardName: selection, groups: this.leaderboardType == 'groups' })
				// 	.then((leaderboard: client.live.GetGameLeaderboardResponse) => {
				// 		this.leaderboardDataCache.set(leaderboardLabel, leaderboard);
				// 		this.requestUpdate();
				// 	})
				// 	.catch((err: any) => this.loadError = err);
			}
		}
	}

	async toggleOfficialGame(groupId: string, active: boolean) {
		alert('UNIMPLEMENTED');

		// // Update the UI
		// let group = this.profile.identityGroups.find(c => c.group.id == groupId);
		// if (active) {
		// 	group.group.officialGames.push(this.profile.game);
		// } else {
		// 	group.group.officialGames = group.group.officialGames.filter(g => g.id != this.profile.game.id);
		// }
		// this.requestUpdate("profile");

		// // Update the data
		// await GroupEndpoints.setOfficialGame.execute({ gameId: this.profile.game.id, groupId, active });
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html` <div id="base">${this.renderDesktop()}</div> `;
	}

	renderDesktop() {
		// Determine leaderboard selection
		let selection =
			this.leaderboardType == 'identities'
				? this.selectedIdentityLeaderboardCategory
				: this.selectedGroupLeaderboardCategory;

		return html`
			<!-- Banner -->
			<div id="banner">
				<div id="banner-bg">
					${this.profile
						? html`<video
								id="video-clip"
								autoplay
								muted
								disablePictureInPicture
								disableRemotePlayback
								loop
								playsinline
								poster="${assets.gameSnapshotUrl(
									this.profile.nameId,
									this.snapshotSize,
									this.snapshotId
								)}"
						  >
								<source
									src=${assets.gameClipUrl(this.profile.nameId, this.snapshotSize)}
									type="video/mp4"
								/>
						  </video>`
						: null}
				</div>
				<div id="banner-right">
					${this.profile
						? html`<lazy-img
								id="main-logo"
								src=${assets.gameLogoUrl(this.profile.nameId)}
								bg-size="contain"
						  ></lazy-img>`
						: null}
				</div>
				<div id="banner-nav">${this.buildBackButton()}</div>
				<div id="main-title">${this.profile ? this.profile.displayName : null}</div>
				<div id="banner-actions">
					<div id="actions-right"></div>
				</div>
			</div>

			<!-- Body -->
			<div id="body">
				<!-- Tags -->
				<div id="tags-holder">
					${repeat(
						this.profile ? this.profile.tags : [],
						(t: string) => html`<a class="tag">${t}</a>`
					)}
				</div>

				<column-layout>
					<div slot="left-column">
						<!-- Description -->
						<info-panel-header>
							<div slot="title">Description</div>
						</info-panel-header>

						<info-panel-body>
							<div id="description">
								${this.profile && this.profile.description ? this.profile.description : null}
							</div>
						</info-panel-body>

						<!-- Popular groups -->
						<info-panel-header>
							<div slot="title">Popular groups</div>
						</info-panel-header>

						<info-panel-body>
							${this.renderGroupList(this.profile ? this.profile.recommendedGroups : [])}
						</info-panel-body>

						<!-- Leaderboards -->
						<info-panel-header>
							<div slot="title">
								Leaderboards

								<!-- Leaderboard type toggle -->
								<div id="leaderboard-type-toggle">
									${this.leaderboardType == 'identities'
										? html` <stylized-button color="#F0F0F0" small text="#1d1d1d"
													>Identities</stylized-button
												>
												<stylized-button
													color="transparent"
													small
													.trigger=${this.changeLeaderboardType.bind(
														this,
														'groups'
													)}
													>Groups</stylized-button
												>`
										: html` <stylized-button
													color="transparent"
													small
													.trigger=${this.changeLeaderboardType.bind(
														this,
														'identities'
													)}
													>Identities</stylized-button
												>
												<stylized-button color="#F0F0F0" small text="#1d1d1d"
													>Groups</stylized-button
												>`}
								</div>
								<!-- Leaderboard category buttons -->
								${this.profile && this.leaderboardDataCache.size
									? html`<div id="leaderboard-buttons">
											${repeat(
												this.leaderboardType == 'identities'
													? this.profile.identityLeaderboardCategories
													: this.profile.groupLeaderboardCategories,
												a => a.displayName,
												a =>
													selection == a.displayName
														? html`<stylized-button
																small
																color="#F0F0F0"
																text="#1d1d1d"
																>${a.displayName}</stylized-button
														  >`
														: html`<stylized-button
																small
																color="transparent"
																.trigger=${this.changeLeaderboardCategory.bind(
																	this,
																	a.displayName
																)}
																>${a.displayName}</stylized-button
														  >`
											)}
									  </div>`
									: null}
							</div>
						</info-panel-header>

						<info-panel-body> ${this.renderLeaderboard()} </info-panel-body>
					</div>

					<div slot="right-column">
						<!-- Developers -->
						<info-panel-header>
							<div slot="title">Developer</div>
						</info-panel-header>

						<info-panel-body>
							${this.profile
								? html` <a
										id="developer"
										href=${routes.groupOverview.build(
											groupRouteData(this.profile.developer)
										)}
								  >
										<div id="main-thumbnail-placeholder"></div>
										${this.profile.developer.displayName}
								  </a>`
								: null}
						</info-panel-body>

						<!-- Platforms -->
						<info-panel-header>
							<div slot="title">Platforms</div>
						</info-panel-header>

						<info-panel-body>
							<div id="platform-icons">
								${repeat(this.profile ? this.profile.platforms : [], p =>
									this.renderPlatformIcon(p)
								)}
							</div>
						</info-panel-body>

						<!-- Social -->
						<info-panel-header>
							<div slot="title">Friends playing now</div>
						</info-panel-header>

						<info-panel-body> ${this.renderGameFriends(this.gameFriends)} </info-panel-body>
					</div>
				</column-layout>
			</div>
		`;
	}

	renderGameFriends(friends: api.identity.IdentityHandle[]) {
		return this.friendsFetched
			? friends.length
				? html` <div id="friends-list">
						${repeat(
							friends,
							f => f.identityId,
							f =>
								html`<identity-tile
									@contextmenu=${showIdentityContextMenu(f)}
									.identity=${f}
								></identity-tile>`
						)}
				  </div>`
				: html`<p class="placeholder">No friends playing</p>`
			: html`<p class="placeholder">Fetching friends...</p>`;
	}

	renderGroupList(groups: api.portal.GroupSummary[], loadingCount: number = LOAD_GROUP_COUNT) {
		if (groups && groups.length == 0) return html`<div><p class="placeholder">No groups found</p></div>`;

		return html`
			<div id="groups-list">
				${groups
					? repeat(
							groups,
							g => g.groupId,
							group =>
								html`<div class="square-tile"><group-tile .group=${group}></group-tile></div>`
					  )
					: null}
				${!groups ? this.renderLoadingGroups(loadingCount) : null}
			</div>
		`;
	}

	renderLoadingGroups(count: number) {
		let items = [];
		for (let i = 0; i < count; i++) {
			items.push(html`<div class="square-tile"><loading-placeholder></loading-placeholder></div>`);
		}
		return items;
	}

	renderPlatformIcon(p: api.portal.GamePlatformLink) {
		let iconName = '';

		switch (p.displayName) {
			case 'Browser':
				iconName = 'brands/html5';
				break;
			case 'iOS':
				iconName = 'brands/apple';
				break;
			case 'Windows':
				iconName = 'brands/windows';
				break;
		}

		return html` <a class="platform-link" href=${p.url} @mouseenter=${tooltip(p.displayName)}>
			<e-svg src=${iconName}></e-svg>
		</a>`;
	}

	renderLeaderboard() {
		// Category selection
		let selection =
			this.leaderboardType == 'identities'
				? this.selectedIdentityLeaderboardCategory
				: this.selectedGroupLeaderboardCategory;
		let leaderboardLabel = `${this.leaderboardType} ${selection}`;
		let leaderboardData = this.leaderboardDataCache.has(leaderboardLabel)
			? this.leaderboardDataCache.get(leaderboardLabel)
			: null;

		return html` ${this.profile && leaderboardData
			? html` <!-- Leaderboard category buttons -->
					<div id="leaderboard-buttons">
						${repeat(
							this.leaderboardType == 'identities'
								? this.profile.identityLeaderboardCategories
								: this.profile.groupLeaderboardCategories,
							a => a.displayName,
							a =>
								selection == a.displayName
									? html`<stylized-button color="#F0F0F0" text="#1d1d1d"
											>${a.displayName}</stylized-button
									  >`
									: html`<stylized-button
											color="#ffffff05"
											.trigger=${this.changeLeaderboardCategory.bind(
												this,
												a.displayName
											)}
											>${a.displayName}</stylized-button
									  >`
						)}
					</div>`
			: null}
		${leaderboardData
			? html` <!-- Leaderboard table -->
					<table id="leaderboard-table">
						<tr>
							<th></th>
							<th>Identity</th>
							${repeat(
								leaderboardData.columns,
								a => a.recordId,
								a => html`<th>${a.displayName}</th>`
							)}
						</tr>
						<!-- Iterate identities -->
						${repeat(
							leaderboardData.data,
							data => (data.owner.identity ? data.owner.identity.id : data.owner.group.id),
							(data, i) => {
								let id = data.owner.identity ? data.owner.identity.id : data.owner.group.id;
								let classes = classMap({
									'is-self': id == global.currentIdentity.identityId
								});

								return html` <tr class=${classes}>
									<td>
										${i == 0
											? html`<e-svg id="crown" src="regular/crown"></e-svg>`
											: i + 1}
									</td>
									<td>
										${data.owner.identity
											? html`<identity-tile
													@contextmenu=${showIdentityContextMenu(
														data.owner.identity
													)}
													.identity=${data.owner.identity}
											  ></identity-tile>`
											: html`<group-handle-tile
													.group=${data.owner.group}
											  ></group-handle-tile>`}
									</td>
									${repeat(data.values, (v: number, i) => {
										// get the stat config from the columns list
										let config = leaderboardData.columns[i];
										// Create a fake stat summary to format
										let fakeSummary = { config: config, overallValue: v };

										return html`<td>${format.richFormatValue(fakeSummary) || '--'}</td>`;
									})}
								</tr>`;
							}
						)}
					</table>`
			: html` <!-- Placeholder table -->
					<table id="leaderboard-table-placeholder">
						<tr>
							<th><loading-placeholder></loading-placeholder></th>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
						<tr>
							<td><loading-placeholder></loading-placeholder></td>
						</tr>
					</table>`}`;
	}

	changeLeaderboardCategory(category: string) {
		if (this.leaderboardType == 'identities') this.selectedIdentityLeaderboardCategory = category;
		else this.selectedGroupLeaderboardCategory = category;
	}

	changeLeaderboardType(type: string) {
		this.leaderboardType = type;
	}

	buildBackButton() {
		// If back navigation is possible, use function rather than link
		if (UIRouter.shared.canGoBack) {
			return html` <stylized-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="transparent"
				text="white"
			>
				Back
			</stylized-button>`;
		} else {
			return html` <stylized-button
				icon="solid/play"
				id="nav-back"
				small
				color="transparent"
				text="white"
			>
				Arcade
			</stylized-button>`;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
