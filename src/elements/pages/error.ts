import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './error.scss';

@customElement('page-error')
export default class ErrorPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	title: string = null;

	@property({ type: String })
	message: string;

	@property({ type: Boolean })
	expand = true;

	render() {
		return html`
			<invalid-page-state .expand=${this.expand}>
				<h1 slot="title">${this.title ?? 'Error :/'}</h1>
				${this.title !== null
					? this.message
					: html`<h2 slot="subtitle">
								It seems you've encountered an error. Please reach us at our
								<a class="link" target="_blank" href="https://rivet.gg/support"
									>Contact and Support</a
								>
								page so we can help.
							</h2>
							<div slot="body" id="error">
								<p>
									<b>Error message:</b>
									<span>${this.message}</span>
								</p>
							</div>`}
			</invalid-page-state>
		`;
	}
}
