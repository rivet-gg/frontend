import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './group-avatar.scss';
import utils from '../../utils/utils';
import routes from '../../routes';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';

@customElement('group-avatar')
export default class GroupAvatar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.group.GroupHandle | api.group.GroupProfile;

	@property({ type: Boolean })
	rounded = true;

	@property({ type: Boolean, attribute: 'no-placeholder' })
	noPlaceholder = false;

	@property({ type: String })
	imagePlaceholder: string = null;

	@property({ type: String })
	placeholderOverride: string = null;

	@property({ type: Boolean })
	shadow = false;

	@property({ type: Boolean })
	light = false;

	@property({ attribute: 'icon-fill', type: String })
	iconFill = '#ffffff';

	@property({ type: Boolean, attribute: 'link' })
	link = false;

	render() {
		// Build classes and style
		let classes = {
			rounded: this.rounded,
			shadow: this.shadow,
			light: this.light
		};

		let imageSrc = this.imagePlaceholder ?? this.group.avatarUrl;

		// Create body
		let body = imageSrc
			? html`<lazy-img id="avatar-image" src="${imageSrc}"></lazy-img>`
			: this.noPlaceholder
			? null
			: html`<div id="avatar-placeholder">
					<span>${utils.getGroupInitials(this.placeholderOverride ?? this.group.displayName)}</span>
			  </div>`;

		// Create link
		if (this.link)
			return html`<a
				id="group-avatar"
				class=${classMap(classes)}
				href=${routes.group.build(groupRouteData(this.group))}
				>${body}</a
			>`;
		else return html`<div id="group-avatar" class=${classMap(classes)}>${body}</div>`;
	}
}
