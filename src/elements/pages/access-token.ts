import { LitElement, PropertyValues, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import { responses } from '../../routes';
import styles from './access-token.scss';

@customElement('page-access-token')
export default class AccessTokenLink extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	token: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Boolean })
	finished: boolean = false;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData() {
		try {
			await global.api.auth.identity.accessToken.completeAccessTokenVerification({
				accessToken: this.token
			});
		} catch (err) {
			this.loadError = err;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`<div id="base">
			${when(
				this.finished,
				() =>
					html`<h2><e-svg src="solid/circle-check"></e-svg>Login succeeded</h2>
						<p>No further action is required. You may now return to the home page</p>`,
				() => html`<loading-wheel></loading-wheel>`
			)}
		</div>`;
	}
}
