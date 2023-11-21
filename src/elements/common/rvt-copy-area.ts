import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import logging from '../../utils/logging';
import { tooltip } from '../../ui/helpers';
import utils from '../../utils/utils';

const PLACEHOLDER = '•'.repeat(13);

@customElement('rvt-copy-area')
export default class RvtCopyArea extends LitElement {
	static styles = cssify();

	@property({ type: String })
	value: string;

	@property({ type: Boolean, attribute: 'confidential' })
	isConfidential = false;

	@query('input')
	input: HTMLInputElement;

	@state()
	hidden = true;

	copyText(e: Event) {
		try {
			utils.copyText(this.value);
			return tooltip('Copied!')(e);
		} catch (err) {
			logging.error('Unable to copy', err);
			return tooltip('Failed to copy')(e);
		}
	}

	async toggleHidden() {
		this.hidden = !this.hidden;
		await this.updateComplete;
		if (!this.hidden) {
			this.input.focus();
			this.input.select();
		}
	}

	render() {
		return html`
			<div
				class="flex flex-row items-center ml-auto my-auto ring-1 ring-zinc-400 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-main-accent hover:ring-2 hover:ring-inset hover:ring-main-accent rounded-md"
			>
				<input
					type="text"
					value=${this.hidden ? PLACEHOLDER : this.value}
					readonly
					class="flex-1 border-none shadow-none ring-0 bg-transparent focus:ring-0 focus:shadow-none focus:border-none"
				/>
				<icon-button
					src="solid/eye"
					color="var(--rvt-zinc-400)"
					highlight-color="var(--rvt-zinc-600)"
					small
					.trigger=${this.toggleHidden.bind(this)}
				></icon-button>
				<icon-button
					src="solid/copy"
					color="var(--rvt-zinc-400)"
					highlight-color="var(--rvt-zinc-600)"
					small
					.trigger=${this.copyText.bind(this)}
					class="mr-2"
				></icon-button>
			</div>
		`;
	}
}
