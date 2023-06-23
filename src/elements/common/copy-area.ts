import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './copy-area.scss';
import { cssify } from '../../utils/css';
import logging from '../../utils/logging';
import { classMap } from 'lit/directives/class-map.js';
import utils from '../../utils/utils';

@customElement('copy-area')
export default class CopyArea extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	value: string;

	@property({ type: String })
	result = '';

	@property({ type: Boolean })
	light = false;

	@property({ type: Boolean, attribute: 'confidential' })
	isConfidential = false;

	@query('slot')
	slotElement: HTMLSlotElement;

	@query('#result')
	resultElement: HTMLElement;

	@property({ type: Boolean })
	hidden = true;

	timeout: number = null;

	copyText() {
		let element = this.slotElement.assignedElements()[0];

		if (!element) return;

		try {
			utils.copyText((element as HTMLElement).innerText);
			this.result = 'Copied!';
		} catch (err) {
			logging.error('Unable to copy', err);
			this.result = 'Failed to copy.';
		}

		// Reset result animation
		if (this.resultElement) {
			this.resultElement.style.display = 'none';
			this.resultElement.offsetHeight;
			this.resultElement.style.display = '';
		}

		// Stop animation from restarting
		window.clearTimeout(this.timeout);
		this.timeout = window.setTimeout(() => {
			this.result = '';
		}, 1200);
	}

	toggleHidden() {
		this.hidden = false;
	}

	render() {
		let classes = classMap({
			hidden: this.hidden
		});

		let baseClasses = classMap({
			light: this.light
		});

		return html`
			<div id="base" class=${baseClasses}>
				<span id="content" class=${classes} @click=${this.toggleHidden.bind(this)}>
					<slot></slot>
					${this.isConfidential ? html`<span id="hidden">Click to reveal</span>` : null}
				</span>
				<icon-button
					id="copy-button"
					color=${this.light ? '#252525' : '#737373'}
					highlight-color=${this.light ? '#151515' : '#ffffff'}
					src="solid/copy"
					.trigger=${this.copyText.bind(this)}
				></icon-button>

				${this.result ? html`<div id="result">${this.result}</div>` : null}
			</div>
		`;
	}
}
