import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './groups.scss';
import routes, { responses } from '../../routes';
import global from '../../utils/global';

import assets from '../../data/assets';
import * as api from '../../utils/api';
import { GroupCreateEvent } from '../modals/create-group';
import UIRouter from '../root/ui-router';

const LOAD_GROUP_COUNT = 64;

@customElement('page-groups')
export default class GroupsPage extends LitElement {
	static styles = cssify(styles);

	@query('#display-name-input')
	displayNameInput: HTMLInputElement;

	@property({ type: Array })
	myGroups?: api.group.GroupSummary[];

	@property({ type: Array })
	suggestedGroups?: api.group.GroupSummary[];

	@property({ type: Boolean })
	createGroupModalActive = false;

	@property({ type: Object })
	loadError?: any;

	protected firstUpdated(_changedProperties: PropertyValues): void {
		// Get suggested groups
		global.live.group
			.listSuggestedGroups({})
			.then(({ groups }) => {
				this.myGroups = [];
				this.suggestedGroups = groups;
			})
			.catch((err: any) => (this.loadError = err));
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<!-- Header -->
				<page-header>
					<e-svg src="regular/identity-group"></e-svg>
					<h1>Groups</h1>
				</page-header>

				<div id="banner">
					<div id="bg">
						<lazy-img
							class="img"
							bg-size="cover"
							src=${assets.asset('graphics/group-banner/group-banner-0.svg')}
						></lazy-img>
						<!-- <e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-1"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-2"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-3"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-4"></e-svg> -->
					</div>

					<div id="content">
						<h1>Chat and play games together</h1>
						<stylized-button color="white" .trigger=${() => (this.createGroupModalActive = true)}
							>Create a new group</stylized-button
						>
					</div>
				</div>
				<!-- <div id='search-bar-holder'>
					<div id='search-bar'>
						<e-svg src="regular/magnifying-glass"></e-svg>
						<input id="search-input" type="text" placeholder="Search for a group..." maxlength="32"/>
					</div>
				</div> -->

				${this.renderGroupList(this.suggestedGroups)}
			</div>

			<modal-create-group
				.active=${this.createGroupModalActive}
				@create=${(event: GroupCreateEvent) =>
					UIRouter.shared.navigate(
						routes.groupSettings.build({
							id: event.groupId
						})
					)}
				@close=${() => (this.createGroupModalActive = false)}
			></modal-create-group>
		`;
	}

	renderGroupList(groups: api.portal.GroupSummary[], loadingCount: number = LOAD_GROUP_COUNT) {
		if (groups && groups.length == 0)
			return html` <div id="groups-list">
				<span class="placeholder">No groups found</span>
			</div>`;

		return html`
			<div id="groups-list">
				${groups
					? repeat(
							groups,
							g => g.groupId,
							g => html`<div class="square-tile"><group-tile .group=${g}></group-tile></div>`
					  )
					: null}
				${!groups ? this.renderLoadingGroups(loadingCount) : null}
			</div>
		`;
	}

	renderLoadingGroups(count: number) {
		let items = [];
		for (let i = 0; i < count; i++) {
			items.push(html`<div class="square-tile"><loading-placeholder></loading-placeholder></div>`);
		}
		return items;
	}
}
