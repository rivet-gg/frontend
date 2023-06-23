import { html, LitElement } from 'lit';
import { cssify } from '../../../utils/css';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import styles from './version-info-kv.scss';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { ToggleSwitchEvent } from '../../common/toggle-switch';

@customElement('version-info-kv')
export default class VersionInfoKv extends LitElement {
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

	render() {
		return html`<service-card
			.domain=${'services'}
			?editing=${this.editing}
			?active=${!!this.config.kv}
			?error=${!this.errors.isEmpty()}
			@toggle=${this.toggle.bind(this)}
			beta
		>
			<e-svg slot="icon" preserve non-icon src="/products2/kv-duotone"></e-svg>
			<h2 slot="title">KV</h2>
			<div slot="content">${this.renderErrors()}${this.config.kv ? this.renderBody() : null}</div>
		</service-card>`;
	}

	renderBody() {
		return html`<div class="muted center">No settings yet</div>`;
	}

	renderErrors() {
		let errors = this.errors.findShallowFormatted();

		return errors.length ? html`<error-list .errors=${errors}></error-list>` : null;
	}
}
