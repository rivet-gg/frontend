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
		this.billingGroup = null;
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
				return await global.apiEe.ee.cloud.groups.billing.get(this.game.developerGroupId, {
					watchIndex
				});
			}
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
					cores: region.cores
				}))
			};
		} catch (err) {
			this.loadError = err;
		}
	}

	async openBillingPortal(intent: RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent) {
		let portal = await global.apiEe.ee.cloud.groups.billing.createStripePortalSession(
			this.game.developerGroupId,
			{
				intent
			}
		);
		open(portal.stripeSessionUrl, '_blank');
	}

	render() {
		if (!this.billingGroup) return this.renderPlaceholder();
		if (this.loadError) return responses.renderError(this.loadError);
		if (global.bootstrapData.cluster != Rivet.cloud.BootstrapCluster.Enterprise)
			return responses.renderEeOnly();

		return html`
			<div class="max-w-5xl">
				<h1 class="text-lg">Billing</h1>

				${when(
					!this.billingGroup.paymentMethodAttachedTs,
					() => this.renderPaymentMethod(),
					() =>
						html`<h2 class="text-base mt-4">Dynamic Servers</h2>
							<div class="grid mt-4 grid-cols-2 gap-8">
								<div>${this.renderDynamicServersCapacity()}</div>

								<div>
									${this.renderDynamicServersCapacityTotal()}
									<div class="col-span-2 border-t border-white/10 my-2"></div>
									${this.renderPaymentMethod()}
								</div>
							</div>`
				)}
			</div>
		`;
	}

	renderPaymentMethod() {
		// Payment method alerts
		let paymentMethodAlerts: PaymentMethodAlert[] = [];
		if (this.billingGroup.paymentMethodAttachedTs) {
			if (this.billingGroup.paymentMethodValidTs)
				paymentMethodAlerts.push({
					status: 'success',
					date: this.billingGroup.paymentMethodValidTs,
					message: 'Payment method is valid'
				});
			else
				paymentMethodAlerts.push({
					status: 'error',
					date: this.billingGroup.paymentMethodAttachedTs,
					message: 'Payment method is invalid'
				});
		} else {
			paymentMethodAlerts.push({ status: 'error', date: null, message: 'No payment method attached' });
		}
		if (this.billingGroup.paymentFailedTs)
			paymentMethodAlerts.push({
				status: 'error',
				date: this.billingGroup.paymentFailedTs,
				message: 'Payment failed'
			});

		return html`
			<h1 class="text-base">Payment method</h1>
			<div class="my-2">
				${map(
					paymentMethodAlerts,
					alert => html`
						<div
							class=${clsx(
								'flex flex-row gap-2 text-xs',
								alert.status == 'error' ? 'text-red-500' : 'text-white'
							)}
						>
							<p>
								${alert.message}
								${alert.date &&
								html` <span class="italic"
									>(checked ${utils.formatDateLong(alert.date)})</span
								>`}
							</p>
						</div>
					`
				)}
			</div>
			<div class="-ms-4">
				${when(
					this.billingGroup.paymentMethodAttachedTs,
					() =>
						html`<rvt-button
							variant="link"
							size="sm"
							@click=${this.openBillingPortal.bind(
								this,
								RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.General
							)}
							>Manage</rvt-button
						>`,
					() =>
						html`<rvt-button
							variant="link"
							size="sm"
							@click=${this.openBillingPortal.bind(
								this,
								RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.PaymentMethodUpdate
							)}
							>Add Payment Method</rvt-button
						>`
				)}

				<rvt-button
					variant="link"
					size="sm"
					@click=${this.openBillingPortal.bind(
						this,
						RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.General
					)}
					>View invoices</rvt-button
				>
			</div>
		`;
	}

	renderDynamicServersCapacityTotal() {
		// Calculate total core count
		let totalCores =
			this.gamePlanConfig?.dynamicServersCapacity.reduce((total, region) => total + region.cores, 0) ??
			0;

		// Determine if config has changed
		let isChanged =
			this.gamePlan?.dynamicServersCapacity.findIndex(
				region =>
					region.cores !=
					this.gamePlanConfig.dynamicServersCapacity.find(
						config => config.regionId == region.region.regionId
					).cores
			) >= 0;

		let oldCores =
			this.gamePlan?.dynamicServersCapacity.reduce((total, region) => total + region.cores, 0) ?? 0;

		return html`<div>
				<h2 class="text-base">Total</h2>
				<p>
					${totalCores} cores &times; $26.00 USD =
					${when(
						isChanged,
						() => html`<span class="line-through">$${(oldCores * 26).toFixed(2)} USD</span>`
					)}
					<span class="text-lg my-4 font-bold">$${(totalCores * 26).toFixed(2)} USD</span>
				</p>
			</div>

			<div class="flex flex-col gap-2 mt-2 mb-4">
				<div class="text-xs">
					If you are downgrading, your new plan will take effect at the end of your current billing
					period. If you are upgrading, you will be billed immediately for the prorated amount.
				</div>
				<rvt-button
					@click=${this.applyGamePlan.bind(this)}
					?disabled=${!isChanged}
					?loading=${this.gamePlanUpdating}
					>Apply</rvt-button
				>
			</div>`;
	}

	renderDynamicServersCapacity() {
		if (!this.billingGroup.paymentMethodValidTs) {
			return html`
				<h2>Dynamic Servers Capacity</h2>
				<div>Please input a valid payment method</div>
			`;
		}

		return html`
			<h2>Capacity per region</h2>
			<p class="my-2 text-xs">
				Set the number of cores you want to allocate to each region. Each core includes 1 CPU core and
				~2 GB RAM.
				<rvt-a href="https://rivet.gg/docs/dynamic-servers/concepts/available-tiers"
					>Read more about specs</rvt-a
				>.
			</p>
			<div class="grid grid-cols-2 gap-2 max-w-5xl w-full mt-4 items-center">
				<!-- Header -->
				<div class="font-bold text-base text-sm">Region</div>
				<div class="font-bold text-right text-sm pe-6 me-0.5">Capacity</div>

				<div class="col-span-2 border-t border-white/10 my-2"></div>

				<!-- Items -->
				${repeat(
					this.gamePlan?.dynamicServersCapacity ?? [],
					region => region.region.regionId,
					region => {
						let config = this.gamePlanConfig.dynamicServersCapacity.find(
							config => config.regionId == region.region.regionId
						);
						let regionIcon = getRegionEmoji(region.region.universalRegion);
						return html`
							<div>
								<e-svg class="w-6 h-6 mr-1" preserve src=${regionIcon}></e-svg>
								${region.region.regionDisplayName}
							</div>
							<div class="flex items-center text-right justify-end">
								<rvt-button
									variant="link"
									@click=${this.handleDynamicServersRegionDecrease.bind(
										this,
										region.region.regionId
									)}
									>-</rvt-button
								>
								<text-input
									class="w-16 text-center"
									number
									min="0"
									max="32768"
									placeholder="0"
									.init=${config.cores}
									@change=${this.handleDynamicServersRegionInput.bind(
										this,
										region.region.regionId
									)}
								></text-input>
								<rvt-button
									variant="link"
									@click=${this.handleDynamicServersRegionIncrease.bind(
										this,
										region.region.regionId
									)}
									>+</rvt-button
								>
							</div>
						`;
					}
				)}
			</div>
		`;
	}

	handleDynamicServersRegionInput(regionId: string, e: InputChangeEvent) {
		this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == regionId).cores =
			parseInt(e.value);
		this.requestUpdate('gamePlanConfig');
	}

	handleDynamicServersRegionDecrease(regionId: string) {
		let region = this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == regionId);
		region.cores = Math.max(region.cores - 1, 0);
		this.requestUpdate('gamePlanConfig');
	}

	handleDynamicServersRegionIncrease(regionId: string) {
		let region = this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == regionId);
		region.cores += 1;
		this.requestUpdate('gamePlanConfig');
	}

	async applyGamePlan() {
		try {
			this.gamePlanUpdating = true;

			await global.apiEe.ee.cloud.games.billing.updatePlan(this.game.gameId, {
				plan: this.gamePlanConfig
			});

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
