import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as group from '@rivet-gg/group';
import { cssify } from '../../../../utils/css';
import assets from '../../../../data/assets';
import routes from '../../../../routes';
import { when } from 'lit/directives/when.js';

@customElement('group-banner')
export default class DevGroupBanner extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	group: group.GroupProfile = null;

	renderGroupIcon(group: group.GroupProfile): TemplateResult {
		return html`
			<lazy-img
				class="mx-auto w-28 h-28"
				bg-size="contain"
				src=${group.avatarUrl ?? assets.asset('/games/blank/blankgame.svg')}
			></lazy-img>
		`;
	}

	render() {
		return html`
			<div class="my-5 md:my-10 mx-auto h-72 relative border-2 border-white">
				<div class="flex flex-col place-content-center m-auto h-full w-1/2 text-center">
					${this.group
						? html`
								${when(this.group.isCurrentIdentityMember, () => {
									return html`
										<rvt-button
											class="absolute top-6 right-10"
											href=${routes.groupSettings.build({
												groupId: this.group.groupId
											})}
										>
											Settings
										</rvt-button>
									`;
								})}
								${this.renderGroupIcon(this.group)}
								<h1 class="text-2xl mt-8">${this.group.displayName}</h1>
						  `
						: html``}
				</div>
			</div>
		`;
	}
}
