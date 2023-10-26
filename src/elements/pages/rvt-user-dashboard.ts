import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './rvt-user-dashboard.scss';
import global from '../../utils/global';
import { when } from 'lit/directives/when.js';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import { isDeveloper } from '../../utils/identity';
import routes from '../../routes';
import UIRouter from '../root/ui-router';
import UIRoot from '../root/ui-root';

@customElement('rvt-user-dashboard')
export default class RvtUserDashboard extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
	}

	onIdentityChange() {
		if (isDeveloper(global.currentIdentity)) {
			UIRouter.shared.navigate(routes.home.build({}), {
				replaceHistory: true,
				forceSamePage: true
			});
		} else {
			this.requestUpdate();
		}
	}

	onLoginButtonClick() {
		global.grantConsent();
		UIRoot.shared.openRegisterPanel();
	}

	render() {
		return html`
			${when(
				global.currentIdentity?.isAdmin ||
					global.currentIdentity?.groups.find(group => group.group.isDeveloper),
				() => html`
					<div class="max-w-contentwidth w-full mx-auto">
						<user-banner></user-banner>
						<div class="">
							<page-dev-games></page-dev-games>
						</div>
					</div>
				`,
				() => html`
					<div class="text-center p-4 pb-8 self-center">
						<e-svg class="w-16 h-auto" src="logo/logo-gradient-white" preserve></e-svg>
						<h1 class="text-5xl mt-2 mb-8">Welcome to Rivet!</h1>
						<p class="text-lg">Rivet is still in private beta.</p>
						<p class="my-2 text-lg">Join the waitlist to get early access.</p>
						<div class="flex justify-center my-8">
							<stylized-button href="https://b8v8449klvp.typeform.com/rivet" target="_blank">
								Beta Access Form
							</stylized-button>
						</div>
						${when(
							!global.currentIdentity?.isRegistered,
							() => html`
								<div class="w-3/4 border-b-white/10 border-b-[1px] h-px mx-auto my-4"></div>
								<div
									class="w-full flex m-auto pb-5 text-left items-center justify-center gap-4"
								>
									<p class="text-md">Have access and just got logged out?</p>
									<stylized-button .trigger="${this.onLoginButtonClick.bind(this)}">
										Login
									</stylized-button>
								</div>
								<p class="text-gray-400 text-xs">
									By clicking Login, you agree to the Rivet
									<a class="link" href="https://rivet.gg/terms" target="_blank">
										Terms of Service
									</a>
									and
									<a class="link" href="https://rivet.gg/privacy" target="_blank">
										Privacy Policy </a
									>.
								</p>
							`
						)}
					</div>
				`
			)}
		`;
	}
}
