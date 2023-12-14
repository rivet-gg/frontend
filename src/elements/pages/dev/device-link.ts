import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../../utils/css';
import styles from './device-link.scss';
import global from '../../../utils/global';
import { Rivet } from '@rivet-gg/api-internal';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { responses } from '../../../routes';
import assets from '../../../data/assets';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { showAlert } from '../../../ui/helpers';
import timing, { Debounce } from '../../../utils/timing';
import utils from '../../../utils/utils';
import { InputUpdateEvent } from '../../dev/text-input';

enum LinkState {
	Loading,
	SelectingGame,
	Linking,
	Complete,
	AlreadyLinked
}

@customElement('page-dev-device-link')
export default class DevGames extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	deviceLinkToken: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Array })
	games?: Rivet.game.Summary[];

	@property({ type: Object })
	gameSelection: DropDownSelection<string> = null;

	@property({ type: Array })
	gameOptions: DropDownSelection<string>[] = null;

	@property({ type: Array })
	devGroupOptions: DropDownSelection<string>[] = [];

	@property({ type: String })
	linkState: LinkState = LinkState.Loading;

	// === GAME COMPONENTS ===
	@property({ type: Boolean })
	gameModalActive = false;

	@property({ type: String })
	gameDisplayNameValue: string = null;

	@property({ type: String })
	gameNameIdValue = '';

	gameGroupSelection: DropDownSelection<string> = null;

	@property({ type: Boolean })
	isCreatingGame = false;

	@property({ type: String })
	gameValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME);

	@property({ type: Boolean })
	gameIsValid = false;

	validateGameDebounce: Debounce<() => ReturnType<typeof global.api.cloud.games.games.validateGame>>;

	constructor() {
		super();

		this.validateGameDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.gameDisplayNameValue ?? '';
				let nameId = this.gameNameIdValue.length
					? this.gameNameIdValue
					: utils.convertStringToId(displayName);

				return await global.cloud.validateGame({
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.gameValidationErrors.load(res.errors.map(err => err.path));
				this.gameIsValid = this.gameValidationErrors.isEmpty() && this.gameGroupSelection != null;

				// Refresh UI
				this.requestUpdate('gameValidationErrors');
			}
		});
		this.validateGameDebounce.onError(async err => {
			this.loadError = err;
			this.gameIsValid = false;
		});
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData() {
		try {
			// Check if link is already complete
			let currentGameLink = await global.api.cloud.devices.links.get({
				deviceLinkToken: this.deviceLinkToken
			});
			if (currentGameLink.cloudToken != null) {
				this.linkState = LinkState.AlreadyLinked;
				return;
			}

			// Fetch the games
			let res = await global.api.cloud.games.games.getGames();
			this.games = res.games;
			this.gameOptions = this.games.map(game => {
				let handleStyles = styleMap({
					display: 'flex',
					'flex-direction': 'row',
					'align-items': 'center',
					padding: '0 10px 0 0'
				});

				return {
					template: html`<div style=${handleStyles}>
						<lazy-img
							class="left-icon"
							bg-size=${game.logoUrl ? 'contain' : 'cover'}
							src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
						></lazy-img>
						${game.displayName}
					</div>`,
					value: game.gameId
				};
			});

			this.gameOptions.unshift({
				template: html`<dashed-button
					icon="regular/plus"
					style=${styleMap({ display: 'block', margin: '2px 0 0 0' })}
					>New Game</dashed-button
				>`,
				unstyled: true,
				value: null
			});

			this.devGroupOptions = res.groups
				.filter(group => group.isDeveloper)
				.map(group => ({
					template: html`<group-handle-tile
						light
						no-link
						.group=${group as any}
						style=${styleMap({ '--font-size': '12px' })}
					></group-handle-tile>`,
					value: group.groupId
				}));

			this.linkState = LinkState.SelectingGame;
		} catch (err) {
			this.loadError = err;
		}
	}

	changedGameSelection(event: DropDownSelectEvent<string>) {
		// Create new game
		if (event.selection.value == null) {
			this.openGameModal();
			this.gameSelection = undefined;
		} else {
			this.gameSelection = event.selection;
		}
	}

	async onLinkGame() {
		try {
			this.linkState = LinkState.Linking;
			await global.api.cloud.devices.links.complete({
				deviceLinkToken: this.deviceLinkToken,
				gameId: this.gameSelection.value
			});
			this.linkState = LinkState.Complete;
		} catch (err) {
			this.loadError = err;
		}
	}

	async createGame() {
		if (!this.gameIsValid) return;

		try {
			let displayName = this.gameDisplayNameValue;
			let nameId = this.gameNameIdValue.length
				? this.gameNameIdValue
				: utils.convertStringToId(displayName);

			let res = await global.api.cloud.games.games.createGame({
				nameId,
				displayName,
				developerGroupId: this.gameGroupSelection.value
			});

			await this.fetchData();
			this.gameModalClose();

			// Select new game
			this.gameSelection = this.gameOptions.find(g => g.value == res.gameId);
		} catch (err) {
			this.loadError = err;
			this.isCreatingGame = false;
		}
	}

	changeGameGroupSelection(event: DropDownSelectEvent<string>) {
		this.gameGroupSelection = event.selection;
		this.validateGameDebounce.trigger();
	}

	openGameModal() {
		if (this.devGroupOptions.length == 0) {
			showAlert('Cannot create game', html`You cannot create a game before creating a group first.`);
		} else {
			this.gameModalActive = true;
			this.gameGroupSelection = this.devGroupOptions[0];
		}
	}

	gameModalClose() {
		this.gameModalActive = false;
	}

	gameDisplayNameInput(event: InputUpdateEvent) {
		this.gameDisplayNameValue = event.value;

		this.validateGameDebounce.trigger();
	}

	gameNameIdInput(event: InputUpdateEvent) {
		this.gameNameIdValue = event.value;

		this.validateGameDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let body;
		if (this.linkState == LinkState.Loading) body = html`<loading-wheel></loading-wheel>`;
		else if (this.linkState == LinkState.SelectingGame || this.linkState == LinkState.Linking) {
			body = html`<p>Link your game to your device here to continue with Rivet setup.</p>
				<div id="link-area">
					<drop-down-list
						fixed
						.options=${this.gameOptions}
						.selection=${this.gameSelection}
						@select=${this.changedGameSelection.bind(this)}
					></drop-down-list>
					<stylized-button
						?disabled=${this.linkState != LinkState.SelectingGame || this.gameSelection == null}
						@click=${this.onLinkGame.bind(this)}
						>Link</stylized-button
					>
					${when(
						this.linkState == LinkState.Linking,
						() => html`<loading-wheel custom></loading-wheel>`
					)}
				</div>`;
		} else if (this.linkState == LinkState.AlreadyLinked) {
			body = html`<div>
				<h2><e-svg src="solid/circle-check"></e-svg>Device Already Linked</h2>
				<p>No further action is required. You may safely close this tab and return to the CLI.</p>
			</div>`;
		} else if (this.linkState == LinkState.Complete) {
			body = html`<div>
				<h2><e-svg src="solid/circle-check"></e-svg>Device Link Complete</h2>
				<p>You may safely close this tab and return to the CLI.</p>
			</div>`;
		}

		return html`<div id="base">
				<page-header>
					<e-svg src="solid/link"></e-svg>
					<h1>Link Device</h1>
				</page-header>

				<div id="body">${body}</div>
			</div>
			${this.renderCreateGameModal()}`;
	}

	renderCreateGameModal() {
		if (this.linkState == LinkState.Loading) return null;

		let displayName = this.gameDisplayNameValue;
		let displayNameErrors = this.gameValidationErrors.findFormatted('display-name');
		let nameIdErrors = this.gameValidationErrors.findFormatted('name-id');

		return html`<drop-down-modal
			id="create-game-modal"
			?active=${this.gameModalActive}
			@close=${this.gameModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your new game</h1>
				<div class="input-group">
					<h2>Owner Developer Group</h2>
					<drop-down-list
						light
						.options=${this.devGroupOptions}
						.selection=${this.gameGroupSelection}
						@select=${this.changeGameGroupSelection.bind(this)}
					></drop-down-list>
					<h2>Game Display Name</h2>
					<text-input
						light
						placeholder="Enter a game name..."
						@input=${this.gameDisplayNameInput.bind(this)}
					></text-input>
					${when(
						displayNameErrors.length > 0,
						() => html`
							<span id="create-game-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
							</span>`
					)}
					<h2>Game Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName
							? utils.convertStringToId(displayName)
							: 'Enter a name id...'}
						@input=${this.gameNameIdInput.bind(this)}
					></text-input>
					${when(
						nameIdErrors.length > 0,
						() => html`
							<span id="create-game-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${nameIdErrors[0]}</li>
							</span>`
					)}
				</div>
				<p class="content">We’ll walk you though the details of editing your game later.</p>
				<stylized-button
					.trigger=${this.createGame.bind(this)}
					?disabled=${!this.gameIsValid}
					?loading=${this.isCreatingGame}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
