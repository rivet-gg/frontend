import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import global from '../../utils/global';
import { FileInput, PrepareResponse } from '../common/file-uploader';
import { SelectEvent, UploadEntry } from '../common/file-upload-list';
import fileSize from '../../utils/files';

export class SelectSiteEvent extends Event {
	constructor(public siteId: string) {
		super('select-site');
	}
}

@customElement('dev-cdn-sites')
export default class CdnSites extends LitElement {
	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	selectedSiteId: string = null;

	@property({ type: Boolean })
	selectable = false;

	@property({ type: Boolean })
	uploadable = false;

	async loadEntries() {
		return (await global.cloud.listGameCdnSites({ gameId: this.game.gameId })).sites
			.filter(b => b.complete)
			.map(
				s =>
					({
						entryId: s.siteId,
						uploadId: s.uploadId,
						displayName: s.displayName,
						createTs: s.createTs,
						contentLength: s.contentLength
					}) as UploadEntry
			);
	}

	async prepareUpload(files: FileInput[]): Promise<PrepareResponse> {
		console.log('preparing upload');

		let folderName: string = null;
		let fileRegister = new Map<string, FileInput>(); // Map of converted path -> file input
		let uploadFiles: cloud.UploadPrepareFile[] = [];
		for (let file of files) {
			// Strip the first path component, since WebKit includes the common folder name for all files
			let path = file.path;
			if (folderName == null) {
				folderName = path.split('/')[0];
			}
			if (path.startsWith(folderName + '/')) {
				path = path.slice(folderName.length + 1); // Strip folder name + slash
			} else {
				console.warn('path does not start with prefix', file.path, folderName);
			}

			// Save the file
			fileRegister.set(path, file);
			uploadFiles.push(Object.assign({}, file.prepared, { path }));
		}

		// Prepare the upload
		let displayName = folderName.slice(0, 24) || 'Folder Upload';
		let createRes = await global.cloud.createGameCdnSite({
			gameId: this.game.gameId,
			files: uploadFiles,
			displayName
		});

		return {
			uploadId: createRes.uploadId,
			files: createRes.presignedRequests.map(presignedRequest => ({
				presignedRequest,
				input: fileRegister.get(presignedRequest.path)
			})),
			ctx: { entryId: createRes.siteId }
		};
	}

	onSelect(event: SelectEvent) {
		this.updateSelected(event.entryId);
	}

	updateSelected(siteId: string) {
		this.selectedSiteId = siteId;

		let event = new SelectSiteEvent(siteId);
		this.dispatchEvent(event);
	}

	render() {
		return html`
			<file-upload-list
				directory
				@select=${this.onSelect.bind(this)}
				max-size=${fileSize.gigabytes(1)}
				.loadEntries=${this.loadEntries.bind(this)}
				.prepareUpload=${this.prepareUpload.bind(this)}
				label="Sites"
				.selectedEntryId=${this.selectedSiteId}
				?selectable=${this.selectable}
				?uploadable=${this.uploadable}
			>
			</file-upload-list>
		`;
	}
}
