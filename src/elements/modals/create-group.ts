import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './create-group.scss';
import utils from '../../utils/utils';
import global from '../../utils/global';

import { classMap } from 'lit/directives/class-map.js';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import timing, { Debounce } from '../../utils/timing';

export class GroupCreateEvent extends Event {
	constructor(public groupId: string) {
		super('create');
	}
}

@customElement('modal-create-group')
export default class CreateGroupModal extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active = false;

	@property({ type: String })
	groupDisplayNameValue: string = null;

	@property({ type: Boolean })
	isCreatingGroup = false;

	@property({ type: String })
	groupValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GROUP);

	@property({ type: Boolean })
	groupIsValid = false;

	@property({ type: Object })
	loadError?: any;

	@query('#display-name-input')
	displayNameInput: HTMLInputElement;

	// === DEBOUNCE INFO ===
	validateGroupDebounce: Debounce<() => ReturnType<typeof global.deprecatedApi.cloud.validateGroup>>;

	constructor() {
		super();

		this.validateGroupDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.groupDisplayNameValue;

				return await global.deprecatedApi.cloud.validateGroup({
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.groupValidationErrors.load(res.errors.map(err => err.path));
				this.groupIsValid = this.groupValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('groupValidationErrors');
			}
		});

		this.validateGroupDebounce.onError(async err => {
			this.loadError = err;
			this.groupIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	async createGroup() {
		if (!this.groupIsValid) return;

		try {
			let displayName = this.groupDisplayNameValue ?? '';

			let groupRes = await global.deprecatedApi.group.createGroup({
				displayName
			});

			this.dispatchEvent(new GroupCreateEvent(groupRes.groupId));

			this.groupModalClose();
		} catch (err) {
			this.loadError = err;
			this.isCreatingGroup = false;
		}
	}

	groupModalClose() {
		this.dispatchEvent(new Event('close'));
	}

	groupDisplayNameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.groupDisplayNameValue = target.value;
		this.validateGroupDebounce.trigger();
	}

	render() {
		let errors = this.groupValidationErrors.findFormatted();

		let previewClasses = classMap({
			active: errors.length > 0
		});

		return html` <drop-down-modal
			id="create-group-modal"
			?active=${this.active}
			@close=${this.groupModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your group</h1>
				<div id="preview" class=${previewClasses}>
					<div id="profile-icon">
						${utils.getGroupInitials(this.groupDisplayNameValue || 'Group Name')}
					</div>
					<h3>${this.groupDisplayNameValue || 'Group Name'}</h3>
				</div>
				<div class="input-group">
					<h2>Group Name</h2>
					<text-input
						light
						placeholder="Enter a group name..."
						@input=${this.groupDisplayNameInput.bind(this)}
					></text-input>
					${errors.length > 0
						? html`
							<span id="create-group-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${errors[0]}</li>
							</span>`
						: null}
				</div>
				<rvt-button
					class="mt-4"
					@click=${this.createGroup.bind(this)}
					?disabled=${!this.groupIsValid}
					?loading=${this.isCreatingGroup}
					>Create</rvt-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
