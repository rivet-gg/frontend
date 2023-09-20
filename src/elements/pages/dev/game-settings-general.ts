import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../../utils/css';
import cloud from '@rivet-gg/cloud';
import global from '../../../utils/global';
import routes from '../../../routes';
import * as api from '../../../utils/api';
import fileSize from '../../../utils/files';
import { FileInput, PrepareResponse } from '../../common/file-uploader';
import logging from '../../../utils/logging';
import { globalEventGroups } from '../../../utils/global-events';

enum UploadType {
	Logo,
	Banner
}

@customElement('page-dev-game-settings-general')
export default class DevGameSettingsGeneral extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull = null;

	async prepareUpload(type: UploadType, files: FileInput[]): Promise<PrepareResponse> {
		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// Prepare the upload
		let createRes;
		if (type == UploadType.Logo) {
			createRes = await global.cloud.gameLogoUploadPrepare({
				gameId: this.game.gameId,
				path: imageFile.prepared.path,
				mime: imageFile.prepared.contentType,
				contentLength: imageFile.prepared.contentLength
			});
		} else if (type == UploadType.Banner) {
			createRes = await global.cloud.gameBannerUploadPrepare({
				gameId: this.game.gameId,
				path: imageFile.prepared.path,
				mime: imageFile.prepared.contentType,
				contentLength: imageFile.prepared.contentLength
			});
		}

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

	async completeUpload(type: UploadType, prepareRes: PrepareResponse) {
		if (type == UploadType.Logo) {
			await global.cloud.gameLogoUploadComplete({
				gameId: this.game.gameId,
				uploadId: prepareRes.uploadId
			});
		} else if (type == UploadType.Banner) {
			await global.cloud.gameBannerUploadComplete({
				gameId: this.game.gameId,
				uploadId: prepareRes.uploadId
			});
		}
	}

	render() {
		return html`
			<div id="base">
				<h1 class="text-2xl pb-2">Basic Info</h1>
				<div id="input-area" class="space-y-5">
					<div class="not-allowed">
						<div class="disabled">
							<h4 class="text-lg pb-1">Game Title</h4>
							<text-input
								placeholder="Enter a game title here"
								.init=${this.game.displayName}
							></text-input>
						</div>
					</div>
					<h4 class="text-lg pb-1">Logo</h4>
					<file-uploader
						id="logo-input"
						max-size=${fileSize.megabytes(5)}
						.accept=${'image/png, image/jpeg'}
						.allowed=${/\.(png|jpe?g)$/i}
						.prepareUpload=${this.prepareUpload.bind(this, UploadType.Logo)}
						.completeUpload=${this.completeUpload.bind(this, UploadType.Logo)}
					>
						<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
						<div slot="content">
							<p class="file-input-title">Upload Game Logo</p>
							<p class="file-input-subtitle">Recommended size 512x256 px</p>
						</div>
					</file-uploader>
					<h4 class="text-lg pb-1">Banner</h4>
					<file-uploader
						id="banner-input"
						max-size=${fileSize.megabytes(10)}
						.accept=${'image/png, image/jpeg'}
						.allowed=${/\.(pn|jpe?)g$/i}
						.prepareUpload=${this.prepareUpload.bind(this, UploadType.Banner)}
						.completeUpload=${this.completeUpload.bind(this, UploadType.Banner)}
					>
						<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
						<div slot="content">
							<p class="file-input-title">Upload Game Banner</p>
							<p class="file-input-subtitle">Recommended size 2048x1024 px</p>
						</div>
					</file-uploader>
					<!-- <h4>Video background</h4>
						<file-uploader video id="video-input">
							<e-svg slot="icon" src="regular/file-video"></e-svg>
							<div slot="content">
								<p class="file-input-title">Upload Video Background</p>
								<p class="file-input-subtitle">Maximum file size 12.5MB</p>
							</div>
						</file-uploader> -->
				</div>
			</div>
		`;
	}
}