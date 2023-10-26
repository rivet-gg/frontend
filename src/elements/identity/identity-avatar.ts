import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './identity-avatar.scss';
import * as api from '../../utils/api';

@customElement('identity-avatar')
export default class IdentityAvatar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	@property({ type: Boolean })
	bordered = true;

	@property({ type: String })
	icon?: string;

	@property({ type: Boolean })
	shadow = false;

	@property({ attribute: 'icon-fill', type: String })
	iconFill = '#ffffff';

	@property({ type: Boolean, attribute: 'link' })
	link = false;

	render() {
		// Build classes and style
		let classes = {
			bordered: this.bordered,
			icon: !!this.icon,
			shadow: this.shadow
		};

		// Choose clip to use
		let clipClass = classMap({
			'with-status-icon': !!this.icon,
			'with-status': !this.icon
		});

		// Create body
		let body = html`
			<lazy-img id="avatar-image" class=${clipClass} src="${this.identity.avatarUrl}"></lazy-img>
			${this.icon
				? html`<div id="identity-icon">
						<e-svg src=${this.icon} style=${styleMap({ '--fill': this.iconFill })}></e-svg>
				  </div>`
				: null}
		`;

		return html`<div id="identity-avatar" class=${classMap(classes)}>${body}</div>`;
	}
}
