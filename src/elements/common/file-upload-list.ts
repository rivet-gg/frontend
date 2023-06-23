import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { responses } from '../../routes';
import logging from '../../utils/logging';
import global from '../../utils/global';
import utils from '../../utils/utils';
import styles from './file-upload-list.scss';
import { cssify } from '../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import FileUploader, { PrepareResponse } from '../common/file-uploader';

export class SelectEvent extends Event {
	constructor(public entryId: string) {
		super('select');
	}
}

export class MultiSelectEvent extends Event {
	constructor(public entryIds: string[]) {
		super('multi-select');
	}
}

export interface UploadEntry {
	entryId: string; // The generic identifier for this element; this is *not* the upload ID
	uploadId: string;
	displayName: string;
	createTs: Date;
	contentLength: number;
	thumbnailUrl?: string;
	// Renders template underneath entry content
	templateCb?: (entry: UploadEntry) => TemplateResult;
}

@customElement('file-upload-list')
export default class FileUploadList extends LitElement {
	static styles = cssify(styles);

	// === CONFIG ===
	@property({ type: Boolean })
	directory = false;

	@property({ type: String })
	label: string = null;

	@property({ type: Function })
	loadEntries: () => Promise<UploadEntry[]>;

	@property({ type: Function })
	completeUpload: (prepareRes: PrepareResponse) => Promise<void>;

	@property({ type: Function })
	prepareUpload: InstanceType<typeof FileUploader>['prepareUpload'];

	@property({ type: Boolean })
	selectable = false;

	@property({ type: Boolean })
	uploadable = false;

	@property({ type: Number, attribute: 'max-size' })
	maxFileSize: number = null;

	// Allows to select multiple items
	@property({ type: Boolean, attribute: 'multi' })
	multi: boolean = false;

	@property({ type: Number, attribute: 'max-selected' })
	maxSelected: number = 5;

	// === STATE ===
	@property({ type: String })
	selectedEntryId: string = null;

	// Used for multi select
	@property({ type: Array })
	selectedEntryIds: string[] = [];

	@property({ type: Array })
	entries: UploadEntry[] = null;

	@property({ type: Object })
	loadError?: any;

	firstUpdated() {
		this.fetchData();
	}

	resetData() {
		this.entries = null;
	}

	async fetchData() {
		try {
			this.entries = await this.loadEntries();
		} catch (err) {
			logging.error('failed to load file entries', err);
			this.loadError = err;
		}
	}

	async _completeUpload(prepareRes: PrepareResponse) {
		if (this.completeUpload) {
			await this.completeUpload(prepareRes);
		} else {
			// Complete cloud upload
			await global.cloud.completeUpload({ uploadId: prepareRes.uploadId });
		}

		// Update upload list
		this.updateSelected(prepareRes.ctx.entryId);
		this.resetData();
		await this.fetchData();
	}

	updateSelected(entryId: string | null) {
		if (this.multi) {
			let event = new MultiSelectEvent(this.selectedEntryIds);
			this.dispatchEvent(event);
		} else {
			this.selectedEntryId = entryId;

			let event = new SelectEvent(entryId);
			this.dispatchEvent(event);
		}
	}

	entryRadioChange(entryId: string) {
		if (this.multi) {
			let idx = this.selectedEntryIds.indexOf(entryId);

			if (idx != -1) this.selectedEntryIds.splice(idx, 1);
			else this.selectedEntryIds.push(entryId);

			this.updateSelected(entryId);
		} else {
			this.updateSelected(this.selectedEntryId == entryId ? null : entryId);
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.entries == null) return html`<loading-wheel></loading-wheel>`;

		let classes = classMap({
			selectable: this.selectable
		});
		let maxSelected = this.selectedEntryIds.length >= this.maxSelected;

		return html`
			<div id="base" class=${classes}>
				${this.uploadable
					? html` <file-uploader
							?directory=${this.directory}
							max-size=${this.maxFileSize}
							.prepareUpload=${this.prepareUpload}
							.completeUpload=${this._completeUpload.bind(this)}
					  >
							<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
							<div slot="content">
								<h1 id="input-title">Import ${this.directory ? 'folder' : 'file'}</h1>
							</div>
					  </file-uploader>`
					: null}
				${this.entries.length
					? html`${this.label ? html`<h2>${this.label}</h2>` : null}
							<div id="entries" class=${classMap({ 'no-header': !this.label })}>
								${repeat(
									this.entries,
									e => e.entryId,
									entry => {
										let selected = this.multi
											? this.selectedEntryIds.includes(entry.entryId)
											: this.selectedEntryId == entry.entryId;
										let disabled = maxSelected && !selected;

										if (!selected && !this.selectable && !this.uploadable) return null;

										let classes = classMap({
											entry: true,
											selected: selected,
											disabled: disabled
										});

										return html`<div
											class=${classes}
											@click=${this.selectable && !disabled
												? this.entryRadioChange.bind(this, entry.entryId)
												: null}
										>
											<div class="entry-content">
												${this.selectable
													? html`<check-box
															radio
															?checked=${selected}
															?disabled=${disabled}
													  ></check-box>`
													: null}
												<div class="entry-info">
													<div class="entry-header">
														<div class="entry-title">
															<e-svg
																slot="icon"
																src=${this.directory
																	? 'solid/folder-blank'
																	: 'regular/file'}
															></e-svg>
															<h3 title=${entry.displayName}>
																${entry.displayName}
															</h3>
														</div>
														<span class="entry-size"
															>${utils.formatContentLength(
																entry.contentLength
															)}</span
														>
													</div>
													<span class="entry-timestamp"
														>${utils.formatDateLong(entry.createTs)}</span
													>
												</div>
											</div>
											${when(
												entry.templateCb,
												() => entry.templateCb(entry),
												() =>
													when(
														entry.thumbnailUrl,
														() =>
															html`<lazy-img
																class="entry-thumbnail"
																bg-size="contain"
																src=${entry.thumbnailUrl}
															></lazy-img>`
													)
											)}
										</div>`;
									}
								)}
							</div>`
					: null}
			</div>
		`;
	}
}
