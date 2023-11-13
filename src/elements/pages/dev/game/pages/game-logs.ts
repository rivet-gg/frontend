import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import styles from './game-logs.scss';
import global from '../../../../../utils/global';
import * as cloud from '@rivet-gg/cloud';
import routes, { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import utils from '../../../../../utils/utils';
import timing from '../../../../../utils/timing';
import { formatExitCodeMessage } from '../../../../../utils/error-signals';

import * as d3 from 'd3';
import numbro from 'numbro';
import { ChartConfig } from '../../../../profile/graph-view';
import RvtRouter from '../../../../root/rvt-router';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';
import { RepeatingRequest } from '../../../../../utils/repeating-request';
import { Rivet } from '@rivet-gg/api-internal';

enum MetricType {
	Cpu,
	Memory
}

interface MetricPoint {
	x: number | Date;
	y: number;
	type: MetricType;
	label: string;
}

const UNKNOWN_REGION = {
	provider: 'unknown',
	providerDisplayName: 'Unknown',
	regionDisplayName: 'Unknown',
	regionId: '00000000-0000-0000-0000-000000000000',
	universalRegion: 0
};

@customElement('page-dev-game-logs')
export default class DevGameLogs extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	// === Game ===
	@property({ type: Object })
	game: cloud.GameFull;

	// === Namespace ===
	@property({ type: String })
	namespaceId: string;

	@property({ type: Array })
	lobbies: cloud.LogsLobbySummary[] = [];

	@property({ type: Boolean })
	isLoadingNamespace = true;

	@property({ type: Boolean })
	moreLobbies = true;

	// === Lobby ===
	@property({ type: String })
	lobbyId?: string;

	@property({ type: Boolean })
	isLoadingLobby = false;

	@property({ type: Array })
	lobbyData: cloud.GetNamespaceLobbyOutput = null;

	// === Logs ===
	@property({ type: Boolean })
	isLoadingLogs = false;

	@property({ type: String })
	logStreamType: cloud.LogStream = cloud.LogStream.STD_OUT;

	@property({ type: Boolean })
	isLogEmpty = true;

	@property({ type: Boolean })
	isFollowingLogs = true;

	@property({ type: Boolean })
	isExportingLogs = false;

	@property({ type: String })
	downloadLogsUrl?: string;

	get downloadLogsFileName(): string {
		let url = this.downloadLogsUrl.split('/');
		return url[url.length - 1];
	}

	@query('#log-content')
	logContent?: HTMLElement;

	logStream?: RepeatingRequest<Rivet.cloud.games.matchmaker.GetLobbyLogsResponse>;

	hasInitiated = false;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if namespace id set
		if (changedProperties.has('namespaceId')) {
			this.resetNamespaceData();
			this.hasInitiated = true;
			this.fetchNamespace(this.lobbyId);
		}

		if (changedProperties.has('lobbyId')) {
			this.resetLobbyData();
			if (this.lobbyId) this.fetchLobby(this.lobbyId);
		}

		// Open log stream if needed
		if (changedProperties.has('logStreamType') || changedProperties.has('lobbyData')) {
			this.resetLogData();

			if (this.lobbyData?.lobby.startTs) {
				if (this.lobbyData.lobby.status.running) {
					this.streamLogs(this.lobbyId, this.logStreamType);
				} else {
					this.fetchLogs(this.lobbyId, this.logStreamType);
				}
			}
		}
	}

	// === Namespace ===
	resetNamespaceData() {
		this.isLoadingNamespace = false;
		if (this.hasInitiated) this.changeLobbySelection(null);
		this.lobbies = [];

		this.resetLobbyData();

		this.requestUpdate();
	}

	async fetchNamespace(initialLobbyId: string) {
		this.isLoadingNamespace = true;

		try {
			// Fetch initial lobbies
			await this.fetchMoreLobbies();

			// Select first lobby if on desktop
			if (this.lobbies.length > 0 && !initialLobbyId)
				this.changeLobbySelection(this.lobbies[0].lobbyId);
		} catch (err) {
			this.loadError = err;
		} finally {
			this.isLoadingNamespace = false;
		}
	}

	/// Fetches more lobbies and appends it to the list.
	///
	/// This is triggered by the "load more" button.
	async fetchMoreLobbies() {
		let lastLobby = this.lobbies[this.lobbies.length - 2];

		try {
			let namespaceId = this.namespaceId;
			let data = await global.cloud.listNamespaceLobbies({
				gameId: this.game.gameId,
				namespaceId,
				beforeCreateTs: lastLobby ? lastLobby.createTs : undefined
			});

			if (this.namespaceId == namespaceId) {
				this.lobbies.push(...data.lobbies);
				this.moreLobbies = data.lobbies.length == 64;
			}
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		}
	}

	// === Lobby ===
	resetLobbyData() {
		this.isLoadingLobby = false;
		this.lobbyData = undefined;
		this.resetLogData();
	}

	/// Used to update which lobby is selected.
	///
	/// This should be used by all lobby ID changes in order to ensure the URL
	/// is up to date.
	changeLobbySelection(lobbyId?: string) {
		if (lobbyId) {
			RvtRouter.shared.navigate(
				routes.devLogLobby.build(
					{ gameId: this.game.gameId, lobbyId: lobbyId, namespaceId: this.namespaceId },
					{ namespaceId: this.namespaceId }
				)
			);
		} else {
			RvtRouter.shared.navigate(
				routes.devLogs.build(
					{ gameId: this.game.gameId, namespaceId: this.namespaceId },
					{ namespaceId: this.namespaceId }
				)
			);
		}
	}

	async fetchLobby(lobbyId: string) {
		this.isLoadingLobby = true;

		try {
			console.log('fetch lobby', lobbyId);
			this.lobbyData = await global.cloud.getNamespaceLobby({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId,
				lobbyId
			});

			this.logStreamType =
				this.lobbyData.lobby.status.stopped?.failed ?? false
					? cloud.LogStream.STD_ERR
					: cloud.LogStream.STD_OUT;

			// HACK: Force logs UI to loading state and wait for the logs to
			// *actually* load in the next call to `updated`. This prevents
			// interruptions in the loading animation. this.resetLogData();
			this.isLoadingLogs = true;
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		} finally {
			this.isLoadingLobby = false;
		}
	}

	// === Logs ===
	resetLogData() {
		this.isLoadingLogs = false;
		this.isLogEmpty = true;
		this.isExportingLogs = false;
		this.downloadLogsUrl = undefined;

		if (this.logContent) this.logContent.innerText = '';
		if (this.logStream) this.logStream.cancel();
	}

	async fetchLogs(lobbyId: string, logStreamType: cloud.LogStream) {
		this.isLoadingLogs = true;

		console.log('fetch logs', lobbyId);

		try {
			let res = await global.cloud.getLobbyLogs({
				gameId: this.game.gameId,
				lobbyId: lobbyId,
				stream: logStreamType
			});

			if (this.logContent) {
				this.isLogEmpty = res.lines.length == 0;

				let content = '';
				for (let line of res.lines) {
					content += window.atob(line) + '\n';
				}
				this.logContent.textContent = content;

				if (this.isFollowingLogs) this.scrollLogsToBottom();
			}
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		} finally {
			this.isLoadingLogs = false;
		}
	}

	async streamLogs(lobbyId: string, logStreamType: cloud.LogStream) {
		this.isLoadingLogs = true;

		this.logStream = new RepeatingRequest('DevGameLogs.logStream', async (abortSignal, watchIndex) => {
			// TODO: Missing abort signal
			return await global.api.cloud.games.matchmaker.getLobbyLogs(this.game.gameId, lobbyId, {
				stream: logStreamType,
				watchIndex
			});
		});

		this.logStream.onMessage(res => {
			this.isLoadingLogs = false;

			if (this.logContent) {
				for (let lineEncoded of res.lines) {
					this.isLogEmpty = false;

					let line = window.atob(lineEncoded);
					if (this.logContent) this.logContent.textContent += line + '\n';

					if (this.isFollowingLogs) this.scrollLogsToBottom();
				}
			}
		});

		this.logStream.onError(err => {
			logging.error('Request error', err);
			globalEventGroups.dispatch('error', err);
		});
	}

	scrollLogsToBottom() {
		this.updateComplete.then(async () => {
			await this.getUpdateComplete();

			if (this.logContent) this.logContent.scrollTop = this.logContent.scrollHeight;
		});
	}

	onLogsScroll() {
		if (this.logContent) {
			this.isFollowingLogs =
				this.logContent.scrollTop >= this.logContent.scrollHeight - this.logContent.clientHeight;
		}
	}

	async exportLogs() {
		if (!this.lobbyId) return;

		this.downloadLogsUrl = undefined;
		this.isExportingLogs = true;

		try {
			let res = await global.cloud.exportLobbyLogs({
				gameId: this.game.gameId,
				lobbyId: this.lobbyId!,
				stream: this.logStreamType
			});

			this.downloadLogsUrl = res.url;
		} catch (err) {
			globalEventGroups.dispatch('error', err);
		} finally {
			this.isExportingLogs = false;
		}
	}

	onLogDownload() {
		this.downloadLogsUrl = undefined;
	}

	// === Render ===
	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		// Find selected lobby
		let selectedLobby = this.lobbyId
			? this.lobbyData?.lobby ?? this.lobbies.find(x => x.lobbyId == this.lobbyId)
			: null;

		// Show placeholder if no lobbies and nothing is loading
		if (!this.isLoadingNamespace && !this.isLoadingLobby && !selectedLobby && this.lobbies.length == 0) {
			return html` <slot name="namespace-select"></slot>
				<div id="base" class="no-lobbies">
					<p class="muted-text">No lobbies found</p>
				</div>`;
		}

		return html`
			<slot name="namespace-select"></slot>
			<div id="base">${this.renderSidebar()}${this.renderBody(selectedLobby)}</div>
		`;
	}

	renderSidebar() {
		return html`<div id="sidebar">
			<dev-game-logs-sidebar
				.game=${this.game}
				.lobbies=${this.lobbies}
				.lobbyId=${this.lobbyId}
				.namespaceId=${this.namespaceId}
				.isLoading=${this.isLoadingNamespace}
				.moreLobbies=${this.moreLobbies}
				@load=${this.fetchMoreLobbies.bind(this)}
			></dev-game-logs-sidebar>
		</div>`;
	}

	renderBody(lobby: cloud.LogsLobbySummary) {
		return html`<div id="body">
			${when(
				this.isLoadingNamespace,
				() => this.renderPlaceholder(),
				() =>
					when(
						lobby,
						() => html`${this.renderMetrics()}${this.renderLog(lobby)}`,
						() =>
							when(
								this.lobbies.length > 0,
								() => html`<p class="muted-text">Select a lobby</p>`,
								() => html`<p class="muted-text">No lobbies found</p>`
							)
					)
			)}
		</div>`;
	}

	renderPlaceholder() {
		return html`<loading-placeholder></loading-placeholder>`;
	}

	renderLog(lobby: cloud.LogsLobbySummary) {
		let statusClasses = classMap({
			active: !!lobby.status.running && !!lobby.startTs,
			failed: !!lobby.status.stopped && lobby.status.stopped.failed
		});

		let regionData = this.game.availableRegions.find(r => r.regionId == lobby.regionId) ?? UNKNOWN_REGION;

		return html`
			<div id="log" class="bordered-area">
				<div class="bordered-area-header">
					<div class="content-header">
						<div class="content-header-left">
							<h2 class="content-header-title">${lobby.lobbyGroupNameId}</h2>
							<h3 id="log-region">${regionData.regionDisplayName}</h3>
							${when(
								lobby.status.stopped !== undefined,
								() => html`
									<h4 id="log-time">
										${utils.formatDateLong(lobby.createTs, true, true)}
										<e-svg src="solid/right-long"></e-svg>
										${utils.formatDateLong(lobby.status.stopped.stopTs, true, true)}
										<b>
											(${utils.formatDuration(
												lobby.status.stopped.stopTs.getTime() -
													lobby.createTs.getTime(),
												{ showSeconds: true }
											)})
										</b>
									</h4>
								`,
								() => html`
									<h4 id="log-time">
										${utils.formatDateLong(lobby.createTs, true, true)}
										<e-svg src="solid/right-long"></e-svg>
										now
										<b
											>(${utils.formatDuration(Date.now() - lobby.createTs.getTime(), {
												showSeconds: true
											})})</b
										>
									</h4>
								`
							)}
							<h4 id="log-time">
								Start:
								<b>
									${when(
										lobby.startTs,
										() =>
											utils.formatDurationLong(
												lobby.startTs.getTime() - lobby.createTs.getTime(),
												false,
												true
											),
										() => 'n/a'
									)}
								</b>
							</h4>
							<h4 id="log-time">
								Ready:
								<b>
									${when(
										lobby.startTs && lobby.readyTs,
										() =>
											utils.formatDurationLong(
												Math.max(
													lobby.readyTs.getTime() - lobby.startTs.getTime(),
													0
												),
												false,
												true
											),
										() => 'n/a'
									)}
								</b>
							</h4>
						</div>
						<div id="header-right">
							<div id="log-status" class=${statusClasses}>
								${formatLobbyStatus(lobby.status, lobby.startTs).toUpperCase()}
							</div>
							${when(
								lobby.status.stopped && lobby.status.stopped.exitCode !== undefined,
								() => html`
									<div id="log-exit-code">
										EXIT CODE:
										<b>${lobby.status.stopped.exitCode}</b>
										${when(
											formatExitCodeMessage(lobby.status.stopped.exitCode),
											() => html`
												<div id="log-exit-code-fancy">
													${formatExitCodeMessage(lobby.status.stopped.exitCode)}
												</div>
											`,
											() => null
										)}
									</div>
								`,
								() => null
							)}
						</div>
					</div>
				</div>
				<div class="bordered-area-body">
					<div id="log-actions">
						<div id="actions-left">
							<!-- Log stream -->
							<div
								class=${classMap({
									action: true,
									selected: this.logStreamType == cloud.LogStream.STD_OUT,
									'segment-left': true
								})}
								@click=${() => (this.logStreamType = cloud.LogStream.STD_OUT)}
							>
								stdout
							</div>
							<div
								class=${classMap({
									action: true,
									error: true,
									selected: this.logStreamType == cloud.LogStream.STD_ERR,
									'segment-right': true
								})}
								@click=${() => (this.logStreamType = cloud.LogStream.STD_ERR)}
							>
								stderr
							</div>

							<!-- Follow -->
							${when(
								lobby.status.running && lobby.startTs,
								() => html`
									<div
										class=${classMap({
											action: true,
											selected: this.isFollowingLogs,
											disabled: this.isFollowingLogs
										})}
										@click=${this.scrollLogsToBottom.bind(this)}
									>
										${this.isFollowingLogs ? 'Following' : 'Follow'}
									</div>
								`
							)}
						</div>
						<div id="actions-right">
							${when(
								lobby.startTs,
								() => html`
									<!-- Download Button -->
									${when(
										this.isExportingLogs,
										() => html`
											<div
												class=${classMap({
													action: true,
													disabled: this.isExportingLogs
												})}
											>
												Exporting...
											</div>
										`
									)}
									${when(
										this.downloadLogsUrl,
										() => html`
											<a
												href=${this.downloadLogsUrl}
												target="_blank"
												download=${this.downloadLogsFileName}
												class="action selected"
												@click=${this.onLogDownload.bind(this)}
											>
												Open Exported Logs
											</a>
										`
									)}

									<!-- Export -->
									<div
										class=${classMap({ action: true, disabled: this.isExportingLogs })}
										@click=${this.exportLogs.bind(this)}
									>
										Export
									</div>
								`
							)}
						</div>
					</div>

					<code
						id="log-content"
						class=${classMap({ active: !this.isLoadingLogs && !this.isLogEmpty })}
						@scroll=${this.onLogsScroll.bind(this)}
					></code>
					${when(
						this.isLoadingLobby || this.isLoadingLogs,
						() => html`<loading-wheel id="log-loading"></loading-wheel> `
					)}
					${when(
						this.isLogEmpty && !this.isLoadingLobby && !this.isLoadingLogs,
						() =>
							html`<div class="muted-text">
								No ${this.logStreamType == cloud.LogStream.STD_OUT ? 'stdout' : 'stderr'}
								logs.<br />Logs older than 48 hours will not show up here.
							</div>`
					)}
				</div>
			</div>
		`;
	}

	renderMetrics() {
		let metrics = this.lobbyData?.metrics;
		if (!metrics) return null;

		let maxMemory = Math.max(metrics.allocatedMemory, Math.max(...metrics.memory)) || 1;
		let timestamps = [...Array(metrics.cpu.length)].map((_, i) => {
			return new Date(Date.now() - (metrics.cpu.length - i) * timing.seconds(15));
		});
		let maxMemoryPercent =
			maxMemory / (metrics.allocatedMemory == 0 ? maxMemory : metrics.allocatedMemory) || 1;

		let maxCpu = Math.max(100, Math.max(...metrics.cpu)) || 100;

		let cpuData = metrics.cpu.map((d, i) => ({
			x: timestamps[i],
			y: d / 100,
			type: MetricType.Cpu,
			label: `CPU ${numbro(d / 100).format('0.0%')}`
		}));
		let memoryData = [
			...metrics.memory.map((d, i) => ({
				x: timestamps[i],
				y: d / maxMemory,
				type: MetricType.Memory,
				label: `MEM ${numbro(d).format('0.0 ib')}`
			}))
		] as MetricPoint[];

		let memoryChartConfig = {
			x: d => d.x,
			y: d => d.y,
			z: d => d.type,
			label: d => d.label,
			color: type =>
				type == MetricType.Cpu ? 'turquoise' : type == MetricType.Memory ? '#00b300' : 'orange',
			curve: d3.curveMonotoneX,
			yDomain: [0, maxMemoryPercent]
		} as ChartConfig<MetricPoint, MetricType>;
		let cpuChartConfig = Object.assign({}, memoryChartConfig);
		cpuChartConfig.yDomain = [0, maxCpu / 100];

		let latestCPULabel = numbro(metrics.cpu[metrics.cpu.length - 1] / 100).format('0.0%');
		let latestMemoryLabel = numbro(metrics.memory[metrics.memory.length - 1]).format('0.0 ib');
		let allocatedMemoryLabel = numbro(metrics.allocatedMemory).format('0.0 ib');

		return html`<div id="metrics" class="bordered-area">
			<div class="bordered-area-header">
				<div class="content-header">
					<div class="content-header-left">
						<h2 class="content-header-title">Live Metrics</h2>
						<div id="legend">
							<div class="key cpu">
								<div class="color"></div>
								<span>CPU <b>${latestCPULabel}</b></span>
							</div>
							<div class="key memory">
								<div class="color"></div>
								<span>Memory <b>${latestMemoryLabel}</b> / ${allocatedMemoryLabel}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="metrics-body" class="bordered-area-body horizontal">
				<div class="body-cell">
					<graph-view .data=${cpuData} .config=${cpuChartConfig}></graph-view>
				</div>
				<div class="body-separator"></div>
				<div class="body-cell">
					<graph-view .data=${memoryData} .config=${memoryChartConfig}></graph-view>
				</div>
			</div>
		</div>`;
	}
}

export function formatLobbyStatus(status: cloud.LogsLobbyStatus, startTs: Date) {
	return status.running !== undefined
		? startTs
			? 'Running'
			: 'Not Started'
		: status.stopped
		? status.stopped.failed
			? 'Failed'
			: 'Closed'
		: 'Unknown status';
}
