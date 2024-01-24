import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { when } from 'lit/directives/when.js';
import { RivetError } from '@rivet-gg/api';

export const computeError = (error: any): Partial<{ title: string; message: string; stack: string }> => {
	if (!error) return {};

	let stack = error?.stack || error?.toString();

	if (typeof error == 'string') {
		return { message: error };
	}
	if (error instanceof RivetError) {
		return { message: (error.body as any)?.message || error.message, stack };
	}

	if (error && error.message && typeof error.message == 'string') {
		return { message: error.message, stack };
	}

	if (error && Object.prototype.hasOwnProperty.call(error, 'statusText')) {
		let err = error as Response;

		return {
			message: err.statusText ? err.statusText : err.status.toString(),
			stack
		};
	}
	return {};
};

export const createError = (error: any) => {
	let { message, stack } = computeError(error);
	return html`<rvt-error .message=${message} .stack=${stack}></rvt-error>`;
};

const ERROR_MESSAGES = [
	{
		title: 'Unknown Error',
		body: "This error has been reported to Rivet's developers. Please try again later."
	}
];

@customElement('rvt-error')
export class RvtError extends LitElement {
	static styles = cssify();

	@property({ type: String })
	title: string = null;

	@property({ type: String })
	message: string;

	@property({ type: Object })
	stack: any;

	errorMessage = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];

	render() {
		let error = this.errorMessage;

		return html`
			<div class="text-center">
				<e-svg class="text-5xl w-full mb-2" src="solid/bomb"></e-svg>
				<h1 class="text-2xl mb-4">${this.title ?? error.title}</h1>
				<p>${this.message || error.body}</p>

				${when(
					this.stack,
					() => html`
						<div class="mt-2">
							<code
								class="break-all md:break-normal text-sm mt-1 no-ligatures thick text-left inline-block select-text whitespace-pre-wrap"
								>${this.stack}</code
							>
						</div>
					`
				)}

				<rvt-button class="mt-4 block" @click=${() => window.location.reload()}>Reload</rvt-button>
			</div>
		`;
	}
}
