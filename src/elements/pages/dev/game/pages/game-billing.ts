import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './game-billing.scss';
import * as cloud from '@rivet-gg/cloud';
import * as api from '../../../../../utils/api';
import routes, { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import global from '../../../../../utils/global';
import { showAlert, tooltip } from '../../../../../ui/helpers';
import logging from '../../../../../utils/logging';
import utils from '../../../../../utils/utils';
import { DropDownSelectEvent } from '../../../../dev/drop-down-list';
import { globalEventGroups } from '../../../../../utils/global-events';
import moment from 'moment';
import { Orientation } from '../../../../common/overlay-positioning';
import numbro from 'numbro';
import { GroupProfileCache } from '../../../../../data/cache';
import { RepeatingRequest } from '../../../../../utils/repeating-request';

enum DateRange {
	Today,
	Yesterday,
	Last7Days,
	Last7DaysFromYesterday,
	Last14Days,
	Last30Days,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth
}

interface NamespaceBillingData {
	namespaceId: string;
	namespace: cloud.NamespaceSummary;
	uptime: number;
	lobbyGroups: LobbyGroupBillingData[];
}

interface LobbyGroupBillingData {
	lobbyGroupNameId: string;
	metrics: cloud.RegionTierMetrics[];
	uptime: number;
}

@customElement('page-dev-game-billing')
export default class DevGameBilling extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	group?: api.group.GroupProfile;

	@property({ type: Object })
	groupMembers: api.group.GroupMember[] = [];

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	billing: cloud.GetGameBillingCommandOutput;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Object })
	plans: cloud.GameBillingPlan[] = [];

	@property({ type: Number })
	dateRange: DateRange = DateRange.ThisMonth;

	@property({ type: Object })
	assortedBillingData: NamespaceBillingData[] = [];

	@property({ type: Boolean })
	isExporting = false;

	@property({ type: Boolean })
	isUpdating = false;

	// === EVENT HANDLERS ===
	groupStream?: RepeatingRequest<api.group.GetGroupProfileCommandOutput>;

	_oldGameId: string = null;

	constructor() {
		super();

		// Fetch configs
		global.cloud
			.getRegionTiers({})
			.then(res => (this.tiers = res.tiers))
			.catch(err => globalEventGroups.dispatch('error', err));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.groupStream) this.groupStream.cancel();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('game')) {
			if (this._oldGameId != this.game.gameId) {
				this._oldGameId = this.game.gameId;

				this.resetGroupData();
				this.resetData();
				this.fetchGroup();
				this.fetchGameBilling();
				this.fetchGameBillingPlans();
			}
		} else if (changedProperties.has('dateRange')) {
			this.fetchGameBilling();
		}
	}

	resetData() {
		this.billing = null;
		this.assortedBillingData.length = 0;
	}

	resetGroupData() {
		this.group = null;
		if (this.groupStream) this.groupStream.cancel();
	}

	async fetchGameBilling() {
		let { queryStart, queryEnd } = this.calcDateRange();

		try {
			this.isUpdating = true;
			let res = await global.cloud.getGameBilling({
				gameId: this.game.gameId,
				queryStart,
				queryEnd
			});

			this.billing = res;

			let assortedBillingData: NamespaceBillingData[] = [];
			for (let metric of this.billing.metrics) {
				// Get or create namespace
				let namespace = assortedBillingData.find(x => x.namespaceId == metric.namespaceId);
				if (!namespace) {
					namespace = {
						namespaceId: metric.namespaceId,
						namespace: this.billing.namespaces.find(x => x.namespaceId == metric.namespaceId),
						uptime: 0,
						lobbyGroups: []
					};
					assortedBillingData.push(namespace);
				}

				namespace.uptime += metric.uptime;

				// Get or create lobby group
				let lobbyGroup = namespace.lobbyGroups.find(
					x => x.lobbyGroupNameId == metric.lobbyGroupNameId
				);
				if (!lobbyGroup) {
					lobbyGroup = {
						lobbyGroupNameId: metric.lobbyGroupNameId,
						metrics: [],
						uptime: 0
					};
					namespace.lobbyGroups.push(lobbyGroup);
				}

				lobbyGroup.metrics.push(metric);
				lobbyGroup.uptime += metric.uptime;
			}

			// Sort
			assortedBillingData = assortedBillingData.sort((a, b) => b.uptime - a.uptime);
			for (let namespace of assortedBillingData) {
				namespace.lobbyGroups = namespace.lobbyGroups.sort((a, b) => b.uptime - a.uptime);
			}

			this.assortedBillingData = assortedBillingData;
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}
		this.isUpdating = false;
	}

	async fetchGameBillingPlans() {
		global.cloud
			.getGameBillingPlans({ gameId: this.game.gameId })
			.then(res => (this.plans = res.plans))
			.catch(err => globalEventGroups.dispatch('error', err));
	}

	async fetchGroup() {
		// Fetch events
		if (this.groupStream) this.groupStream.cancel();
		this.groupStream = await GroupProfileCache.watch("DevGameBilling.groupStream", this.game.developerGroupId, res => {
			this.group = res.group;
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);

			if (this.group) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});

		global.live.group
			.getGroupMembers({ groupId: this.game.developerGroupId })
			.then(res => {
				this.groupMembers = res.members;
			})
			.catch(err => {
				globalEventGroups.dispatch('error', err);
			});
	}

	async setPlan(plan: cloud.GameBillingPlanCode) {
		if ((await this.confirmPlanChange(plan)).value) {
			try {
				await global.cloud.setGameBillingPlan({
					gameId: this.game.gameId,
					plan
				});

				this.fetchGameBilling();
			} catch (err) {
				globalEventGroups.dispatch('error', err);
			}

			this.requestUpdate('versionConfig');
		}
	}

	confirmPlanChange(plan: cloud.GameBillingPlanCode) {
		showAlert(
			'Confirm Plan Change',
			html`<p>
				Are you sure you want to change this group's billing plan?
				${when(
					plan == cloud.GameBillingPlanCode.FREE,
					() =>
						html`Although this plan is free, switching back to a paid plan will bill you
							immediately.
							<a class="link" href="https://rivet.gg/support" target="_blank"
								>Contact Support</a
							>
							for more info.`,
					() =>
						html`You will be billed immediately following this change.
							<a class="link" href="https://rivet.gg/support" target="_blank"
								>Contact Support</a
							>
							for more info.`
				)}
			</p>`,
			[
				{
					label: 'Cancel',
					cb: () => globalEventGroups.dispatch('alert-panel-close', false)
				},
				{
					label: 'Confirm',
					color: SHARED_COLORS['main-accent'],
					cb: () => globalEventGroups.dispatch('alert-panel-close', true)
				}
			]
		);

		return globalEventGroups.await('alert-panel-close');
	}

	calcDateRange(): { queryStart: number; queryEnd: number } {
		// NOTE: `now` and `today` are the same date except for that `today` has hours, minutes,
		// secs, and ms set to 0 (is start of day). They are used differently in each export range.
		let now = new Date();
		let currentMonth = now.getUTCMonth();
		let currentDate = now.getUTCDate();
		let currentDay = now.getUTCDay(); // Day of week
		let today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

		let queryStart = 0;
		let queryEnd = Date.now();

		if (this.dateRange == DateRange.Today) {
			queryStart = today;
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.Yesterday) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 1);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last7Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 7);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last7DaysFromYesterday) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 8);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last14Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 14);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last30Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 30);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.ThisWeek) {
			let date = new Date(today);
			date.setUTCDate(currentDate - currentDay);

			queryStart = date.getTime();
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.LastWeek) {
			let date = new Date(today);
			date.setUTCDate(currentDate - currentDay - 7);
			let dateEnd = new Date(today);
			dateEnd.setUTCDate(currentDate - currentDay);

			queryStart = date.getTime();
			queryEnd = dateEnd.getTime();
		} else if (this.dateRange == DateRange.ThisMonth) {
			let date = new Date(today);
			date.setUTCDate(1);

			queryStart = date.getTime();
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.LastMonth) {
			let date = new Date(today);
			date.setUTCMonth(currentMonth - 1);
			date.setUTCDate(1);
			let dateEnd = new Date(today);
			dateEnd.setUTCDate(1);

			queryStart = date.getTime();
			queryEnd = dateEnd.getTime();
		}

		return { queryStart, queryEnd };
	}

	async updateDateRange(event: DropDownSelectEvent<DateRange>) {
		this.dateRange = event.selection.value;
	}

	async exportLobbyHistory() {
		this.isExporting = true;

		try {
			let { queryStart, queryEnd } = this.calcDateRange();
			let res = await global.cloud.exportMatchmakerLobbyHistory({
				gameId: this.game.gameId,
				queryStart,
				queryEnd
			});

			// Format export filename
			logging.event(
				'Export',
				this.game ? this.game.nameId : null,
				`${moment(queryStart).format('YYYY/MM/DD')}`,
				'-',
				`${moment(queryEnd).format('YYYY/MM/DD')}`
			);

			utils.clickHiddenLink(res.url, 'convert.csv');
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		}

		this.isExporting = false;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		return html`<div id="base">
			${this.renderGroup()}
			<h1>Plan</h1>
			${this.renderMessage()} ${this.renderPlans()}
			<h1>Uptime</h1>
			${this.renderNamespacesBreakdown()}
		</div> `;
	}

	renderGroup() {
		if (!this.group) {
			return html`<loading-placeholder id="group-card-placeholder"></loading-placeholder>`;
		}

		return html`<div id="group-card">
			<div id="group-handle">
				<group-avatar .group=${this.group}></group-avatar>
				<h2>${this.group.displayName}</h2>
				<avatar-collage
					max="5"
					.identities=${this.groupMembers.map(a => a.identity)}
				></avatar-collage>
			</div>

			<stylized-button href=${routes.groupOverview.build({ id: this.game.developerGroupId })}
				>Profile</stylized-button
			>
			<stylized-button
				href=${routes.groupSettings.build({
					groupId: this.group.groupId,
					tab: 'Billing'
				})}
				>Group Billing</stylized-button
			>
		</div>`;
	}

	renderMessage() {
		if (!this.billing) return null;

		return choose(this.billing.groupStatus, [
			[
				cloud.GroupStatus.SETUP_INCOMPLETE,
				() =>
					html`<div id="message">
						<div>
							<h1><e-svg src="solid/triangle-exclamation"></e-svg> Action Required</h1>
							<p>
								Complete your account setup by adding billing information to start developing.
							</p>
							<stylized-button
								href=${routes.groupSettings.build({
									groupId: this.game.developerGroupId,
									tab: 'Billing'
								})}
								>Complete Setup</stylized-button
							>
						</div>
					</div>`
			],
			[
				cloud.GroupStatus.PAYMENT_FAILED,
				() =>
					html`<div id="message" class="error">
						<h1><e-svg src="solid/triangle-exclamation"></e-svg> Action Required</h1>
						<p>
							An invoice payment has failed. All resources have been disabled until the payment
							is resolved.
						</p>
						<stylized-button target="_blank" href="https://rivet.gg/support"
							>Contact Support</stylized-button
						>
					</div>`
			],
			[
				cloud.GroupStatus.SPENDING_LIMIT_REACHED,
				() =>
					html`<div id="message">
						<h1><e-svg src="solid/triangle-exclamation"></e-svg> Alert</h1>
						<p>
							Your monthly custom spending limit has been reached. All resources have been
							disabled until next month or until the limit is raised.
						</p>
					</div>`
			]
		]);
	}

	renderNamespacesBreakdown() {
		let dateOptions = [
			{ label: 'Today', value: DateRange.Today },
			{ label: 'Yesterday', value: DateRange.Yesterday },
			{ label: 'Last 7 Days', value: DateRange.Last7Days },
			{ label: 'Last 7 Days from Yesterday', value: DateRange.Last7DaysFromYesterday },
			{ label: 'Last 14 Days', value: DateRange.Last14Days },
			{ label: 'Last 30 Days', value: DateRange.Last30Days },
			{ label: 'This Week', value: DateRange.ThisWeek },
			{ label: 'Last Week', value: DateRange.LastWeek },
			{ label: 'This Month', value: DateRange.ThisMonth },
			{ label: 'Last Month', value: DateRange.LastMonth }
		];
		let dateSelection = dateOptions.find(x => x.value == this.dateRange);

		return html` <!-- Date range -->
			<div id="actions">
				<div id="period-actions">
					<h2>Period</h2>
					<drop-down-list
						id="date-range"
						.selection=${dateSelection}
						.options=${dateOptions}
						.orientation=${Orientation.TopRight}
						@select=${this.updateDateRange.bind(this)}
					></drop-down-list>
				</div>
				${when(
					!this.isExporting,
					() =>
						html`<stylized-button id="export" .trigger=${this.exportLobbyHistory.bind(this)}
							>Export Data</stylized-button
						>`
				)}
				${when(
					this.isExporting || this.isUpdating,
					() => html`<loading-wheel custom></loading-wheel>`
				)}
			</div>
			<div id="namespaces">
				<!-- Loading/empty state -->
				${when(!this.billing, () => html`<loading-wheel></loading-wheel>`)}
				${when(
					this.billing && this.billing.metrics.length == 0,
					() => html`<div id="no-data">No data found</div>`
				)}

				<!-- Region list -->
				${repeat(
					this.assortedBillingData,
					ns => ns.namespaceId,
					ns =>
						html`<div class="namespace">
							<h3>${ns.namespace.displayName}</h3>
							<div class="lobby-groups">
								${repeat(
									ns.lobbyGroups,
									lb => lb.lobbyGroupNameId,
									this.renderLobbyGroup.bind(this)
								)}
							</div>
						</div>`
				)}
			</div>`;
	}

	renderLobbyGroup(lobbyGroup: LobbyGroupBillingData) {
		return html`<div class="lobby-group-metrics">
			<div class="lobby-header">
				<div class="left">
					<h2>${lobbyGroup.lobbyGroupNameId}</h2>
				</div>
			</div>

			<div class="lobby-grid">
				${repeat(
					lobbyGroup.metrics,
					rt => rt.regionId,
					regionTier => {
						let regionData = this.billing.availableRegions.find(
							r => r.regionId == regionTier.regionId
						);

						return html`
							<div class="cell region-name">
								<h2>${regionData.regionDisplayName}</h2>
							</div>
							<div class="cell tier-name">
								<e-svg
									class="cores"
									src=${`billing/core/${regionTier.tierNameId.replace(/\//, '-')}`}
								>
								</e-svg>
								<span>${regionTier.tierNameId}</span>
							</div>
							<div
								class="cell region-duration"
								@mouseenter=${tooltip('Total active time of this region')}
							>
								<e-svg src="solid/clock"></e-svg>
								<span>${utils.formatDuration(regionTier.uptime * 1000)}</span>
							</div>
						`;
					}
				)}
			</div>
		</div>`;
	}

	renderPlans() {
		if (!this.billing || !this.plans.length)
			return html`<loading-placeholder class="plans"></loading-placeholder>`;

		let error = null;
		if (this.billing.groupStatus == cloud.GroupStatus.SETUP_INCOMPLETE) error = 'Setup Incomplete';
		if (this.billing.groupStatus == cloud.GroupStatus.PAYMENT_FAILED) error = 'Payment Failed';

		return html`<div id="plans">
				${this.renderPlan(cloud.GameBillingPlanCode.FREE, null, error)}
				${this.renderPlan(
					cloud.GameBillingPlanCode.GAME_HOBBY_MONTHLY,
					cloud.GameBillingPlanCode.GAME_HOBBY_YEARLY,
					error
				)}
				${this.renderPlan(
					cloud.GameBillingPlanCode.GAME_STUDIO_MONTHLY,
					cloud.GameBillingPlanCode.GAME_STUDIO_YEARLY,
					error
				)}
				${this.renderPlan(cloud.GameBillingPlanCode.ENTERPRISE, null, error)}
			</div>
			<p id="plans-footer">
				Looking for more info? Check out our
				<a class="link" href="https://rivet.gg/pricing" target="_blank">Pricing Page</a>.
			</p>`;
	}

	renderPlan(plan: cloud.GameBillingPlanCode, variant: cloud.GameBillingPlanCode | null, error: string) {
		let isOwner = global.currentIdentity.identityId == this.group?.ownerIdentityId;
		let currentlyEnterprise = this.billing.plan == cloud.GameBillingPlanCode.ENTERPRISE;
		let active = this.billing.plan == plan;
		let variantActive = this.billing.plan == variant;

		// Fetch pricing
		let planInfo = this.plans.find(p => p.code == plan);
		let variantPlanInfo = variant ? this.plans.find(p => p.code == variant) : null;
		let priceMonthly = planInfo ? planInfo.amount / 100 : null;
		let priceAnnually = variantPlanInfo ? variantPlanInfo.amount / 100 : null;

		console.log(planInfo, variantPlanInfo, priceMonthly, priceAnnually);

		let info;
		if (plan == cloud.GameBillingPlanCode.FREE) {
			info = html`<div class="info">
				<h1>Starter</h1>
				<div class="price">
					<p><b>Free</b></p>
				</div>
				<p></p>
				<ul>
					<li>$5/mo ServerLess Lobbies credits</li>
					<li>3h log history</li>
					<li>24h analytics history</li>
					<li>16 GB Docker & site history</li>
					<li>Community support</li>
				</ul>
			</div>`;
		} else if (plan == cloud.GameBillingPlanCode.GAME_HOBBY_MONTHLY) {
			info = html`<div class="info">
				<h1>Hobby</h1>
				<div class="price">
					<p><b>$${numbro(priceAnnually / 12).format('0,0')}</b>/mo*</p>
				</div>
				<p>Everything <b>Starter</b> plus...</p>
				<ul>
					<li>48h log history</li>
					<li>7h analytics history</li>
					<li>64 GB Docker & site history</li>
					<li>Business day priority support</li>
				</ul>
				<i class="footnote">* billed annually</i>
			</div>`;
		} else if (plan == cloud.GameBillingPlanCode.GAME_STUDIO_MONTHLY) {
			info = html`<div class="info">
				<h1>Studio</h1>
				<div class="price">
					<p><b>$${numbro(priceAnnually / 12).format('0,0')}</b>/mo*</p>
				</div>
				<p>Everything <b>Hobby</b> plus...</p>
				<ul>
					<li>97d log history</li>
					<li>90d analytics history</li>
					<li>1024 GB Docker & site history</li>
					<li>Dedicated Slack or Discord channel</li>
					<li>Audit log</li>
					<li>24/7 priority support</li>
				</ul>
				<i class="footnote">* billed annually</i>
			</div>`;
		} else if (plan == cloud.GameBillingPlanCode.ENTERPRISE) {
			info = html`<div class="info">
				<h1>Enterprise</h1>
				${when(
					planInfo,
					() =>
						html`<div class="price">
							<p>
								<b
									>$${numbro(
										priceMonthly /
											(planInfo.interval == cloud.BillingInterval.MONTHLY ? 1 : 12)
									).format('0,0')}</b
								>/mo
							</p>
						</div>`
				)}
				<p>Everything <b>Studio</b> plus...</p>
				<ul>
					<li>Custom log history</li>
					<li>Custom analytics history</li>
					<li>Custom Docker & site history</li>
					<li>Custom SLA</li>
					<li>Custom firewall rules</li>
				</ul>
			</div>`;
		}

		if (plan != cloud.GameBillingPlanCode.ENTERPRISE) {
			return html`<div class="plan">
				${info}
				<div class="actions">
					${when(
						isOwner,
						() =>
							when(
								variant == null,
								() => html`
									<stylized-button
										class=${classMap({ active })}
										?disabled=${currentlyEnterprise || error || active}
										.trigger=${this.setPlan.bind(this, plan)}
										>${error ?? (active ? 'Active' : 'Switch')}</stylized-button
									>
								`,
								() => {
									let priceMonthlyFmt = numbro(priceMonthly).format('0,0');
									let priceAnnuallyFmt = numbro(priceAnnually).format('0,0');

									return html`<stylized-button
											class=${classMap({ active: variantActive })}
											?disabled=${currentlyEnterprise ||
											error ||
											this.billing.plan == variant}
											.trigger=${this.setPlan.bind(this, variant)}
											>${error ??
											(variantActive
												? `Active ($${priceAnnuallyFmt}/yr)`
												: `Switch to Annual ($${priceAnnuallyFmt}/yr)`)}
										</stylized-button>
										<stylized-button
											class=${classMap({ active })}
											?disabled=${currentlyEnterprise || error || active}
											.trigger=${this.setPlan.bind(this, plan)}
											>${error ??
											(active
												? `Active ($${priceMonthlyFmt}/mo)`
												: `Switch to Monthly ($${priceMonthlyFmt}/mo)`)}
										</stylized-button>`;
								}
							),
						() => {
							if (active) {
								return html`<stylized-button class="active" disabled
									>Active${variant == null ? null : ` (Monthly)`}</stylized-button
								>`;
							} else if (variantActive) {
								return html`<stylized-button class="active" disabled
									>Active (Annual)</stylized-button
								>`;
							}

							return null;
						}
					)}
				</div>
			</div>`;
		} else {
			return html`<div class="plan">
				<div class="info">${info}</div>
				<div class="actions">
					${when(
						active,
						() => html`<stylized-button class="active" disabled>Active</stylized-button>`,
						() =>
							html`<stylized-button href="https://rivet.gg/support" .target=${'_blank'}
								>Contact Us</stylized-button
							>`
					)}
				</div>
			</div>`;
		}
	}
}
