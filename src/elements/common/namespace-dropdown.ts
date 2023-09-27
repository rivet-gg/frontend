import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './namespace-dropdown.scss';
import cloud from '@rivet-gg/cloud';
import routes from '../../routes';
import clsx from 'clsx';

@customElement('namespace-dropdown')
export default class RichEmbed extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	currentNamespace: cloud.NamespaceSummary;

	@property({ type: Boolean })
	expanded: boolean;

	switchExpandstate(): boolean {
		this.expanded = !this.expanded;
		return this.expanded;
	}

	renderNamespaceListEntry(namespace: cloud.NamespaceSummary, isCurrent: boolean): TemplateResult {
		return html`
			<a
				class="pt-3 last:pb-3 transition-all first:border-t-[1px] border-zinc-800 first:aria-expanded:border-zinc-600/80 group text-sm text-gray-200 hover:text-white flex flex-row place-content-around"
				href=${routes.devNamespace.build({
					gameId: this.game.gameId,
					namespaceId: namespace.namespaceId
				})}
				aria-expanded=${this.expanded}
			>
				<div class=${clsx(isCurrent ? 'font-bold text-white' : '', 'mr-auto')}>
					${namespace.displayName}
				</div>
				<!-- ${isCurrent
					? html` <e-svg src="regular/check" class="mb-[2px] h-full" preserve></e-svg> `
					: html``} -->
			</a>
		`;
	}

	render() {
		return html`
			<div
				class="relative min-w-[14rem] overflow-ellipsis bg-zinc-800 rounded-md py-1 transition-all aria-expanded:rounded-b-none hover:cursor-pointer"
				aria-expanded=${this.expanded}
				@click=${() => this.switchExpandstate()}
			>
				<div
					class="px-3 transition-all pb-1 mt-1 aria-expanded:rounded-b-none aria-expanded:delay-[300ms] min-w-full flex flex-col peer bg-zinc-800"
					aria-expanded=${this.expanded}
				>
					<div class="flex flex-row place-content-around w-full">
						<h2 class="text-md text-gray-200">${this.currentNamespace.displayName}</h2>
						<button
							class="ml-auto rotate-90 aria-expanded:-rotate-90 transition ease-in-out duration-150"
							aria-expanded=${this.expanded}
						>
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-200"
								viewBox="0 0 18 18"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div
					class="bg-zinc-800 w-full rounded-b-md absolute dropdownExpansion"
					aria-expanded=${this.expanded}
				>
					<ul
						class="overflow-hidden flex flex-col w-full px-3 max-h-48 aria-expanded:mb-1 aria-expanded:overflow-scroll"
						aria-expanded=${this.expanded}
					>
						${this.game.namespaces.map(namespace => {
							return this.renderNamespaceListEntry(
								namespace,
								namespace.namespaceId === this.currentNamespace.namespaceId
							);
						})}
					</ul>
				</div>
			</div>
		`;
	}
}
