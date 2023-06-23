import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './right-sidebar-layout.scss';

@customElement('right-sidebar-layout')
export default class RightSidebarLayout extends LitElement {
	static styles = cssify(styles);

	constructor() {
		super();
	}

	render() {
		return html`
			<div id="base">
				<!-- Body -->
				<slot name="body"></slot>

				<!-- Sidebar -->
				<slot name="sidebar"></slot>
			</div>
		`;
	}
}
