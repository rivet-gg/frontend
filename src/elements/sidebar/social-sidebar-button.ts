import { customElement, property } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './social-sidebar-button.scss';

@customElement('social-sidebar-button')
export default class SocialSidebarButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: Boolean, attribute: 'active' })
	isActive = false;

	render() {
		if (this.href) {
			// Has link
			return html`
				<a id="base" class=${classMap({ active: this.isActive })} href=${this.href}>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="content"></slot>
						<slot name="badge"></slot>
					</div>
				</a>
			`;
		} else {
			// No link
			return html`
				<div id="base" class=${classMap({ active: this.isActive })}>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="content"></slot>
						<slot name="badge"></slot>
					</div>
				</div>
			`;
		}
	}
}
