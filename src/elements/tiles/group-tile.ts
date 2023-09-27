import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './group-tile.scss';
import routes from '../../routes';

import assets from '../../data/assets';
import { groupRouteData } from '../../data/group';
import numbro from 'numbro';
import * as api from '../../utils/api';

@customElement('group-tile')
export default class GroupTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.portal.GroupSummary;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink = false;

	@property({ type: Boolean, attribute: 'active' })
	active = false;

	render() {
		let classes = classMap({
			active: this.active
		});

		return html`<div id="base" class=${classes}>
			${this.noLink
				? null
				: html`<a id="link" href=${routes.groupOverview.build(groupRouteData(this.group))}></a>`}
			${this.renderBody()}
		</div>`;
	}

	renderBody() {
		let formattedMemberCount =
			this.group.memberCount >= 2000
				? numbro(this.group.memberCount).format('0,0.0a')
				: numbro(this.group.memberCount).format('0,0');

		// TODO: Use dev linked games
		let linkedGames: api.portal.GameSummary[] = [];
		return html`${this.group.avatarUrl
				? html`<group-avatar
						id="background-img"
						.rounded=${false}
						.noPlaceholder=${true}
						.group=${this.group}
				  ></group-avatar>`
				: html`<div id="background"></div>`}
			<!-- Details -->
			<div id="details">
				<!-- Title -->
				<h1 id="title">${this.group.displayName}</h1>
				<!-- Member Count -->
				<h2 id="member-count"><e-svg src="solid/user"></e-svg>${formattedMemberCount}</h2>
			</div>

			<!-- Hover Details -->
			<div id="hover-details">
				<h1 id="details-title">Group Games</h1>
				<!-- Games -->
				<div id="official-games">
					${repeat(
						linkedGames,
						g => html`
							<div class="game-icon">
								<lazy-img
									src=${g.logoUrl ?? assets.asset('/games/blank/logo.png')}
									bg-size="contain"
								></lazy-img>
							</div>
						`
					)}
					${linkedGames.length == 0 ? 'No Group Games' : null}
				</div>
			</div>`;
	}
}
