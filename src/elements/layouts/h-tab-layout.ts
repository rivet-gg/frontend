import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './h-tab-layout.scss';

@customElement('h-tab-layout')
export default class HTabLayout extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<slot name="tabs"></slot>
				<slot name="body"></slot>
			</div>
		`;
	}
}
