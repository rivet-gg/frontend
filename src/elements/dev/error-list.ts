import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './error-list.scss';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('error-list')
export default class ErrorList extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	errors: string[] = [];

	@property({ type: Boolean })
	warning: boolean = false;

	render() {
		return html`
			<div id="base" class=${classMap({ warning: this.warning })}>
				<h5>Error${this.errors.length != 1 ? 's' : ''}</h5>
				${repeat(
					this.errors,
					e => e,
					e =>
						html`<div class="error">
							<e-svg src="solid/triangle-exclamation"></e-svg>
							<span>${e}</span>
						</div>`
				)}
			</div>
		`;
	}
}
