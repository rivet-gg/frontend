import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { cssify } from '../../utils/css';
import styles from './sidebar-header.scss';

@customElement('sidebar-header')
export default class SidebarHeader extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<slot name="title"></slot>
				<slot name="action"></slot>
			</div>
		`;
	}
}
