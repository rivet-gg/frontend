import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './group-members.scss';
import { repeat } from 'lit/directives/repeat.js';
import global from '../../utils/global';
import routes, { responses } from '../../routes';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import * as api from '../../utils/api';

import UIRouter from '../root/ui-router';
import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';

@customElement('page-group-members')
export default class PageGroupMembers extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: Array })
	members: api.group.GroupMember[] = [];

	@property({ type: Boolean })
	informationFetched = false;

	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;
	membersStream?: api.RepeatingRequest<api.group.GetGroupMembersCommandOutput>;

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);

		if (this.groupStream) this.groupStream.cancel();
	}

	protected updated(changedProperties: PropertyValues): void {
		// Request data if category set
		if (changedProperties.has('groupId')) {
			this.resetGroupData();
			this.fetchGroup();
		}
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		if (this.groupStream) this.groupStream.cancel();
	}

	async fetchGroup() {
		// TODO: This should use a shared handler so we never have to call this multiple times

		/// Fetch events
		this.groupStream = await GroupProfileCache.watch(this.groupId, res => {
			this.profile = res.group;
			this.informationFetched = true;

			// Update the title
			UIRouter.shared.updateTitle(`${this.profile.displayName}'s members`);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);

			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});

		if (!this.profile) this.fetchMembers();
	}

	fetchMembers() {
		if (this.membersStream) this.membersStream.cancel();
		this.membersStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
			return await global.live.group.getGroupMembers(
				{ groupId: this.groupId, count: 32, watchIndex },
				{ abortSignal }
			);
		});

		this.membersStream.onMessage(res => {
			this.members = res.members;
		});

		this.membersStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	// Update on mobile change
	onMobile() {
		// This page is inaccessible to desktop, navigate back to home
		if (!global.isMobile) {
			UIRouter.shared.navigate(routes.home.build({}), {
				replaceHistory: true
			});
		}

		this.requestUpdate();
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.code == 1002;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		// Render error message
		let errorMsg = this.informationFetched
			? this.profile
				? this.members.length
					? null
					: 'No group members found'
				: 'Group not found'
			: 'Fetching group members...';
		let errorMsgTemplate = html`<p id="error">${errorMsg}</p>`;

		return html` <div id="base">
			<!-- Header -->
			<div id="header">
				${this.profile
					? html` <div id="group-name">
								<h1>${this.profile.displayName}</h1>
							</div>
							${errorMsg ? errorMsgTemplate : html`<h1 id="title">Group members</h1>`}`
					: errorMsgTemplate}
			</div>

			<!-- Group members -->
			${errorMsg
				? null
				: html` <div id="list">
						${repeat(
							this.members,
							a => a.identity.identityId,
							a => html`<identity-tile .identity=${a.identity}></identity-tile>`
						)}
				  </div>`}
		</div>`;
	}
}
