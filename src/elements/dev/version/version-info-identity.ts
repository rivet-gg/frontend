import { html, LitElement } from 'lit';
import { cssify } from '../../../utils/css';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as cloud from '@rivet-gg/cloud';
import styles from './version-info-identity.scss';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { ToggleSwitchEvent } from '../../common/toggle-switch';
import fileSize from '../../../utils/files';
import global from '../../../utils/global';
import { MultiSelectEvent, UploadEntry } from '../../common/file-upload-list';
import { FileInput, PrepareResponse } from '../../common/file-uploader';
import logging from '../../../utils/logging';

const MAX_CUSTOM_DISPLAY_NAME_LENGTH = 11;
const MAX_CUSTOM_AVATARS = 10;
const MAX_CUSTOM_DISPLAY_NAMES = 10;

@customElement('version-info-identity')
export default class VersionInfoIdentity extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.CloudVersionConfig;

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@queryAll('.arg-input > display-name-input')
	customDisplayNameInputs: HTMLElement[];

	// Propagate event
	toggle(e: ToggleSwitchEvent) {
		this.dispatchEvent(new ToggleSwitchEvent(e.value));
	}

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new Event('update'));
	}

	async loadEntries() {
		return (await global.cloud.listGameCustomAvatars({ gameId: this.game.gameId })).customAvatars
			.filter(b => b.complete)
			.map(
				s =>
					({
						entryId: s.uploadId,
						uploadId: s.uploadId,
						displayName: s.displayName,
						createTs: s.createTs,
						contentLength: s.contentLength,
						thumbnailUrl: s.url,
						templateCb: entry => {
							// Quirky fake identity
							let identity = { avatarUrl: entry.thumbnailUrl };
							let containerStyles = styleMap({
								display: 'flex',
								'flex-direction': 'row',
								'justify-content': 'center'
							});
							let avatarStyles = styleMap({
								width: '120px',
								height: '120px',
								margin: '15px 0 5px 0'
							});

							return html`<div style=${containerStyles}>
								<identity-avatar
									style=${avatarStyles}
									.identity=${identity}
								></identity-avatar>
							</div>`;
						}
					}) as UploadEntry
			);
	}

	async prepareUpload(files: FileInput[]): Promise<PrepareResponse> {
		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// Prepare the upload
		let createRes = await global.cloud.prepareCustomAvatarUpload({
			gameId: this.game.gameId,
			path: imageFile.prepared.path,
			mime: imageFile.prepared.contentType,
			contentLength: imageFile.prepared.contentLength
		});

		return {
			uploadId: createRes.uploadId,
			files: [
				{
					presignedRequest: createRes.presignedRequest,
					input: imageFile
				}
			],
			ctx: { entryId: createRes.uploadId }
		};
	}

	async completeUpload(prepareRes: PrepareResponse) {
		await global.cloud.completeCustomAvatarUpload({
			gameId: this.game.gameId,
			uploadId: prepareRes.uploadId
		});
	}

	onSelect(event: MultiSelectEvent) {
		this.updateSelected(event.entryIds);
	}

	updateSelected(uploadIds: string[]) {
		this.config.identity.customAvatars = uploadIds.map(uploadId => ({
			uploadId
		}));
		this.updateConfig();
	}

	updateDisplayName(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.config.identity.customDisplayNames[idx].displayName = target.value;

		this.updateConfig();
	}

	removeDisplayName(idx: number) {
		this.config.identity.customDisplayNames.splice(idx, 1);
		this.updateConfig();
	}

	createDisplayName() {
		this.config.identity.customDisplayNames.push({
			displayName: 'Guest'
		});
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.customDisplayNameInputs[this.customDisplayNameInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	render() {
		return html`<service-card
			.domain=${'social'}
			?editing=${this.editing}
			?active=${!!this.config.identity}
			?error=${!this.errors.isEmpty()}
			@toggle=${this.toggle.bind(this)}
		>
			<e-svg slot="icon" preserve non-icon src="/products2/identity-duotone"></e-svg>
			<h2 slot="title">Identity</h2>
			<div slot="content">${this.renderErrors()}${this.config.identity ? this.renderBody() : null}</div>
		</service-card>`;
	}

	renderBody() {
		let customDisplayNameErrors = this.errors.findFormatted('custom-display-names-meta');

		return html`<file-upload-list
				max-size=${fileSize.megabytes(2)}
				label=${`Custom Avatars (${this.config.identity.customAvatars.length}/${MAX_CUSTOM_AVATARS})`}
				multi
				max-selected=${MAX_CUSTOM_AVATARS}
				?selectable=${this.editing}
				?uploadable=${this.editing}
				.loadEntries=${this.loadEntries.bind(this)}
				.prepareUpload=${this.prepareUpload.bind(this)}
				.completeUpload=${this.completeUpload.bind(this)}
				.selectedEntryIds=${this.config.identity.customAvatars.map(a => a.uploadId)}
				@multi-select=${this.onSelect.bind(this)}
			>
			</file-upload-list>
			<h4>Custom display names</h4>
			${customDisplayNameErrors.length
				? html`<error-list .errors=${customDisplayNameErrors}></error-list>`
				: null}
			<div id="custom-display-names" class="list">
				${this.config.identity.customDisplayNames.length
					? html`<div>
							${this.config.identity.customDisplayNames.map(
								this.renderCustomDisplayNames.bind(this)
							)}
					  </div>`
					: this.editing
					? null
					: html`<p class="muted">No custom display names</p>`}
				${this.editing && this.config.identity.customDisplayNames.length < MAX_CUSTOM_DISPLAY_NAMES
					? html`<dashed-button icon="solid/plus" .trigger=${this.createDisplayName.bind(this)}
							>Add custom display name</dashed-button
					  >`
					: null}
			</div>`;
	}

	renderCustomDisplayNames(displayName: cloud.CustomDisplayName, i: number) {
		if (this.editing) {
			let customDisplayNameErrors = this.errors.findFormatted('custom-display-names', i);

			return html`${customDisplayNameErrors.length
					? html`<error-list .errors=${customDisplayNameErrors}></error-list>`
					: null}
				<div class="item display-name-input">
					<text-input
						.init=${displayName.displayName}
						placeholder="Display name"
						maxlength=${MAX_CUSTOM_DISPLAY_NAME_LENGTH}
						@input=${this.updateDisplayName.bind(this, i)}
					></text-input>
					<icon-button
						src="solid/xmark"
						small
						.trigger=${this.removeDisplayName.bind(this, i)}
					></icon-button>
				</div>`;
		} else {
			return html`<p class="immut-info">${displayName.displayName}</p>`;
		}
	}

	renderErrors() {
		let errors = this.errors.findShallowFormatted();

		return errors.length ? html`<error-list .errors=${errors}></error-list>` : null;
	}
}
