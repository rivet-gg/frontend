import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import logging from '../../utils/logging';
import global from '../../utils/global';
import { FileInput, PrepareResponse } from '../common/file-uploader';
import { SelectEvent, UploadEntry } from '../common/file-upload-list';
import fileSize from '../../utils/files';

export class SelectBuildEvent extends Event {
	constructor(public buildId: string) {
		super('select-build');
	}
}

@customElement('dev-builds')
export default class DevBuilds extends LitElement {
	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	selectedBuildId: string = null;

	@property({ type: Boolean })
	selectable = false;

	@property({ type: Boolean })
	uploadable = false;

	async loadEntries() {
		return (await global.deprecatedApi.cloud.listGameBuilds({ gameId: this.game.gameId })).builds
			.filter(b => b.complete)
			.map(
				b =>
					({
						entryId: b.buildId,
						uploadId: b.uploadId,
						displayName: b.displayName,
						createTs: b.createTs,
						contentLength: b.contentLength
					}) as UploadEntry
			);
	}

	async prepareUpload(files: FileInput[]): Promise<PrepareResponse> {
		logging.debug('preparing upload');

		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// TEMPORARILY DISABLED
		// // Prepare the upload
		// let displayName = imageFile.path.slice(0, 24) || "Build Upload";
		// let createRes = await global.deprecatedApi.cloud.createGameBuild(this.game.gameId, {
		// 	imageFile: imageFile.prepared,
		// 	displayName,
		// 	imageTag: `asdasdas:bsdfsdfsdf`
		// });

		// return {
		// 	uploadId: createRes.uploadId,
		// 	files: [{
		// 		presignedRequest: createRes.imagePresignedRequest,
		// 		input: imageFile,
		// 	}],
		// 	ctx: { entryId: createRes.buildId },
		// };

		return {
			uploadId: '',
			files: []
		};
	}

	onSelect(event: SelectEvent) {
		this.updateSelected(event.entryId);
	}

	updateSelected(buildId: string) {
		this.selectedBuildId = buildId;

		let event = new SelectBuildEvent(buildId);
		this.dispatchEvent(event);
	}

	render() {
		return html`
			<file-upload-list
				@select=${this.onSelect.bind(this)}
				max-size=${fileSize.gigabytes(8)}
				.loadEntries=${this.loadEntries.bind(this)}
				.prepareUpload=${this.prepareUpload.bind(this)}
				.selectedEntryId=${this.selectedBuildId}
				?selectable=${this.selectable}
				?uploadable=${this.uploadable}
			>
			</file-upload-list>
		`;
	}
}
