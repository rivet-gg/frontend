import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import global, { GlobalStatus } from '../../utils/global';
import routes from '../../routes';
import { when } from 'lit/directives/when.js';
import styles from './rvt-nav.scss';
import { Breadcrumb } from './rvt-breadcrumbs';
import { IdentityObserver } from '../../controllers/identityObserver';

@customElement('rvt-nav')
export default class RvtNav extends LitElement {
	// Required since Tailwind styles get applied within 'cssify'
	static styles = cssify(styles);

	@property({ type: String })
	routeTitle = '';

	@property({ type: Object })
	breadcrumbs: Breadcrumb = undefined;

	private identityObserver = new IdentityObserver(this);

	render() {
		return html`
			<nav
				class="sm:px-6 relative z-30 w-full pointer-events-auto flex flex-col transition md:divide-white/15 backdrop-blur bg-charcole-950 border-b border-white/10"
			>
				<div
					class="px-6 sm:px-0 h-14 flex items-center justify-between max-w-contentwidth mx-auto w-full"
				>
					<div class="flex flex-row align-middle my-auto gap-4 order-2 sm:order-none">
						<!-- Logo -->
						<a aria-label="Home" class="my-auto" href="https://rivet.gg">
							<div class="h-6 hidden sm:block">
								<e-svg
									src="logo/text-cream"
									non-icon
									class="block h-full w-auto"
									preserve
								></e-svg>
							</div>
							<div class="h-6 sm:hidden">
								<e-svg src="logo/cream" non-icon class="block h-full w-auto" preserve></e-svg>
							</div>
						</a>
						<div class="hidden sm:flex flex-row align-middle gap-1">
							<rvt-button icon="solid/hammer" variant="nav" href="https://rivet.gg/learn"
								>Learn</rvt-button
							>
							<rvt-button icon="solid/books" variant="nav" href="https://rivet.gg/docs"
								>Docs</rvt-button
							>
							<rvt-button icon="solid/circle-info" variant="nav" href="https://rivet.gg/support"
								>Support</rvt-button
							>
						</div>
					</div>

					${when(
						global.status == GlobalStatus.Connected,
						() => html`
							<!-- Avatar -->
							<div class="sm:hidden order-1">
								<identity-avatar
									class="my-auto block w-7 h-7"
									shadow
									.identity=${global.currentIdentity}
								></identity-avatar>
							</div>
							<div class="sm:flex items-center pr-2 gap-5 hidden my-auto">
								<a href="https://rivet.gg/discord">
									<e-svg
										src="brands/discord"
										class="block w-5 h-5 transition-opacity text-white opacity-75 hover:opacity-100"
									></e-svg>
								</a>
								<a href="https://github.com/rivet-gg">
									<e-svg
										src="brands/github"
										class="block w-5 h-5 transition-opacity text-white opacity-75 hover:opacity-100"
									></e-svg>
								</a>
								<div class="flex ml-3">
									<identity-name
										class="my-auto text-sm"
										.identity=${global.currentIdentity}
										no-link
									></identity-name>
									<identity-avatar
										class="block w-6 h-6 ml-2"
										.identity=${global.currentIdentity}
									></identity-avatar>
								</div>

								<a href=${routes.settings.build({})}>
									<e-svg
										src="solid/gear"
										class="block w-5 h-5 text-white opacity-75 hover:opacity-100"
									></e-svg>
								</a>
							</div>

							<!-- Settings -->
							<div class="sm:hidden flex place-content-center my-auto order-3">
								<a href=${routes.settings.build({})}>
									<e-svg
										src="solid/gear"
										class="block w-5 h-5 text-white opacity-75 hover:opacity-100"
									></e-svg>
								</a>
							</div>
						`
					)}
				</div>
				<!-- Breadcrumb -->
				${when(
					this.breadcrumbs,
					() =>
						html` <div class="block max-w-contentwidth mx-auto w-full overflow-auto">
							<div class="flex my-auto" aria-label="Breadcrumbs">
								<rvt-breadcrumbs
									class="flex-none px-6 sm:px-0"
									.breadcrumbs=${this.breadcrumbs}
								></rvt-breadcrumbs>
							</div>
						</div>`
				)}
			</nav>
		`;
	}
}
