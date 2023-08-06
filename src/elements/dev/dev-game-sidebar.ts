import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-sidebar.scss';
import routes from '../../routes';
import { when } from 'lit/directives/when.js';
import { repeat } from 'lit/directives/repeat.js';
import cloud from '@rivet-gg/cloud';
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

	// === NAMESPACE COMPONENTS ===
	@property({ type: Boolean })
	namespaceModalActive = false;

	@property({ type: String })
	namespaceDisplayNameValue: string = null;
	@property({ type: String })
	namespaceNameIdValue = '';

	@property({ type: Boolean })
	isCreatingNamespace = false;

	@property({ type: Boolean })
	namespaceIsValid = false;

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

		this.validateNamespaceDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.namespaceDisplayNameValue ?? '';
				let nameId = this.namespaceNameIdValue.length
					? this.namespaceNameIdValue
					: utils.convertStringToId(displayName);

				return await global.cloud.validateGameNamespace({
					gameId: this.game.gameId,
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.namespaceIsValid = this.validationErrors.isEmpty();
				this.loadError = null;

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateNamespaceDebounce.onError(async err => {
			this.loadError = err;
			this.namespaceIsValid = false;
		});
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

	async createNamespace() {
		let displayName = this.namespaceDisplayNameValue ?? '';
		let nameId = this.namespaceNameIdValue.length
			? this.namespaceNameIdValue
			: utils.convertStringToId(displayName);

		try {
			let res = await global.cloud.createGameNamespace({
				gameId: this.game.gameId,
				versionId: this.game.versions[0].versionId,
				nameId,
				displayName
			});

			this.namespaceModalClose();

			UIRouter.shared.navigate(
				routes.devNamespace.build({
					gameId: this.game.gameId,
					namespaceId: res.namespaceId
				})
			);
		} catch (err) {
			this.loadError = err;
		}
	}

	toggleVersionFolder(ts: number) {
		if (this.versionFolders.has(ts)) {
			let versionFolder = this.versionFolders.get(ts);
			versionFolder.open = !versionFolder.open;
			this.requestUpdate('versionFolders');
		}
	}

	openNamespaceModal() {
		if (this.game.versions.length == 0) {
			showAlert(
				'Cannot create namespace',
				html`You cannot create a namespace before creating a version first.`,
				[
					{
						label: 'Create A Version',
						cb: () =>
							UIRouter.shared.navigate(routes.devVersionDraft.build({ gameId: this.gameId }))
					},
					{
						label: 'Dismiss'
					}
				]
			);
		} else {
			this.namespaceModalActive = true;
		}
	}

	namespaceModalClose() {
		this.namespaceModalActive = false;
	}

	namespaceDisplayNameInput(event: InputUpdateEvent) {
		this.namespaceDisplayNameValue = event.value;

		this.validateNamespaceDebounce.trigger();
	}

	namespaceNameIdInput(event: InputUpdateEvent) {
		this.namespaceNameIdValue = event.value;

		this.validateNamespaceDebounce.trigger();
	}

	render() {
		return html`
			<rvt-sidebar>${this.game ? this.renderContent() : this.renderPlaceholder()}</rvt-sidebar>

			${this.renderCreateNamespaceModal()}
		`;
	}

	renderContent() {
		let gameIdStr = this.gameId;

		let strDraft = settings.getVersionConfigDraft(gameIdStr);
		let draft;

		if (strDraft && strDraft.length) {
			try {
				draft = JSON.parse(strDraft);
			} catch (e) {
				logging.warn('Unable to parse version config draft', e);
			}
		}

		return html`
			<rvt-sidebar-group title="General">
				<rvt-sidebar-button
					?current=${this.pageId == 'summary'}
					href=${global.isMobile
						? routes.devGameSummary.build({ gameId: this.game.gameId })
						: routes.devGame.build({ gameId: this.game.gameId })}
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
					href=${routes.devTokens.build({ gameId: this.game.gameId })}
					icon="solid/key"
					>API</rvt-sidebar-button
				>
				<rvt-sidebar-button
					?current=${this.pageId == 'logs'}
					href=${routes.devLogs.build(
						{
							gameId: this.game.gameId
						},
						{ namespaceId: this.configNamespaceId }
					)}
					icon="solid/book"
					>Logs</rvt-sidebar-button
				>
				<rvt-sidebar-button
					?current=${this.pageId == 'lobbies'}
					href=${routes.devLobbies.build(
						{
							gameId: this.game.gameId
						},
						{ namespaceId: this.configNamespaceId }
					)}
					icon="solid/table-rows"
					>Lobbies</rvt-sidebar-button
				>
				<rvt-sidebar-button
					?current=${this.pageId == 'kv'}
					href=${routes.devKv.build(
						{
							gameId: this.game.gameId
						},
						{ namespaceId: this.configNamespaceId }
					)}
					icon="solid/table-list"
					>KV</rvt-sidebar-button
				>
			</rvt-sidebar-group>

			<rvt-sidebar-group title="Namespaces">
				<dashed-button icon="regular/plus" .trigger=${this.openNamespaceModal.bind(this)}
					>New namespace</dashed-button
				>
				${repeat(this.game.namespaces, n => n.namespaceId, this.renderNamespace.bind(this))}
			</rvt-sidebar-group>

			<rvt-sidebar-group id="versions" title="Versions">
				<dashed-button
					id="draft-button"
					?selected=${this.pageId == 'draft'}
					icon=${draft ? 'regular/file' : 'regular/plus'}
					href=${routes.devVersionDraft.build({ gameId: gameIdStr })}
				>
					${draft ? `Draft: ${draft.displayName || 'Unnamed Version'}` : 'New Version'}
				</dashed-button>
				${repeat(
					this.versionFolders,
					([ts, v]) => ts,
					([ts, v]) => this.renderVersionFolder(ts, v)
				)}
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

	renderNamespace(namespace: cloud.NamespaceSummary) {
		let version = versionForId(this.game, namespace.versionId);

		return html`<rvt-sidebar-button
			?current=${namespace.namespaceId == this.namespaceId}
			href=${routes.devNamespace.build({
				gameId: this.game.gameId,
				namespaceId: namespace.namespaceId
			})}
		>
			${namespace.displayName} (${version.displayName})
		</rvt-sidebar-button>`;
	}

	renderVersionFolder(ts: number, versionFolder: VersionFolder) {
		let classes = classMap({
			'version-folder': true,
			active: versionFolder.open
		});

		return html`<div class=${classes} @click=${this.toggleVersionFolder.bind(this, ts)}>
			<div class="header">
				<div class="handle">
					<e-svg src="solid/folder-blank"></e-svg>
					<h3>${utils.formatMonth(ts)}</h3>
				</div>
				<e-svg src=${versionFolder.open ? 'solid/caret-down' : 'solid/caret-right'}></e-svg>
			</div>
			${when(
				versionFolder.open,
				() =>
					html`<div class="versions">
						${repeat(versionFolder.versions, v => v.versionId, this.renderVersion.bind(this))}
					</div>`
			)}
		</div>`;
	}

	renderVersion(version: cloud.VersionSummary) {
		// Collect active versions
		let activeVersions = new Map<string, string[]>();
		for (let namespace of this.game.namespaces) {
			if (activeVersions.has(namespace.versionId))
				activeVersions.get(namespace.versionId).push(namespace.displayName);
			else activeVersions.set(namespace.versionId, [namespace.displayName]);
		}
		let isActive = activeVersions.has(version.versionId);
		let classes = classMap({
			version: true,
			selected: version.versionId == this.versionId
		});
		let statusClasses = classMap({
			status: true,
			active: isActive
		});

		let activeNamespaces = Array.from(activeVersions.get(version.versionId) || []);

		// Truncate list to 3
		if (activeNamespaces.length > 3) {
			let truncation = `and ${activeNamespaces.length - 3} more`;
			activeNamespaces.length = 3;
			activeNamespaces.push(truncation);
		}

		return html`<stylized-button
			class=${classes}
			href=${routes.devVersion.build({
				gameId: this.game.gameId,
				versionId: version.versionId
			})}
		>
			<span class="display-name">${version.displayName}</span>
			<div
				class=${statusClasses}
				@mouseenter=${isActive
					? tooltip(`Active in: ${activeNamespaces.join(', ')}`)
					: tooltip('No active namespaces')}
			></div>
		</stylized-button>`;
	}

	renderCreateNamespaceModal() {
		let displayName = this.namespaceDisplayNameValue;

		let displayNameErrors = this.validationErrors.findFormatted('display-name');
		let nameIdErrors = this.validationErrors.findFormatted('name-id');

		return html` <drop-down-modal
			id="create-namespace-modal"
			?active=${this.namespaceModalActive}
			@close=${this.namespaceModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your new namespace</h1>
				<div class="input-group">
					<h2>Namespace Name</h2>
					<text-input
						id="namespace-display-name-input"
						light
						placeholder="Enter a namespace name..."
						maxlength="24"
						@input=${this.namespaceDisplayNameInput.bind(this)}
					></text-input>
					${displayNameErrors.length > 0
						? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
							</span>`
						: null}
					<h2>Namespace Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName
							? utils.convertStringToId(displayName)
							: 'Enter a name id...'}
						maxlength="16"
						@input=${this.namespaceNameIdInput.bind(this)}
					></text-input>
					${nameIdErrors.length > 0
						? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${nameIdErrors[0]}</li>
							</span>`
						: null}
				</div>
				<stylized-button
					.trigger=${this.createNamespace.bind(this)}
					?disabled=${!this.namespaceIsValid}
					?loading=${this.isCreatingNamespace}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
