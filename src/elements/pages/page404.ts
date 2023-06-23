import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './page404.scss';

@customElement('page-404')
export default class Page404 extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<div id="center">
					<!-- <e-svg id="bg" preserve absolute-position non-icon src="graphics/404"></e-svg> -->
					<div id="bg"></div>
					<h1>404</h1>
					<h2>This page isn't available or it doesn't exist. Sorry!</h2>
				</div>
			</div>
		`;
	}
}
