import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { cssify } from '../../../../../utils/css';
import routes, { responses } from '../../../../../routes';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../../../utils/api';
import UIRouter from '../../../../root/ui-router';
import { CloudGameCache } from '../../../../../data/cache';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';
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

export interface GameSettingsRootConfig {
	general?: boolean;
	tokens?: boolean;
	billing?: boolean;
}

@customElement('page-dev-game-settings')
export default class DevGameSettings extends LitElement {
	static styles = cssify();

	@property({ type: String })
	tabId: string = null;

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	game: cloud.GameFull = null;

	tabs: TabGroup[];

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	config: GameSettingsRootConfig;

	gameStream?: api.RepeatingRequest<cloud.GetGameByIdCommandOutput>;

	constructor() {
		super();

		// Build tabs
		this.tabs = [
			{
				title: 'General',
				items: [
					{
						id: 'general',
						icon: 'solid/user',
						title: 'General'
					},
					{
						id: 'tokens',
						icon: 'solid/key',
						title: 'Tokens'
					},
					{
						id: 'billing',
						icon: 'solid/dollar-sign',
						title: 'Billing'
					}
				]
			}
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.gameStream) this.gameStream.cancel();
	}

	resetData() {
		this.game = null;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('gameId')) {
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
			if (this.config.billing) this.tabId = 'billing';
			else if (this.config.tokens) this.tabId = 'tokens';
			else this.tabId = 'general';
		}
	}

	async fetchData() {
		if (this.gameStream) this.gameStream.cancel();

		// Fetch events
		this.gameStream = await CloudGameCache.watch(this.gameId, res => {
			this.game = res.game;

			// Sort game versions by timestamp descending
			this.game.versions.sort((a, b) => b.createTs.getTime() - a.createTs.getTime());
		});

		this.gameStream.onError(err => {
			logging.error('Request error', err);

			if (this.game) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	navigateTab(tabId: string) {
		// Navigate to the correct tab; this will update this view automatically
		let url = routes.devGameSettings.build({ gameId: this.gameId, tab: tabId });

		UIRouter.shared.navigate(url, {
			replaceHistory: true
		});
	}

	render() {
		if (!this.tabId) return null;
		if (!this.game) return this.renderPlaceholder();
		if (this.loadError) return responses.renderError(this.loadError);

		let body = null;

		if (this.config.general) {
			body = html`<page-dev-game-settings-general .game=${this.game}></page-dev-game-settings-general>`;

			UIRouter.shared.updateTitle('General');
		} else if (this.config.billing) {
			body = html`<page-dev-game-settings-billing .game=${this.game}></page-dev-game-settings-billing>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} - Billing`);
		} else if (this.config.tokens) {
			body = html`<page-dev-game-settings-tokens .game=${this.game}></page-dev-game-settings-tokens>`;

			UIRouter.shared.updateTitle(`${this.game.displayName} – Tokens`);
		}

		return html`
			<rvt-sidebar-layout>
				<rvt-sidebar slot="sidebar">
					${map(
						this.tabs,
						group => html`
							<rvt-sidebar-group .title=${group.title}>
								${map(group.items, p => {
									return html`<rvt-sidebar-button
										?current=${p.id == this.tabId}
										.href=${p.url}
										.target=${p.notHub ? '_blank' : null}
										.trigger=${!p.url ? this.navigateTab.bind(this, p.id) : null}
										.icon=${p.icon}
										>${p.title}</rvt-sidebar-button
									>`;
								})}
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
