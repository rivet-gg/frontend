import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './identity-name.scss';
import * as api from '../../utils/api';

import { styleMap } from 'lit/directives/style-map.js';

// Might already be defined somewhere else?
const MAX_USERNAME_LENGTH = 32;

@customElement('identity-name')
export default class IdentityName extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	@property({ type: Boolean, attribute: 'show-number' })
	showNumber = false;

	@property({ type: Boolean, attribute: 'inline' })
	inlineNumber = false;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink = false;

	@query('input')
	identityNameInput: HTMLInputElement;

	@query('#hide')
	hideElement: HTMLInputElement;

	render() {
		let paddedAccountNumber = ('0000' + this.identity.accountNumber).slice(-4);
		let styles = styleMap(
			this.inlineNumber
				? {
						'--number-display': 'inline-block',
						'font-size': '1em'
				  }
				: {}
		);

		let body = html` <span class="display-name">
			${this.identity.displayName}${this.showNumber
				? html`<span class="account-number" style=${styles}>#${paddedAccountNumber}</span>`
				: null}
		</span>`;

		return html`<span class="identity-name">${body}</span>`;
	}
}
