import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import cloud from '@rivet-gg/cloud';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';

@customElement('page-dev-game-settings-billing')
export default class DevGameSettingsBilling extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	loadError?: any;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}

	resetData() {
		this.loadError = null;

		this.requestUpdate();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		return html`
			<div id="base">
                <h1></h1>
			</div>
		`;
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
