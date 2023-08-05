import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';

@customElement('rvt-sidebar-layout')
export default class Layout extends LitElement {
	static styles = cssify();

	render() {
		return html`
			<div>
				<div class="fixed inset-y-0 flex w-72 flex-col border-white/10 border-r top-14">
					<!-- Sidebar component, swap this element with another sidebar if you like -->
					<div class="flex grow flex-col gap-y-5 overflow-y-auto px-6">
						<nav class="flex flex-1 flex-col">
							<ul role="list" class="flex flex-1 flex-col gap-y-7">
								<rvt-sidebar-group>
									<rvt-sidebar-button current icon="solid/circle"
										>Item A</rvt-sidebar-button
									>
									<rvt-sidebar-button icon="solid/star">Item B</rvt-sidebar-button>
									<rvt-sidebar-button icon="solid/triangle">Item C</rvt-sidebar-button>
								</rvt-sidebar-group>

								<rvt-sidebar-group title="Your teams">
									<rvt-sidebar-button icon="solid/circle">Item A</rvt-sidebar-button>
									<rvt-sidebar-button icon="solid/star">Item B</rvt-sidebar-button>
									<rvt-sidebar-button icon="solid/triangle">Item C</rvt-sidebar-button>
								</rvt-sidebar-group>
							</ul>
						</nav>
					</div>
				</div>

				<main class="pl-72">
					<div class="px-4 sm:px-6 lg:px-8">
						<slot></slot>
					</div>
				</main>
			</div>
		`;
	}
}

@customElement('rvt-sidebar-group')
export class Group extends LitElement {
	static styles = cssify();

	@property({ type: String })
	title: string;

	render() {
		return html`
			<li>
				${when(
					this.title,
					() => html`<div class="text-xs font-semibold leading-6 text-gray-400">${this.title}</div>`
				)}
				<ul role="list" class="-mx-2 mt-2 space-y-1">
					<slot></slot>
				</ul>
			</li>
		`;
	}
}

@customElement('rvt-sidebar-button')
export class Button extends LitElement {
	static styles = cssify();

	@property({ type: String })
	href: string;

	@property({ type: Boolean })
	current: boolean;

	@property({ type: String })
	icon: string;

	render() {
		return html`
			<li>
				<a
					.href=${this.href}
					class=${`${
						this.current ? 'opacity-100' : 'opacity-60 hover:opacity-100'
					} group flex gap-x-3 rounded-md p-2 text-white text-sm items-center leading-6 font-semibold transition`}
				>
					<!-- <span
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
						>NF</span
					> -->
					<e-svg .src=${this.icon} class="h-5 w-5 shrink-0" aria-hidden="true"></e-svg>
					<span class="truncate"><slot></slot></span>
				</a>
			</li>
		`;
	}
}
