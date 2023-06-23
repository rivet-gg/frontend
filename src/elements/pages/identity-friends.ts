import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './identity-friends.scss';
import { repeat } from 'lit/directives/repeat.js';
import global from '../../utils/global';
import routes, { responses } from '../../routes';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import { padAccountNumber } from '../../data/identity';
import * as api from '../../utils/api';

import UIRouter from '../root/ui-router';
import { IdentityProfileCache } from '../../data/cache';
import logging from '../../utils/logging';

@customElement('page-identity-friends')
export default class PageIdentityFriends extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	identityId: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: Array })
	mutualFriends: api.identity.IdentityHandle[] = [];

	@property({ type: Boolean })
	friendsFetched = false;

	@property({ type: Boolean })
	profileFetched = false;

	identityStream?: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;

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
	}

	protected updated(changedProperties: PropertyValues): void {
		// Request data if category set
		if (changedProperties.has('identityId')) {
			this.resetIdentityData();
			this.fetchIdentity();
		}
	}

	resetIdentityData() {
		// Remove old identity data
		this.profile = null;
		if (this.identityStream) this.identityStream.cancel();
	}

	async fetchIdentity() {
		// Fetch events
		this.identityStream = await IdentityProfileCache.watch(this.identityId, res => {
			this.profile = res.identity;
			this.profileFetched = true;

			// Update the title
			UIRouter.shared.updateTitle(
				`${this.profile.displayName}#${padAccountNumber(this.profile.accountNumber)}'s friends`
			);
		});

		this.identityStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});

		// Fetch friends
		if (this.identityId != global.currentIdentity.identityId) {
			try {
				let res = await global.live.identity.listMutualFriends({
					identityId: this.identityId
				});
				this.mutualFriends = res.identities;

				this.friendsFetched = true;
			} catch (err) {
				logging.error('Request error', err);

				if (this.friendsFetched) globalEventGroups.dispatch('error', err);
				else this.loadError = err;
			}
		} else {
			this.friendsFetched = true;
		}
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
		let errorMsg =
			this.profileFetched && this.friendsFetched
				? this.profile
					? this.mutualFriends.length
						? null
						: 'No mutual friends found'
					: 'Profile not found'
				: 'Fetching friends list...';
		let errorMsgTemplate = html`<p id="error">${errorMsg}</p>`;

		return html` <div id="base">
			<!-- Header -->
			<div id="header">
				<icon-button
					id="back-button"
					src="solid/caret-left"
					small
					color="white"
					.trigger=${this.navigateBack.bind(this)}
				></icon-button>

				${this.profile
					? html` <identity-name .identity=${this.profile}></identity-name>
							${errorMsg ? errorMsgTemplate : html`<h1 id="title">Mutual friends</h1>`}`
					: errorMsgTemplate}
			</div>

			<!-- Friends list -->
			<div id="list">
				${errorMsg
					? repeat(
							Array(30),
							() => {},
							() => html`<loading-placeholder></loading-placeholder>`
					  )
					: repeat(
							this.mutualFriends,
							a => a.identityId,
							a => html`<identity-tile .identity=${a}></identity-tile>`
					  )}
			</div>
		</div>`;
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
