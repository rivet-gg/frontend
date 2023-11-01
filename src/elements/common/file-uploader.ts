import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './file-uploader.scss';
import timing from '../../utils/timing';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { bodyEventGroups } from '../../utils/global-events';
import { Rivet } from '@rivet-gg/api-internal';
import logging from '../../utils/logging';
import utils, { Deferred } from '../../utils/utils';
import { showAlert } from '../../ui/helpers';

export interface FileInput {
	path: string;
	prepared: Rivet.upload.PrepareFile;
	fileHandle: File;
}

export interface PrepareResponse {
	uploadId: string;
	files: PreparedFile[];
	ctx?: any;
}

export interface PreparedFile {
	presignedRequest: Rivet.upload.PresignedRequest;
	input: FileInput;
}

export class FileUploaderPausedEvent extends Event {
	constructor(public fileInputs: FileInput[]) {
		super('pause');
	}
}

type UploadState =
	| { type: 'preparing'; count: number }
	| { type: 'uploading'; progress: number; total: number; current: string }
	| { type: 'completing' };

@customElement('file-uploader')
export default class FileUploader extends LitElement {
	static styles = cssify(styles);

	@query('#file-upload')
	fileUpload: HTMLInputElement;

	// === CONFIG ===
	@property({ type: Boolean })
	directory = false;

	@property({ type: Boolean })
	video = false;

	@property({ type: Boolean })
	image = false;

	// Only adds a filter to the file explorer when opened, does not prevent any file types (see `allowed`)
	@property({ type: String })
	accept: string = null;

	// Only allows file names that pass this regex
	@property({ type: Object })
	allowed: RegExp = null;

	@property({ type: Number, attribute: 'max-size' })
	maxFileSize: number = null;

	// === HANDLERS ===
	@property({ type: Function })
	prepareUpload: (files: FileInput[]) => Promise<PrepareResponse>;

	@property({ type: Function })
	completeUpload: (ctx: any) => Promise<void>;

	@property({ type: Function })
	failedUpload: (err: Error) => Promise<void>;

	@property({ type: Object })
	uploadState: UploadState = null;

	@property({ type: Object })
	uploadError: Error | string = null;

	@property({ type: Boolean })
	dragActive = false;

	// === EVENT HANDLERS ===
	handleDragOver: (e: DragEvent) => void;
	handleDragLeave: (e: Event) => void;
	handleDragEnd: (e: Event) => void;

	timeout: number;

	// === PAUSE INFO ===
	@property({ type: Boolean, attribute: 'pause' })
	doesPause = false;
	isPaused = false;
	_resumeDeferred: Deferred<boolean> = new Deferred();

	// === LIFECYCLE ===
	connectedCallback() {
		super.connectedCallback();

		// Handle drag over
		this.handleDragOver = this.onDragOver.bind(this);
		bodyEventGroups.add('dragover', this.handleDragOver, timing.milliseconds(100));

		// Handle drag leave
		this.handleDragLeave = this.onDragLeave.bind(this);
		bodyEventGroups.add('dragleave', this.handleDragLeave, timing.milliseconds(100));

		// Handle drag end
		this.handleDragEnd = this.onDragLeave.bind(this);
		bodyEventGroups.add('dragend', this.handleDragEnd, timing.milliseconds(100));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		bodyEventGroups.remove('dragover', this.handleDragOver, timing.milliseconds(100));
		bodyEventGroups.remove('dragleave', this.handleDragLeave, timing.milliseconds(100));
		bodyEventGroups.remove('dragend', this.handleDragEnd, timing.milliseconds(100));
	}

	onDragOver(event: DragEvent) {
		// NOTE: You can't detect if the dragged item is a directory or a file because you have no data on
		// what is being dragged

		if (!this.dragActive) this.dragActive = true;
	}

	onDragLeave(e: Event) {
		this.cancelDrag();
	}

	cancelDrag() {
		window.clearTimeout(this.timeout);

		this.timeout = window.setTimeout(() => {
			if (this.dragActive) this.dragActive = false;
		}, timing.milliseconds(100));
	}

	async onChange(event: InputEvent | DragEvent) {
		this.cancelDrag();
		this.uploadError = null;

		// Stop file from opening in a new window
		if (event instanceof DragEvent) {
			// NOTE: You can't detect if the dragged item is a directory or a file because you have no data on
			// what is being dragged. Some files might have no extention and be mistaken as a directory

			event.preventDefault();
		}

		// Prepare the files
		let fileInputs: FileInput[] = [];
		for (let file of this.fileUpload.files) {
			let path = (file as any).webkitRelativePath || (file as any).relativePath || file.name || '';
			fileInputs.push(
				Object.freeze({
					path,
					prepared: {
						path,
						contentType: file.type,
						byteOffset: 0,
						contentLength: file.size
					},
					fileHandle: file
				})
			);
		}

		if (event instanceof DragEvent) {
			for (let file of event.dataTransfer.files) {
				let path = (file as any).webkitRelativePath || (file as any).relativePath || file.name || '';
				fileInputs.push(
					Object.freeze({
						path,
						prepared: {
							path,
							contentType: file.type,
							byteOffset: 0,
							contentLength: file.size
						},
						fileHandle: file
					})
				);
			}
		}

		if (!fileInputs.length) return;

		if (this.isPaused) {
			// Cancel any previous paused uploads
			this.resume(false);

			await this._resumeDeferred.promise;
			this.isPaused = false;
		}

		// Verify that file types pass the allowed regex
		if (this.allowed && fileInputs.some(file => !this.allowed.test(file.path))) {
			showAlert('Unable to Upload', html`<p>Upload has invalid file type(s)</p>`);
			return;
		}

		// Verify that total upload size is below max
		if (this.maxFileSize != null) {
			let sumSize = fileInputs.reduce((s, a) => s + a.fileHandle.size, 0);

			if (sumSize > this.maxFileSize) {
				showAlert(
					'Unable to Upload',
					html`<p>
						Upload exceeds maximum size (<b>${utils.formatContentLength(this.maxFileSize)}</b>)
					</p>`
				);
				return;
			}
		}

		// If pause is enabled, stop the upload until resume is called
		if (this.doesPause) {
			this.dispatchEvent(new FileUploaderPausedEvent(fileInputs));

			logging.event('Upload paused');

			this.isPaused = true;
			let continueUpload = await this._resumeDeferred.promise;
			this.isPaused = false;

			// Cancel upload
			if (!continueUpload) {
				logging.event('Upload cancelled');
				this.fileUpload.value = null;
				return;
			} else logging.event('Upload resumed');
		}

		// Upload files to temporary destination
		try {
			// Prepare the uploads
			this.uploadState = { type: 'preparing', count: fileInputs.length };
			let prepareRes = await this.prepareUpload(fileInputs);

			// Upload the files
			// TODO: Do this in parallel
			// TODO: Show progress bar for bytes sent (needs to be debounced)
			let progress = 0;
			for (let file of prepareRes.files) {
				// Update state
				progress += 1;
				this.uploadState = {
					type: 'uploading',
					progress,
					total: prepareRes.files.length,
					current: file.input.path
				};

				// Get the associated file
				if (!file) {
					logging.warn('no matching file for presigned request', file.input.path);
					continue;
				}

				// Upload the file
				logging.event('uploading', file.input.path, file.presignedRequest.url);
				let response = await fetch(file.presignedRequest.url, {
					method: 'PUT',
					body: file.input.fileHandle,
					mode: 'cors',
					headers: {
						// 	'Content-Length': file.input.prepared.contentLength.toString(),
						'Content-Type': file.input.prepared.contentType
					}
				});
				// TODO: Check for non-200 status
				logging.event('complete', file.input.path);
			}

			this.uploadState = { type: 'completing' };
			await this.completeUpload(prepareRes);
		} catch (err) {
			logging.error('failed to upload', err);

			if (err.code == 'UPLOAD_NSFW_CONTENT_DETECTED') {
				this.uploadError = 'Prohibited content cannot be uploaded';
			} else {
				this.uploadError = err;
			}

			if (this.failedUpload) this.failedUpload(err);
		} finally {
			this.fileUpload.files = null;
			this.uploadState = null;
		}
	}

	// Used for third party elements
	activate() {
		this.fileUpload.click();
	}

	resume(continueUpload = true) {
		// Reset only after resolution, keeps in sync with other promise handlers
		this._resumeDeferred.promise.then(() => this._resumeDeferred.reset());

		this._resumeDeferred.resolve(continueUpload);
	}

	render() {
		// Check if uploading a file
		let uploading = this.uploadState !== null;

		let classes = classMap({
			'drag-active': this.dragActive,
			uploading: uploading
		});

		// Get upload progress
		let progress = this.uploadState
			? this.uploadState.type == 'uploading'
				? this.uploadState.progress / this.uploadState.total
				: this.uploadState.type == 'completing'
				? 1
				: 0
			: 0;

		// Separate file type from current upload
		let currentUpload = null;
		if (this.uploadState && this.uploadState.type == 'uploading') {
			let fileType = this.uploadState.current.match(/\.\w+$/);

			if (fileType) {
				currentUpload = [this.uploadState.current.slice(0, fileType.index), fileType[0]];
			} else currentUpload = [this.uploadState.current, null];
		}

		let loadingBarStyles = styleMap({
			width: `${100 * progress}%`
		});

		let accept = this.video
			? 'video/mp4,video/x-m4v,video/*'
			: this.image
			? 'image/*'
			: this.accept ?? null;

		return html`
			<div id="base" @drop=${this.onChange.bind(this)} @dragover=${(e: Event) => e.preventDefault()}>
				<label id="base-label" class=${classes} for=${uploading ? null : 'file-upload'}>
					<div id="content">
						<slot name="icon"></slot>
						<slot name="content"></slot>
						${when(
							this.uploadError,
							() =>
								html`<h3 id="error">
									${when(
										typeof this.uploadError == 'string',
										() => this.uploadError,
										() => html`Error while uploading. Please try again.</h3>`
									)}
								</h3>`
						)}
					</div>

					${uploading
						? html` <div id="upload">
								<div id="upload-background" style=${loadingBarStyles}></div>
								<div id="upload-content">
									${this.uploadState.type == 'preparing'
										? html` <h1>
													Preparing ${this.uploadState.count}
													file${this.uploadState.count == 1 ? '' : 's'}...
												</h1>
												<div id="progress-area">
													<loading-bar .progress=${0}></loading-bar>
												</div>`
										: null}
									${this.uploadState.type == 'uploading'
										? html`
											<h1>Uploading...</h1>
											<h2><span id='upload-name'>${currentUpload[0].repeat(2)}</span id='upload-type'><span>${
												currentUpload[1]
											}</span></h2>
											<div id='progress-area'>
												<loading-bar .progress=${progress}></loading-bar>
												<h3>${this.uploadState.progress}/${this.uploadState.total}</h3>
											</div>`
										: null}
									${this.uploadState.type == 'completing'
										? html` <h1>Completing upload...</h1>
												<div id="progress-area">
													<loading-bar .progress=${1}></loading-bar>
												</div>`
										: null}
								</div>
						  </div>`
						: null}
					${this.dragActive && !uploading
						? html` <div id="overlay">Drag and drop files here</div>`
						: null}
				</label>
				<input
					id="file-upload"
					type="file"
					.accept=${accept}
					?webkitdirectory=${this.directory}
					?directory=${this.directory}
					@change=${this.onChange.bind(this)}
				/>
			</div>
		`;
	}
}
