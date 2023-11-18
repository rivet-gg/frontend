import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import { cssify } from '../../utils/css';

@customElement('rvt-spinner')
export class RvtSpinner extends LitElement {
	static styles = cssify();
	render() {
		return html`<e-svg class="animate-spin" src="regular/spinner-third"></e-svg>`;
	}
}
