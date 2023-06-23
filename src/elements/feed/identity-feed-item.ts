import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './identity-feed-item.scss';
import routes from '../../routes';
import { showIdentityContextMenu } from '../../ui/helpers';
import { identityRouteData } from '../../data/identity';
import * as api from '../../utils/api';
import utils from '../../utils/utils';

@customElement('identity-feed-item')
export default class IdentityFeedItem extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	render() {
		return html`
			<div id="base" @contextmenu=${showIdentityContextMenu(this.identity)}>
				<a class="identity" href=${routes.identity.build(identityRouteData(this.identity))}>
					<identity-avatar class="icon" .identity=${this.identity} hide-status></identity-avatar>
					<div class="name">
						<identity-name .identity=${this.identity} no-link .identity-name></identity-name>
						<!-- <span>with 3 others</span> -->
					</div>
				</a>
				<div class="activity">
					${utils.formatActivity(this.identity.presence, this.identity.party)}
				</div>
			</div>
		`;
	}
}
