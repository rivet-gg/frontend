import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import routes, { responses } from '../../../../routes';
import { cssify } from '../../../../utils/css';
import styles from './group-invite.scss';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import * as api from '../../../../utils/api';

import global from '../../../../utils/global';
import UIRouter from '../../../root/ui-router';
import timing, { Debounce } from '../../../../utils/timing';

@customElement('page-group-invite')
export default class GroupInvitePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	code = '';

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	codeError = '';

	@property({ type: Boolean })
	group: api.group.GroupHandle = null;

	@property({ type: Boolean })
	isConsuming = false;

	// === DEBOUNCE INFO ===
	fetchDebounce: Debounce<() => Promise<api.group.GetGroupInviteCommandOutput>>;

	constructor() {
		super();

		this.fetchDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.live.group.getGroupInvite({ groupInviteCode: this.code });
			},
			completeCb: res => {
				this.group = res.group;
			}
		});

		this.fetchDebounce.onError((err: any) => {
			if (err.code.startsWith('GROUP')) {
				this.codeError = err.message;
			} else {
				this.loadError = err;
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.code) this.fetchDebounce.trigger();
		else this.code = '';
	}

	async consumeGroupInvite() {
		try {
			this.codeError = '';
			this.isConsuming = true;
			let res = await global.live.group.consumeGroupInvite({ groupInviteCode: this.code });

			UIRouter.shared.navigate(routes.groupOverview.build({ id: res.groupId }));
		} catch (err) {
			if (err.code.startsWith('GROUP')) {
				if (err.code == 'GROUP_ALREADY_MEMBER') {
					UIRouter.shared.navigate(routes.groupOverview.build({ id: err.metadata.group_id }), {
						replaceHistory: true
					});
				} else this.codeError = err.message;
			} else {
				this.loadError = err;
			}
		}

		this.isConsuming = false;
	}

	codeChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.code = target.value.trim();
		if (this.code.trim().length != 8) {
			this.codeError = 'Invalid code';
		} else {
			this.codeError = null;
			this.group = null;
			this.fetchDebounce.trigger();
		}
	}

	codeKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.codeError == null && event.key == 'Enter') this.consumeGroupInvite();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<div id="center" class=${classMap({ hidden: this.isConsuming })}>
					<h1>Join a Group</h1>
					<h2>Have an invite code? Paste it here and join your group.</h2>
					<div id="input-area">
						<text-input
							.value=${this.code}
							placeholder="Code"
							maxlength="8"
							@input=${this.codeChange.bind(this)}
							@keydown=${this.codeKeyPress.bind(this)}
							.filter=${(value: string) => value.replace(/[^a-z0-9]/gi, '')}
						></text-input>
						<stylized-button
							.isDisabled=${this.code.length != 8}
							.trigger=${this.consumeGroupInvite.bind(this)}
							>Join</stylized-button
						>
					</div>
					${when(this.codeError, () => html`<p id="error">${this.codeError}</p>`)}
					${when(!this.codeError && this.code, () =>
						when(
							this.group,
							() => html`<group-handle-tile .group=${this.group}></group-handle-tile>`,
							() => html`<loading-placeholder id="group-placeholder"></loading-placeholder>`
						)
					)}
				</div>
				${when(
					this.isConsuming,
					() =>
						html`<div id="wait">
							<loading-wheel .message=${'Please wait...'}></loading-wheel>
						</div>`
				)}
			</div>
		`;
	}
}
