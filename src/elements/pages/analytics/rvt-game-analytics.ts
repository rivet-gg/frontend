import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { global } from '../../../utils/global';
import logging from '../../../utils/logging';
import { Rivet } from '@rivet-gg/api';
import { Rivet as RivetEe } from '@rivet-gg/api-ee';
import timing from '../../../utils/timing';
import Chart from './chart';
import { map } from 'lit/directives/map.js';
import { cssify } from '../../../utils/css';
import routes from '../../../routes';
import moment from 'moment';
import { LINE_CHART_OPTIONS } from './configs';
import merge from 'lodash/merge';
import { dataSetToVariant } from './utilities';

type Variants =
	| typeof RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByRegion
	| typeof RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByRegion;

const LINE_CHART_OVERRIDEN_OPTIONS = {
	elements: {
		point: {
			radius: 4,
			backgroundColor: '#ffffff'
		}
	},
	scales: {
		x: { display: true, ticks: { display: false }, grid: { display: true } },
		y: { display: true, ticks: { display: false }, grid: { display: true } }
	},
	plugins: { legend: { display: false } }
};

const QUERY_DATA_RANGE_MAP = {
	'24h': () => ({
		start: new Date(Date.now() - timing.hours(24)),
		end: new Date()
	}),
	'7d': () => ({
		start: new Date(Date.now() - timing.days(7)),
		end: new Date()
	}),
	'30d': () => ({
		start: new Date(Date.now() - timing.days(30)),
		end: new Date()
	})
};

type QueryDataRange = keyof typeof QUERY_DATA_RANGE_MAP;

const VARIANT_SUMMARY = {
	[RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByRegion]: {
		title: 'Players',
		calculate: stats => stats.matchmakerOverview?.playerCount ?? 0
	},
	[RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByRegion]: {
		title: 'Lobbies',
		calculate: stats => stats.matchmakerOverview?.lobbyCount ?? 0
	}
} satisfies Record<
	Variants,
	{ title: string; calculate: (stats: RivetEe.ee.cloud.NamespaceAnalyticsDataSet) => void }
>;

@customElement('rvt-game-analytics')
export class RvtGameAnalytics extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@state()
	private analytics: RivetEe.ee.cloud.games.namespaces.GetAnalyticsResponse;

	@state()
	private charts: { variant: RivetEe.ee.cloud.AnalyticsVariantQuery; chart: Chart }[] = [];

	@state()
	private queryDateRange: QueryDataRange = '24h';

	connectedCallback(): void {
		super.connectedCallback();

		this.fetchAnalytics().catch(err => {
			logging.error(err);
		});
	}

	async fetchAnalytics() {
		let variants = [
			RivetEe.ee.cloud.AnalyticsVariantQuery.PlayerCountByRegion,
			RivetEe.ee.cloud.AnalyticsVariantQuery.LobbyCountByRegion
		];

		let { start: queryStart, end: queryEnd } = QUERY_DATA_RANGE_MAP[this.queryDateRange]();

		this.analytics = await global.apiEe.ee.cloud.games.namespaces.analytics.getAnalytics({
			gameIds: [this.game.gameId],
			namespaceIds: null,
			variants: [RivetEe.ee.cloud.AnalyticsVariantQuery.MatchmakerOverview, ...variants],
			queryStart,
			queryEnd
		});

		let globalStats = this.analytics.dataSets.find(
			dataSet => dataSetToVariant(dataSet) === RivetEe.ee.cloud.AnalyticsVariantQuery.MatchmakerOverview
		);

		let charts = variants.map(variant => {
			let chart = new Chart();
			chart.lineChartOptions = merge(LINE_CHART_OPTIONS, LINE_CHART_OVERRIDEN_OPTIONS);
			chart.renderer = this.chartRenderer.bind(chart, variant, globalStats);
			chart.dataSet = this.analytics.dataSets.find(dataSet => dataSetToVariant(dataSet) === variant);
			return { variant, chart };
		});

		this.charts = charts;
	}

	private chartRenderer(
		this: Chart,
		variant: Variants,
		globalStats: RivetEe.ee.cloud.NamespaceAnalyticsDataSet
	) {
		let summary = VARIANT_SUMMARY[variant];

		return html`<div class="flex items-center">
			<div class="flex flex-col min-w-24">
				<div class="text-sm whitespace-nowrap">${summary.title}</div>
				<div class="text-2xl font-bold">${summary.calculate(globalStats)}</div>
			</div>
			<div class="w-full h-20">${this.chart?.canvas}</div>
		</div>`;
	}

	private handleDateRangeClick(range: QueryDataRange) {
		this.queryDateRange = range;
		this.fetchAnalytics().catch(err => {
			logging.error(err);
		});
	}

	render() {
		let { start, end } = QUERY_DATA_RANGE_MAP[this.queryDateRange]();

		return html`
			<div class="flex flex-col">
				<div class="flex flex-row justify-between">
					<div>
						<rvt-button
							@click=${this.handleDateRangeClick.bind(this, '24h')}
							.disabled=${this.queryDateRange === '24h'}
							variant="secondary"
							size="sm"
							>24 Hours</rvt-button
						>
						<rvt-button
							@click=${this.handleDateRangeClick.bind(this, '7d')}
							.disabled=${this.queryDateRange === '7d'}
							variant="secondary"
							size="sm"
							>7 Days</rvt-button
						>
						<rvt-button
							@click=${this.handleDateRangeClick.bind(this, '30d')}
							.disabled=${this.queryDateRange === '30d'}
							variant="secondary"
							size="sm"
							>30 Days</rvt-button
						>
					</div>
					<div>${moment(start).format('Do MMMM')} - ${moment(end).format('Do MMMM')}</div>
				</div>
				${map(this.charts, ({ chart }) => html`<div class="my-4">${chart}</div>`)}
				<div class="flex justify-end">
					<a href="${routes.analyticsOverview.build({ groupId: this.game.developerGroupId })}">
						View more analytics <e-svg slot="icon" src="regular/arrow-up-right"></e-svg>
					</a>
				</div>
			</div>
		`;
	}
}
