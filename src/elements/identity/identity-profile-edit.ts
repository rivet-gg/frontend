import { LitElement, html } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './identity-profile-edit.scss';
import { tooltip } from '../../ui/helpers';
import { responses } from '../../routes';
import global from '../../utils/global';

import TextInput, { InputUpdateEvent } from '../dev/text-input';
import utils from '../../utils/utils';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import timing, { Debounce } from '../../utils/timing';
import FileUploader, { FileInput, FileUploaderPausedEvent, PrepareResponse } from '../common/file-uploader';
import logging from '../../utils/logging';
import fileSize from '../../utils/files';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';
import { ColorExtractor } from '../../utils/colors';

const MAX_USERNAME_LENGTH = 24;
const MAX_BIO_LENGTH = 200;

@customElement('identity-profile-edit')
export default class IdentityProfileEdit extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	displayNameValue: string = global.currentIdentity.displayName;
	@property({ type: Number })
	accountNumberValue: number = global.currentIdentity.accountNumber;
	@property({ type: String })
	bioValue: string = global.currentIdentity.bio;
	@property({ type: String })
	avatarUrlValue: string = global.currentIdentity.avatarUrl;

	// Used in preview display
	validDisplayNameValue: string = global.currentIdentity.displayName;
	validAccountNumberValue: number = global.currentIdentity.accountNumber;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.IDENTITY_PROFILE);

	@property({ type: Boolean })
	profileIsValid = false;

	@property({ type: Boolean })
	hasChanges = false;

	@property({ type: Boolean })
	hasAvatarChanges = false;

	@property({ type: Boolean })
	isUploading = false;

	// Profile picture file uploader element
	@query('file-uploader')
	pfpFileUploader: FileUploader;

	@queryAll('text-input')
	textInputs: TextInput[];

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === DEBOUNCE INFO ===
	validateProfileDebounce: Debounce<() => ReturnType<typeof global.live.identity.validateIdentityProfile>>;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	constructor() {
		super();

		this.fetchColor();

		this.validateProfileDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName =
					this.displayNameValue == global.currentIdentity.displayName
						? null
						: this.displayNameValue;
				let accountNumber =
					this.accountNumberValue == global.currentIdentity.accountNumber
						? null
						: this.accountNumberValue;
				let bio = this.bioValue == global.currentIdentity.bio ? null : this.bioValue;

				this.hasChanges = true;

				// Don't send validation request if no new values are given
				if (this.noChanges(displayName, accountNumber, bio)) {
					this.profileIsValid = false;
					this.hasChanges = false;
					this.validationErrors.load([]);

					// Refresh UI
					this.requestUpdate('validationErrors');
					return null;
				}

				return await global.live.identity.validateIdentityProfile({
					displayName,
					accountNumber,
					bio
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.profileIsValid = this.validationErrors.isEmpty();
				this.loadError = null;

				// Update valid values for preview
				if (!this.validationErrors.find('display-name').length) {
					this.validDisplayNameValue = this.displayNameValue;
				}
				if (!this.validationErrors.find('account-number-invalid').length) {
					this.validAccountNumberValue = this.accountNumberValue;
				}

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateProfileDebounce.onError(async err => {
			this.loadError = err;
			this.profileIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
	}

	fetchColor() {
		this.colorExtractor.update(this.avatarUrlValue);
		this.colorExtractor.getPalette().then(() => this.requestUpdate('colorExtractor'));
	}

	// Update render display when identity is updated
	onIdentityChange() {
		// Don't reset with pending changes
		if (!this.hasChanges && !this.hasAvatarChanges) this.reset();
	}

	displayNameInput(event: InputUpdateEvent) {
		this.displayNameValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	accountNumberInput(event: InputUpdateEvent) {
		this.accountNumberValue = parseInt(event.value) ?? null;

		this.validateProfileDebounce.trigger();
	}

	bioInput(event: InputUpdateEvent) {
		this.bioValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let handleErrors = [
			...this.validationErrors.findFormatted('display-name'),
			...this.validationErrors.findFormatted('account-number-invalid'),
			...this.validationErrors.findFormatted('handle-not-unique')
		];
		let bioErrors = this.validationErrors.findFormatted('bio');

		let uploadOverlayStyles = classMap({
			active: this.isUploading
		});

		let fakeIdentity = global.currentIdentity;

		// Used for preview
		if (this.hasChanges || this.hasAvatarChanges) {
			fakeIdentity = Object.assign({}, global.currentIdentity);
			fakeIdentity.displayName = this.validDisplayNameValue;
			fakeIdentity.accountNumber = this.validAccountNumberValue;
			fakeIdentity.avatarUrl = this.avatarUrlValue;
		}

		let bgStyles = styleMap({
			backgroundImage: this.colorExtractor.createBackgroundGradient()
		});
		let nameStyles = styleMap({
			'--color': this.colorExtractor.createTextColor()
		});

		return html`
			<div id="base">
				<div id="scrollbase">
					<rvt-button
						icon="solid/play"
						id="nav-back"
						small
						color="transparent"
						text="white"
						.trigger=${this.closeModal.bind(this)}
						>Back</rvt-button
					>

					<!-- Header and button -->
					<div id="header">
						<h1 id="title">Edit profile</h1>

						<div id="actions">
							${this.hasChanges || this.hasAvatarChanges
								? html`<rvt-button id="cancel" .trigger=${this.reset.bind(this)} color="gray"
										>Cancel</rvt-button
								  >`
								: null}
							<rvt-button
								id="confirm"
								?disabled=${this.hasChanges ? !this.profileIsValid : !this.hasAvatarChanges}
								.trigger=${this.confirmChanges.bind(this)}
								>Save</rvt-button
							>
						</div>
					</div>

					<!-- Profile info and actions -->
					<div id="identity-banner">
						<div id="banner-bg" style=${bgStyles}></div>

						<div id="avatar-holder">
							<identity-avatar
								id="main-avatar"
								hide-status
								.identity=${fakeIdentity}
							></identity-avatar>

							<!-- Change profile image button -->
							<icon-button
								custom
								?disabled=${this.isUploading}
								color="#ffffff"
								id="change-pfp"
								src="solid/image"
								@mouseenter=${tooltip('Change profile image')}
								.trigger=${this.changeProfileImage.bind(this)}
							></icon-button>
						</div>

						<div id="identity-actions">
							<div id="main-display-name">
								<identity-name
									.identity=${fakeIdentity}
									style=${nameStyles}
									no-link
									show-number
									inline
								></identity-name>
							</div>
						</div>

						<div id="uploader-overlay" class=${uploadOverlayStyles}>
							<file-uploader
								pause
								max-size=${fileSize.megabytes(2)}
								@pause=${this.uploadPaused.bind(this)}
								.accept=${'image/png, image/jpeg'}
								.allowed=${/\.(pn|jpe?)g$/i}
								.prepareUpload=${this.prepareUpload.bind(this)}
								.completeUpload=${this.completeUpload.bind(this)}
								.failedUpload=${this.failedUpload.bind(this)}
							></file-uploader>
						</div>
					</div>

					<div id="handle-area">
						<div id="username-area" class="input-area">
							<h2>
								Name<span class="letter-count"
									>${utils.countCodePoints(
										this.displayNameValue
									)}/${MAX_USERNAME_LENGTH}</span
								>
							</h2>
							<text-input
								.init=${this.displayNameValue}
								placeholder="Enter your username here..."
								.maxlength=${MAX_USERNAME_LENGTH}
								@input=${this.displayNameInput.bind(this)}
							></text-input>
						</div>
						<div class="input-area">
							<h2>Account number</h2>
							<text-input
								id="account-number-input"
								.init=${this.accountNumberValue.toString()}
								number
								min="1"
								max="9999"
								zero-padding="4"
								placeholder="0000"
								@input=${this.accountNumberInput.bind(this)}
							></text-input>
						</div>
					</div>
					${handleErrors.length > 0
						? html`
						<span id="profile-error">
							<e-svg src="regular/circle-exclamation"></e-svg> ${handleErrors[0]}</li>
						</span>`
						: null}

					<h2>
						Bio<span class="letter-count"
							>${utils.countCodePoints(this.bioValue)}/${MAX_BIO_LENGTH}</span
						>
					</h2>
					<text-input
						area
						id="bio-input"
						.init=${this.bioValue}
						placeholder="Enter your bio here..."
						.maxlength=${MAX_BIO_LENGTH}
						@input=${this.bioInput.bind(this)}
					></text-input>
					${bioErrors.length > 0
						? html`
						<span id="profile-error">
							<e-svg src="regular/circle-exclamation"></e-svg> ${bioErrors[0]}</li>
						</span>`
						: null}
				</div>
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
		let createRes = await global.live.identity.prepareIdentityAvatarUpload({
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
		await global.live.identity.completeIdentityAvatarUpload({ uploadId: prepareRes.uploadId });

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
				await global.live.identity.updateIdentityProfile({
					displayName:
						this.displayNameValue == global.currentIdentity.displayName
							? null
							: this.displayNameValue,
					accountNumber:
						this.accountNumberValue == global.currentIdentity.accountNumber
							? null
							: this.accountNumberValue,
					bio: this.bioValue == global.currentIdentity.bio ? null : this.bioValue
				});
			}

			this.reset();
		} catch (err) {
			logging.error('Failed to update profile', err);
			globalEventGroups.dispatch('error', err);
		}
	}

	changeProfileImage() {
		this.pfpFileUploader.activate();
	}

	noChanges(displayName: string, accountNumber: number, bio: string) {
		return displayName == null && accountNumber == null && bio == null;
	}

	reset() {
		this.displayNameValue = global.currentIdentity.displayName;
		this.accountNumberValue = global.currentIdentity.accountNumber;
		this.bioValue = global.currentIdentity.bio;
		this.avatarUrlValue = global.currentIdentity.avatarUrl;

		this.validDisplayNameValue = this.displayNameValue;
		this.validAccountNumberValue = this.accountNumberValue;

		// Reset text nodes
		this.textInputs.forEach(a => a.reset());

		// Cancel file upload
		if (this.pfpFileUploader.isPaused) this.pfpFileUploader.resume(false);

		this.validationErrors.load([]);
		this.profileIsValid = false;
		this.hasChanges = false;
		this.hasAvatarChanges = false;
		this.isUploading = false;

		this.fetchColor();
	}
}
