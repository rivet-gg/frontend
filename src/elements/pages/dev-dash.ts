import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-dash.scss';
import global from '../../utils/global';
import { when } from 'lit/directives/when.js';
import { IdentityChangeEvent, globalEventGroups } from '../../utils/global-events';
import { isDeveloper } from '../../utils/identity';
import routes from '../../routes';
import UIRouter from '../root/ui-router';
import UIRoot from '../root/ui-root';
@customElement('dev-dash')
export default class DeveloperDash extends LitElement {
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

	render() {
		return html`
			${when(
				global.currentIdentity.groups.find(group => group.group.isDeveloper),
				() => html`
					<div class="w-full">
						<user-banner></user-banner>
						<div class="sm:px-5 max-w-contentwidth m-auto">
							<page-dev-games></page-dev-games>
						</div>
					</div>
				`,
				() => html`
					<div class="absolute text-center top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 pt-12">
						<h1 class="text-3xl pb-2">Private Beta</h1>
						<h2 class="text-lg pb-4">
							Rivet is still in private beta. Join the waitlist to get early access.
						</h2>
						<div class="w-full flex flex-row place-content-center m-auto pb-5">
							<stylized-button href="https://b8v8449klvp.typeform.com/rivet" target="_blank">
								Beta Access Form
							</stylized-button>
						</div>
						<div class="w-3/4 border-b-white/10 border-b-[1px] h-px mx-auto"></div>
						<h2 class="text-md pt-5 pb-3">Have access and just got logged out?</h2>
						<div class="w-full flex flex-row place-content-center m-auto pb-5">
							<stylized-button .trigger=${() => UIRoot.shared.openRegisterPanel()}>
								Login
							</stylized-button>
						</div>
					</div>
				`
			)}
		`;
	}
}
