import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import routes from '../../routes';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';
import RvtRouter from '../root/rvt-router';

@customElement('page-access-token')
export default class AccessTokenLink extends LitElement {
	// static styles = cssify(styles);

	@property({ type: String })
	token: string;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData() {
		try {
			await global.api.auth.identity.accessToken.completeAccessTokenVerification({
				accessToken: this.token
			});
		} catch (err) {
			logging.error('Request Error', err);
			globalEventGroups.dispatch('error', err);
		}

		// Navigate to home
		RvtRouter.shared.navigate(routes.home.build({}), { replaceHistory: true });
	}

	render(): TemplateResult {
		return null;
	}
}
