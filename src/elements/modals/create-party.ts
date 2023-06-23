import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './create-party.scss';
import routes from '../../routes';
import global from '../../utils/global';

import UIRouter from '../root/ui-router';

@customElement('modal-create-party')
export default class CreatePartyModal extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active = false;

	@property({ type: String })
	partyDisplayNameValue: string = null;

	@property({ type: Boolean })
	isCreatingParty = false;

	@property({ type: Boolean })
	partyIsValid = true;

	@property({ type: Object })
	loadError?: any;

	@query('#display-name-input')
	displayNameInput: HTMLInputElement;

	async createParty() {
		if (!this.partyIsValid) return;

		try {
			let displayName = this.partyDisplayNameValue ?? '';

			// TODO:
			let partyRes = await global.live.party.createParty({
				partySize: 4
			});

			UIRouter.shared.navigate(
				routes.party.build({
					id: partyRes.partyId
				})
			);

			this.partyModalClose();
		} catch (err) {
			this.loadError = err;
			this.isCreatingParty = false;
		}
	}

	partyModalClose() {
		this.dispatchEvent(new Event('close'));
	}

	partyDisplayNameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.partyDisplayNameValue = target.value;
	}

	render() {
		return html` <drop-down-modal
			id="create-party-modal"
			?active=${this.active}
			@close=${this.partyModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your party</h1>
				<div class="input-party">
					<!-- TODO -->
				</div>
				<stylized-button
					.trigger=${this.createParty.bind(this)}
					?disabled=${!this.partyIsValid}
					?loading=${this.isCreatingParty}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
