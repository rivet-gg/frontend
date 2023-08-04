import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import styles from './navbar.scss';
import routes from '../../routes';
import * as api from '../../utils/api';
import { when } from 'lit/directives/when.js';
import logging from '../../utils/logging';
import { GameFull } from '@rivet-gg/cloud';
import assets from '../../data/assets';

export type BreadCrumb = { type: string; content: { ident: string; url: string } };

export type CrumbDisplay = { name: string; url: string; img?: { type: string; info_obj: any } };

@customElement('nav-bar')
export default class NavBar extends LitElement {
	// Required since Tailwind styles get applied within 'cssify'
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityProfile | undefined;

	@property({ type: Object })
	breadcrumbs: BreadCrumb = undefined;

	@property({ type: Array })
	displaycrumbs: CrumbDisplay[] = [];

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('breadcrumbs')) {
			this.fetchData();
			this.requestUpdate();
		}
	}

	async fetchData() {
		let crumb = this.breadcrumbs;

		try {
			switch (crumb.type) {
				case 'Group':
					let summary = await global.api.group.getProfile(crumb.content.ident);

					this.displaycrumbs = [
						{
							name: summary.group.displayName,
							url: routes.groupSettings.build({ id: summary.group.groupId }),
							img: { type: 'Group', info_obj: summary.group }
						}
					];
					this.requestUpdate('displaycrumbs');

					break;
				case 'Game':
					let game_data = (await global.api.cloud.games.games.getGameById(crumb.content.ident))
						.game;
					let developer_group_data = (await global.api.group.getProfile(game_data.developerGroupId))
						.group;

					this.displaycrumbs = [
						{
							name: developer_group_data.displayName,
							// url: `/groups/${developer_group_data.groupId}`,
							url: routes.groupSettings.build({ id: developer_group_data.groupId }),
							img: { type: 'Group', info_obj: developer_group_data }
						},
						{
							name: game_data.displayName,
							// url: crumb.content.url,
							url: routes.devGame.build({ gameId: game_data.gameId }),
							img: { type: 'Game', info_obj: game_data }
						}
					];

					this.requestUpdate('displaycrumbs');

					break;
				case 'Home':
					this.displaycrumbs = [{ name: crumb.type, url: routes.home.build({}) }];
					this.requestUpdate('displaycrumbs');

					break;
				default:
					this.displaycrumbs = [];
					this.requestUpdate('displaycrumbs');

					break;
			}
		} catch (err) {
			logging.error('failed to fetch breadcrumb data', err);
		}
	}

	renderGroupAvatar(group: api.group.GroupProfile): TemplateResult {
		return html`<group-avatar
			shadow
			class="w-6 h-6"
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

	renderBreadCrumb(): TemplateResult {
		return html`${this.displaycrumbs.map((crumb: CrumbDisplay | undefined) =>
			when(
				typeof crumb !== 'undefined' && crumb.name !== 'Home',
				() => html`
					<li class="group">
						<div class="flex items-center">
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

							<a
								href="${crumb.url}"
								class="text-slate-200 hover:bg-slate-200/5 hover:text-white flex font-display text-md items-center rounded-md gap-3 pl-3.5 pr-3.5 py-1.5 transition group-last:text-white group-last:font-bold"
							>
								${when(typeof crumb.img !== 'undefined', () => {
									switch (crumb.img.type) {
										case 'Group':
											return this.renderGroupAvatar(crumb.img.info_obj);
										// TODO - Get a nicer default game logo, current one looks off-centered within nav
										// case "Game":
										//     return this.renderGameAvatar(crumb.img.info_obj);
										default:
											return html``;
									}
								})}
								${crumb.name}
							</a>
						</div>
					</li>
				`
			)
		)}`;
	}

	render() {
		return html`
                <nav class="gap-10 px-6 lg:z-30 pointer-events-auto fixed inset-x-0 top-0 z-50 flex flex-col transition md:divide-white/15 backdrop-blur  bg-zinc-900/[.8]">
                    <!-- TODO - standardize logo size with main page -->
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

                        <div class="sm:hidden absolute right-2 flex place-content-center my-auto opacity-75 transition hover:opacity-100">
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

                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4 max-sm:invisible my-auto">
                        <identity-name class="my-auto text-sm" .identity=${
							global.currentIdentity
						} no-link></identity-name>
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
				</nav>
		`;
	}
}
