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

	/** If the input should be hidden as dots for secret data */
	@property({ type: Boolean, attribute: 'confidential' })
	isConfidential = false;

	@query('input')
	input: HTMLInputElement;

	/** If the input is currently replaced with dots */
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
		if (this.hidden) {
			return this.show();
		}

		return this.hide();
	}

	private async show() {
		this.hidden = false;
		await this.updateComplete;
		this.input.focus();
		this.input.select();
	}

	private async hide() {
		this.hidden = true;
	}

	private handleMouseEnter(e: MouseEvent) {
		if (this.hidden && this.isConfidential) {
			return tooltip('Click to reveal')(e);
		}
	}

	render() {
		return html`
			<div
				class="flex flex-row items-center ml-auto my-auto ring-1 ring-zinc-400 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-main-accent hover:ring-2 hover:ring-inset hover:ring-main-accent rounded-md"
			>
				<input
					@mouseenter=${this.handleMouseEnter.bind(this)}
					@click=${this.show.bind(this)}
					type="text"
					value=${this.hidden && this.isConfidential ? PLACEHOLDER : this.value}
					readonly
					class="font-mono flex-1 border-none shadow-none ring-0 bg-transparent focus:ring-0 focus:shadow-none focus:border-none"
				/>
				<icon-button
					src="solid/copy"
					color="var(--rvt-zinc-400)"
					highlight-color="var(--rvt-zinc-600)"
					small
					@mouseenter=${tooltip('Copy')}
					.trigger=${this.copyText.bind(this)}
					class="mr-2"
				></icon-button>
			</div>
		`;
	}
}
