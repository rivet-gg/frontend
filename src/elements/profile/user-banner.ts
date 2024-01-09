import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import { responses } from '../../routes';
import { when } from 'lit/directives/when.js';
import RvtRoot from '../root/rvt-root';

@customElement('user-banner')
export default class UserBanner extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	loadError?: any;

	constructor() {
		super();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div class="mx-auto max-w-contentwidth px-3 md:px-5 lg:px-0">
				<div class="relative my-5 md:my-10 h-72 border-white border-2 bg-user-banner bg-cover">
					<div class="absolute flex flex-row bottom-10 left-10">
						<identity-avatar 
						    class="block w-16 h-16 sm:w-16 sm:h-16"	
							hide-status 
							.identity=${global.currentIdentity}>
						</identity-avatar>
						<div class="pl-6 my-auto flex flex-col space-y-2">
							<h4 class="text-3xl sm:text-5xl font-display">${global.currentIdentity.displayName}</h4>
						</div>
					</div>
				</div>

				<!-- Guest Banner -->
				${when(
					!global.currentIdentity.isRegistered,
					() =>
						html`<div id="guest-banner" class="block">
							<e-svg id="guest-image" src="graphics/computer" non-icon preserve></e-svg>

							<div id="guest-content">
								<h2>Looks like you're logged in as a guest</h2>
								<p>
									Registering with Rivet gives you access to <b>joining groups</b>,
									<b>editing your profile</b>, and much more.
								</p>
								<div id="guest-actions">
									<stylized-button .trigger=${() => RvtRoot.shared.openRegisterPanel()}
										>Register Now</stylized-button
									>
								</div>
							</div>
						</div>`
				)}
				</div>
			</div> `;
	}
}
