import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import { cssify } from '../../utils/css';
import styles from './rvt-spinner.scss';

@customElement('rvt-spinner')
export class RvtSpinner extends LitElement {
	static styles = cssify(styles);
	render() {
		return html`<e-svg class="animate-spin" src="regular/spinner-third"></e-svg>`;
	}
}
