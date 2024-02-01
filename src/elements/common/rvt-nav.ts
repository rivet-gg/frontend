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
				class="gap-10 px-6 lg:z-30 pointer-events-auto flex flex-col transition md:divide-white/15 backdrop-blur bg-charcole-950 border-b border-white/10"
			>
				<div class="h-14 flex items-center justify-between">
					<div class="flex flex-row align-middle my-auto max-sm:mx-auto">
						<!-- Logo -->
						<a aria-label="Home" class="my-auto" href=${routes.home.build({})}>
							<div class="h-6">
								<e-svg
									src="logo/cream"
									non-icon
									class="mb-[2px] h-full w-auto"
									preserve
								></e-svg>
							</div>
						</a>

						<!-- Breadcrumb -->
						<div class="hidden my-auto sm:ml-6 sm:block">
							<div class="flex my-auto" aria-label="Breadcrumb">
								<rvt-breadcrumbs .breadcrumbs=${this.breadcrumbs}></rvt-breadcrumbs>
							</div>
						</div>
					</div>

					${when(
						global.status == GlobalStatus.Connected,
						() => html`
							<!-- Avatar -->
							<div class="sm:hidden absolute left-2">
								<identity-avatar
									class="my-auto block w-7 h-7"
									shadow
									.identity=${global.currentIdentity}
								></identity-avatar>
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
									.identity=${global.currentIdentity}
								></identity-avatar>

								<icon-button
									src="solid/gear"
									small
									color="#ececec80"
									href=${routes.settings.build({})}
								></icon-button>
							</div>

							<!-- Settings -->
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
						`
					)}
				</div>
			</nav>
		`;
	}
}
