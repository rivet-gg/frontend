import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './identity-tile.scss';
import routes from '../../routes';

import { identityRouteData } from '../../data/identity';
import utils from '../../utils/utils';
import { showIdentityContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';

@customElement('identity-tile')
export default class IdentityTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	@property({ type: Boolean, attribute: 'offline-opacity' })
	offlineOpacity = false;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink = false;

	@property({ type: Boolean, attribute: 'no-context-menu' })
	noContextMenu = false;

	@property({ type: Boolean, attribute: 'hide-presence' })
	hidePresence = false;

	@property({ type: Boolean, attribute: 'light' })
	light = false;

	isHovering: boolean;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		let classes = classMap({
			'has-link': !this.noLink,
			light: this.light
		});
		return html`
			<div
				id="base"
				class=${classes}
				@contextmenu=${this.noContextMenu ? null : showIdentityContextMenu(this.identity)}
			>
				<identity-avatar
					.link=${!this.noLink}
					.identity=${this.identity}
				></identity-avatar>
				<div id="spaced">
					<div id="content">
						<identity-name .identity=${this.identity} no-link></identity-name>
					</div>
					<slot name="right"></slot>
				</div>
			</div>
		`;
	}
}
