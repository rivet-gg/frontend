import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './range-slider.scss';
import timing from '../../utils/timing';
import { repeat } from 'lit/directives/repeat.js';
import { windowEventGroups } from '../../utils/global-events';

const KNOB_SIZE = 20;
const DOT_SIZE = 3;

interface DotGutterConfig {
	at: number;
}

interface LineGutterConfig {
	to: number;
	curve: RangeSliderCurve;
}

interface RangeSliderCurve {
	equation: (x: number) => number;
	inverse: (x: number) => number;
}

export interface RangeSliderConfig {
	// Number bounds
	min: number;
	max: number;
	// Number step
	step?: number;
	// Format result as number
	asFraction?: boolean;
	// Curve applied to 0-1 then scaled to number bounds
	curve?: RangeSliderCurve;
	// Unit added to end of number display
	unit?: string;

	// Whether or not to do the normal smooth slider (in between gutter elements)
	// while gutter is applied
	smoothGutter?: boolean;
	// Gutter elements (dots and lines)
	gutter?: (DotGutterConfig | LineGutterConfig)[];
}

export class SliderChangeEvent extends Event {
	constructor(public value: number) {
		super('change');
	}
}

@customElement('range-slider')
export default class RangeSlider extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	background: string;

	@property({ type: Number })
	knobPosition = 0;
	@property({ type: Number })
	knobMultiplier = 1;

	@property({ type: Number })
	parentWidth = 0;
	observer: ResizeObserver;

	@property({ type: Object })
	config: RangeSliderConfig;
	@property({ type: Number })
	initial: number;

	@query('#slider-knob')
	sliderKnob: HTMLElement;

	activeDrag = false;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handlePointerMove: (e: PointerEvent) => void;
	handlePointerUp: (e: PointerEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));

		// Handle pointer events
		this.handlePointerMove = this.onPointerMove.bind(this);
		windowEventGroups.add('pointermove', this.handlePointerMove, timing.milliseconds(20));

		this.handlePointerUp = this.onPointerUp.bind(this);
		windowEventGroups.add('pointerup', this.handlePointerUp);
		windowEventGroups.add('pointercancel', this.handlePointerUp);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		windowEventGroups.remove('pointermove', this.handlePointerMove, timing.milliseconds(20));
		windowEventGroups.remove('pointerup', this.handlePointerUp);
		windowEventGroups.remove('pointercancel', this.handlePointerUp);
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Create an observer for resizes
		this.observer = new ResizeObserver(() => {
			this.onResize();
		});
		this.observer.observe(this.sliderKnob.parentElement);

		// Update width value for the first time
		this.updateComplete.then(async () => {
			// Waiting for this makes sure that all updates have finished
			await this.getUpdateComplete();

			// Update size and initial value
			this.onResize();
			this.updateKnobPosition();
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update slider if initial property changed
		if (changedProperties.has('initial')) {
			this.updateKnobPosition();
		}
	}

	onResize() {
		// Determine the actual track size for the knob to travel on
		let parent = this.sliderKnob.parentElement.getBoundingClientRect();
		this.knobMultiplier = (parent.width - KNOB_SIZE) / parent.width;
		this.parentWidth = parent.width;
	}

	onPointerDown(e: PointerEvent) {
		this.activeDrag = true;
		this.calculatePosition(e);
	}

	onPointerUp() {
		this.activeDrag = false;
	}

	onPointerMove(e: PointerEvent) {
		if (this.activeDrag) {
			e.preventDefault();
			this.calculatePosition(e);
		}
	}

	calculatePosition(e: PointerEvent) {
		let target = this.sliderKnob;
		let parent = target.parentElement.getBoundingClientRect();
		let height = target.clientHeight;

		let snapPadding = (KNOB_SIZE - DOT_SIZE) / 2 / this.parentWidth;
		let gutterFound = false;
		let dx = this.config.max - this.config.min;
		let equation = this.config.curve ? this.config.curve.equation : (x: number) => x;
		let inverse = this.config.curve ? this.config.curve.inverse : (x: number) => x;

		// Value of slider
		let percentPosition = (e.clientX - parent.left - height / 2) / (parent.width - height);

		// Clamp value
		percentPosition = Math.max(0, Math.min(1, percentPosition));

		// Clamp to step value
		if (this.config.gutter) {
			// Sort gutter so dots are first
			let sorted = Array.from(this.config.gutter);
			sorted.sort((a, b) => +isDotGutterConfig(b) - +isDotGutterConfig(a));

			for (let gutterItem of sorted) {
				// Snap to dots
				if (isDotGutterConfig(gutterItem)) {
					let start = gutterItem.at - snapPadding;
					let end = gutterItem.at + snapPadding;

					// Expand dot hitbox to nearby dots
					if (!this.config.smoothGutter) {
						// Find previous gutter item for start point
						let previous = this.config.gutter[this.config.gutter.indexOf(gutterItem) - 1];
						let next = this.config.gutter[this.config.gutter.indexOf(gutterItem) + 1];

						start = previous
							? isDotGutterConfig(previous)
								? gutterItem.at - (gutterItem.at - previous.at) / 2
								: Math.min(start, previous.to)
							: 0;
						end = next
							? isDotGutterConfig(next)
								? gutterItem.at + (next.at - gutterItem.at) / 2
								: end
							: 1;
					}

					if (percentPosition >= start && percentPosition <= end) {
						percentPosition = gutterItem.at;

						// Broadcast value
						let scaled = dx * percentPosition + this.config.min;
						let value = Math.max(this.config.min, Math.min(this.config.max, scaled));

						let event = new SliderChangeEvent(value);
						this.dispatchEvent(event);

						gutterFound = true;
						break;
					}
				}
				// Along gutter lines
				else {
					// Find previous gutter item for start point
					let previous = this.config.gutter[this.config.gutter.indexOf(gutterItem) - 1];

					let start = previous ? (isDotGutterConfig(previous) ? previous.at : previous.to) : 0;
					let end = gutterItem.to;

					if (percentPosition >= start && percentPosition <= end) {
						// Broadcast value
						let curveValue = gutterItem.curve.equation(percentPosition);
						let scaled = dx * equation(curveValue) + this.config.min;

						if (this.config.step) {
							curveValue = Math.round(scaled / this.config.step) * this.config.step;

							// Revert to normalized value
							let steppedValue = dx * equation(percentPosition) + this.config.min;
							percentPosition = inverse((steppedValue - this.config.min) / dx);
						}

						let event = new SliderChangeEvent(curveValue);
						this.dispatchEvent(event);

						gutterFound = true;
						break;
					}
				}
			}
		}

		// Resume normal slider if no gutter was used
		if (!gutterFound && (this.config.gutter ? this.config.smoothGutter : true)) {
			if (this.config.step) {
				let scaled = (dx * equation(percentPosition) + this.config.min) / this.config.step;
				let steppedValue = Math.round(scaled) * this.config.step;

				// Broadcast value
				let value = Math.max(this.config.min, Math.min(this.config.max, steppedValue));
				let event = new SliderChangeEvent(value);
				this.dispatchEvent(event);

				// Revert to normalized value
				percentPosition = inverse((steppedValue - this.config.min) / dx);
			} else {
				// Broadcast value
				let scaled = dx * equation(percentPosition) + this.config.min;
				let value = Math.max(this.config.min, Math.min(this.config.max, scaled));
				let event = new SliderChangeEvent(value);
				this.dispatchEvent(event);
			}
		}

		// Update knob position
		this.knobPosition = percentPosition;
	}

	// Inverse of calculatePosition
	updateKnobPosition() {
		let inverse = this.config.curve ? this.config.curve.inverse : (x: number) => x;
		let dx = this.config.max - this.config.min;
		let gutterFound = false;

		let position = this.initial;

		// Clamp to step value
		if (this.config.gutter) {
			// Sort gutter so dots are first
			let sorted = Array.from(this.config.gutter);
			sorted.sort((a, b) => +isDotGutterConfig(b) - +isDotGutterConfig(a));

			for (let gutterItem of sorted) {
				// Snap to dots
				if (isDotGutterConfig(gutterItem)) {
					let start = gutterItem.at;
					let end = gutterItem.at;

					// Expand dot hitbox to nearby dots
					if (!this.config.smoothGutter) {
						// Find previous gutter item for start point
						let previous = this.config.gutter[this.config.gutter.indexOf(gutterItem) - 1];
						let next = this.config.gutter[this.config.gutter.indexOf(gutterItem) + 1];

						start = previous
							? isDotGutterConfig(previous)
								? gutterItem.at - (gutterItem.at - previous.at) / 2
								: Math.min(start, previous.to)
							: 0;
						start = start * dx + this.config.min;

						end = next
							? isDotGutterConfig(next)
								? gutterItem.at + (next.at - gutterItem.at) / 2
								: end
							: 1;
						end = end * dx + this.config.min;
					}

					if (position >= start && position <= end) {
						position = gutterItem.at * dx + this.config.min;

						gutterFound = true;
						break;
					}
				}
				// Along gutter lines
				else {
					// Find previous gutter item for start point
					let previous = this.config.gutter[this.config.gutter.indexOf(gutterItem) - 1];
					let start = previous ? (isDotGutterConfig(previous) ? previous.at : previous.to) : 0;
					let end = gutterItem.to;

					let eqStart = gutterItem.curve.equation(start) * dx + this.config.min;
					let eqEnd = gutterItem.curve.equation(end) * dx + this.config.min;

					if (position >= Math.min(eqStart, eqEnd) && position <= Math.max(eqStart, eqEnd)) {
						position = Math.max(
							0,
							Math.min(1, inverse((gutterItem.curve.inverse(position) - this.config.min) / dx))
						);

						if (this.config.step) {
							position = Math.round(position / this.config.step) * this.config.step;
						}

						gutterFound = true;
						return;
					}
				}
			}
		}

		// Clamp value
		position = Math.max(this.config.min, Math.min(this.config.max, position));

		// Resume normal slider if no gutter was used
		if (!gutterFound && (this.config.gutter ? this.config.smoothGutter : true)) {
			if (this.config.step) {
				position = Math.round(position / this.config.step) * this.config.step;
			}
		}

		// Update knob position
		this.knobPosition = Math.max(0, Math.min(1, inverse((position - this.config.min) / dx)));
	}

	render() {
		let style = styleMap({
			'--background': this.background ? this.background : null
		});

		let knobPosition = this.knobPosition * 100 * this.knobMultiplier;
		let knobStyle = styleMap({
			left: `${knobPosition}%`
		});

		let amountStyle = styleMap({
			width: `${knobPosition}%`
		});

		return html`<div id="base" style=${style} @pointerdown=${this.onPointerDown.bind(this)}>
			${this.config.gutter ? this.renderGutter() : null}
			<div id="slider-amount" style=${amountStyle}></div>
			<div id="slider-knob" style=${knobStyle} @pointerdown=${this.onPointerDown.bind(this)}></div>
		</div>`;
	}

	renderGutter() {
		let dots = this.config.gutter.filter(isDotGutterConfig);
		let lines = this.config.gutter.filter(isLineGutterConfig);
		let snapPadding = (KNOB_SIZE - DOT_SIZE) / 2 / this.parentWidth;

		return html`<div id="gutter">
			${repeat(
				dots,
				d => d.at,
				d => {
					let dotStyle = styleMap({
						left: `${d.at * 100 * this.knobMultiplier}%`
					});

					return html`<div class="dot" style=${dotStyle}></div>`;
				}
			)}
			${repeat(
				lines,
				l => l.to,
				l => {
					let previous = this.config.gutter[this.config.gutter.indexOf(l) - 1];
					let next = this.config.gutter[this.config.gutter.indexOf(l) + 1];
					let start = previous ? (isDotGutterConfig(previous) ? previous.at : previous.to) : 0;
					let end = next
						? isDotGutterConfig(next)
							? Math.max(start, Math.min(l.to, next.at - snapPadding))
							: l.to
						: 1;
					end += DOT_SIZE / this.parentWidth;

					if (start != 0) start += snapPadding;

					let lineStyle = styleMap({
						left: `${start * 100 * this.knobMultiplier}%`,
						width: `${(end - start) * 100 * this.knobMultiplier}%`
					});

					return html`<div class="line" style=${lineStyle}></div>`;
				}
			)}
		</div>`;
	}
}

function isDotGutterConfig(item: object): item is DotGutterConfig {
	return item.hasOwnProperty('at');
}

function isLineGutterConfig(item: object): item is LineGutterConfig {
	return !item.hasOwnProperty('at');
}
