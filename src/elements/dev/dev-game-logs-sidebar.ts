import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './dev-game-logs-sidebar.scss';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { tooltip } from '../../ui/helpers';
import cloud from '@rivet-gg/cloud';
import { formatLobbyStatus } from '../pages/dev/game-logs';
import logging from '../../utils/logging';
import UIRouter from '../root/ui-router';
import routes from '../../routes';

@customElement('dev-game-logs-sidebar')
export default class DevGameLogsSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Array })
	lobbies: cloud.LogsLobbySummary[] = [];

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
			<div id="base">
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
											<stylized-button
												color="#595959"
												.trigger=${this.loadMore.bind(this)}
												>Load more</stylized-button
											>
										</div>
								  `
								: null}
					  `}
			</div>
		`;
	}

	renderLobby(lobby: cloud.LogsLobbySummary) {
		let classes = classMap({
			lobby: true,
			selected: lobby.lobbyId == this.lobbyId
		});

		let statusClasses = classMap({
			status: true,
			active: lobby.status.running !== undefined,
			failed: lobby.status.stopped !== undefined && lobby.status.stopped.failed
		});

		return html`<a
			class=${classes}
			href=${routes.devLogLobby.build(
				{ gameId: this.game.gameId, lobbyId: lobby.lobbyId, namespaceId: this.namespaceId },
				{ namespaceId: this.namespaceId }
			)}
		>
			<div class="lobby-title">
				<h3>${lobby.lobbyGroupNameId}</h3>
			</div>
			<div
				class=${statusClasses}
				@mouseenter=${tooltip(formatLobbyStatus(lobby.status, lobby.startTs))}
			></div>
		</a>`;
	}
}
