import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './rvt-user-dashboard.scss';
import global from '../../utils/global';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import { isDeveloper } from '../../utils/identity';
import routes from '../../routes';
import RvtRouter from '../root/rvt-router';
import RvtRoot from '../root/rvt-root';

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

	onLoginButtonClick() {
		global.grantConsent();
		RvtRoot.shared.openRegisterPanel();
	}

	render() {
		let identity = global.currentIdentity;
		let isDeveloper = identity?.groups.some(group => group.group.isDeveloper);

		if (identity?.isRegistered && isDeveloper) {
			return html`
				<div class="max-w-contentwidth w-full mx-auto">
					<user-banner></user-banner>
					<div class="">
						<rvt-user-games></rvt-user-games>
					</div>
				</div>
			`;
		}

		return html`<rvt-user-consent class="self-center" @login="${this.onLoginButtonClick}" />`;
	}
}
