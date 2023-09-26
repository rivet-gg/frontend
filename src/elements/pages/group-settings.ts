import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { cssify } from '../../utils/css';
import styles from './game.scss';
import routes, { responses } from '../../routes';
import group from '@rivet-gg/group';
import * as api from '../../utils/api';
import UIRouter from '../root/ui-router';
import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';
import { map } from 'lit/directives/map.js';


interface TabGroup {
	title: string;
	items: SettingsPageData[];
}

interface SettingsPageData {
	id?: string;
	icon?: string;
	title?: string;
	render?(): TemplateResult;
	url?: string;
	notHub?: boolean;
	spacer?: boolean;
}

export interface GroupSettingsRootConfig {
    general?: boolean;
    members?: boolean;
    billing?: boolean;
}

@customElement('page-group-settings')
export default class GroupSettings extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	tabId: string = null;

    @property({ type: String })
    groupId: string;

    @property({ type: Object })
	group: group.GroupProfile;

	tabs: TabGroup[];

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	config: GroupSettingsRootConfig;

	groupStream: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput> = null;

	constructor() {
		super();

		// Build tabs
		this.tabs = [
			{
				title: 'General',
				items: [
					{
						id: 'general',
						icon: 'regular/square-info',
						title: 'General',
					},
					{
						id: 'members',
						icon: 'solid/user',
						title: 'Members',
					},
					{
						id: 'billing',
						icon: 'solid/dollar-sign',
						title: 'Billing',
					}
				]
			},
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.groupStream) this.groupStream.cancel();
	}

    resetData() {
		this.group = null;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

        if ( changedProperties.has('groupId')) {
            this.resetData();
            this.fetchData();
        }

		if (changedProperties.has('tabId')) {
			let currentTab = this.tabs
				.flatMap(x => x.items)
				.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

			if (currentTab) UIRouter.shared.updateTitle(currentTab.title);
		}

        if (changedProperties.has('config')) {
            if(this.config.billing) this.tabId = "billing";
            else if(this.config.members) this.tabId = "members";
            else this.tabId = "general";
        }
	}

    async fetchData() {
		if (this.groupStream) this.groupStream.cancel();

		// Fetch events
		this.groupStream = await GroupProfileCache.watch(this.groupId, res => {
			this.group = res.group;
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);

			if (this.group) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	navigateTab(tabId: string) {
		// Navigate to the correct tab; this will update this view automatically
		let url = routes.groupSettings.build({ groupId: this.groupId, tab: tabId });

		UIRouter.shared.navigate(url, {
			replaceHistory: true
		});
	}

	render() {
		if (!this.tabId) return null;
        if (!this.group) return this.renderPlaceholder();
		if (this.loadError) return responses.renderError(this.loadError);

        let body = null;

		let currentTab = this.tabs
			.flatMap(x => x.items)
			.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

        if (this.config.general) {
            body = html`<page-group-settings-general
                .group=${this.group}
            ></page-group-settings-general>`;

            UIRouter.shared.updateTitle("General");
        } else if (this.config.billing) {
            body = html`<page-group-settings-billing .group=${this.group}></page-group-settings-billing>`;

            UIRouter.shared.updateTitle(`${this.group.displayName} - Billing`);
        } else if (this.config.members) {
            body = html`<page-group-settings-members
                .group=${this.group}
            ></page-group-settings-members>`;

            UIRouter.shared.updateTitle(`${this.group.displayName} – Members`);
        } 

		return html`
			<rvt-sidebar-layout>
				<rvt-sidebar slot="sidebar">
					${map(
						this.tabs,
						group => html`
							<rvt-sidebar-group .title=${group.title}>
								${map(
									group.items,
									p => {                                        
                                        return html`<rvt-sidebar-button
                                        ?current=${p.id == this.tabId}
                                        .href=${p.url}
                                        .target=${p.notHub ? '_blank' : null}
                                        .trigger=${!p.url ? this.navigateTab.bind(this, p.id) : null}
                                        .icon=${p.icon}
                                        >${p.title}</rvt-sidebar-button
                                    >`
                                    }	
								)}
							</rvt-sidebar-group>
						`
					)}
				</rvt-sidebar>
				<rvt-sidebar-body id="body" slot="body">${body}</rvt-sidebar-body>
			</rvt-sidebar-layout>
		`;
	}

    renderPlaceholder(): TemplateResult {
        return html`
            <div id="title">
                <loading-placeholder></loading-placeholder>
                <loading-placeholder></loading-placeholder>
            </div>
        `;
    }
}