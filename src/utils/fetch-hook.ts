export class HookFetch {
	private requestIdCounter = 0;
	public inFlight = new Map<number, URL>();

	constructor(private cb: (inFlight: HookFetch['inFlight']) => void) {
		let _this = this;

		cb(this.inFlight);

		// Hook in to fetch to find pending requests
		let oldFetch = window.fetch;
		window.fetch = function (...args: any[]): any {
			if (args[0] && typeof args[0] === 'string') {
				let url = args[0];

				// Request start
				let requestId = _this.requestIdCounter++;
				_this.inFlight.set(requestId, new URL(url, location.origin));
				cb(_this.inFlight);

				return oldFetch.apply(this, args as any).finally(() => {
					// Request finish
					_this.inFlight.delete(requestId);
					cb(_this.inFlight);
				});
			} else {
				return oldFetch.apply(this, args as any);
			}
		};
	}
}
