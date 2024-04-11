import { customElement, property } from 'lit/decorators.js';
import { html, LitElement, PropertyValues } from 'lit';
import { when } from 'lit/directives/when.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../../../utils/css';
import styles from './group.scss';
import routes, { responses } from '../../../../routes';
import global from '../../../../utils/global';
import cloud from '@rivet-gg/cloud';
import { Rivet } from '@rivet-gg/api';
import { globalEventGroups } from '../../../../utils/global-events';
import RvtRouter from '../../../root/rvt-router';

import assets from '../../../../data/assets';
import * as api from '../../../../utils/api';

import { CloudDashboardCache, GroupProfileCache } from '../../../../data/cache';
import logging from '../../../../utils/logging';
import { DropDownSelection } from '../../../dev/drop-down-list';
import timing, { Debounce } from '../../../../utils/timing';
import utils from '../../../../utils/utils';
import { InputUpdateEvent } from '../../../dev/text-input';
import { ColorExtractor } from '../../../../utils/colors';
import { repeat } from 'lit/directives/repeat.js';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../../utils/traversable-errors';
import { RepeatingRequest } from '../../../../utils/repeating-request';
import clsx from 'clsx';

enum CreateInviteState {
	Create,
	Result
}
interface GroupAction {
	applyForGroup?: true;
	openEditModal?: true;
	kickMember?: { identityId: string };
	banIdentity?: { identityId: string };
	unbanIdentity?: { identityId: string };
	leaveGroup?: true;
	transferGroupOwnership?: true;
	resolveJoinRequest?: { identityId: string; resolution: boolean };
	openCreateInviteModal?: true;
}

export class GroupActionEvent extends Event {
	constructor(public action: GroupAction) {
		super('event');
	}
}

const INVITE_TTL_SELECTION: DropDownSelection<number>[] = [
	{
		label: '1 Hour',
		value: timing.hours(1)
	},
	{
		label: '1 Day',
		value: timing.days(1)
	},
	{
		label: '1 Week',
		value: timing.days(7)
	},
	{
		label: '1 Month',
		value: timing.days(30)
	},
	{
		label: 'Never',
		value: 0
	}
];

@customElement('page-group')
export default class GroupPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: String })
	gameNameId?: string;

	@property({ type: Array })
	games?: Rivet.game.Summary[] = null;

	@property({ type: Object })
	loadError?: any;

	// === GAME COMPONENTS ===
	@property({ type: Boolean })
	gameModalActive = false;

	@property({ type: String })
	gameDisplayNameValue: string = null;

	@property({ type: String })
	gameNameIdValue = '';

	@property({ type: Boolean })
	isCreatingGame = false;

	@property({ type: String })
	gameValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME);

	@property({ type: Boolean })
	gameIsValid = false;

	// === COLOR EXTRACTION ===
	@property({ type: Object })
	colorExtractor: ColorExtractor = new ColorExtractor();

	// === DEBOUNCE INFO ===
	validateGameDebounce: Debounce<() => ReturnType<typeof global.deprecatedApi.cloud.validateGame>>;

	// === EVENT HANDLERS ===
	groupStream?: RepeatingRequest<api.group.GetGroupProfileCommandOutput>;
	gamesStream?: RepeatingRequest<Rivet.cloud.games.GetGamesResponse>;

	constructor() {
		super();

		this.validateGameDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.gameDisplayNameValue ?? '';
				let nameId = this.gameNameIdValue.length
					? this.gameNameIdValue
					: utils.convertStringToId(displayName);

				return await global.deprecatedApi.cloud.validateGame({
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.gameValidationErrors.load(res.errors.map(err => err.path));
				this.gameIsValid = this.gameValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('gameValidationErrors');
			}
		});
		this.validateGameDebounce.onError(async err => {
			this.loadError = err;
			this.gameIsValid = false;
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		if (this.groupStream) this.groupStream.cancel();
		if (this.gamesStream) this.gamesStream.cancel();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if category set
		if (changedProperties.has('groupId')) {
			this.resetGroupData();
			this.fetchGroup();
			this.resetGameData();
			this.fetchGames();
		}
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		this.colorExtractor.reset();
	}

	resetGameData() {
		if (this.games) this.games.length = 0;
	}

	async fetchGames() {
		if (this.gamesStream) this.gamesStream.cancel();

		// Fetch events
		this.gamesStream = CloudDashboardCache.watch('GroupPage.gamesStream', data => {
			data.games.sort((a, b) => a.displayName.localeCompare(b.displayName));
			this.games = data.games.filter(a => a.developer.groupId == this.groupId);
		});

		this.gamesStream.onError(err => {
			logging.error('Request error', err);

			// Only set `loadError` on initiation
			if (this.games) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	async fetchGroup() {
		if (this.groupStream) this.groupStream.cancel();
		this.groupStream = GroupProfileCache.watch('GroupPage.groupStream', this.groupId, res => {
			let firstFetch = !this.profile;

			this.profile = res.group;

			if (firstFetch) this.fetchColor();

			// Update the title
			RvtRouter.shared.updateTitle(this.profile.displayName);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			if (this.profile) globalEventGroups.dispatch('error', err);
			else this.loadError = err;
		});
	}

	fetchColor() {
		this.colorExtractor.update(this.profile.avatarUrl);
		this.colorExtractor.getPalette().then(() => this.requestUpdate('colorExtractor'));
	}

	openGameModal(groupId: string) {
		this.gameModalActive = true;
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

	async createGame() {
		if (!this.gameIsValid) return;

		try {
			let displayName = this.gameDisplayNameValue;
			let nameId = this.gameNameIdValue.length
				? this.gameNameIdValue
				: utils.convertStringToId(displayName);

			let res = await global.deprecatedApi.cloud.createGame({
				nameId,
				displayName,
				developerGroupId: this.profile.groupId
			});

			this.fetchGames();
			this.gameModalClose();

			// Open new game page
			RvtRouter.shared.navigate(routes.devGame.build({ gameId: res.gameId }));
		} catch (err) {
			this.loadError = err;
			this.isCreatingGame = false;
		}
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		let isOwner = this.profile
			? global.currentIdentity.identityId == this.profile.ownerIdentityId
			: false;

		return this.renderDesktop(profileNotFound, isOwner);
	}

	renderDesktop(profileNotFound: boolean, isOwner: boolean) {
		return html`
			<div>
				<group-banner .group=${this.profile}></group-banner>
				<div class="flex flex-row w-full">
					${when(
						this.games &&
							(this.profile.isCurrentIdentityMember || global.currentIdentity.isAdmin),
						() =>
							html`<div class="games-list grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
								<div
									id="create-game"
									class=${clsx(
										'dashed-border-button cursor-pointer hover:-translate-y-0.5 transition-all',
										!this.gameModalActive && 'hover:bg-button-bg-hover-color'
									)}
									@click=${this.openGameModal.bind(this, this.groupId)}
								>
									<div class="relative flex flex-col place-content-center m-auto">
										<h4 class="font-semibold text-lg text-center">Create a game</h4>
										<lazy-img
											class="h-24 w-4/5 m-auto mt-6"
											src=${assets.asset('/games/blank/newgame.svg')}
											bg-size="contain"
										></lazy-img>
									</div>
								</div>
								${repeat(
									this.games,
									g => g.gameId,
									g =>
										html`<dev-game-tile
											.game=${g}
											.group=${this.profile}
										></dev-game-tile>`
								)}
							</div>`,
						() => html`
							<div class="flex flex-col space-y-6 mx-auto">
								<h4 class="text-xl w-full text-center">
									You do not have access to view this group's games.
								</h4>
								<p class="text-md text-center">
									Try getting invited, or make sure that you are logged in.
								</p>
							</div>
						`
					)}
				</div>
			</div>

			${this.renderCreateGameModal()}
		`;
	}

	renderCreateGameModal() {
		if (!this.games && !this.profile) return null;

		let displayName = this.gameDisplayNameValue;
		let displayNameErrors = this.gameValidationErrors.findFormatted('display-name');
		let nameIdErrors = this.gameValidationErrors.findFormatted('name-id');

		return html` <drop-down-modal
			id="create-game-modal"
			?active=${this.gameModalActive}
			@close=${this.gameModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1 class="text-2xl font-bold pb-4">Create your new game</h1>
				<div class="input-group px-8">
					<h2 class="text-lg font-semibold">Owner Developer Group</h2>
					<h4 class="text-md pb-2 text-center">${this.profile.displayName}</h4>
					<h2 class="font-semibold py-2">Game Display Name</h2>
					<text-input
						light
						placeholder="Enter a game name..."
						@input=${this.gameDisplayNameInput.bind(this)}
					></text-input>
					${when(
						displayNameErrors.length > 0,
						() => html`
							<span id="create-game-error" class="font-semibold text-center pt-4 text-red-500">
								${displayNameErrors[0]}</li>
							</span>`
					)}
					<h2 class="font-semibold py-2">Game Name ID</h2>
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
							<span id="create-game-error" class="font-semibold text-center pt-4 text-red-500">
								${nameIdErrors[0]}</li>
							</span>`
					)}
				</div>
				<p class="content text-center py-5 font-semibold">
					We’ll walk you though the details of editing your game later.
				</p>
				<stylized-button
					.trigger=${this.createGame.bind(this)}
					?disabled=${!this.gameIsValid}
					?loading=${this.isCreatingGame}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	buildBackButton() {
		// If back navigation is possible, use function rather than link
		if (RvtRouter.shared.canGoBack) {
			return html` <stylized-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="rgba(0, 0, 0, 0.5)"
				text="white"
			>
				Back
			</stylized-button>`;
		} else {
			return null;
		}
	}

	navigateBack() {
		RvtRouter.shared.navBack();
	}
}
