import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './identity-avatar.scss';
import utils from '../../utils/utils';
import routes from '../../routes';
import { identityRouteData } from '../../data/identity';
import * as api from '../../utils/api';

/// Clip path used to mask identity avatars.
/// https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
/// Modified from https://commons.wikimedia.org/wiki/File:Squircle2.svg
const SVG_CLIP = html`
	<svg viewBox="0 0 1 1">
		<path
			d="M0.5,1c0.219,0 0.341,0 0.42,-0.08c0.08,-0.079 0.08,-0.201 0.08,-0.42c0,-0.219 0,-0.341 -0.08,-0.42c-0.079,-0.08 -0.201,-0.08 -0.42,-0.08c-0.219,0 -0.341,0 -0.42,0.08c-0.08,0.079 -0.08,0.201 -0.08,0.42c0,0.219 0,0.341 0.08,0.42c0.079,0.08 0.201,0.08 0.42,0.08Z"
		/>
	</svg>
`;

const SVG_CLIP_WITH_STATUS = html`
	<svg viewBox="0 0 1 1">
		<path
			d="M0.778,0.987c-0.07,0.013 -0.16,0.013 -0.278,0.013c-0.219,0 -0.341,0 -0.42,-0.08c-0.08,-0.079 -0.08,-0.201 -0.08,-0.42c0,-0.219 0,-0.341 0.08,-0.42c0.079,-0.08 0.201,-0.08 0.42,-0.08c0.219,0 0.341,0 0.42,0.08c0.08,0.079 0.08,0.201 0.08,0.42c0,0.118 0,0.208 -0.013,0.278c-0.024,-0.018 -0.054,-0.028 -0.087,-0.028c-0.083,0 -0.15,0.067 -0.15,0.15c0,0.033 0.01,0.063 0.028,0.087Z"
		/>
	</svg>
`;

const SVG_CLIP_WITH_STATUS_ICON = html`
	<svg viewBox="0 0 1 1">
		<path
			d="M0.222,0.013c0.07,-0.013 0.16,-0.013 0.278,-0.013c0.219,0 0.341,0 0.42,0.08c0.08,0.079 0.08,0.201 0.08,0.42c0,0.118 0,0.208 -0.013,0.278c-0.024,-0.018 -0.054,-0.028 -0.087,-0.028c-0.083,0 -0.15,0.067 -0.15,0.15c0,0.033 0.01,0.063 0.028,0.087c-0.07,0.013 -0.16,0.013 -0.278,0.013c-0.219,0 -0.341,0 -0.42,-0.08c-0.08,-0.079 -0.08,-0.201 -0.08,-0.42c0,-0.118 0,-0.208 0.013,-0.278c0.024,0.018 0.054,0.028 0.087,0.028c0.083,0 0.15,-0.067 0.15,-0.15c0,-0.033 -0.01,-0.063 -0.028,-0.087Z"
		/>
	</svg>
`;

@customElement('identity-avatar')
export default class IdentityAvatar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	@property({ type: Boolean, attribute: 'hide-status' })
	hideStatus = false;

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

	get hasStatus(): boolean {
		return !this.hideStatus && this.identity.presence != null;
	}

	render() {
		// Build classes and style
		let classes = {
			bordered: this.bordered,
			status: !this.hasStatus,
			icon: !!this.icon,
			shadow: this.shadow
		};

		// Choose clip to use
		let clipClass = classMap({
			'with-status-icon': !!this.icon,
			'with-status': !this.icon && this.hasStatus
		});

		// Create body
		let body = html`
			<lazy-img id="avatar-image" class=${clipClass} src="${this.identity.avatarUrl}"></lazy-img>
			${this.icon
				? html`<div id="identity-icon">
						<e-svg src=${this.icon} style=${styleMap({ '--fill': this.iconFill })}></e-svg>
				  </div>`
				: null}
			${this.hasStatus
				? html`<div
						id="identity-status"
						style=${styleMap({ background: utils.statusColor(this.identity) })}
				  ></div>`
				: null}
		`;

		return html`<div id="identity-avatar" class=${classMap(classes)}>${body}</div>`;
	}
}
