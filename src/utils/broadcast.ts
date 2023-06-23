import logging from './logging';

// Communication between all open tabs of Rivet
export class BroadcastSystem {
	broadcastChannel: BroadcastChannel;
	supported = false;

	constructor(global = false) {
		try {
			this.broadcastChannel = new BroadcastChannel('rivet');
			this.supported = true;
		} catch (e) {
			if (global) {
				logging.debug(e);
				logging.warn('Broadcast channels unsupported by this browser');
			}
		}
	}

	// addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
	addEventListener<K extends keyof BroadcastChannelEventMap>(
		type: K,
		listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	) {
		if (!this.supported) return;

		this.broadcastChannel.addEventListener(type, listener, options);
	}

	postMessage(message: any) {
		if (!this.supported) return;

		this.broadcastChannel.postMessage(message);
	}
}
