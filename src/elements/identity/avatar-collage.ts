import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './avatar-collage.scss';
import * as api from '../../utils/api';
import { tooltip } from '../../ui/helpers';
import { padAccountNumber } from '../../data/identity';

@customElement('avatar-collage')
export default class AvatarCollage extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	identities: api.identity.IdentityHandle[];

	@property({ type: Number })
	max = 8;

	render() {
		let identities = [...this.identities].reverse();
		let overflow = 0;

		// Max out list
		if (this.max != -1) {
			if (identities.length > this.max) overflow = identities.length - this.max;

			identities = identities.slice(0, this.max);
		}

		return html` <div id="base">
			${overflow ? html`<div id="overflow">+${overflow}</div>` : null}

			<div id="identities">
				${repeat(
					identities,
					u => u.identityId,
					u =>
						html`<div class="identity-clip">
							<identity-avatar
								id="main-avatar"
								hide-status
								.identity=${u}
								@pointerenter=${tooltip(
									`${u.displayName}#${padAccountNumber(u.accountNumber)}`
								)}
							></identity-avatar>
						</div>`
				)}
			</div>
		</div>`;
	}
}
