import { LitElement, html, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import clsx from 'clsx';
import { customElement, property } from 'lit/decorators.js';
import { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import utils from '../../../../../utils/utils';
import global from '../../../../../utils/global';
import { Rivet } from '@rivet-gg/api';
import { Rivet as RivetEe } from '@rivet-gg/api-ee';
import { InputChangeEvent } from '../../../../dev/text-input';
import { getRegionEmoji } from '../../../../../utils/emoji';
import { RepeatingRequest } from '../../../../../utils/repeating-request';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';

interface PaymentMethodAlert {
	status: 'success' | 'error';
	message: string;
	date: Date;
}

@customElement('page-dev-game-settings-billing')
export default class DevGameSettingsBilling extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@property({ type: Object })
	billingGroup?: RivetEe.ee.cloud.groups.billing.Group;

	@property({ type: Object })
	gamePlan?: RivetEe.ee.cloud.games.billing.Plan;

	@property({ type: Object })
	gamePlanConfig?: RivetEe.ee.cloud.games.billing.PlanConfig;

	@property({ type: Boolean })
	gamePlanUpdating: boolean = false;

	@property({ type: Object })
	loadError?: any;

	billingGroupStream?: RepeatingRequest<RivetEe.ee.cloud.groups.billing.GetBillingResponse>;

	updated(changedProperties: PropertyValues) {
		// Request data if group changed
		if (changedProperties.has('game')) {
			this.resetData();
			this.fetchData();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.billingGroupStream) this.billingGroupStream.cancel();
	}

	resetData() {
		this.billingGroup = null;;
		this.gamePlan = null;
		this.gamePlanConfig = null;
		this.loadError = null;
		this.gamePlanUpdating = false;
		this.requestUpdate();
	}

	async fetchData() {
		// Watch billing group
		if (this.billingGroupStream) this.billingGroupStream.cancel();

		this.billingGroupStream = new RepeatingRequest(
			'DevGameSettingsBilling.billingGroupStream',
			async (abortSignal, watchIndex) => {
				return await global.apiEe.ee.cloud.groups.billing.get(
					this.game.developerGroupId,
					{ watchIndex },
				);
			},
		);

		this.billingGroupStream.onMessage(res => {
			if (!this.billingGroup || !utils.deepEqual(res.group, this.billingGroup)) {
				this.billingGroup = res.group;
			}
		});

		this.billingGroupStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});

		// Fetch game plan
		try {
			// Fetch data
			let gameRes = await global.apiEe.ee.cloud.games.billing.get(this.game.gameId);
			this.gamePlan = gameRes.plan;

			// Create default game plan config
			this.gamePlanConfig = {
				dynamicServersCapacity: this.gamePlan.dynamicServersCapacity.map(region => ({
					regionId: region.region.regionId,
					cores: region.cores,
				}))
			};
		} catch (err) {
			this.loadError = err;
		}
	}

	async openBillingPortal(intent: RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent) {
		let portal = await global.apiEe.ee.cloud.groups.billing.createStripePortalSession(this.game.developerGroupId, {
			intent,
		});
		open(portal.stripeSessionUrl, '_blank');
	}

	render() {
		if (!this.billingGroup) return this.renderPlaceholder();
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (global.bootstrapData.cluster != Rivet.cloud.BootstrapCluster.Enterprise) return responses.renderEeOnly();


		return html`
			<h1>Billing</h1>

			${this.renderPaymentMethod()}

			${this.renderInvoices()}

			${this.renderDynamicServersCapacity()}


		`;
	}

	renderInvoices() {
		return html`
			<h2>Invoices</h2>
			<rvt-button @click=${this.openBillingPortal.bind(this, RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.General)}>View</rvt-button>
		`;

	}

	renderPaymentMethod() {
		// Payment method alerts
		let paymentMethodAlerts: PaymentMethodAlert[] = [];
		if (this.billingGroup.paymentMethodAttachedTs) {
			if (this.billingGroup.paymentMethodValidTs) paymentMethodAlerts.push({ status: "success", date: this.billingGroup.paymentMethodValidTs, message: "Payment method valid" })
			else paymentMethodAlerts.push({ status: "error", date: this.billingGroup.paymentMethodAttachedTs, message: "Payment method invalid" });
		} else {
			paymentMethodAlerts.push({ status: "error", date: null, message: "No payment method attached" })
		}
		if (this.billingGroup.paymentFailedTs) paymentMethodAlerts.push({ status: "error", date: this.billingGroup.paymentFailedTs, message: "Payment failed" });

		return html`
			<h2>Payment Method</h2>
			<div>
				${map(paymentMethodAlerts, alert => html`
					<div class=${clsx('flex flex-row gap-2', alert.status == 'error' ? 'text-red-500' : 'text-white')}>
						<div class='font-bold'>${alert.message}</div>
						${alert.date && html`<div class='italic'>${utils.formatDateLong(alert.date)}</div>`}
					</div>
				`)}
			</div>
			${when(
				this.billingGroup.paymentMethodAttachedTs,
				() => html`<rvt-button @click=${this.openBillingPortal.bind(this, RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.General)}>Manage</rvt-button>`,
				() => html`<rvt-button @click=${this.openBillingPortal.bind(this, RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.PaymentMethodUpdate)}>Add Payment Method</rvt-button>`,
			)}
		`;
	}

	renderDynamicServersCapacity() {
		if (!this.billingGroup.paymentMethodValidTs) {
			return html`
				<h2>Dynamic Servers Capacity</h2>
				<div>Please input a valid payment method</div>
			`;
		}

		// Calculate total core count
		let totalCores = this.gamePlanConfig.dynamicServersCapacity.reduce((total, region) => total + region.cores, 0);

		// Determine if config has changed
		let isChanged = this.gamePlan.dynamicServersCapacity.findIndex(region => region.cores != this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == region.region.regionId).cores) >= 0;

		return html`
			<h2>Dynamic Servers Capacity</h2>
			<div class="grid grid-cols-2 gap-4 max-w-lg">
				<!-- Header -->
				<div class="font-bold">Region</div>
				<div class="font-bold">Capacity (1 core = 1 CPU core + 2 GB RAM)</div>

				<!-- Items -->
				${repeat(
					this.gamePlan.dynamicServersCapacity,
					region => region.region.regionId,
					region => {
						let config = this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == region.region.regionId);
						let regionIcon = getRegionEmoji(region.region.universalRegion);
						return html`
							<div>

								<e-svg class='w-6 h-6 mr-1' preserve src=${regionIcon}></e-svg>
								${region.region.regionDisplayName}
							</div>
							<text-input class="w-24" number min="0" max="32768" placeholder="0" .init=${config.cores} @change=${this.handleDynamicServersRegionInput.bind(this, region.region.regionId)} />
						`
					}
				)}
			</div>

			<div>
				<span class='font-bold'>Total: </span> ${totalCores} cores &times; $26.00 USD = $${(totalCores * 26).toFixed(2)} USD
			</div>

			<rvt-button @click=${this.applyGamePlan.bind(this)} ?disabled=${!isChanged} ?loading=${this.gamePlanUpdating}>Apply</rvt-button>

			<div>If you are downgrading, your new plan will take effect at the end of your current billing period. If you are upgrading, you will be billed immediately for the prorated amount.</div>
		`
	}

	handleDynamicServersRegionInput(regionId: string, e: InputChangeEvent) {
		this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == regionId).cores = parseInt(e.value);
		this.requestUpdate("gamePlanConfig");
	}

	async applyGamePlan() {
		try {
			this.gamePlanUpdating = true;

			await global.apiEe.ee.cloud.games.billing.updatePlan(this.game.gameId, { plan: this.gamePlanConfig });

			let gameRes = await global.apiEe.ee.cloud.games.billing.get(this.game.gameId);
			this.gamePlan = gameRes.plan;

			this.gamePlanUpdating = false;
		} catch (err) {
			this.loadError = err;
		}
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-right"><loading-placeholder></loading-placeholder></div>
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder><loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder id="placeholder-summary"></loading-placeholder>
			<loading-placeholder id="placeholder-table-header"></loading-placeholder>
			<loading-placeholder id="placeholder-table-row"></loading-placeholder>
		</div>`;
	}
}
