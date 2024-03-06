import { LitElement, html, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
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
import { DropDownSelectEvent, DropDownSelection } from '../../../../dev/drop-down-list';
import TextInput from '../../../../dev/text-input';
import { showAlert } from '../../../../../ui/helpers';

const PRICE_PER_CORE = 22.76;

const DEDICATED_HARDWARE_LIST: DropDownSelection<number>[] = [
	{ value: 1 / 8, label: '1/8 core' },
	{ value: 1 / 4, label: '1/4 core' },
	{ value: 1 / 2, label: '1/2 core' },
	{ value: 1, label: '1 core' },
	{ value: 2, label: '2 cores' },
	{ value: 4, label: '4 cores' }
];

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

	@state()
	private dedicatedHardware = DEDICATED_HARDWARE_LIST[0];

	@queryAll('[data-region]')
	private regionInputs: NodeList;

	private numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

	private get totalPrice() {
		let totalCores =
			this.gamePlanConfig?.dynamicServersCapacity.reduce((total, region) => total + region.cores, 0) ??
			0;

		return totalCores * this.dedicatedHardware.value * PRICE_PER_CORE;
	}

	private get isChanged() {
		return (
			this.gamePlan?.dynamicServersCapacity.findIndex(
				region =>
					region.cores !=
					this.gamePlanConfig.dynamicServersCapacity.find(
						config => config.regionId == region.region.regionId
					).cores
			) >= 0
		);
	}

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

	private updateDedicatedHardware(event: DropDownSelectEvent<number>) {
		let inputs = Array.from(this.regionInputs.values()) as TextInput[];

		for (let capacity of this.gamePlanConfig.dynamicServersCapacity) {
			capacity.cores = Math.ceil(
				(capacity.cores * this.dedicatedHardware.value) / event.selection.value
			);

			let input = inputs.find(input => input.dataset.region === capacity.regionId);
			input.value = `${capacity.cores}`;
		}

		this.dedicatedHardware = event.selection;

		this.requestUpdate('gamePlanConfig');
	}

	render() {
		if (!this.billingGroup) return this.renderPlaceholder();
		if (this.loadError) return responses.renderError(this.loadError);
		if (global.bootstrapData.cluster != Rivet.cloud.BootstrapCluster.Enterprise)
			return responses.renderEeOnly();

		if (!this.billingGroup.paymentMethodAttachedTs) {
			return html`
				<div class="flex flex-col align-center justify-center text-center lg:h-screen">
					<div class="mb-4 rounded-full text-white bg-charcole-900 self-center p-6">
						<e-svg class="w-12 h-12" src="solid/credit-card"></e-svg>
					</div>
					<h2 class="text-4xl mb-2">Add Payment Method</h2>
					<p>
						You must add a payment method before you can add<br />
						servers to your project.
					</p>
					<rvt-button
						class="self-center mt-4"
						@click=${this.openBillingPortal.bind(
							this,
							RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.PaymentMethodUpdate
						)}
						>Continue</rvt-button
					>
				</div>
			`;
		}

		return html`
			<div class="max-w-5xl">
				<h1 class="text-3xl flex items-center gap-8  font-normal">
					<span>${this.game.displayName} Billing</span>
					<rvt-button
						@click=${this.openBillingPortal.bind(
							this,
							RivetEe.ee.cloud.groups.billing.StripePortalSessionIntent.PaymentMethodUpdate
						)}
						>Manage</rvt-button
					>
				</h1>

				<p class="mt-4 pb-4 mb-4 border-b text-sm border-white">For questions about billing, contact <rvt-a href="mailto:billing@rivet.gg">billing@rivet.gg</rvt-a></p>

				<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4">
					<h2 class="text-2xl">Manage ${this.game.displayName} Servers</h2>
					<rvt-a href="https://rivet.gg/docs/dynamic-servers/concepts/available-tiers" class="flex items-center">
						<span class="text-md">Learn more about pricing & dedicated hardware specs</span>
						<e-svg class="ml-2" src="solid/arrow-up-right-from-square"/>
					</rv-a>
				</div>

				<div class="mb-8">
					<p class="mb-2">Dedicated Hardware</p>
					<drop-down-list @select=${this.updateDedicatedHardware.bind(
						this
					)} .options=${DEDICATED_HARDWARE_LIST} .selection=${
						this.dedicatedHardware
					}></drop-down-list>
				</div>

				<div class="grid grid-cols-3 gap-2 max-w-5xl w-full items-center">
					<!-- Header -->
					<div class="text-base mb-4">Region</div>
					<div class="text-center mb-4">Hardware amount</div>
					<div class="text-right pe-6 me-0.5 mb-4">Price</div>


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
								<div class="flex justify-center items-center">
									<text-input
										data-region=${region.region.regionId}
										class="w-16 text-center mr-2"
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
									&times; ${this.dedicatedHardware.label}
								</div>
								<div class="text-right justify-end">
									${this.numberFormatter.format(
										config.cores * PRICE_PER_CORE * this.dedicatedHardware.value
									)}
								</div>
							`;
						}
					)}
					<div class="col-span-3 border-t border-white/10 my-2"></div>
					<div>Monthly Server Total:</div>
					<div class="text-center">${this.numberFormatter.format(this.totalPrice)}</div>
				</div>
				
				<div class="mt-4 flex gap-4"> 
					<rvt-button
						@click=${this.applyGamePlan.bind(this)} 
						?loading=${this.gamePlanUpdating}
						?disabled=${!this.isChanged}>
						Apply
					</rvt-button>
					<rvt-button 
						@click=${this.resetGamePlan.bind(this)} 
					 	?disabled=${!this.isChanged || this.gamePlanUpdating}>
						Cancel
					</rvt-button>
				</div>
			</div>
		`;
	}

	handleDynamicServersRegionInput(regionId: string, e: InputChangeEvent) {
		this.gamePlanConfig.dynamicServersCapacity.find(config => config.regionId == regionId).cores =
			parseInt(e.value);
		this.requestUpdate('gamePlanConfig');
	}

	async applyGamePlan() {
		this.gamePlanUpdating = true;
		let isConfirmed = await new Promise(resolve =>
			showAlert(
				'Confirm',
				html`<p>
					If you are downgrading the server amount it will reflect the next billing cycle or new
					servers will be billed immediately at the prorated amount.
				</p>`,
				[
					{
						label: 'Purchase',
						cb: () => resolve(true)
					},
					{
						label: 'Cancel',
						cb: () => resolve(false)
					}
				]
			)
		);

		if (!isConfirmed) {
			this.gamePlanUpdating = false;
			return;
		}

		try {
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

	resetGamePlan() {
		this.gamePlanConfig.dynamicServersCapacity = this.gamePlan.dynamicServersCapacity.map(capacity => ({
			regionId: capacity.region.regionId,
			cores: capacity.cores
		}));

		let inputs = Array.from(this.regionInputs.values()) as TextInput[];
		for (let capacity of this.gamePlanConfig.dynamicServersCapacity) {
			let input = inputs.find(input => input.dataset.region === capacity.regionId);
			input.value = `${capacity.cores}`;
		}

		this.requestUpdate('gamePlanConfig');
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
