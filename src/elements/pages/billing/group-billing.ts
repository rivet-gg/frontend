// import { LitElement, html, PropertyValues } from 'lit';
// import { customElement, property } from 'lit/decorators.js';
// import { tooltip } from '../../../ui/helpers';
// import { cssify } from '../../../utils/css';
// import styles from './group-billing.scss';
// import global from '../../../utils/global';
// import * as cloud from '@rivet-gg/cloud';
// import * as api from '../../../utils/api';
// import utils from '../../../utils/utils';
// import { responses } from '../../../routes';
// import { repeat } from 'lit/directives/repeat.js';
// import UIRouter from '../../root/ui-router';
// import { when } from 'lit/directives/when.js';
// import { choose } from 'lit/directives/choose.js';
// import { classMap } from 'lit/directives/class-map.js';
// import { GroupProfileCache } from '../../../data/cache';
// import logging from '../../../utils/logging';
// import { globalEventGroups } from '../../../utils/global-events';

// @customElement('page-group-billing')
// export default class GroupBillingPage extends LitElement {
// 	static styles = cssify(styles);

// 	@property({ type: String })
// 	groupId: string;

// 	@property({ type: Object })
// 	profile?: api.group.GroupProfile;

// 	@property({ type: Object })
// 	loadError?: any;

// 	@property({ type: Object })
// 	billing: cloud.GetGroupBillingCommandOutput;

// 	@property({ type: Object })
// 	invoiceData: cloud.GetGroupInvoicesListCommandOutput = null;
// 	@property({ type: Number })
// 	invoicePage: number = 0;
// 	@property({ type: Boolean })
// 	invoicesExhausted: boolean = false;

// 	// === EVENT HANDLERS ===
// 	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;

// 	updated(changedProperties: PropertyValues) {
// 		super.updated(changedProperties);

// 		if (changedProperties.has('groupId')) {
// 			this.resetGroupData();
// 			this.resetData();
// 			this.fetchGroup();
// 			this.fetchInvoiceData();
// 			this.fetchGroupBilling();
// 		}
// 	}

// 	disconnectedCallback() {
// 		super.disconnectedCallback();

// 		if (this.groupStream) this.groupStream.cancel();
// 	}

// 	resetData() {
// 		this.billing = null;
// 	}

// 	resetGroupData() {
// 		this.profile = null;
// 		if (this.groupStream) this.groupStream.cancel();
// 	}

// 	async fetchGroupBilling() {
// 		try {
// 			let res = await global.cloud.getGroupBilling({
// 				groupId: this.groupId
// 			});

// 			this.billing = res;
// 		} catch (err) {
// 			logging.error('Request error', err);
// 			this.loadError = err;
// 		}
// 	}

// 	async fetchInvoiceData() {
// 		try {
// 			let invoiceData = await global.cloud.getGroupInvoicesList({
// 				groupId: this.groupId,
// 				perPage: 10,
// 				page: this.invoicePage
// 			});
// 			this.invoicePage++;
// 			if (invoiceData.invoices.length < 10) this.invoicesExhausted = true;

// 			if (!this.invoiceData) this.invoiceData = invoiceData;
// 			else this.invoiceData.invoices.push(...invoiceData.invoices);

// 			this.requestUpdate('invoiceData');
// 		} catch (err) {
// 			globalEventGroups.dispatch('error', err);
// 		}
// 	}

// 	async fetchGroup() {
// 		// Fetch events
// 		if (this.groupStream) this.groupStream.cancel();
// 		this.groupStream = await GroupProfileCache.watch(this.groupId, res => {
// 			this.profile = res.group;

// 			// Update the title
// 			UIRouter.shared.updateTitle(`Billing - ${this.profile.displayName}`);
// 		});

// 		this.groupStream.onError(err => {
// 			logging.error('Request error', err);

// 			if (this.profile) globalEventGroups.dispatch('error', err);
// 			else this.loadError = err;
// 		});
// 	}

// 	async checkout() {
// 		try {
// 			let res = await global.cloud.groupBillingCheckout({
// 				groupId: this.groupId
// 			});

// 			UIRouter.shared.navigate(res.url, { replacePage: true });
// 		} catch (err) {
// 			globalEventGroups.dispatch('error', err);
// 		}
// 	}

// 	calcDateRange(): { queryStart: number; queryEnd: number } {
// 		// NOTE: `now` and `today` are the same date except for that `today` has hours, minutes,
// 		// secs, and ms set to 0 (is start of day). They are used differently in each export range.
// 		let now = new Date();
// 		let today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

// 		// This month
// 		let date = new Date(today);
// 		date.setUTCDate(1);

// 		let queryStart = date.getTime();
// 		let queryEnd = Date.now();

// 		return { queryStart, queryEnd };
// 	}

// 	render() {
// 		if (this.loadError) return responses.renderError(this.loadError);

// 		return html`
// 			<div id="base">
// 				<div id="centered-base">
// 					<!-- Header -->
// 					<page-header>
// 						<e-svg src="solid/money-check"></e-svg>
// 						<h1>Billing${this.profile ? ` - ${this.profile.displayName}` : null}</h1>
// 					</page-header>

// 					${this.renderMessage()} ${this.renderCharges()} ${this.renderInvoicesList()}
// 				</div>
// 			</div>
// 		`;
// 	}

// 	renderMessage() {
// 		if (!this.billing) return null;

// 		return choose(this.billing.status, [
// 			[
// 				cloud.GroupStatus.SETUP_INCOMPLETE,
// 				() =>
// 					html`<div id="message">
// 						<div>
// 							<h1><e-svg src="solid/triangle-exclamation"></e-svg> Action Required</h1>
// 							<p>
// 								Complete your account setup by adding billing information to start developing.
// 							</p>
// 							<rvt-button .trigger=${this.checkout.bind(this)}
// 								>Complete Setup</rvt-button
// 							>
// 						</div>
// 					</div>`
// 			],
// 			[
// 				cloud.GroupStatus.PAYMENT_FAILED,
// 				() =>
// 					html`<div id="message" class="error">
// 						<h1><e-svg src="solid/triangle-exclamation"></e-svg> Action Required</h1>
// 						<p>
// 							An invoice payment has failed. All resources have been disabled until the payment
// 							is resolved.
// 						</p>
// 						<rvt-button target="_blank" href="https://rivet.gg/support"
// 							>Contact Support</rvt-button
// 						>
// 					</div>`
// 			],
// 			[
// 				cloud.GroupStatus.SPENDING_LIMIT_REACHED,
// 				() =>
// 					html`<div id="message">
// 						<h1><e-svg src="solid/triangle-exclamation"></e-svg> Alert</h1>
// 						<p>
// 							Your monthly custom spending limit has been reached. All resources have been
// 							disabled until next month or until the limit is raised.
// 						</p>
// 					</div>`
// 			]
// 		]);
// 	}

// 	renderCharges() {
// 		let { queryStart, queryEnd } = this.calcDateRange();

// 		return html`<div id="charges">
// 			<!-- Billing header -->
// 			${when(
// 				this.billing != null,
// 				() => html`<div id="card-overview">
// 					<div id="current-charges">
// 						<billing-card>
// 							<h1 slot="header">Charges This Month</h1>
// 							<price-display slot="amount" .amount=${this.billing.usage / 100}></price-display>
// 							<h3 slot="footer">
// 								${utils.formatDateUTCShort(queryStart)} -
// 								${utils.formatDateUTCShort(queryEnd - 1)}
// 							</h3>
// 						</billing-card>
// 					</div>
// 				</div>`
// 			)}
// 		</div>`;
// 	}

// 	renderPlans() {
// 		if (!this.billing) return null;

// 		let error = null;
// 		if (this.billing.status == cloud.GroupStatus.SETUP_INCOMPLETE) error = 'Setup Incomplete';
// 		if (this.billing.status == cloud.GroupStatus.PAYMENT_FAILED) error = 'Payment Failed';

// 		return html`<div id="plans">
// 				${this.renderPlan(cloud.GroupBillingPlan.FREE, null, error)}
// 				${this.renderPlan(
// 					cloud.GroupBillingPlan.GAME_HOBBY_MONTHLY,
// 					cloud.GroupBillingPlan.GAME_HOBBY_YEARLY,
// 					error
// 				)}
// 				${this.renderPlan(
// 					cloud.GroupBillingPlan.GAME_STUDIO_MONTHLY,
// 					cloud.GroupBillingPlan.GAME_STUDIO_YEARLY,
// 					error
// 				)}
// 				${this.renderPlan(cloud.GroupBillingPlan.ENTERPRISE, null, error)}
// 			</div>
// 			<p id="plans-footer">
// 				Looking for more info? Check out our
// 				<a class="link" href="https://rivet.gg/pricing" target="_blank">Pricing Page</a>.
// 			</p>`;
// 	}

// 	renderPlan(plan: cloud.GroupBillingPlan, variant: cloud.GroupBillingPlan | null, error: string) {
// 		let isOwner = global.currentIdentity.identityId == this.profile?.ownerIdentityId;
// 		let currentlyEnterprise = this.billing.plan == cloud.GroupBillingPlan.ENTERPRISE;
// 		let active = this.billing.plan == plan;
// 		let variantActive = this.billing.plan == variant;

// 		let info;
// 		let priceMonthly: string;
// 		let priceAnnually: string;
// 		if (plan == cloud.GroupBillingPlan.FREE) {
// 			info = html`<div class="info">
// 				<h1>Starter</h1>
// 				<div class="price">
// 					<p><b>Free</b></p>
// 				</div>
// 				<p></p>
// 				<ul>
// 					<li>$5/mo ServerLess Lobbies credits</li>
// 					<li>3h log history</li>
// 					<li>24h analytics history</li>
// 					<li>16 GB Docker & site history</li>
// 					<li>Community support</li>
// 				</ul>
// 			</div>`;
// 		} else if (plan == cloud.GroupBillingPlan.GAME_HOBBY_MONTHLY) {
// 			priceMonthly = '25';
// 			priceAnnually = '240';
// 			info = html`<div class="info">
// 				<h1>Hobby</h1>
// 				<div class="price">
// 					<p><b>$20</b>/mo*</p>
// 				</div>
// 				<p>Everything <b>Starter</b> plus...</p>
// 				<ul>
// 					<li>48h log history</li>
// 					<li>7h analytics history</li>
// 					<li>64 GB Docker & site history</li>
// 					<li>Business day priority support</li>
// 				</ul>
// 				<i>*billed annually</i>
// 			</div>`;
// 		} else if (plan == cloud.GroupBillingPlan.GAME_STUDIO_MONTHLY) {
// 			priceMonthly = '250';
// 			priceAnnually = '2,400';
// 			info = html`<div class="info">
// 				<h1>Studio</h1>
// 				<div class="price">
// 					<p><b>$200</b>/mo*</p>
// 				</div>
// 				<p>Everything <b>Hobby</b> plus...</p>
// 				<ul>
// 					<li>97d log history</li>
// 					<li>90d analytics history</li>
// 					<li>1024 GB Docker & site history</li>
// 					<li>Dedicated Slack or Discord channel</li>
// 					<li>Audit log</li>
// 					<li>24/7 priority support</li>
// 				</ul>
// 				<i>*billed annually</i>
// 			</div>`;
// 		} else if (plan == cloud.GroupBillingPlan.ENTERPRISE) {
// 			info = html`<div class="info">
// 				<h1>Enterprise</h1>
// 				<p>Everything <b>Studio</b> plus...</p>
// 				<ul>
// 					<li>Custom log history</li>
// 					<li>Custom analytics history</li>
// 					<li>Custom Docker & site history</li>
// 					<li>Custom SLA</li>
// 					<li>Custom firewall rules</li>
// 				</ul>
// 			</div>`;
// 		}

// 		if (plan != cloud.GroupBillingPlan.ENTERPRISE) {
// 			return html`<div class="plan">
// 				${info}
// 				<div class="actions">
// 					${when(
// 						isOwner,
// 						() =>
// 							when(
// 								variant == null,
// 								() => html`
// 									<rvt-button
// 										class=${classMap({ active })}
// 										?disabled=${currentlyEnterprise || error || active}
// 										.trigger=${this.setPlan.bind(this, plan)}
// 										>${error ?? (active ? 'Active' : 'Switch')}</rvt-button
// 									>
// 								`,
// 								() => html`
// 									<rvt-button
// 										class=${classMap({ active: variantActive })}
// 										?disabled=${currentlyEnterprise ||
// 										error ||
// 										this.billing.plan == variant}
// 										.trigger=${this.setPlan.bind(this, variant)}
// 										>${error ??
// 										(variantActive
// 											? `Active ($${priceAnnually}/yr)`
// 											: `Switch to Annually ($${priceAnnually}/yr)`)}</rvt-button
// 									>
// 									<rvt-button
// 										class=${classMap({ active })}
// 										?disabled=${currentlyEnterprise || error || active}
// 										.trigger=${this.setPlan.bind(this, plan)}
// 										>${error ??
// 										(active
// 											? `Active ($${priceMonthly}/mo)`
// 											: `Switch to Monthly ($${priceMonthly}/mo)`)}</rvt-button
// 									>
// 								`
// 							),
// 						() => {
// 							if (active) {
// 								return html`<rvt-button class="active" disabled
// 									>Active (Monthly)</rvt-button
// 								>`;
// 							} else if (variantActive) {
// 								return html`<rvt-button class="active" disabled
// 									>Active (Annually)</rvt-button
// 								>`;
// 							}

// 							return null;
// 						}
// 					)}
// 				</div>
// 			</div>`;
// 		} else {
// 			return html`<div class="plan">
// 				<div class="info">
// 					<h1>Enterprise</h1>
// 					<p>Everything <b>Studio</b> plus...</p>
// 					${info}
// 				</div>
// 				<div class="actions">
// 					${when(
// 						active,
// 						() => html`<rvt-button class="active" disabled>Active</rvt-button>`,
// 						() =>
// 							html`<rvt-button href="https://rivet.gg/support" .target=${'_blank'}
// 								>Contact Us</rvt-button
// 							>`
// 					)}
// 				</div>
// 			</div>`;
// 		}
// 	}

// 	renderInvoicesList() {
// 		return html`<div id="invoices">
// 			${this.invoiceData
// 				? this.invoiceData.invoices.length == 0
// 					? html`<div id="no-data">No invoices found</div>`
// 					: null
// 				: html`<div id="no-data">Fetching invoices....</div>`}
// 			<div id="items">
// 				${this.invoiceData
// 					? repeat(
// 							this.invoiceData.invoices,
// 							i => i.issuingTs,
// 							invoice => {
// 								let invoiceClasses = classMap({
// 									invoice: true
// 								});

// 								return html`<div class=${invoiceClasses}>
// 									<div class="left">
// 										<h2>${utils.formatDateUTCShort(invoice.issuingTs)}</h2>
// 									</div>
// 									<div class="right">
// 										${when(
// 											invoice.fileUrl,
// 											() => html`<icon-button
// 												large
// 												href=${invoice.fileUrl}
// 												src="solid/file-pdf"
// 												@mouseenter=${tooltip('Download PDF')}
// 											></icon-button>`,
// 											() => html`<icon-button
// 												large
// 												disabled
// 												src="solid/file-pdf"
// 												@mouseenter=${tooltip('PDF Unavailable')}
// 											></icon-button>`
// 										)}
// 									</div>
// 								</div>`;
// 							}
// 					  )
// 					: null}
// 			</div>
// 			${this.invoiceData && !this.invoicesExhausted
// 				? html`<rvt-button
// 						id="load-more-invoices"
// 						color="#989898"
// 						.trigger=${this.fetchInvoiceData.bind(this)}
// 						>Load more</rvt-button
// 				  >`
// 				: null}
// 		</div>`;
// 	}
// }
