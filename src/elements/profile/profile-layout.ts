import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './profile-layout.scss';

@customElement('profile-layout')
export default class ProfileLayout extends LitElement {
	static styles = cssify(styles);

	constructor() {
		super();
	}

	render() {
		return html`
			<div id="base">
				<div id="left-content">
					<!-- Banner -->
					<div id="banner">
						<slot name="banner-bg"></slot>
						<slot name="banner-center"></slot>
						<slot name="banner-right"></slot>
						<slot name="banner-nav"></slot>
						<div id="banner-actions">
							<slot name="actions-left"></slot>
							<slot name="actions-right"></slot>
						</div>
					</div>

					<!-- Body -->
					<slot name="body"></slot>
				</div>

				<!-- Sidebar content -->
				<slot name="sidebar"></slot>
			</div>
		`;
	}
}
