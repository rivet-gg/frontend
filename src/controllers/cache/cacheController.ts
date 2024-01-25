import { ReactiveController, ReactiveControllerHost } from 'lit';
import { RepeatingRequest } from '../../utils/repeating-request';
import { CachedQuery } from '../../data/cache';

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
	return k in x;
}

export class CacheController<
	// we don't care about the input and output types here, so we just use `any`
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Query extends CachedQuery<any, any>,
	Input extends object = Query extends CachedQuery<infer I, any> ? I : never,
	Output extends object = Query extends CachedQuery<any, infer O> ? O : never
> implements ReactiveController
{
	private stream: RepeatingRequest<Output>;

	private getVariables: () => Input;
	private getEnabled: () => boolean;

	private oldVariables: Partial<Input> = {};
	private wasEnabled = false;

	public data: Output | undefined = undefined;
	public error: Error | undefined = undefined;

	constructor(
		private name: string,
		private host: ReactiveControllerHost,
		private query: CachedQuery<Input, Output>
	) {
		host.addController(this);
	}

	hostConnected() {
		this.reconnectStream();
	}

	hostUpdated(): void {
		this.reconnectStream();
	}

	hostDisconnected() {
		this.stream?.cancel();
		this.stream = null;
	}

	setVariables(cb: () => Input): this {
		this.getVariables = cb;
		return this;
	}

	setEnabled(cb: () => boolean): this {
		this.getEnabled = cb;
		return this;
	}

	private reconnectStream() {
		let enabled = this.getEnabled();
		let variables = this.getVariables();

		if (!enabled) {
			this.stream?.cancel();
			return;
		}

		let isNowEnabled = this.wasEnabled === false && enabled === true;
		let hasChanged = this.haveVariablesChanged(variables);

		if (hasChanged && !enabled) {
			this.data = undefined;
		}

		if (!hasChanged && !isNowEnabled) {
			return;
		}

		this.oldVariables = variables;
		this.wasEnabled = enabled;
		this.stream?.cancel();
		this.stream = this.query.watch(this.name, variables, data => {
			this.data = data;
			this.host.requestUpdate();
		});

		this.stream.onError(error => {
			this.error = error as Error;
			this.host.requestUpdate();
		});
	}

	private haveVariablesChanged(variables: Input) {
		let hasChanged = false;

		for (let key in variables) {
			if (!isKey(variables, key)) {
				continue;
			}
			if (variables[key] !== this.oldVariables[key]) {
				hasChanged = true;
				break;
			}
		}

		return hasChanged;
	}
}
