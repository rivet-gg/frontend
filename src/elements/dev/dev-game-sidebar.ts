import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-sidebar.scss';
import routes from '../../routes';
import * as uuid from 'uuid';
import { when } from 'lit/directives/when.js';
import * as cloud from '@rivet-gg/cloud';
import utils from '../../utils/utils';
import { versionForId } from '../../utils/dev';
import { classMap } from 'lit/directives/class-map.js';
import global from '../../utils/global';
import UIRouter from '../root/ui-router';
import logging from '../../utils/logging';
import settings from '../../utils/settings';
import { showAlert, tooltip } from '../../ui/helpers';
import assets from '../../data/assets';
import timing, { Debounce } from '../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import { InputUpdateEvent } from './text-input';
import { globalEventGroups } from '../../utils/global-events';
import { DropDownSelectEvent, DropDownSelection } from './drop-down-list';
import { repeat } from 'lit/directives/repeat.js';
import { Orientation } from '../common/overlay-positioning';

interface VersionFolder {
	versions: cloud.VersionSummary[];
	open: boolean;
}

@customElement('dev-game-sidebar')
export default class DevGameSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	game: cloud.GameFull = null;

	@property({ type: String })
	gameId: string;

	@property({ type: String })
	namespaceId: string;

	// Used when selecting a namespace for logs, lobbies, etc
	@property({ type: String })
	configNamespaceId: string;

	@property({ type: String })
	versionId: string;

	@property({ type: String })
	pageId: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_NAMESPACE);

	@property({ type: Number })
	createTs: number = Date.now();

	@property({ type: Object })
	versionFolders: Map<number, VersionFolder> = new Map();

	// When a new version is created, navigation happens before the blocking request for the dev game
	// completes. This flag makes sure the correct folder is opened
	awaitNewVersion: boolean = false;

	// === DEBOUNCE INFO ===
	validateNamespaceDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGameNamespace>>;

	constructor() {
		super();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Re-create version folders
		if (changedProperties.has('game')) {
			let newVersionFolders = new Map();

			for (let version of this.game.versions) {
				// Create monthly timestamp from version timestamp
				let date = new Date(version.createTs);
				date.setUTCHours(0, 0, 0, 0);
				date.setUTCDate(2);
				let ts = date.getTime();

				if (!newVersionFolders.has(ts)) {
					newVersionFolders.set(ts, {
						versions: [],
						// Keep folder open if it was open before re-creation
						open: this.versionFolders.get(ts)?.open || false
					});
				}
				newVersionFolders.get(ts).versions.push(version);
			}

			this.versionFolders = newVersionFolders;
		}

		if (changedProperties.has('versionId') || this.awaitNewVersion) {
			let found = false;

			for (let folder of this.versionFolders.values()) {
				if (folder.versions.some(v => v.versionId == this.versionId)) {
					found = true;
					folder.open = true;
					this.requestUpdate('versionFolders');
					break;
				}
			}

			this.awaitNewVersion = !found;
		}
	}

	render() {
		return html`
			<rvt-sidebar>${this.game ? this.renderContent() : this.renderPlaceholder()}</rvt-sidebar>
		`;
	}

	renderContent() {
		let gameIdStr = this.gameId;
		let draft;

		return html`
			<rvt-sidebar-group title="General">
				<rvt-sidebar-button
					?current=${this.pageId == 'summary'}
					href=${routes.devNamespace.build({ gameId: this.game.gameId, namespaceId: this.namespaceId })}
					icon="regular/square-info"
					>Overview</rvt-sidebar-button
				>
				<!-- <stylized-button
					?current=${this.pageId == 'billing'}
					href=${routes.devBilling.build({ gameId: this.game.gameId })}
					icon="solid/square-dollar"
					>Billing</stylized-button
				> -->

				<rvt-sidebar-button
					?current=${this.pageId == 'tokens'}
					href=${routes.devTokens.build(
						{
							gameId: this.game.gameId,
							namespaceId: this.namespaceId
						}
					)}
					icon="solid/key"
					>Tokens</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'lobbies'}
					href=${routes.devLobbies.build(
						{
							gameId: this.game.gameId,
							namespaceId: this.namespaceId,
						}
					)}
					icon="solid/table-rows"
					>Lobbies</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'logs'}
					href=${routes.devLogs.build(
						{
							gameId: this.game.gameId,
							namespaceId: this.namespaceId,
						}
					)}
					icon="solid/book"
					>Logs</rvt-sidebar-button
				>

				<rvt-sidebar-button
					?current=${this.pageId == 'kv'}
					href=${routes.devKv.build(
						{
							gameId: this.game.gameId,
							namespaceId: this.namespaceId,
						}
					)}
					icon="solid/table-list"
					>KV</rvt-sidebar-button
				>
				
				<rvt-sidebar-button
					href="https://rivet.gg/modules"
					icon="solid/cubes"
					>Modules</rvt-sidebar-button
				>
			</rvt-sidebar-group>
		`;
	}

	// TODO: Fill out more
	renderPlaceholder() {
		return html`
			<div id="title">
				<loading-placeholder></loading-placeholder>
				<loading-placeholder></loading-placeholder>
			</div>
		`;
	}
}
