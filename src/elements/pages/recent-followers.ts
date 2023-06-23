import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './recent-followers.scss';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import { globalEventGroups, RecentFollowersUpdateEvent } from '../../utils/global-events';
import logging from '../../utils/logging';
import { responses } from '../../routes';

@customElement('page-recent-followers')
export default class RecentFollowers extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	/// === EVENTS ===
	handleRecentFollowersUpdate: (e: RecentFollowersUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleRecentFollowersUpdate = this.onRecentFollowersUpdate.bind(this);
		globalEventGroups.add('recent-followers-update', this.handleRecentFollowersUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('recent-followers-update', this.handleRecentFollowersUpdate);
	}

	onRecentFollowersUpdate() {
		this.requestUpdate();
	}

	async ignore(identityId: string) {
		try {
			await global.live.identity.recentFollowerIgnore({
				identityId: identityId
			});
		} catch (err) {
			logging.error('Error ignoring', err);
			this.loadError = err;
		}
	}

	async follow(identityId: string) {
		try {
			await global.live.identity.followIdentity({
				identityId: identityId
			});
		} catch (err) {
			logging.error('Error following', err);
			this.loadError = err;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`<div id="base">
			<page-header>
				<e-svg src="solid/user-plus"></e-svg>
				<h1>Recent Followers</h1>
			</page-header>
			<div id="identities">
				${when(
					global.recentFollowers.length,
					() =>
						repeat(
							global.recentFollowers,
							i => i.identityId,
							i =>
								html`<identity-tile .identity=${i}
									><div class="actions" slot="right">
										<stylized-button
											class="ignore"
											.trigger=${this.ignore.bind(this, i.identityId)}
											>Ignore</stylized-button
										><stylized-button .trigger=${this.follow.bind(this, i.identityId)}
											>Follow back</stylized-button
										>
									</div></identity-tile
								>`
						),
					() => html`<p class="muted">No recent followers</p>`
				)}
			</div>
		</div>`;
	}
}
