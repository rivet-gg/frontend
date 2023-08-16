import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-dash.scss';

@customElement('dev-dash')
export default class DeveloperDash extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div class="w-full">
				<user-banner></user-banner>

				<div class="sm:px-5 max-w-contentwidth m-auto">
					<page-dev-games></page-dev-games>
				</div>
			</div>
		`;
	}
}
