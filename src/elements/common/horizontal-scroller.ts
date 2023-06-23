import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { windowEventGroups } from '../../utils/global-events';
import timing, { Debounce } from '../../utils/timing';
import styles from './horizontal-scroller.scss';
import { classMap } from 'lit/directives/class-map.js';

@customElement('horizontal-scroller')
export default class HorizontalScroller extends LitElement {
	static styles = cssify(styles);

	@query('#base')
	baseElement: HTMLDivElement;

	@query('#item-container')
	itemContainer: HTMLDivElement;

	@query('#left-button')
	leftButton: HTMLDivElement;

	@query('#right-button')
	rightButton: HTMLDivElement;

	@property({ type: String, attribute: 'more-link' })
	moreLink?: string;

	@property({ type: String, attribute: 'no-padding' })
	noPadding = false;

	/// How much to scroll every time the next or previous button is clicked.
	pagingIncrement: number = (225 + 16 * 2) * 2;

	/// Current offset of the scroller.
	scrollOffset = 0;

	/// Maximum distance the scroller can scroll.
	get maxScroll(): number {
		return (
			this.itemContainer.getBoundingClientRect().width - this.baseElement.getBoundingClientRect().width
		);
	}

	/// Debounce to remove the timer from the scroller.
	removeAnimationDebounce: Debounce;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleWheel: (e: WheelEvent) => void;

	constructor() {
		super();

		this.removeAnimationDebounce = new Debounce({
			delay: timing.seconds(0.1),
			cb: () => {
				this.itemContainer.classList.toggle('no-animation', false);
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		// Listen for resize and update state
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));

		// Listen for scroll events
		this.handleWheel = this.onWheel.bind(this);
		this.addEventListener('wheel', this.handleWheel);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		this.removeEventListener('wheel', this.handleWheel);
	}

	firstUpdated(p: PropertyValues) {
		super.firstUpdated(p);

		// Update controls
		setTimeout(() => this.updateControls(), 0);
	}

	onResize() {
		this.triggerScroll(0);
	}

	onWheel(event: WheelEvent) {
		// Don't do anything if no X delta
		// if (event.deltaX == 0) return;

		// Don't do anything if scrolling more vertically than horizontally
		if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) return;

		// Scroll container
		this.triggerScroll(event.deltaX);

		// Remove scroll animation so horizontal scrolling is smooth
		this.itemContainer.classList.toggle('no-animation', true);
		this.removeAnimationDebounce.trigger();

		// Don't do any scrolling
		event.preventDefault();
	}

	triggerScroll(delta = 0) {
		// Get max scroll
		let maxScroll = this.maxScroll;

		// Set new offset; we increase it by the size of a tile + padding
		this.scrollOffset += delta;
		this.scrollOffset = Math.max(Math.min(this.scrollOffset, maxScroll), 0);

		// Set style
		this.itemContainer.style.transform = `translateX(${-this.scrollOffset}px)`;

		// Update controls
		this.updateControls();
	}

	updateControls() {
		this.leftButton.hidden = this.scrollOffset <= 0;
		this.rightButton.hidden = this.scrollOffset >= this.maxScroll;
	}

	render() {
		return html`
			<div id="base" class=${classMap({ padding: !this.noPadding })}>
				<!-- Item Container -->
				<div id="item-container">
					<!-- Game List -->
					<slot></slot>

					<!-- See More -->
					${this.moreLink
						? html`<a id="see-more-button" href=${this.moreLink}
								>More <e-svg src="missing"></e-svg
						  ></a>`
						: null}
				</div>

				<!-- Controls -->
				<div
					id="left-button"
					class="scroll-button"
					@click=${() => this.triggerScroll(-this.pagingIncrement)}
				>
					<e-svg src="missing"></e-svg>
				</div>
				<div
					id="right-button"
					class="scroll-button"
					@click=${() => this.triggerScroll(this.pagingIncrement)}
				>
					<e-svg src="missing"></e-svg>
				</div>
			</div>
		`;
	}
}
