import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './sidebar.scss';
import { MenuItem } from '../sidebar/main-sidebar';

@customElement('page-sidebar')
export default class SidebarPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	activeMenu: MenuItem = null;

	render() {
		return html`
			<div id="base">
				<main-sidebar .activeMenu=${this.activeMenu}></main-sidebar>
			</div>
		`;
	}
}
