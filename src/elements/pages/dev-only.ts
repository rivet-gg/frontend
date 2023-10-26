import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-only.scss';

import global from '../../utils/global';
import routes, { responses } from '../../routes';
import UIRouter from '../root/ui-router';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import { isDeveloper } from '../../utils/identity';

@customElement('page-dev-only')
export default class PageDevOnly extends LitElement {
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
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<invalid-page-state>
				<h1 slot="title">Private Beta</h1>
				<h2 slot="subtitle">
					Rivet is still in private beta. Join the waitlist to get early access.
				</h2>
				<div slot="actions">
					<stylized-button href="https://b8v8449klvp.typeform.com/rivet" target="_blank">
						Beta Access Form
					</stylized-button>
				</div>
			</invalid-page-state>
		`;
	}
}
