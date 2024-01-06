import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './rvt-user-dashboard.scss';
import global from '../../utils/global';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import { isDeveloper } from '../../utils/identity';
import { Rivet } from '@rivet-gg/api';
import routes from '../../routes';
import RvtRouter from '../root/rvt-router';

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
			RvtRouter.shared.navigate(routes.home.build({}), {
				replaceHistory: true,
				forceSamePage: true
			});
		} else {
			this.requestUpdate();
		}
	}

	render() {
		return html`
			<div class="max-w-contentwidth w-full mx-auto">
				<user-banner></user-banner>
				<div>
					<rvt-user-games></rvt-user-games>
				</div>
			</div>
		`;
	}

	renderSplash() {
		if (global.bootstrapData.cluster == Rivet.cloud.BootstrapCluster.Oss) {
			return html`<h1 class="text-5xl mt-3.5 mb-8">Welcome to Rivet OSS!</h1>
				<p class="text-lg">Login using the CLI with the command below:</p>
				<code class="inline-block bg-white bg-opacity-10 px-7 py-3 pt-3.5 rounded-md my-6"
					>bolt admin login</code
				>
				<p class="text-lg">
					Or if you have email sending configured on your backend, use the login below.
				</p>`;
		} else {
			return html`<h1 class="text-5xl mt-3.5 mb-8">Welcome to Rivet!</h1>
				<p class="text-lg">Rivet is still in private beta.</p>
				<p class="text-lg">Join the waitlist to get early access.</p>
				<div class="flex justify-center my-8">
					<stylized-button href="https://b8v8449klvp.typeform.com/rivet" target="_blank">
						Beta Access Form
					</stylized-button>
				</div>`;
		}
	}
}
