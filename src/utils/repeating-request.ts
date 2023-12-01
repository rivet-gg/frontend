import { AbortSignal as __AbortSignal } from '@aws-sdk/types';
import RvtRoot from '../elements/root/rvt-root';

export type ErrorHandler = (e: Error | Response) => void;

interface WatchResponse {
	index: string | undefined;
}

export interface RepeatingRequestOptions {
	// Stops loop on error
	cancelOnError?: boolean;
	// Stops loop when there is no watch index in the response
	cancelOnNoWatchIndex?: boolean;
	// How much to wait between requests when there is no watch index
	noWatchIndexDelay?: number;
	// Initial watch index, usually set by cache
	watchIndex?: WatchResponse;
	// Don't start the created `RepeatingRequest` instance upon construction
	pauseOnCreation?: boolean;
}

export class RepeatingRequest<T> {
	private static idCounter = 0;

	public id: number;
	public createTimestamp: number;
	private cb: (abortSignal: __AbortSignal, watchIndex: string) => Promise<T>;
	public active = false;
	public cancelled = false;
	private watchIndex: string = null;
	private opts: RepeatingRequestOptions;
	private abortController: AbortController;

	private messageHandlers: ((message: T) => void)[] = [];
	private errorHandlers: ErrorHandler[] = [];

	private delay = 0;

	constructor(
		public name: string,
		cb: (abortSignal: __AbortSignal, watchIndex: string) => Promise<T>,
		opts?: RepeatingRequestOptions
	) {
		this.id = RepeatingRequest.idCounter++;
		this.createTimestamp = Date.now();
		this.cb = cb;
		this.setOpts(opts ?? {});

		// Start repeating request loop
		if (!this.opts.pauseOnCreation) this.start();
	}

	setOpts(opts: RepeatingRequestOptions) {
		this.opts = Object.assign(
			{
				cancelOnError: true,
				cancelOnNoWatchIndex: true,
				noWatchIndexDelay: 2000,
				watchIndex: undefined,
				pauseOnCreation: false
			},
			opts
		);

		// Set anchor before starting request loop
		if (this.opts.watchIndex !== undefined && this.opts.watchIndex !== null)
			this.parseWatchResponse(this.opts.watchIndex);
	}

	// Repeat request forever until cancelled
	private async repeat() {
		while (this.active) {
			if (this.delay) await this.wait();

			// Handle any request errors
			try {
				// MARK: The abort controller signal is cast to `any` because
				// the AWS abort signal is never used by AWS source code internally,
				// it is simply passed along until it reaches `requestHandlerMiddleware` (see utils.ts)
				let res = await this.cb(this.abortController.signal as any, this.watchIndex ?? undefined);

				this.handleMessage(res);
				this.parseWatchResponse((res as any).watch);
			} catch (e) {
				// In this system, an abort isn't erroneous behavior
				if (e instanceof DOMException && e.name == 'AbortError') return;

				this.handleErrors(e);

				// Cancels on error by default
				if (this.opts.cancelOnError) this.cancel();
			}
		}
	}

	// Wait for any delay in the system
	private async wait() {
		let delay = this.delay;
		this.delay = 0;
		await new Promise(resolve => setTimeout(resolve, delay));
	}

	onMessage(cb: (message: T) => void) {
		this.messageHandlers.push(cb);
	}

	onError(cb: ErrorHandler) {
		this.errorHandlers.push(cb);
	}

	cancel() {
		this.abortController.abort();
		this.active = false;
		this.cancelled = true;

		RvtRoot.shared.activeRepeatingRequests.delete(this.id);
		RvtRoot.shared.requestUpdate('activeRepeatingRequests');
	}

	start() {
		if (!this.active) {
			this.abortController = new AbortController();
			this.active = true;
			this.repeat();

			RvtRoot.shared.activeRepeatingRequests.set(this.id, this);
			RvtRoot.shared.requestUpdate('activeRepeatingRequests');
		}
	}

	removeMessageHandler(cb: (message: T) => void) {
		let index = this.messageHandlers.indexOf(cb);
		if (index != -1) this.messageHandlers.splice(index, 1);
	}

	private handleMessage(message: T) {
		if (!this.active) return;
		this.messageHandlers.forEach(cb => cb(message));
	}

	private handleErrors(e: Error) {
		if (!this.active) return;
		this.errorHandlers.forEach(cb => cb(e));

		if (this.errorHandlers.length == 0) console.error('Unhandled repeating request error', e);
	}

	private parseWatchResponse(watchResponse: WatchResponse) {
		if (!watchResponse?.index) {
			if (this.opts.cancelOnNoWatchIndex) {
				console.error('Blocking request has no watch response');
				this.cancel();
			}
			// Delay the next cycle when the blocking request doesn't have a watch response
			else this.delay = this.opts.noWatchIndexDelay;
		} else {
			this.watchIndex = watchResponse.index;
		}
	}
}
