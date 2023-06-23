import { customElement, property } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './sidebar-button.scss';

@customElement('sidebar-button')
export default class SidebarButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: Boolean, attribute: 'active' })
	isActive = false;

	@property({ type: String, attribute: 'large' })
	isLarge = false;

	render() {
		if (this.href) {
			// Has link
			return html`
				<a
					id="base"
					class=${classMap({ large: this.isLarge, active: this.isActive })}
					href=${this.href}
				>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="title"></slot>
					</div>
				</a>
			`;
		} else {
			// No link
			return html`
				<div id="base" class=${classMap({ large: this.isLarge, active: this.isActive })}>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="title"></slot>
					</div>
				</div>
			`;
		}
	}
}
