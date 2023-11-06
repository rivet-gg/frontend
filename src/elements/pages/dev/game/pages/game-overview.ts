import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './game-overview.scss';
import { cssify } from '../../../../../utils/css';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../../../utils/api';
import logging from '../../../../../utils/logging';
import { CloudGameCache } from '../../../../../data/cache';
import { when } from 'lit/directives/when.js';
import { repeat } from 'lit/directives/repeat.js';
import { showAlert } from '../../../../../ui/helpers';
import RvtRouter from '../../../../root/rvt-router';
import routes from '../../../../../routes';
import utils from '../../../../../utils/utils';
import global from '../../../../../utils/global';
import { InputUpdateEvent } from '../../../../dev/text-input';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../../utils/traversable-errors';
import timing, { Debounce } from '../../../../../utils/timing';
import { RepeatingRequest } from '../../../../../utils/repeating-request';

@customElement('game-overview')
export default class DevGameOverview extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	game: cloud.GameFull = null;

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
	loadError?: any;

	gameStream?: RepeatingRequest<cloud.GetGameByIdCommandOutput>;

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

		if (changedProperties.has('gameId')) {
			this.fetchData();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.gameStream) this.gameStream.cancel();
	}

	async fetchData() {
		if (this.gameStream) {
			this.gameStream.cancel();
			this.gameStream = null;
		}

		try {
			this.gameStream = CloudGameCache.watch('DevGameOverview.gameStream', this.gameId, async res => {
				let gameData = res.game;
				if (gameData) {
					this.game = gameData;
					return;
				}
			});
		} catch (err) {
			logging.error('failed to fetch game data', err);
		}
	}

	openNamespaceModal() {
		if (this.game.versions.length == 0) {
			showAlert(
				'Cannot Create Namespace',
				html`
					<p class="text-lg pt-2 font-semibold text-red-500">
						You cannot create a namespace before creating a version first.
					</p>
					<p class="text-lg pt-2">Use the Rivet CLI to create a version for this game.</p>
				`,
				[
					// {
					// 	label: 'Create A Version',
					// 	cb: () =>
					// 		UIRouter.shared.navigate(routes.devVersionDraft.build({ gameId: this.gameId }))
					// },
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

			RvtRouter.shared.navigate(
				routes.devNamespace.build({
					gameId: this.game.gameId,
					namespaceId: res.namespaceId
				})
			);
		} catch (err) {
			logging.error('failed to create namespace', err);
			this.loadError = err;
		}
	}

	renderNamespaceList(game: cloud.GameFull): TemplateResult {
		if (!game.namespaces) return html`<h1>No namespaces found</h1>`;
		return html`
			<div class="ml-auto w-1/2">
				<h3 class="text-xl">Namespaces</h3>
				<div class="flex flex-col space-y-2 pt-4">
					<stylized-button
						icon="regular/plus"
						centered
						large
						dashed
						color="transparent"
						.trigger=${this.openNamespaceModal.bind(this)}
						class="w-full pb-1"
					>
						New Namespace
					</stylized-button>

					${repeat(
						game.namespaces,
						ns => ns.namespaceId,
						ns => {
							let namespaceVersion = this.game.versions.find(v => v.versionId == ns.versionId);
							return html`
								<game-namespace-tile
									.gameId=${this.game.gameId}
									.namespace=${ns}
									.version=${namespaceVersion}
								></game-namespace-tile>
							`;
						}
					)}
				</div>
			</div>
		`;
	}

	renderAnalytics(game: cloud.GameFull): TemplateResult {
		return html`
			<div class="w-1/2 ">
				<h1 class="text-xl pb-4">Analytics</h1>
				<div
					class="flex flex-row space-x-4 w-full h-80 bg-zinc-600/30 place-content-center rounded-lg bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-fuchsia-600/25 via-fuchsia-900/40 to-fuchsia-700/75"
				>
					<h4 class="m-auto italic text-gray-300 text-lg">Coming Soon...</h4>
				</div>
			</div>
		`;
	}

	render() {
		return html`
			<div class="mx-auto max-w-contentwidth px-[10px] md:px-5 lg:px-0 pb-8">
				<game-banner .game=${this.game}></game-banner>
				<div class="flex flex-row w-full space-x-8 max-md:px-4 ">
					${when(this.game, () => this.renderAnalytics(this.game))}
					${when(this.game, () => this.renderNamespaceList(this.game))}
				</div>
			</div>

			${this.renderCreateNamespaceModal()}
		`;
	}
}
