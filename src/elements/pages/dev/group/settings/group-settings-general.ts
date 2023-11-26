import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { cssify } from '../../../../../utils/css';
import group from '@rivet-gg/group';
import global from '../../../../../utils/global';
import { responses } from '../../../../../routes';
import fileSize from '../../../../../utils/files';
import FileUploader, {
	FileInput,
	FileUploaderPausedEvent,
	PrepareResponse
} from '../../../../common/file-uploader';
import logging from '../../../../../utils/logging';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../../utils/traversable-errors';
import TextInput, { InputUpdateEvent } from '../../../../dev/text-input';
import { ColorExtractor } from '../../../../../utils/colors';
import timing, { Debounce } from '../../../../../utils/timing';
import assets from '../../../../../data/assets';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { tooltip } from '../../../../../ui/helpers';
import utils from '../../../../../utils/utils';

const MAX_GROUPNAME_LENGTH = 24;
const MAX_BIO_LENGTH = 200;

@customElement('page-group-settings-general')
export default class GroupSettingsGeneral extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	group: group.GroupProfile;

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	displayNameValue: string = null;
	@property({ type: String })
	bioValue = '';
	@property({ type: String })
	avatarUrlValue: string = null;

	// Used in preview display
	validDisplayNameValue: string = null;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GROUP_PROFILE);

	@property({ type: Boolean })
	groupIsValid = false;

	@property({ type: Boolean })
	hasChanges = false;

	@property({ type: Boolean })
	hasAvatarChanges = false;

	@property({ type: Boolean })
	isUploading = false;

	@property({ type: Boolean })
	isUpdating = false;

	// Profile picture file uploader element
	@query('file-uploader')
	pfpFileUploader: FileUploader;

	@queryAll('text-input')
	textInputs: TextInput[];

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === EVENT HANDLERS ===
	initiated = false;

	// === DEBOUNCE INFO ===
	validateProfileDebounce: Debounce<() => ReturnType<typeof global.live.group.validateGroupProfile>>;

	constructor() {
		super();

		this.validateProfileDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName =
					this.displayNameValue == this.group.displayName ? null : this.displayNameValue;
				let bio = this.bioValue == this.group.bio ? null : this.bioValue;

				this.hasChanges = true;

				// Don't send validation request if no new values are given
				if (this.noChanges(displayName, bio)) {
					// FIXME
					this.groupIsValid = true;
					this.hasChanges = true;
					this.validationErrors.load([]);

					this.validDisplayNameValue = this.group.displayName;

					// Refresh UI
					this.requestUpdate('validationErrors');
					return null;
				}

				return await global.live.group.validateGroupProfile({
					displayName,
					bio
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.groupIsValid = this.validationErrors.isEmpty();
				this.loadError = null;

				// Update valid values for preview
				if (!this.validationErrors.find('display-name').length) {
					this.validDisplayNameValue = this.displayNameValue;
				}

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateProfileDebounce.onError(async err => {
			this.loadError = err;
			this.groupIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Initialize
		if (changedProperties.has('profile') && this.group && this.displayNameValue === null) {
			this.displayNameValue = this.group.displayName;
			this.validDisplayNameValue = this.displayNameValue;
			this.bioValue = this.group.bio;
			this.avatarUrlValue = this.group.avatarUrl;

			this.fetchColor();
		}
	}

	fetchColor() {
		this.colorExtractor.update(this.avatarUrlValue);
		this.colorExtractor.getPalette().then(() => this.requestUpdate('colorExtractor'));
	}

	displayNameInput(event: InputUpdateEvent) {
		this.displayNameValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	bioInput(event: InputUpdateEvent) {
		this.bioValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let displayNameErrors = this.validationErrors.findFormatted('display-name');
		let bioErrors = this.validationErrors.findFormatted('bio');

		let uploadOverlayStyles = classMap({
			active: this.isUploading
		});

		let bgUrl = assets.asset('/profile-bg/02. Egg Sour.png');
		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			color: this.colorExtractor.createTextColor()
		});

		return html`
			<h1 class="text-2xl pb-2">Basic Info</h1>

			<div class="flex flex-col space-y-2 pb-4">
				<h4>Name: <strong>${this.group.displayName}</strong></h4>
				<h4>Members: <strong>${this.group.memberCount}</strong></h4>
			</div>

			<h1 class="text-2xl py-2">Edit Group Info</h1>
			<div>
				<div class="flex flex-row space-x-4 pb-4">
					<stylized-button
							id="cancel"
							.trigger=${this.reset.bind(this)}
							color="gray"
							?disabled=${!(this.hasChanges || this.hasAvatarChanges)}
							>Cancel</stylized-button
						>
					<stylized-button
						id="confirm"
						?disabled=${this.hasChanges ? !this.groupIsValid : !this.hasAvatarChanges}
						.trigger=${this.confirmChanges.bind(this)}
						>Save</stylized-button
					>
				</div>

				<!-- Profile info and actions -->
				<div id="group-banner">
					<!-- <div id="banner-bg" slot="banner-bg" style=${bgStyles}>
						${when(!this.avatarUrlValue, () => html`<lazy-img src=${bgUrl}></lazy-img>`)}
					</div> -->
					<!-- <div id="avatar-holder" class="flex flex-row space-x-4 p-4 pt-2"> -->
						<!-- ${
							this.group
								? html`<group-avatar
										class="block w-16 h-16 hover:cursor-pointer"
										shadow
										@mouseenter=${tooltip('Change profile image')}
										@click=${this.changeProfileImage.bind(this)}
										.group=${this.group}
										.placeholderOverride=${this.validDisplayNameValue}
										.imagePlaceholder=${this.avatarUrlValue}
								  ></group-avatar>`
								: null
						} -->

						<!-- Change profile image button -->
						<!-- <e-svg
							class="w-5 h-5"
							id="change-pfp"
							src="solid/image"
							@mouseenter=${tooltip('Change profile image')}
							@click=${this.changeProfileImage.bind(this)}
						></e-svg> -->
					</div>
<!-- 
					<div id="main-display-name" style=${nameStyles}>
						${this.group ? this.validDisplayNameValue : null}
					</div> -->

					<div id="uploader-overlay" class="w-full pb-8">
						<h1 class="text-lg pb-2">Upload Group Image</h1>
						<file-uploader
							pause
							max-size=${fileSize.megabytes(2)}
							@pause=${this.uploadPaused.bind(this)}
							.accept=${'image/png, image/jpeg'}
							.allowed=${/\.(pn|jpe?)g$/i}
							.prepareUpload=${this.prepareUpload.bind(this)}
							.completeUpload=${this.completeUpload.bind(this)}
							.failedUpload=${this.failedUpload.bind(this)}
						>
							<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
							<div slot="content">
								<p class="file-input-title">Upload Group Logo</p>
								<p class="file-input-subtitle">Recommended size 512x512 px</p>
							</div>						
						</file-uploader>
					</div>
				</div>

				<h2 class="text-lg pt-4 pb-2">
					Change Group Name (<span class="lettercount"
						>${utils.countCodePoints(this.displayNameValue ?? '')}/${MAX_GROUPNAME_LENGTH}</span
					>)
				</h2>
				<text-input
					.init=${this.displayNameValue}
					placeholder="Enter your group name here..."
					.maxlength=${MAX_GROUPNAME_LENGTH}
					@input=${this.displayNameInput.bind(this)}
				></text-input>
				<div class="pb-2"></div>
				${
					displayNameErrors.length > 0
						? html`
				<span id="profile-error" class="py-4">
					<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
				</span>`
						: null
				}
			</div>
		`;
	}

	async prepareUpload(files: FileInput[]): Promise<PrepareResponse> {
		this.isUploading = true;

		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// Prepare the upload
		let createRes = await global.api.group.prepareAvatarUpload({
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
			]
		};
	}

	async completeUpload(prepareRes: PrepareResponse) {
		await global.live.group.completeGroupAvatarUpload({
			groupId: this.group.groupId,
			uploadId: prepareRes.uploadId
		});

		this.isUploading = false;
	}

	async failedUpload() {
		setTimeout(() => {
			this.isUploading = false;
		}, timing.seconds(3));
	}

	uploadPaused(event: FileUploaderPausedEvent) {
		let fileReader = new FileReader();

		// Read profile avatar upload and set it as a preview image
		fileReader.addEventListener('load', () => {
			this.avatarUrlValue = fileReader.result as string;
			this.hasAvatarChanges = true;
			this.fetchColor();
		});

		fileReader.readAsDataURL(event.fileInputs[0].fileHandle);
	}

	closeModal() {
		this.dispatchEvent(new Event('close'));
	}

	async confirmChanges() {
		try {
			// Upload profile picture
			if (this.hasAvatarChanges) {
				this.pfpFileUploader.resume();
			}

			if (this.hasChanges) {
				await global.live.group.updateGroupProfile({
					groupId: this.group.groupId,
					displayName:
						this.displayNameValue == this.group.displayName ? null : this.displayNameValue,
					bio: this.bioValue == this.group.bio ? null : this.bioValue
				});
			}

			this.isUpdating = true;
		} catch (err) {
			logging.error('Failed to update profile', err);
		}
	}

	changeBackground() {
		alert('UNIMPLEMENTED');
	}

	changeProfileImage() {
		this.pfpFileUploader.activate();
	}

	noChanges(displayName: string, bio: string) {
		return displayName == null && bio == null;
	}

	reset() {
		this.displayNameValue = this.group.displayName;
		this.bioValue = this.group.bio;
		this.avatarUrlValue = this.group.avatarUrl;

		this.validDisplayNameValue = this.displayNameValue;

		// Reset text nodes
		this.textInputs.forEach(a => a.reset());

		// Cancel file upload
		if (this.pfpFileUploader.isPaused) this.pfpFileUploader.resume(false);

		this.validationErrors.load([]);
		this.groupIsValid = false;
		this.hasChanges = false;
		this.hasAvatarChanges = false;
		this.isUploading = false;

		this.fetchColor();
	}
}
