import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as group from '@rivet-gg/group';
import { cssify } from '../../utils/css';
import assets from '../../data/assets';
import routes from '../../routes';

@customElement('group-banner')
export default class DevGroupBanner extends LitElement {
	static styles = cssify();

    @property({ type: Object })
    group: group.GroupProfile = null;

	renderGroupIcon(group: group.GroupProfile): TemplateResult {
		return html`
			<lazy-img
				class="mx-auto w-28 h-28"
				bg-size=${group ? (group.avatarUrl ? 'contain' : 'cover') : 'cover'}
				src=${group.avatarUrl ?? assets.asset('/games/blank/logo.png')}
			></lazy-img>
		`;
	}

	render() {
		return html`
			<div class="my-[20px] md:my-[40px] mx-auto bg-zinc-700 h-[18.2rem] rounded-[20px] relative">
				<div class="flex flex-col place-content-center m-auto h-full w-1/2 text-center">
					${this.group
						? html`
                                <stylized-button
                                    class="absolute top-6 right-10"
                                    color="gray"
                                    .icon=${'solid/gear'}
                                    .href=${routes.groupSettings.build({id: this.group.groupId})}    
                                >
                                Settings
                                </stylized-button>
								${this.renderGroupIcon(this.group)}
								<h1 class="text-2xl mt-8">${this.group.displayName}</h1>
						  `
						: html``}
				</div>
			</div>
		`;
	}
}
