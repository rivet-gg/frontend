import 'chartjs-adapter-moment';
import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../../utils/css';
import styles from './overview.scss';
import { responses } from '../../../routes';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { styleMap } from 'lit/directives/style-map.js';
import { Orientation } from '../../common/overlay-positioning';
import { CloudDashboardCache, CloudGameCache } from '../../../data/cache';
import global from '../../../utils/global';
import logging from '../../../utils/logging';
import { globalEventGroups } from '../../../utils/global-events';
import assets from '../../../data/assets';
import timing from '../../../utils/timing';
import { Rivet } from '@rivet-gg/api';
import { Rivet as RivetEe } from '@rivet-gg/api-ee';
import Chart from './chart';
import { RepeatingRequest } from '../../../utils/repeating-request';
import { dataSetToVariant } from './utilities';

enum DateRange {
	Min10 = timing.minutes(10),
	Min30 = timing.minutes(30),
	Hour1 = timing.hours(1),
	Hour6 = timing.hours(6),
	Day1 = timing.days(1),
	Day2 = timing.days(2),
	Day3 = timing.days(3),
	Week1 = timing.days(7),
	Week2 = timing.days(14),
	Month1 = timing.days(30),
	Month2 = timing.days(60)
}

enum Category {
	MmOverview,
	MmPlayers,
	MmLobbies
}

const CATEGORIES: DropDownSelection<number>[] = [
	{
		label: 'Matchmaker',
		value: null,
		header: true
	},
	{
		label: 'Overview',
		value: Category.MmOverview
	},
	{
		label: 'Players',
		value: Category.MmPlayers
	},
	{
		label: 'Lobbies',
		value: Category.MmLobbies
	}
];

@customElement('page-analytics-overview')
export default class AnalyticsOverview extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string = null;

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	games: Rivet.game.Summary[] = [];
	@property({ type: String })
	game: Rivet.cloud.GameFull = null;

	// Used for caching so as to not re-create the chart.js chart after every update
	@property({ type: Array })
	charts: Map<string, Chart> = new Map();

	@property({ type: Boolean })
	isLoading = false;

	dateOptions: DropDownSelection<DateRange>[] = [
		{ label: 'Past 10 Minutes', value: DateRange.Min10 },
		{ label: 'Past 30 Minutes', value: DateRange.Min30 },
		{ label: 'Past Hour', value: DateRange.Hour1 },
		{ label: 'Past 6 Hours', value: DateRange.Hour6 },
		{ label: 'Past Day', value: DateRange.Day1 },
		{ label: 'Past 2 Days', value: DateRange.Day2 },
		{ label: 'Past 3 Days', value: DateRange.Day3 },
		{ label: 'Past Week', value: DateRange.Week1 },
		{ label: 'Past 2 Weeks', value: DateRange.Week2 },
		{ label: 'Past Month', value: DateRange.Month1 },
		{ label: 'Past 2 Months', value: DateRange.Month2 }
	];
	gameOptions: DropDownSelection<string>[] = [];
	namespaceOptions: DropDownSelection<string>[] = [];

	@property({ type: Object })
	dateSelection: DropDownSelection<DateRange> = this.dateOptions[4];
	@property({ type: Object })
	gameSelection: DropDownSelection<string> = null;
	@property({ type: Object })
	namespaceSelection: DropDownSelection<string> = null;
	@property({ type: Object })
	category: DropDownSelection<number> = CATEGORIES[1];

	gamesStream?: RepeatingRequest<Rivet.cloud.games.GetGamesResponse>;
	gameStream?: RepeatingRequest<Rivet.cloud.games.GetGameByIdResponse>;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchGames();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Fetch analytics
		if (
			(changedProperties.has('category') ||
				changedProperties.has('dateSelection') ||
				changedProperties.has('namespaceSelection') ||
				changedProperties.has('gameSelection')) &&
			this.games.length
		) {
			let variants: RivetEe.ee.cloud.AnalyticsVariantQuery[] = [];
			if (this.category.value == Category.MmOverview) {
				variants = [
					RivetEe.ee.cloud.AnalyticsVariantQuery.MatchmakerOverview,
					RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCount,
					RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByRegion,
					RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByGameMode,
					RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCount,
					RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByRegion,
					RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByGameMode
				];
			} else if (this.category.value == Category.MmPlayers) {
				variants = [
					RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDuration,
					RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDurationByRegion,
					RivetEe.ee.cloud.AnalyticsVariantQuery.AvgPlayDurationByGameMode,
					RivetEe.ee.cloud.AnalyticsVariantQuery.NewPlayersPerSecond,
					RivetEe.ee.cloud.AnalyticsVariantQuery.NewLobbiesPerSecond
				];
			} else if (this.category.value == Category.MmLobbies) {
				variants = [
					RivetEe.ee.cloud.AnalyticsVariantQuery.DestroyedLobbiesByFailure,
					RivetEe.ee.cloud.AnalyticsVariantQuery.DestroyedLobbiesByExitCode,
					RivetEe.ee.cloud.AnalyticsVariantQuery.FailedLobbies,
					RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyReadyTime
				];
			}

			this.fetchAnalytics(variants);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.gamesStream) this.gamesStream.cancel();
		if (this.gameStream) this.gameStream.cancel();
	}

	async fetchGames() {
		if (this.gamesStream) this.gamesStream.cancel();

		// Fetch events
		this.gamesStream = CloudDashboardCache.watch('AnalyticsOverview.gamesStream', data => {
			data.games.sort((a, b) => a.displayName.localeCompare(b.displayName));
			this.games = data.games.filter(a => a.developer.groupId == this.groupId);

			// Create game options
			this.gameOptions = [
				{ label: 'All', value: null },
				...this.games.map(game => {
					let handleStyles = styleMap({
						display: 'flex',
						'flex-direction': 'row',
						'align-items': 'center',
						padding: '0 10px 0 0'
					});

					return {
						template: html`<div style=${handleStyles}>
							<lazy-img
								class="left-icon"
								bg-size=${game.logoUrl ? 'contain' : 'cover'}
								src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
							></lazy-img>
							${game.displayName}
						</div>`,
						value: game.gameId
					};
				})
			];

			if (this.gameSelection) {
				this.gameSelection = this.gameOptions.find(o => o.value == this.gameSelection.value);
			} else this.gameSelection = this.gameOptions[0];
		});

		this.gamesStream.onError(err => {
			logging.error('Request error', err);

			// Only set `loadError` on initiation
			if (this.games) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	async fetchGame() {
		if (this.gameStream) this.gameStream.cancel();

		// Fetch events
		this.gameStream = CloudGameCache.watch(
			'AnalyticsOverview.gameStream',
			this.gameSelection.value,
			res => {
				this.game = res.game;

				this.namespaceOptions = [
					{ label: 'All', value: null },
					...this.game.namespaces.map(ns => ({
						label: ns.displayName,
						value: ns.namespaceId
					}))
				];

				if (this.namespaceSelection) {
					this.namespaceSelection = this.namespaceOptions.find(
						o => o.value == this.namespaceSelection.value
					);
				} else this.namespaceSelection = this.namespaceOptions[0];
			}
		);

		this.gameStream.onError(err => {
			logging.error('Request error', err);

			if (this.game) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	async fetchAnalytics(variants: RivetEe.ee.cloud.AnalyticsVariantQuery[]) {
		let now = Date.now();

		this.isLoading = true;

		try {
			let res = await global.apiEe.ee.cloud.games.namespaces.analytics.getAnalytics({
				gameIds: this.namespaceSelection?.value
					? null
					: this.gameSelection.value
					? [this.gameSelection.value]
					: this.games.map(a => a.gameId),
				namespaceIds: this.namespaceSelection?.value ? [this.namespaceSelection.value] : null,
				variants,
				queryStart: new Date(now - this.dateSelection.value),
				queryEnd: new Date(now)
			});

			for (let dataSet of res.dataSets) {
				let id = dataSetToVariant(dataSet);

				// Create a new chart
				if (!this.charts.has(id)) {
					let chart = new Chart();

					this.charts.set(id, chart);
				}

				// Update data
				let chart = this.charts.get(id);
				chart.dataSet = dataSet;
			}

			this.requestUpdate('charts');
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		}

		this.isLoading = false;
	}

	updateDateRange(event: DropDownSelectEvent<DateRange>) {
		this.dateSelection = event.selection;
	}

	updateGame(event: DropDownSelectEvent<string>) {
		this.gameSelection = event.selection;

		// Reset data
		this.game = null;
		this.namespaceSelection = null;
		this.namespaceOptions.length = 0;

		// Fetch game data
		if (this.gameSelection.value != null) this.fetchGame();
		else if (this.gameStream) this.gameStream.cancel();
	}

	updateNamespace(event: DropDownSelectEvent<string>) {
		this.namespaceSelection = event.selection;
	}

	updateCategory(event: DropDownSelectEvent<number>) {
		this.category = event.selection;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div class="mx-auto max-w-contentwidth px-3 md:px-5 lg:px-0 pb-8">
				<div id="base">
					<page-header>
						<e-svg src="regular/square-poll-vertical"></e-svg>
						<h1>Analytics</h1>
					</page-header>

					<div id="actions">
						<div class="action-group">
							<div class="pair">
								<h2>View</h2>
								<drop-down-list
									.selection=${this.category}
									.options=${CATEGORIES}
									@select=${this.updateCategory.bind(this)}
								></drop-down-list>
							</div>
							<div class="pair">
								<h2>Range</h2>
								<drop-down-list
									.selection=${this.dateSelection}
									.options=${this.dateOptions}
									.orientation=${Orientation.TopRight}
									@select=${this.updateDateRange.bind(this)}
								></drop-down-list>
							</div>
						</div>
						<div class="action-group">
							<div class="pair">
								<h2>Game</h2>
								<drop-down-list
									.selection=${this.gameSelection}
									.options=${this.gameOptions}
									.orientation=${Orientation.TopRight}
									@select=${this.updateGame.bind(this)}
								></drop-down-list>
							</div>
							${when(this.namespaceOptions.length, () => {
								return html`<div class="pair">
									<h2>Namespace</h2>
									<drop-down-list
										.selection=${this.namespaceSelection}
										.options=${this.namespaceOptions}
										.orientation=${Orientation.TopRight}
										@select=${this.updateNamespace.bind(this)}
									></drop-down-list>
								</div>`;
							})}
						</div>
						${when(this.isLoading, () => html`<loading-wheel custom></loading-wheel>`)}
					</div>
					<div id="body">
						<div class="charts">
							${repeat(
								this.charts,
								([k, _]) => k,
								([_, v]) => v
							)}
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
