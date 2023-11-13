import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';

@customElement('rvt-spinner')
export class RvtSpinner extends LitElement {
	render() {
		return html`<e-svg class="animate-spin" name="regular/spinner-third"></e-svg>`;
	}
}
