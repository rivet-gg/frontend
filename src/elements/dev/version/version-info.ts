import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './version-info.scss';
import * as cloud from '@rivet-gg/api-internal/api/resources/cloud';
import { when } from 'lit/directives/when.js';
import { ToggleSwitchEvent } from '../../common/toggle-switch';
import CheckBox from '../check-box';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { UpdateConfigEvent } from '../../pages/dev/game/pages/game-version-draft';

@customElement('dev-version-info')
export default class DevVersionInfo extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.version.Config;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new UpdateConfigEvent(this.config));
	}

	toggleCdn(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.cdn == null) {
				this.config.cdn = {
					siteId: undefined,
					routes: []
				};
			}
		} else {
			this.config.cdn = null;
		}

		this.updateConfig();
	}

	toggleMatchmaker(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.matchmaker == null) {
				this.config.matchmaker = {
					gameModes: {},
					docker: {
						image: undefined,
						args: [],
						networkMode: cloud.version.matchmaker.NetworkMode.Bridge,
						ports: {
							default: {
								port: 80,
								protocol: cloud.version.matchmaker.PortProtocol.Https
							}
						},
						env: {
							PORT: '80'
						}
					}
				};
			}
		} else {
			this.config.matchmaker = null;
		}

		this.updateConfig();
	}

	toggleKv(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.kv == null) {
				this.config.kv = {};
			}
		} else {
			this.config.kv = null;
		}

		this.updateConfig();
	}

	toggleIdentity(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.identity == null) {
				this.config.identity = {
					customDisplayNames: [
						{
							displayName: 'Guest'
						}
					],
					customAvatars: []
				};
			}
		} else {
			this.config.identity = null;
		}

		this.updateConfig();
	}

	noServices() {
		return !this.config.cdn && !this.config.matchmaker && !this.config.kv;
	}

	render() {
		if (!this.config) return this.renderPlaceholder();

		return html`
			<div id="base">
				${!this.editing && this.noServices()
					? html`<p class="muted">No services enabled for this version.</p>`
					: null}
				${when(
					this.editing || this.config.cdn,
					() =>
						html`<version-info-cdn
							.game=${this.game}
							.config=${this.config}
							.errors=${this.errors.branch('cdn')}
							.editing=${this.editing}
							@toggle=${this.toggleCdn.bind(this)}
							@update=${this.updateConfig.bind(this)}
						></version-info-cdn>`
				)}
				${when(
					this.editing || this.config.matchmaker,
					() =>
						html`<version-info-matchmaker
							.game=${this.game}
							.config=${this.config}
							.tiers=${this.tiers}
							.errors=${this.errors.branch('matchmaker')}
							.editing=${this.editing}
							@toggle=${this.toggleMatchmaker.bind(this)}
							@update=${this.updateConfig.bind(this)}
						></version-info-matchmaker>`
				)}
				${this.editing || this.config.kv
					? html`<version-info-kv
							.game=${this.game}
							.config=${this.config}
							.errors=${this.errors.branch('kv')}
							.editing=${this.editing}
							@toggle=${this.toggleKv.bind(this)}
							@update=${this.updateConfig.bind(this)}
					  ></version-info-kv>`
					: null}
				${this.editing || this.config.identity
					? html`<version-info-identity
							.game=${this.game}
							.config=${this.config}
							.errors=${this.errors.branch('identity')}
							.editing=${this.editing}
							@toggle=${this.toggleIdentity.bind(this)}
							@update=${this.updateConfig.bind(this)}
					  ></version-info-identity>`
					: null}
			</div>
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<loading-placeholder></loading-placeholder>
			<loading-placeholder></loading-placeholder>
			<loading-placeholder></loading-placeholder>
		</div>`;
	}
}
