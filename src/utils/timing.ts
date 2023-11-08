import logging from './logging';
import { ErrorHandler } from './utils';

const timing = {
	milliseconds(v: number) {
		return Math.floor(v);
	},
	seconds(v: number) {
		return this.milliseconds(v * 1000);
	},
	minutes(v: number) {
		return this.seconds(v * 60);
	},
	hours(v: number) {
		return this.minutes(v * 60);
	},
	days(v: number) {
		return this.hours(v * 24);
	}
};
export default timing;

export interface DebounceConfig<T extends (...args: any[]) => any> {
	delay: number;
	cb: T;
	chronological?: boolean;
	completeCb?: (res: Awaited<ReturnType<T>>) => void;
}

export interface ThrottleConfig<T> {
	rate: number;
	cb: (res: ThrottleResult<T>) => void;
}

export interface ThrottleResult<T> {
	result: T;
	target: HTMLElement;
}

export class Debounce<T extends (...args: any[]) => any = () => void> {
	delay: number;
	timeoutID: number = null;
	reqCounter = 0;
	successReqCounter = 0;

	// When true, only triggers `completeCb` if it is the most recent completion of the call `cb`
	chronological = true;

	cb: T;
	// Used only when `chronological` is true
	completeCb: (res: Awaited<ReturnType<T>>) => void;

	errorHandlers: ErrorHandler[] = [];

	constructor({ delay, cb, completeCb, chronological }: DebounceConfig<T>) {
		this.delay = delay;
		this.cb = cb;
		this.completeCb = completeCb;
		this.chronological = chronological ?? true;
	}

	// Provide additional arguments here
	public trigger(...args: Parameters<T>) {
		window.clearTimeout(this.timeoutID);

		// Debounce event
		this.timeoutID = window.setTimeout(async () => {
			try {
				if (this.chronological) {
					let reqId = this.reqCounter++;
					// Run callback normally
					let res = await this.cb(...args);

					// Make sure this is the most up to date
					if (reqId >= this.successReqCounter) {
						// Do not run complete callback if there is no result
						if (res !== null) this.completeCb(res);

						this.successReqCounter = reqId;
					}
				} else {
					await this.cb(...args);
				}
			} catch (err) {
				this.handleErrors(err);
			}

			// Reset debounce status
			this.timeoutID = null;
		}, this.delay);
	}

	onError(cb: ErrorHandler) {
		this.errorHandlers.push(cb);
	}

	cancel() {
		window.clearTimeout(this.timeoutID);
		this.timeoutID = null;
	}

	protected handleErrors(e: Error) {
		this.errorHandlers.forEach(cb => cb(e));

		if (this.errorHandlers.length == 0) logging.error('Unhandled debounce error', e);
	}
}

// Manages all of the event handlers of the same throttle value
export class Throttle<T = Event> {
	rate: number;
	timeoutID: number = null;
	activateOnFallingEdge = false;
	latestResult: T = null;
	latestTarget: HTMLElement = null;

	cb: (res: ThrottleResult<T>) => void;

	errorHandlers: ErrorHandler[] = [];

	constructor({ rate, cb }: ThrottleConfig<T>) {
		this.rate = rate;
		this.cb = cb;
	}

	trigger(event: T) {
		// Cache latest event regardless of if it will be used immediately or not
		this.latestResult = event;

		if (event instanceof Event) {
			let target = (event.currentTarget || event.target) as HTMLElement;

			if (target) this.latestTarget = target;
		} else if (event instanceof HTMLElement) this.latestTarget = event;

		// Throttle event
		if (this.rate != 0) {
			if (this.timeoutID == null) {
				// Run callback normally
				this.cb({ result: this.latestResult, target: this.latestTarget });

				this.timeoutID = window.setTimeout(this.throttle.bind(this), this.rate);
			}
			// Event was called during timeout, set flag for falling edge execution
			else {
				this.activateOnFallingEdge = true;
			}
		} else {
			// Run callback normally
			this.cb({ result: this.latestResult, target: this.latestTarget });
		}
	}

	throttle() {
		// Activate event again on falling edge of timeout
		if (this.activateOnFallingEdge) {
			this.activateOnFallingEdge = false;

			// Run event handlers normally
			this.cb({ result: this.latestResult, target: this.latestTarget });

			// Set a new timeout to prevent double execution
			this.timeoutID = window.setTimeout(this.throttle.bind(this), this.rate);
		}
		// Reset throttle status
		else {
			this.timeoutID = null;
		}
	}

	onError(cb: ErrorHandler) {
		this.errorHandlers.push(cb);
	}

	protected handleErrors(e: Error) {
		this.errorHandlers.forEach(cb => cb(e));

		if (this.errorHandlers.length == 0) logging.error('Unhandled debounce error', e);
	}
}

// Waits the given amount of time
export async function wait(time: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, time));
}
