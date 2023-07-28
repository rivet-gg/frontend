import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './home.scss';
import * as api from '../../utils/api';
import { when } from 'lit/directives/when.js';

@customElement('dev-dash')
export default class DeveloperDash extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityProfile | undefined;

	render() {
		return html`
			<div class="w-full">
				<user-banner></user-banner>

				<div class="w-[97%] max-w-[1100px] m-auto">
					${when(
						this.identity,
						() => html` <page-dev-games></page-dev-games> `,
						() => html`<h1 class="w-full text-center text-2xl">Please Log In</h1>`
					)}
				</div>
			</div>
		`;
	}
}
