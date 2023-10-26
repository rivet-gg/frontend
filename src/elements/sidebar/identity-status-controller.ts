import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import styles from './identity-status-controller.scss';
import {
	showActionSheet,
	showIdentityContextMenu,
	tooltip
} from '../../ui/helpers';
import global from '../../utils/global';
import routes from '../../routes';
import { padAccountNumber } from '../../data/identity';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import TextInput from '../dev/text-input';
import timing from '../../utils/timing';
import assets from '../../data/assets';

@customElement('identity-status-controller')
export default class IdentityStatusController extends LitElement {
	static styles = cssify(styles);

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
		this.requestUpdate();
	}

	promptStatus(event: PointerEvent) {
		// Get the status selection
		showActionSheet(event.target as HTMLElement, [
			{
				type: 'action',
				label: 'Online',
				icon: 'solid/circle',
				color: 'status-online',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'online' });
				}
			},
			{
				type: 'action',
				label: 'Away',
				icon: 'solid/circle-dot',
				color: 'status-away',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'away' });
				}
			},
			{
				type: 'action',
				label: 'Offline',
				icon: 'regular/circle-dashed',
				color: 'status-offline',
				async cb() {
					await global.live.identity.updateIdentityStatus({ status: 'offline' });
				}
			}
		]);
	}

	render() {
		let identity = global.currentIdentity;

		return html`
			<div id="base">
				<div id="identity-base" @contextmenu=${showIdentityContextMenu(identity)}>
					<div id="content">
						<!-- Avatar -->
						<identity-avatar
							.identity=${identity}
							@click=${this.promptStatus.bind(this)}
							@mouseenter=${tooltip('Change Status')}
						></identity-avatar>

						<!-- Name -->
						<div id="name">
							<identity-name .identity=${identity} no-link></identity-name>
						</div>
					</div>

					<!-- Actions -->
					<div id="actions">
						<icon-button
							src="regular/gear"
							small
							color="#ececec80"
							href=${routes.settings.build({})}
							@mouseenter=${tooltip('Settings')}
						></icon-button>
					</div>
				</div>
			</div>
		`;
	}
}
