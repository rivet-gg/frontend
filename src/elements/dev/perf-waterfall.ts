import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './perf-waterfall.scss';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import cloud from '@rivet-gg/cloud';
import { tooltip } from '../../ui/helpers';

const TIME_SCALE = 1000000;

// TODO: If there is no path to a SvcPerf via a tree of req ids, show that SvgPerf along with
// the top most valid path
// TODO: Make rpc event marks clickable and fetch the ray that sent the event

@customElement('perf-waterfall')
export default class PerfWaterfall extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	perfLists: cloud.SvcPerf[] = [];

	@property({ type: Array })
	navigationPath: string[] = [];

	selectRpcBlock(reqId: string) {
		this.navigationPath.push(reqId);
		this.requestUpdate('navigationPath');
	}

	navigateTo(reqId: string) {
		for (let i = this.navigationPath.length - 1; i >= 0; i--) {
			if (this.navigationPath[this.navigationPath.length - 1] == reqId) break;
			this.navigationPath.pop();
		}

		this.requestUpdate('navigationPath');
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Reset nav path if new perf list is loaded
		if (changedProperties.has('perfLists')) {
			this.navigationPath.length = 0;
		}
	}

	render() {
		this.perfLists.sort((a, b) => a.ts.getTime() - b.ts.getTime()); // Sort by timestamp

		let lastReqId =
			this.navigationPath.length != 0 ? this.navigationPath[this.navigationPath.length - 1] : null;
		let selectedList =
			lastReqId !== null ? this.perfLists.find(a => a.reqId == lastReqId) : this.perfLists[0];

		// Get last timestamp
		let finishTs = Math.max(
			selectedList.spans.length
				? selectedList.spans[selectedList.spans.length - 1].finishTs.getTime()
				: 0,
			selectedList.marks.length ? selectedList.marks[selectedList.marks.length - 1].ts.getTime() : 0
		);
		// Get first timestamps
		let startTs = Math.min(
			selectedList.spans.length ? selectedList.spans[0].startTs.getTime() : 0,
			selectedList.marks.length ? selectedList.marks[0].ts.getTime() : 0
		);

		// Get total duration
		let totalDuration = finishTs - startTs;

		// Format request duration
		let reqDurationFormatted: string | number = selectedList.duration / TIME_SCALE;
		reqDurationFormatted =
			reqDurationFormatted < 1 ? reqDurationFormatted.toFixed(3) : Math.round(reqDurationFormatted);

		let pathList = [this.perfLists[0].reqId, ...this.navigationPath];

		return html`<div id="base">
			<div class="group">
				<div class="header">
					<div class="path">
						${repeat(
							pathList.slice(-3),
							r => r,
							(reqId, i) => {
								let svcName =
									this.perfLists.find(a => a.reqId == reqId).svcName ?? '<Unnamed>';

								return html`<div
									class="path-segment"
									@click=${this.navigateTo.bind(this, reqId)}
								>
									${i != 0
										? html`<e-svg src="solid/angle-right"></e-svg>`
										: pathList.length > 3
										? html`<e-svg class="ellipsis" src="solid/ellipsis"></e-svg>`
										: null}
									<span>${svcName}</span>
								</div>`;
							}
						)}
					</div>
					<span class="duration" @mouseenter=${tooltip('Request Duration')}
						>${reqDurationFormatted}ms</span
					>
				</div>
				<div class="content">
					<div class="labels">
						${repeat(
							selectedList.spans,
							b => b.startTs,
							b =>
								html`<h3 class="item-label">
									<span @mouseenter="${tooltip(b.label)})}">${b.label}</span>
								</h3>`
						)}
					</div>
					<div class="items">
						${repeat(
							selectedList.spans,
							b => b.startTs,
							b => {
								// Create style for positioning and size of block
								let duration =
									(b.finishTs != null ? b.finishTs.getTime() : finishTs) -
									b.startTs.getTime();
								let width = (100 * duration) / totalDuration;
								let blockStyle = styleMap({
									'margin-left': `${
										(100 * (b.startTs.getTime() - startTs)) / totalDuration
									}%`,
									width: `${width}%`
								});

								let hasChildren =
									b.reqId !== undefined && this.perfLists.some(a => a.reqId == b.reqId);
								let blockClasses = classMap({
									block: true,
									rpc: hasChildren,
									dnf: b.finishTs == null
								});

								// Format start ts
								let spanStartTs = b.startTs.getTime() / TIME_SCALE;
								let startTsFormatted: string =
									(spanStartTs < 1
										? spanStartTs.toFixed(3)
										: Math.round(spanStartTs).toString()) + 'ms';

								// Format finish ts
								let finishTsFormatted: string;
								let durationFormatted: string;
								if (b.finishTs != null) {
									let spanFinishTs = b.finishTs.getTime() / TIME_SCALE;
									let spanDuration = duration / TIME_SCALE;
									finishTsFormatted =
										(spanFinishTs < 1
											? spanFinishTs.toFixed(3)
											: Math.round(spanFinishTs).toString()) + 'ms';
									durationFormatted =
										(spanDuration < 1
											? spanDuration.toFixed(3)
											: Math.round(spanDuration).toString()) + 'ms';
								} else {
									finishTsFormatted = 'DNF';
									durationFormatted = 'DNF';
								}

								return html`<div class="item">
									<div
										class=${blockClasses}
										style=${blockStyle}
										@mouseenter=${tooltip(`${startTsFormatted} - ${finishTsFormatted}`)}
										@click=${hasChildren ? this.selectRpcBlock.bind(this, b.reqId) : null}
									></div>
									<span class="item-duration">${durationFormatted}</span>
								</div>`;
							}
						)}
						${selectedList.marks.length
							? html`<div class="item">
									${repeat(
										selectedList.marks,
										m => m.ts,
										m => {
											// Create style for positioning mark
											let markStyle = styleMap({
												left: `${(100 * (m.ts.getTime() - startTs)) / totalDuration}%`
											});

											let hasChildren =
												m.reqId !== undefined &&
												this.perfLists.some(a => a.reqId == m.reqId);
											let markClasses = classMap({
												mark: true,
												rpc: hasChildren
											});

											// Formatted timestamp
											let tsFormatted: string | number = m.ts.getTime() / TIME_SCALE;
											tsFormatted =
												tsFormatted < 1
													? tsFormatted.toFixed(3)
													: Math.round(tsFormatted);

											return html`<div
												class=${markClasses}
												style=${markStyle}
												@click=${hasChildren
													? this.selectRpcBlock.bind(this, m.reqId)
													: null}
											>
												<div
													class="mouse-over"
													@mouseenter=${tooltip(`${m.label} - ${tsFormatted}ms`)}
												>
													<div class="extendo-block"></div>
													<div class="block"></div>
													<div class="bulb"></div>
												</div>
											</div>`;
										}
									)}
							  </div>`
							: null}
					</div>
				</div>
			</div>
		</div>`;
	}
}
