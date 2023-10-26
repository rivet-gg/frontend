import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './group-handle-tile.scss';
import routes from '../../routes';

import { classMap } from 'lit/directives/class-map.js';
import { showGroupContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';

@customElement('group-handle-tile')
export default class GroupTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.group.GroupHandle;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink = false;

	@property({ type: Boolean, attribute: 'light' })
	light = false;

	isHovering: boolean;

	connectedCallback() {
		super.connectedCallback();

		// TODO: Update events
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		// TODO: Add placeholder rendering
		if (!this.group) return null;

		let classes = classMap({
			light: this.light,
			'has-link': !this.noLink
		});

		return html`<div
			id="base"
			class=${classes}
			@contextmenu=${showGroupContextMenu({ group: this.group, selfIsMember: false })}
		>
			${this.noLink
				? null
				: html`<a id="link" href=${routes.groupOverview.build({ id: this.group.groupId })}></a>`}
			<group-avatar .light=${this.light} .group=${this.group}></group-avatar>
			<div id="spaced">
				<div id="content">
					<h1 id="group-name">${this.group.displayName}</h1>
				</div>
				<slot name="right"></slot>
			</div>
		</div>`;
	}
}
