import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './identity-notification.scss';
import { classMap } from 'lit/directives/class-map.js';

import { styleMap } from 'lit/directives/style-map.js';
import utils, { SwipeDirection } from '../../utils/utils';
import { MIN_SWIPE_THRESHOLD } from '../root/ui-root';
import * as api from '../../utils/api';

type TriggerResult = Promise<any> | void;

@customElement('identity-notification')
export default class IdentityNotification extends LitElement {
	static styles = cssify(styles);

	@property({ type: Number })
	timestamp: number;

	@property({ type: Boolean })
	temporary = false;

	@property({ type: Boolean, attribute: 'error' })
	isError = false;

	// === TOUCH DATA ===
	startTouch: Touch = null;
	startTouchTime: number = null;
	swipeActive = false;
	swipeDirection: SwipeDirection = SwipeDirection.None;
	@property({ type: Boolean })
	sidebarOpen = false;
	@property({ type: Number })
	touchDifferenceX: number = null;
	@property({ type: Number })
	touchDifferenceY: number = null;

	@property({ type: Function })
	trigger?: (ev?: Event) => TriggerResult = null;

	onClick(ev: MouseEvent) {
		if (ev.button == 2) this.close();
		else if (ev.button == 0 && this.trigger) this.trigger(ev);

		// Dispatch opened event
		this.dispatchEvent(new Event('opened'));
	}

	close(e?: Event) {
		// Prevent click event from propagating down and opening the notification
		if (e) e.stopPropagation();

		// Dispatch close event
		this.dispatchEvent(new Event('close'));
	}

	onTouchStart(e: TouchEvent) {
		this.startTouch = e.changedTouches[0];
		this.startTouchTime = performance.now();
		this.touchDifferenceX = 0;
		this.touchDifferenceY = 0;
	}

	onTouchMove(e: TouchEvent) {
		if (this.startTouch) {
			this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
			this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

			// If no swipe is currently active, check for swipe
			if (!this.swipeActive) {
				// Check if a swipe has occurred
				if (
					Math.abs(this.touchDifferenceX) > MIN_SWIPE_THRESHOLD ||
					Math.abs(this.touchDifferenceY) > MIN_SWIPE_THRESHOLD
				) {
					this.swipeDirection = utils.determineSwipeDirection(
						this.touchDifferenceX,
						this.touchDifferenceY
					);

					// Detect horizontal swipe or up swipe
					if (
						this.swipeDirection == SwipeDirection.Up ||
						this.swipeDirection == SwipeDirection.Right ||
						this.swipeDirection == SwipeDirection.Left
					)
						this.swipeActive = true;
					// Cancel swipe if vertical swipe detected
					else this.stopTouch();
				}
			}

			// Not part of the previous if statement because swipeDirection mutates
			if (this.swipeActive) {
				// Offset the swipe distance after a swipe is detected
				if (this.swipeDirection == SwipeDirection.Up) {
					this.touchDifferenceY += MIN_SWIPE_THRESHOLD;
				} else if (this.swipeDirection == SwipeDirection.Right) {
					this.touchDifferenceX -= MIN_SWIPE_THRESHOLD;
				} else if (this.swipeDirection == SwipeDirection.Left) {
					this.touchDifferenceX += MIN_SWIPE_THRESHOLD;
				}
			}
		}
	}

	onTouchEnd(e: TouchEvent) {
		if (this.startTouch) {
			if (this.swipeActive) {
				this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
				this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

				// Apply velocity to swipe
				let elapsed = Math.min(300, performance.now() - this.startTouchTime) / 300;
				let swipeX = this.touchDifferenceX / Math.max(0.2, elapsed);
				let swipeY = this.touchDifferenceY / Math.max(0.2, elapsed);

				// Dispatch swipe away event
				if (Math.abs(swipeX) > 80 || swipeY < -37) {
					this.dispatchEvent(new Event('drop'));

					this.swipeDirection = utils.determineSwipeDirection(
						this.touchDifferenceX,
						this.touchDifferenceY
					);
					this.stopTouch(true);
				} else this.stopTouch();
			} else {
				this.stopTouch();
			}
		}
	}

	stopTouch(noSwipeReset = false) {
		this.startTouch = null;
		this.startTouchTime = null;
		this.swipeActive = false;
		if (!noSwipeReset) this.swipeDirection = SwipeDirection.None;
		this.touchDifferenceX = null;
		this.touchDifferenceY = null;
	}

	render() {
		// Animation related classes
		let classes = classMap({
			temporary: this.temporary,
			error: this.isError,
			'swipe-up': this.swipeDirection == SwipeDirection.Up,
			'swipe-right': this.swipeDirection == SwipeDirection.Right,
			'swipe-left': this.swipeDirection == SwipeDirection.Left,
			'touch-down': this.swipeActive
		});

		// Swipe transform when touch is active
		let style = styleMap({
			transform: this.swipeActive
				? this.swipeDirection != SwipeDirection.Up
					? `translateX(${this.touchDifferenceX}px)`
					: `translateY(${Math.min(0, this.touchDifferenceY)}px)`
				: null
		});

		// Render message subtitle separately (can return null)
		return html`
			<div id="expand" class="pt-[4rem]">
				<div
					id="base"
					class=${classes}
					style=${style}
					@click=${this.onClick.bind(this)}
					@touchstart=${{ handleEvent: this.onTouchStart.bind(this), passive: true }}
					@touchmove=${{ handleEvent: this.onTouchMove.bind(this), passive: true }}
					@touchend=${this.onTouchEnd.bind(this)}
					@touchcancel=${this.onTouchEnd.bind(this)}
				>
					<div id="title-holder">
						<div id="title">
							<slot name="icon"></slot>
							<div id="title-text"><slot name="title"></slot></div>
						</div>
						<div id="close-holder">
							<date-display id="date" short .timestamp=${this.timestamp}></date-display>
							<e-svg id="close" src="regular/xmark" @click=${this.close.bind(this)}></e-svg>
						</div>
					</div>
					<slot name="subtitle"></slot>
					<slot name="details"></slot>
				</div>
			</div>
		`;
	}
}
