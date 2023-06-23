import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './billing-card.scss';

@customElement('billing-card')
export default class BillingCard extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<div id="left">
					<slot name="header"></slot>
					<slot name="amount"></slot>
					<slot name="footer"></slot>
				</div>
				<div id="right">
					<slot name="actions"></slot>
				</div>
			</div>
		`;
	}
}
