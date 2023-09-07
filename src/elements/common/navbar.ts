import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import cloud from '@rivet-gg/cloud';
import styles from './navbar.scss';
import routes from '../../routes';
import * as api from '../../utils/api';
import { when } from 'lit/directives/when.js';
import logging from '../../utils/logging';
import { GameFull } from '@rivet-gg/cloud';
import assets from '../../data/assets';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CloudGameCache, GroupProfileCache } from '../../data/cache';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';

export type Breadcrumb =
	| { type: 'Home' }
	| { type: 'Group'; groupId: string; title?: string }
	| { type: 'Game'; gameId: string; title?: string }
	| { type: 'Namespace'; gameId: string; namespaceId: string; title?: string }
	| { type: 'Custom'; title?: string };

interface CrumbDisplay {
	name: string;
	url?: string;
	img?: { type: string; infoObj: any };
	component?: TemplateResult;
}

@customElement('nav-bar')
export default class NavBar extends LitElement {
	// Required since Tailwind styles get applied within 'cssify'
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityProfile | undefined;

	@property({ type: String })
	routeTitle: string = '';

	@property({ type: Object })
	breadcrumbs: Breadcrumb = undefined;

	@property({ type: Array })
	displaycrumbs: CrumbDisplay[] = [];

	// Data streams
	groupStream: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput> = null;
	gameStream?: api.RepeatingRequest<cloud.GetGameByIdCommandOutput>;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	onIdentityChange() {
		this.requestUpdate();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('breadcrumbs')) {
			this.fetchData();
			this.requestUpdate();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);

		if (this.groupStream) this.groupStream.cancel();
		if (this.gameStream) this.gameStream.cancel();
	}

	async fetchData() {
		if (this.groupStream) {
			this.groupStream.cancel();
			this.groupStream = null;
		}
		if (this.gameStream) {
			this.gameStream.cancel();
			this.gameStream = null;
		}

		let crumb = this.breadcrumbs;

		try {
			switch (crumb.type) {
				case 'Home':
					this.displaycrumbs = [];
					this.requestUpdate('displaycrumbs');

					break;
				case 'Group':
					let groupTitle = crumb.title;
					this.groupStream = await GroupProfileCache.watch(crumb.groupId, res => {
						let summary = res.group;

						this.displaycrumbs = [
							{
								name: summary.displayName,
								url: routes.groupSettings.build({ id: summary.groupId }),
								img: { type: 'Group', infoObj: summary }
							}
						];
						if (groupTitle)
							this.displaycrumbs.push({
								name: groupTitle
							});

						this.requestUpdate('displaycrumbs');
					});

					break;
				case 'Game':
					// Fetch events
					let gameTitle = crumb.title;
					this.gameStream = await CloudGameCache.watch(crumb.gameId, async res => {
						let gameData = res.game;

						this.groupStream = await GroupProfileCache.watch(res.game.developerGroupId, res => {
							let groupData = res.group;

							this.displaycrumbs = [
								{
									name: groupData.displayName,
									url: routes.groupSettings.build({ id: groupData.groupId }),
									img: { type: 'Group', infoObj: groupData }
								},
								{
									name: gameData.displayName,
									url: routes.devGameOverview.build({ gameId: gameData.gameId }),
									img: { type: 'Game', infoObj: gameData }
								}
							];
							if (gameTitle)
								this.displaycrumbs.push({
									name: gameTitle
								});

							this.requestUpdate('displaycrumbs');
						});
					});

					break;
				case 'Namespace':
					// Not the displayName of the current namespace
					let namespaceTitle = crumb.title;
					let namespaceId = crumb.namespaceId;

					this.gameStream = await CloudGameCache.watch(crumb.gameId, async res => {
						let gameData = res.game;

						let currentNamespace = gameData.namespaces.find(ns => ns.namespaceId === namespaceId);

						this.groupStream = await GroupProfileCache.watch(res.game.developerGroupId, res => {
							let groupData = res.group;

							// TODO --> Update namespace-dropdown with a drop-down-list to standardize
							this.displaycrumbs = [
								{
									name: groupData.displayName,
									url: routes.groupSettings.build({ id: groupData.groupId }),
									img: { type: 'Group', infoObj: groupData }
								},
								{
									name: gameData.displayName,
									url: routes.devGameOverview.build({ gameId: gameData.gameId }),
									img: { type: 'Game', infoObj: gameData }
								},
								{
									name: namespaceTitle,
									component: html`<namespace-dropdown
										.game=${gameData}
										.currentNamespace=${currentNamespace}
									></namespace-dropdown>`
								}
							];

							if (namespaceTitle !== 'Namespace') {
								this.displaycrumbs.push({
									name: namespaceTitle
								});
							}

							this.requestUpdate('displaycrumbs');
						});
					});

					break;
				case 'Custom':
					this.displaycrumbs = [
						{
							name: this.routeTitle
						}
					];
					this.requestUpdate('displaycrumbs');

					break;
				default:
					throw 'Invalid breadcrumb type';
			}
		} catch (err) {
			logging.error('failed to fetch breadcrumb data', err);
		}
	}

	renderGroupAvatar(group: api.group.GroupProfile): TemplateResult {
		return html`<group-avatar
			shadow
			class="w-6 h-6"
			style="--font-size: 10px"
			.group=${group}
			.imagePlaceholder=${group.avatarUrl}
			.placeholderOverride=${group.displayName}
		></group-avatar>`;
	}

	renderGameAvatar(game: GameFull): TemplateResult {
		return html`
			<lazy-img
				class="w-6 h-6"
				bg-size=${game.logoUrl ? 'contain' : 'cover'}
				src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
			></lazy-img>
		`;
	}

	renderChevron(): TemplateResult {
		return html`
			<svg
				class="h-5 w-5 flex-shrink-0 text-gray-200"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
					clip-rule="evenodd"
				/>
			</svg>
		`;
	}

	renderCrumbImage(crumb: CrumbDisplay): TemplateResult {
		if (typeof crumb.img === 'undefined') return html``;

		switch (crumb.img.type) {
			case 'Group':
				return this.renderGroupAvatar(crumb.img.infoObj);
			case 'Game':
				return this.renderGameAvatar(crumb.img.infoObj);
			default:
				return html``;
		}
	}

	renderBreadCrumb(): TemplateResult {
		return html`${this.displaycrumbs.map((crumb: CrumbDisplay | undefined) =>
			when(typeof crumb !== 'undefined' && crumb.name !== 'Home', () => {
				if (typeof crumb.component !== 'undefined') {
					return html`
						<li class="group">
							<div class="flex items-center">
								${this.renderChevron()}
								<div class="px-3.5 py-1.5">${crumb.component}</div>
							</div>
						</li>
					`;
				}

				return html`
					<li class="group">
						<div class="flex items-center">
							${this.renderChevron()}
							<a
								href=${ifDefined(crumb.url)}
								class="text-slate-200 hover:bg-slate-200/5 hover:text-white group-last:hover:bg-transparent group-last:hover:text-slate-200 flex font-display text-md items-center rounded-md gap-3 pl-3.5 pr-3.5 py-1.5 transition"
							>
								${this.renderCrumbImage(crumb)} ${crumb.name}
							</a>
						</div>
					</li>
				`;
			})
		)}`;
	}

	render() {
		return html`
			<nav
				class="gap-10 px-6 lg:z-30 pointer-events-auto fixed inset-x-0 top-0 z-50 flex flex-col transition md:divide-white/15 backdrop-blur  bg-zinc-900/[.8]"
			>
				<div class="h-14 flex items-center justify-between ">
					<div class="absolute inset-x-0 top-full h-px transition bg-[#29292c]"></div>

					<div class="flex flex-row align-middle my-auto max-sm:mx-auto">
						<div class="sm:hidden absolute left-2">
							<identity-avatar
								class="my-auto block w-7 h-7"
								hide-status
								shadow
								.identity=${global.currentIdentity}
							></identity-avatar>
						</div>
						<a aria-label="Home" class="my-auto" href=${routes.home.build({})}>
							<div class="h-6">
								<e-svg
									src="logo/logo-gradient-white"
									class="mb-[2px] h-full w-auto"
									preserve
								></e-svg>
							</div>
						</a>

						<div
							class="sm:hidden absolute right-2 flex place-content-center my-auto opacity-75 transition hover:opacity-100"
						>
							<icon-button
								src="regular/gear"
								class="my-auto"
								small
								color="#ececec80"
								href=${routes.settings.build({})}
							></icon-button>
						</div>

						<div class="hidden my-auto sm:ml-6 sm:block">
							<div class="flex my-auto" aria-label="Breadcrumb">
								<ol role="list" class="flex items-center">
									${this.renderBreadCrumb()}
								</ol>
							</div>
						</div>
					</div>

					<div
						class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4 max-sm:invisible my-auto"
					>
						<identity-name
							class="my-auto text-sm"
							.identity=${global.currentIdentity}
							no-link
						></identity-name>
						<identity-avatar
							class="block w-6 h-6 m-2"
							hide-status
							.identity=${global.currentIdentity}
						></identity-avatar>

						<icon-button
							src="regular/gear"
							small
							color="#ececec80"
							href=${routes.settings.build({})}
						></icon-button>
					</div>
				</div>
			</nav>
		`;
	}
}
