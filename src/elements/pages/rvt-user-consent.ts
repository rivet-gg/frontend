import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import { GlobalStatus } from '../../utils/global';
import { globalEventGroups, GlobalStatusChangeEvent } from '../../utils/global-events';

@customElement('rvt-user-consent')
export class RvtUserConsent extends LitElement {
	static styles = cssify();

	status = GlobalStatus.Consenting;

	handleStatusChange: (e: GlobalStatusChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleStatusChange = this.onStatusChanged.bind(this);
		globalEventGroups.add('status-change', this.handleStatusChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('status-change', this.handleStatusChange);
	}

	onStatusChanged(e: GlobalStatusChangeEvent) {
		this.status = e.value;
		this.requestUpdate('status');
	}

	private dispatchLogin() {
		this.dispatchEvent(new CustomEvent('login'));
	}

	render() {
		return html`
			<div class="text-center p-4 pb-8">
				<e-svg class="w-16 h-auto" src="logo/logo-gradient-white" preserve></e-svg>
				<h1 class="text-5xl mt-2 mb-8">Welcome to Rivet!</h1>
				<p class="text-lg">Rivet is still in private beta.</p>
				<p class="my-2 text-lg">Join the waitlist to get early access.</p>
				<div class="flex justify-center my-8">
					<stylized-button href="https://b8v8449klvp.typeform.com/rivet" target="_blank">
						Beta Access Form
					</stylized-button>
				</div>
				<div class="w-3/4 border-b-white/10 border-b h-px mx-auto my-4"></div>
				<div class="w-full flex m-auto pb-5 text-left items-center justify-center gap-4">
					<p class="text-md">Have access and just got logged out?</p>
					<stylized-button .trigger="${this.dispatchLogin.bind(this)}"
						>${when(
							![GlobalStatus.Consenting, GlobalStatus.Connected].includes(this.status),
							() => html`<rvt-spinner></rvt-spinner>`
						)}
						Login
					</stylized-button>
				</div>
				<p class="text-gray-400 text-xs">
					By clicking Login button, you agree to the Rivet
					<a class="link" href="https://rivet.gg/terms" target="_blank">Terms of Service</a>
					and
					<a class="link" href="https://rivet.gg/privacy" target="_blank">Privacy Policy</a>.
					<a class="link" href="https://rivet.gg/privacy" target="_blank">Privacy Policy</a>.
				</p>
			</div>
		`;
	}
}
