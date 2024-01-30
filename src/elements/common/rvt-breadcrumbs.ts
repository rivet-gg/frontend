import { LitElement, TemplateResult, html } from 'lit';
import { cssify } from '../../utils/css';
import { customElement, property } from 'lit/decorators.js';
import { GameCacheController, GroupProfileCacheController } from '../../controllers';
import routes from '../../routes';
import { ifDefined } from 'lit/directives/if-defined.js';
import clsx from 'clsx';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import assets from '../../data/assets';

export type Breadcrumb =
	| { type: 'Home' }
	| { type: 'Group'; groupId: string; title?: string }
	| { type: 'GroupSettings'; groupId: string; title?: string }
	| { type: 'GameSettings'; gameId: string; title?: string }
	| { type: 'Game'; gameId: string; title?: string }
	| { type: 'Namespace'; gameId: string; namespaceId: string; title?: string }
	| { type: 'Custom'; title: string };

@customElement('rvt-breadcrumbs')
export default class RvtBreadcrumbs extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	public breadcrumbs: Breadcrumb = undefined;

	private group = new GroupProfileCacheController('Breadcrumbs.groupProfile', this)
		.setVariables(() => ({
			groupId: this.groupId
		}))
		.setEnabled(() => !!this.groupId);

	private game = new GameCacheController('Breadcrumbs.game', this)
		.setVariables(() => ({
			gameId: this.gameId
		}))
		.setEnabled(() => !!this.gameId);

	private get groupId() {
		if (['Namespace', 'Game', 'GameSettings'].includes(this.breadcrumbs?.type)) {
			return this.game.data?.game.developerGroupId;
		}
		return this.breadcrumbs && 'groupId' in this.breadcrumbs ? this.breadcrumbs.groupId : undefined;
	}

	private get gameId() {
		return this.breadcrumbs && 'gameId' in this.breadcrumbs ? this.breadcrumbs.gameId : undefined;
	}

	private generateCrumbs() {
		let breadcrumb = this.breadcrumbs;
		if (!breadcrumb) {
			return [];
		}
		if (breadcrumb.type === 'Home') {
			return [];
		}
		if (breadcrumb.type === 'Group' && this.group.data) {
			let crumbs = [
				this.fragment.a({
					content: html`${this.fragment.groupAvatar({ group: this.group.data?.group })}
					${this.group.data?.group.displayName}`,
					href: routes.groupOverview.build({ id: this.group.data?.group.groupId })
				})
			];
			if (breadcrumb.title) {
				crumbs.push(
					this.fragment.a({
						content: html`${breadcrumb.title}`
					})
				);
			}
			return crumbs;
		}
		if (breadcrumb.type === 'GroupSettings' && this.group.data) {
			let crumbs = [
				this.fragment.a({
					content: html`${this.fragment.groupAvatar({ group: this.group.data?.group })}
					${this.group.data?.group.displayName}`,
					href: routes.groupOverview.build({ id: this.group.data?.group.groupId })
				})
			];
			if (breadcrumb.title) {
				crumbs.push(
					this.fragment.a({
						content: html`${breadcrumb.title}`
					})
				);
			}
			return crumbs;
		}
		if (breadcrumb.type === 'Game' && this.group.data && this.game.data) {
			return [
				this.fragment.a({
					content: html`${this.fragment.groupAvatar({ group: this.group.data?.group })}
					${this.group.data?.group.displayName}`,
					href: routes.groupOverview.build({ id: this.group.data?.group.groupId })
				}),
				this.fragment.a({
					content: html`${this.fragment.gameAvatar({ game: this.game.data?.game })}
					${this.game.data?.game.displayName}`,
					href: routes.devGameOverview.build({ gameId: this.game.data?.game.gameId })
				})
			];
		}
		if (breadcrumb.type === 'GameSettings' && this.group.data && this.game.data) {
			return [
				this.fragment.a({
					content: html`${this.fragment.groupAvatar({ group: this.group.data?.group })}
					${this.group.data?.group.displayName}`,
					href: routes.groupOverview.build({ id: this.group.data?.group.groupId })
				}),
				this.fragment.a({
					content: html`${this.fragment.gameAvatar({ game: this.game.data?.game })}
					${this.game.data?.game.displayName}`,
					href: routes.devGameOverview.build({ gameId: this.game.data?.game.gameId })
				}),
				this.fragment.a({
					content: html`${breadcrumb.title}`
				})
			];
		}
		if (breadcrumb.type === 'Namespace' && this.group.data && this.game.data) {
			let { namespaceId } = breadcrumb;
			let currentNamespace = this.game.data.game.namespaces.find(ns => ns.namespaceId === namespaceId);
			return [
				this.fragment.a({
					content: html`${this.fragment.groupAvatar({ group: this.group.data?.group })}
					${this.group.data?.group.displayName}`,
					href: routes.groupOverview.build({ id: this.group.data?.group.groupId })
				}),
				this.fragment.a({
					content: html`${this.fragment.gameAvatar({ game: this.game.data?.game })}
					${this.game.data?.game.displayName}`,
					href: routes.devGameOverview.build({ gameId: this.game.data?.game.gameId })
				}),
				html`<rvt-namespace-dropdown
					.game=${this.game.data?.game}
					.currentNamespace=${currentNamespace}
				></rvt-namespace-dropdown>`
			];
		}
		if (breadcrumb.type === 'Custom') {
			return [
				this.fragment.a({
					content: html`${breadcrumb.title}`
				})
			];
		}
		return [];
	}

	private readonly fragment = {
		text: (opts: { content: TemplateResult }) => html`${opts.content}`,
		groupAvatar: (opts: { group: any }) =>
			html`<group-avatar
				shadow
				class="w-6 h-6"
				style="--font-size: 10px"
				.group=${opts.group}
				.imagePlaceholder=${opts.group.avatarUrl}
				.placeholderOverride=${opts.group.displayName}
			></group-avatar>`,
		gameAvatar: (opts: { game: any }) => html`
			<lazy-img
				class="w-6 h-6"
				bg-size="contain"
				src=${opts.game.logoUrl ?? assets.asset('/games/blank/blankgame.svg')}
			></lazy-img>
		`,
		a: (opts: { content: TemplateResult; href?: string }) => html`
			<a
				href=${ifDefined(opts.href)}
				class=${clsx(
					opts.href ? 'hover:bg-slate-200/5 hover:text-white' : '',
					'text-slate-200 group-last:hover:bg-transparent group-last:hover:text-slate-200 flex font-display text-md items-center rounded-md gap-3 pl-3.5 pr-3.5 py-1.5 transition'
				)}
			>
				${opts.content}
			</a>
		`
	};

	renderChevron(): TemplateResult {
		return html`
			<e-svg src="regular/chevron-right" class="h-5 w-5 flex-shrink-0 text-gray-200"></e-svg>
		`;
	}

	render() {
		let crumbs = this.generateCrumbs();
		return html` <ol role="list" class="flex items-center">
			${map(
				crumbs,
				(crumb, index) =>
					html`<li class="group">
						<div class="flex items-center">
							${when(index <= crumbs.length - 1, () => this.renderChevron())} ${crumb}
						</div>
					</li> `
			)}
		</ol>`;
	}
}
