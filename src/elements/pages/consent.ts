import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './consent.scss';
import global from '../../utils/global';

@customElement('page-consent')
export default class ConsentPage extends LitElement {
	static styles = cssify(styles);

	onConsent() {
		global.grantConsent();
	}

	render() {
		return html`
			<div id="base">
				<div id="center">
					<div id="overflow">
						<lazy-img id="bg" src=${''}></lazy-img>
					</div>
					<div id="content">
						<div id="header">
							<e-svg src="logo/logo-gradient-white" preserve></e-svg>
							<h1>Welcome to Rivet!</h1>
						</div>
						<h2>First things first, lets do some housekeeping.</h2>

						<div id="consent-area">
							<p>
								By clicking continue, you agree to the Rivet
								<a class="link" href="https://rivet.gg/terms" target="_blank"
									>Terms of Service</a
								>
								and
								<a class="link" href="https://rivet.gg/privacy" target="_blank"
									>Privacy Policy</a
								>.
							</p>
						</div>

						<rvt-button .trigger=${this.onConsent.bind(this)}>Continue</rvt-button>
					</div>
				</div>
			</div>
		`;
	}
}
