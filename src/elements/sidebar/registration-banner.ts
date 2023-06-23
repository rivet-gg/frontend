import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import UIRoot from '../root/ui-root';
import styles from './registration-banner.scss';

@customElement('registration-banner')
export default class RegistrationBanner extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base" @click=${() => UIRoot.shared.openRegisterPanel()}>
				<!-- <e-svg non-icon preserve id='party' src='graphics/together'></e-svg> -->
				<div id="body">
					<div id="label">
						<h1>Signed in as a guest</h1>
						<h2>Register or login now</h2>
					</div>
					<e-svg src="regular/arrow-right" color="#ececec"></e-svg>
				</div>
			</div>
		`;
	}
}
