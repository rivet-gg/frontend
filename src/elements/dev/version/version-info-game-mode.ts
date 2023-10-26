import { LitElement, PropertyValues, html, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../../utils/css';
import styles from './version-info-game-mode.scss';
import cloud from '@rivet-gg/cloud';
import { classMap } from 'lit/directives/class-map.js';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { DropDownSelectEvent } from '../drop-down-list';
import TextInput from '../text-input';
import * as ext from './ext';

// See game-version-validate
const PLAYER_COUNT_MAX = 256;
const IDLE_LOBBY_COUNT_MIN_MAX = 16;
const IDLE_LOBBY_COUNT_MAX = 32;
const DEFAULT_TIER_NAME_ID = 'basic-1d2';

@customElement('dev-version-info-game-mode')
export class DevVersionInfoLobbyGroup extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: ext.GameModeExt;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@property({ type: String })
	tierNameIdValue: string = DEFAULT_TIER_NAME_ID;

	@property({ type: Number })
	minIdleLobbiesValue = 0;
	@property({ type: Number })
	maxIdleLobbiesValue = 0;

	@query('#name-id-input')
	nameIdInput: TextInput;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Preload existing values
		this.tierNameIdValue = this.config.regions.length
			? this.config.regions[0].region.tier
			: DEFAULT_TIER_NAME_ID;
		this.minIdleLobbiesValue = this.config.regions.length
			? this.config.regions[0].region.idleLobbies
				? this.config.regions[0].region.idleLobbies.min
				: 1
			: 0;
		this.maxIdleLobbiesValue = this.config.regions.length
			? this.config.regions[0].region.idleLobbies
				? this.config.regions[0].region.idleLobbies.max
				: 3
			: 0;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('config')) {
			if (this.nameIdInput) this.nameIdInput.reset();
		}
	}

	removeLobbyGroup() {
		this.dispatchEvent(new Event('remove'));
	}

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new Event('update'));
	}

	// MARK: Region
	toggleRegion(nameId: string) {
		let hasRegion = this.config.regions.findIndex(x => x.nameId == nameId) == -1;

		if (hasRegion) {
			this.config.regions.push({
				nameId,
				region: {
					idleLobbies: {
						min: this.minIdleLobbiesValue,
						max: this.maxIdleLobbiesValue
					}
				}
			});
		} else {
			this.config.regions = this.config.regions.filter(x => x.nameId != nameId);
		}

		this.updateConfig();
	}

	changeNameId(event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.config.nameId = target.value;

		this.updateConfig();
	}

	changePlayerCount(key: 'maxPlayers' | 'maxPlayersDirect' | 'maxPlayersParty', event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) (this.config as any)[key] = value;

		this.updateConfig();
	}

	changeTierValue(event: DropDownSelectEvent<string>) {
		this.tierNameIdValue = event.selection.value;
		this.config.gameMode.tier = this.tierNameIdValue;

		this.updateConfig();
	}

	changeMinIdleLobbiesValue(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.minIdleLobbiesValue = value;

		// Update existing region configs
		this.config.regions.forEach(region => {
			if (!region.region.idleLobbies) {
				region.region.idleLobbies = {
					min: this.minIdleLobbiesValue,
					max: this.maxIdleLobbiesValue
				};
			} else {
				region.region.idleLobbies.min = this.minIdleLobbiesValue;
			}
		});

		this.updateConfig();
	}

	changeMaxIdleLobbiesValue(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.maxIdleLobbiesValue = value;

		// Update existing region configs
		this.config.regions.forEach(region => {
			if (!region.region.idleLobbies) {
				region.region.idleLobbies = {
					min: this.minIdleLobbiesValue,
					max: this.maxIdleLobbiesValue
				};
			} else {
				region.region.idleLobbies.max = this.maxIdleLobbiesValue;
			}
		});

		this.updateConfig();
	}

	render() {
		let nameErrors = [
			...this.errors.findFormatted('name-not-unique'),
			...this.errors.findFormatted('name-id-invalid')
		];

		let regionError = this.errors.findFormatted('no-regions')[0];
		let playerCountErrors = this.errors.findFormatted('player-counts');
		let firstRegionNameId = this.config.regions.length ? `*${this.config.regions[0].nameId}*` : null;
		let idleLobbyCountErrors = this.errors.findFormatted('regions', firstRegionNameId, 'idle-lobbies');

		let tierOptions = this.tiers.map(v => ({
			template: html`<e-svg class="left-icon" preserve src=${`billing/core/${v.tierNameId}`}></e-svg
				>${v.tierNameId
					.replace('basic', 'Basic')
					.replace(/-/g, ' ')
					.replace(/(\d+)d(\d+)/, '$1/$2')}`,
			value: v.tierNameId
		}));
		let tierSelection = tierOptions.find(v => v.value == this.tierNameIdValue);

		return html`
			<div id="base">
				${this.editing
					? html`<icon-button
							id="close"
							src="solid/xmark"
							.trigger=${this.removeLobbyGroup.bind(this)}
					  ></icon-button>`
					: null}

				<h4>Name ID</h4>
				${nameErrors.length ? html`<error-list .errors=${nameErrors}></error-list>` : null}
				${this.editing
					? html`<text-input
							id="name-id-input"
							class="medium"
							.init=${this.config.nameId}
							@input=${this.changeNameId.bind(this)}
					  ></text-input>`
					: html`<p class="immut-info medium">${this.config.nameId}</p>`}

				<div id="args" class="column-split">
					<div class="column">
						<h4>Player Counts</h4>
						${playerCountErrors.length
							? html`<error-list .errors=${playerCountErrors}></error-list>`
							: null}
						<div class="row">
							${this.renderPlayerCount('General', 'maxPlayers')}
							${this.renderPlayerCount('Direct', 'maxPlayersDirect')}
							${this.renderPlayerCount('Party', 'maxPlayersParty')}
						</div>
						<h4>Idle Lobby Count</h4>
						${idleLobbyCountErrors.length
							? html`<error-list .errors=${idleLobbyCountErrors}></error-list>`
							: null}
						<div class="row">
							<div class="idle-lobby-count">
								<h5>Min</h5>
								${this.editing
									? html`<text-input
											class="short"
											number
											placeholder="Count"
											.min=${0}
											.max=${IDLE_LOBBY_COUNT_MIN_MAX}
											.init=${this.minIdleLobbiesValue.toString()}
											@input=${this.changeMinIdleLobbiesValue.bind(this)}
									  ></text-input>`
									: html`<p class="immut-info">${this.minIdleLobbiesValue}</p>`}
							</div>
							<div class="idle-lobby-count">
								<h5>Max</h5>
								${this.editing
									? html`<text-input
											class="short"
											number
											placeholder="Count"
											.min=${0}
											.max=${IDLE_LOBBY_COUNT_MAX}
											.init=${this.maxIdleLobbiesValue.toString()}
											@input=${this.changeMaxIdleLobbiesValue.bind(this)}
									  ></text-input>`
									: html`<p class="immut-info">${this.maxIdleLobbiesValue}</p>`}
							</div>
						</div>
						<h4>Tier Configuration</h4>
						${this.editing
							? html`<drop-down-list
									filter
									.selection=${tierSelection}
									.options=${tierOptions}
									@select=${this.changeTierValue.bind(this)}
							  ></drop-down-list>`
							: html`<p class="immut-info">${tierSelection.template}</p>`}
					</div>
					<div class="column">
						<h4>Regions</h4>
						${regionError ? html`<error-list .errors=${[regionError]}></error-list>` : null}
						<div id="regions" class="list">
							${repeat(
								this.game.availableRegions,
								r => r.regionNameId,
								this.renderRegion.bind(this)
							)}
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderPlayerCount(label: string, key: 'maxPlayers' | 'maxPlayersDirect' | 'maxPlayersParty') {
		return html`
			<div class="player-count">
				<h5>${label}</h5>
				${this.editing
					? html`<text-input
							class="short"
							number
							placeholder="Count"
							.min=${1}
							.max=${PLAYER_COUNT_MAX}
							.init=${this.config.gameMode[key].toString()}
							@input=${this.changePlayerCount.bind(this, key)}
					  ></text-input>`
					: html`<p class="immut-info">${this.config.gameMode[key]}</p>`}
			</div>
		`;
	}

	renderRegion(region: cloud.RegionSummary, index: number) {
		let regionErrors = this.errors
			.find('regions', index)
			.filter(a => !a.path.includes('idle-lobbies'))
			.map(a => a.format());

		let hasRegion = this.config.regions.findIndex(x => x.nameId == region.regionNameId) != -1;

		let classes = classMap({
			region: true,
			item: true,
			selected: hasRegion
		});

		if (this.editing) {
			return html`${regionErrors.length
					? html`<error-list .errors=${regionErrors}></error-list>`
					: null}
				<div class=${classes} @click=${this.toggleRegion.bind(this, region.regionNameId)}>
					<div class="region-info">
						<h3>${region.regionDisplayName}</h3>
					</div>
					<check-box ?checked=${hasRegion}></check-box>
				</div>`;
		} else {
			if (hasRegion) {
				return html` <div class="region immut-info">
					<div class="region-info">
						<h3>${region.regionDisplayName}</h3>
					</div>
				</div>`;
			} else {
				return null;
			}
		}
	}
}
