import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './loading.scss';

@customElement('page-loading')
export default class LoadingPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	text: string;

	@property({ type: Boolean })
	error = false;

	render() {
		return html`
			<div id="base" class=${classMap({ error: this.error })}>
				<e-svg id="logo" src="logo/logo-small" preserve></e-svg>
				<h1 id="text">${this.text}</h1>
			</div>
		`;
	}
}
