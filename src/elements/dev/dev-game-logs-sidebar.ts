import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { tooltip } from '../../ui/helpers';
import { Rivet } from '@rivet-gg/api';
import { formatLobbyStatus, getLobbyStatus, UNKNOWN_REGION } from '../pages/dev/game/pages/game-logs';
import routes from '../../routes';
import { tv } from 'tailwind-variants';
import { getRegionEmoji } from '../../utils/emoji';

const statusBadgeClasses = tv({
	base: ['w-2', 'h-2', 'rounded-full'],
	variants: {
		status: {
			running: ['bg-green-500'],
			closed: ['bg-red-500'],
			failed: ['bg-red-500'],
			'not-started': ['bg-green-500'],
			unknown: ['bg-gray-500']
		}
	}
});

@customElement('dev-game-logs-sidebar')
export default class DevGameLogsSidebar extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@property({ type: Array })
	lobbies: Rivet.cloud.LogsLobbySummary[] = [];

	@property({ type: String })
	namespaceId: string;

	@property({ type: String })
	lobbyId: string = null;

	@property({ type: Boolean })
	isLoading = false;

	@property({ type: Boolean })
	moreLobbies = true;

	async loadMore() {
		this.dispatchEvent(new Event('load'));
	}

	render() {
		return html`
			<div class="flex flex-col gap-2">
				${this.isLoading
					? html`
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
					  `
					: html`
							${repeat(this.lobbies, l => l.lobbyId, this.renderLobby.bind(this))}
							${this.moreLobbies
								? html`
										<div id="footer">
											<rvt-button variant="secondary" @click=${this.loadMore.bind(this)}
												>Load more</rvt-button
											>
										</div>
								  `
								: null}
					  `}
			</div>
		`;
	}

	renderLobby(lobby: Rivet.cloud.LogsLobbySummary) {
		let regionData = this.game.availableRegions.find(r => r.regionId == lobby.regionId) ?? UNKNOWN_REGION;

		return html`<rvt-button
			type="a"
			variant="secondary"
			class="w-full flex justify-between"
			?aria-selected=${lobby.lobbyId == this.lobbyId}
			href=${routes.devLogLobby.build(
				{ gameId: this.game.gameId, lobbyId: lobby.lobbyId, namespaceId: this.namespaceId },
				{ namespaceId: this.namespaceId }
			)}
		>
			<span>
				<e-svg class="w-3 h-3 mr-1" preserve src=${getRegionEmoji(regionData.regionNameId)}></e-svg>
				${lobby.lobbyGroupNameId}
			</span>
			${this.renderLobbyStatus(lobby)}
		</rvt-button>`;
	}

	renderLobbyStatus(lobby: Rivet.cloud.LogsLobbySummary) {
		let status = getLobbyStatus(lobby.status, lobby.startTs);

		if (status === 'not-started') {
			return html`<span class="animate-spin" @mouseenter=${tooltip(
				formatLobbyStatus(lobby.status, lobby.startTs)
			)}><e-svg src="solid/spinner-third" preserve></span>`;
		}

		if (status === 'failed') {
			return html`<e-svg
				class="text-red-500"
				src="solid/triangle-exclamation"
				preserve
				@mouseenter=${tooltip(formatLobbyStatus(lobby.status, lobby.startTs))}
			></e-svg>`;
		}

		return html` <div
			class=${statusBadgeClasses({
				status: getLobbyStatus(lobby.status, lobby.startTs)
			})}
			@mouseenter=${tooltip(formatLobbyStatus(lobby.status, lobby.startTs))}
		></div>`;
	}
}
