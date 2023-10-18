import { html, LitElement } from 'lit';
import { cssify } from '../../../utils/css';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import styles from './version-info-cdn.scss';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { SelectSiteEvent } from '../cdn-sites';
import { ToggleSwitchEvent } from '../../common/toggle-switch';

@customElement('version-info-cdn')
export default class VersionInfoCdn extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.CloudVersionConfig;

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	// Propagate event
	toggle(e: ToggleSwitchEvent) {
		this.dispatchEvent(new ToggleSwitchEvent(e.value));
	}

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new Event('update'));
	}

	selectSite(event: SelectSiteEvent) {
		this.config.cdn.siteId = event.siteId;
		this.updateConfig();
	}

	createCustomHeader() {
		if (!this.config.cdn) return;

		this.config.cdn.routes.push({
			glob: '',
			priority: 0,
			middlewares: [
				{
					kind: {
						customHeaders: {
							headers: []
						}
					}
				}
			]
		});

		this.updateConfig();
	}

	removeCustomHeader(idx: number) {
		if (!this.config.cdn) return;

		this.config.cdn.routes.splice(idx, 1);

		this.updateConfig();
	}

	render() {
		return html`<service-card
			.domain=${'deliver'}
			?editing=${this.editing}
			?active=${!!this.config.cdn}
			?error=${!this.errors.isEmpty()}
			@toggle=${this.toggle.bind(this)}
			beta
		>
			<e-svg slot="icon" preserve non-icon src="/products2/cdn-duotone"></e-svg>
			<h2 slot="title">CDN</h2>
			<div slot="content">${this.renderErrors()}${this.config.cdn ? this.renderBody() : null}</div>
		</service-card>`;
	}

	renderBody() {
		let routesErrors = this.errors.findFormatted('routes-meta');

		return html`
			<div id="scroll-area">
				<dev-cdn-sites
					.game=${this.game}
					?selectable=${this.editing}
					?uploadable=${this.editing}
					.selectedSiteId=${this.config.cdn.siteId}
					@select-site=${this.selectSite.bind(this)}
				>
				</dev-cdn-sites>
			</div>
			<h3 class="pt-3 pb-1 text-lg">Custom Headers</h3>
			${routesErrors.length
				? html`<error-list id="custom-header-errors" .errors=${routesErrors}></error-list>`
				: null}
			${this.config.cdn.routes && this.config.cdn.routes.length
				? html`<div id="custom-headers">
						${this.config.cdn.routes.map((route, i) => {
							let middlewaresErrors = this.errors.findFormatted(
								'routes',
								i,
								'middlewares-meta'
							);

							let middlewares = route.middlewares.map((middleware, j) => {
								if (middleware.kind.customHeaders) {
									return html`
										<dev-version-info-custom-header
											class="custom-header"
											.game=${this.game}
											.routeConfig=${route}
											.config=${middleware.kind.customHeaders}
											.middlewareErrors=${this.errors.branch(
												'routes',
												i,
												'middlewares',
												j
											)}
											.routeErrors=${this.errors.branch('routes', i)}
											?editing=${this.editing}
											@update=${this.updateConfig.bind(this)}
											@remove=${this.removeCustomHeader.bind(this, i)}
										>
										</dev-version-info-custom-header>
									`;
								}

								return null;
							});

							return html`${middlewaresErrors.length
								? html`<error-list .errors=${middlewaresErrors}></error-list>`
								: null}${middlewares}`;
						})}
				  </div>`
				: this.editing
				? null
				: html`<p class="muted">No custom headers</p>`}
			${this.editing && this.config.cdn.routes.length < 32
				? html`<div class="large-create" @click=${this.createCustomHeader.bind(this)}>
						<div class="large-create-content">
							<e-svg src="solid/plus"></e-svg>
							Add custom headers
						</div>
				  </div>`
				: null}
		`;
	}

	renderErrors() {
		let errors = this.errors.findShallowFormatted();

		return errors.length ? html`<error-list .errors=${errors}></error-list>` : null;
	}
}
