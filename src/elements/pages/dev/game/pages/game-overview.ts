import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './game-overview.scss';
import { cssify } from '../../../../../utils/css';
import cloud from '@rivet-gg/cloud';
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
import { Rivet } from '@rivet-gg/api';

@customElement('game-overview')
export default class DevGameOverview extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	game: Rivet.cloud.GameFull = null;

	// === NAMESPACE COMPONENTS ===
	@property({ type: Boolean })
	namespaceModalActive = false;

	@property({ type: String })
	namespaceDisplayNameValue: string = null;
	@property({ type: String })
	namespaceNameIdValue = '';

	@property({ type: Boolean })
	namespaceIsValid = false;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_NAMESPACE);

	@property({ type: Number })
	createTs: number = Date.now();

	@property({ type: Object })
	loadError?: any;

	gameStream?: RepeatingRequest<Rivet.cloud.games.games.GetGameByIdResponse>;

	// === DEBOUNCE INFO ===
	validateNamespaceDebounce: Debounce<
		() => ReturnType<typeof global.deprecatedApi.cloud.validateGameNamespace>
	>;

	constructor() {
		super();

		this.validateNamespaceDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.namespaceDisplayNameValue ?? '';
				let nameId = this.namespaceNameIdValue.length
					? this.namespaceNameIdValue
					: utils.convertStringToId(displayName);

				return await global.deprecatedApi.cloud.validateGameNamespace({
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
					<h2>Name</h2>
					<text-input
						id="namespace-display-name-input"
						light
						placeholder="Enter a namespace name..."
						maxlength="24"
						@input=${this.namespaceDisplayNameInput.bind(this)}
					></text-input>
					${
						displayNameErrors.length > 0
							? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
							</span>`
							: null
					}
					<h2>Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName ? utils.convertStringToId(displayName) : 'Enter a name id...'}
						maxlength="16"
						@input=${this.namespaceNameIdInput.bind(this)}
					></text-input>
					${
						nameIdErrors.length > 0
							? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${nameIdErrors[0]}</li>
							</span>`
							: null
					}
				</div>
				<rvt-button
					class="mt-4"
					@click=${this.createNamespace.bind(this)}
					?disabled=${!this.namespaceIsValid}
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
			let res = await global.api.cloud.games.namespaces.createGameNamespace(this.game.gameId, {
				displayName,
				nameId,
				versionId: this.game.versions[0].versionId
			});

			// Wait until a new update on the game stream before navigating
			this.gameStream.onMessage(() => {
				this.namespaceModalClose();

				RvtRouter.shared.navigate(
					routes.devNamespace.build({
						gameId: this.game.gameId,
						namespaceId: res.namespaceId
					})
				);
			});
		} catch (err) {
			logging.error('failed to create namespace', err);
			this.loadError = err;
		}
	}

	renderNamespaceList(game: Rivet.cloud.GameFull): TemplateResult {
		if (!game.namespaces) return html`<h1>No namespaces found</h1>`;
		return html`
			<div class="w-full">
				<h3 class="text-xl">Namespaces</h3>
				<div class="flex flex-col space-y-2 pt-4">
					<button
						icon="regular/plus"
						size="large"
						color="transparent"
						@click=${this.openNamespaceModal.bind(this)}
						class="dashed-border-button transition-all flex justify-center items-center hover:cursor-pointer w-full place-content-center text-white hover:bg-button-bg-hover-color"
					>
						<e-svg src="regular/plus" class="mr-2"></e-svg> New Namespace
					</button>

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

	renderAnalytics(game: Rivet.cloud.GameFull): TemplateResult {
		return html`
			<div>
				<h1 class="text-xl pb-4">Analytics</h1>
				<rvt-game-analytics .game=${game}></rvt-game-analytics>
			</div>
		`;
	}

	render() {
		return html`
			<div>
				<game-banner .game=${this.game}></game-banner>

				${when(
					this.game?.versions?.length == 1,
					() =>
						html`<a
							class="flex mb-5 p-4 flex items-center justify-center bg-cream-100 text-charcole-900"
							href="https://rivet.gg/learn"
						>
							Get started with examples or templates
							<e-svg class="ms-2" src="regular/arrow-right"></e-svg>
						</a>`
				)}

				<div class="w-full gap-8 flex flex-col md:grid grid-cols-2">
					${when(this.game, () => this.renderAnalytics(this.game))}
					${when(this.game, () => this.renderNamespaceList(this.game))}
				</div>
			</div>

			${this.renderCreateNamespaceModal()}
		`;
	}
}
