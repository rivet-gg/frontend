import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './icon-button.scss';
import logging from '../../utils/logging';
import { COLORS } from '../../utils/colors';
import { globalEventGroups } from '../../utils/global-events';

type TriggerResult = Promise<any> | void;

@customElement('icon-button')
export default class IconButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: String })
	src: string;

	@property({ type: String })
	badge: string;

	@property({ type: String })
	color: string = null;

	@property({ type: String, attribute: 'highlight-color' })
	highlightColor: string = null;

	@property({ type: Boolean })
	preserve = false;

	@property({ type: Number })
	size?: number;

	@property({ type: Boolean, attribute: 'smaller' })
	isSmaller = false;

	@property({ type: Boolean, attribute: 'small' })
	isSmall = false;

	@property({ type: Boolean, attribute: 'large' })
	isLarge = false;

	@property({ type: Boolean, attribute: 'custom' })
	isCustom = false;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Function })
	trigger?: (ev: Event) => TriggerResult = null;

	get cssColor(): string {
		let colorVariable = COLORS[this.color];
		if (colorVariable) {
			return colorVariable;
		} else {
			return this.color;
		}
	}

	get highlightCSSColor(): string {
		let colorVariable = COLORS[this.highlightColor];
		if (colorVariable) {
			return colorVariable;
		} else {
			return this.highlightColor;
		}
	}

	get sizeClass(): string | null {
		if (this.size > 0) return null;
		else if (this.isSmaller) return 'smaller';
		else if (this.isSmall) return 'small';
		else if (this.isLarge) return 'large';
		else if (this.isCustom) return 'custom';
		else return 'medium';
	}

	constructor() {
		super();
	}

	onClick(ev: Event) {
		// Make sure the button is not disabled
		if (this.isDisabled || this.isLoading) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}

		// Call the trigger if needed
		if (this.trigger) {
			// Execute trigger and handle state if needed
			let promise = this.trigger(ev);

			if (promise && promise instanceof Promise) {
				this.isLoading = true;

				promise
					.catch(err => {
						logging.error('Error caught in button trigger', err);
						globalEventGroups.dispatch('error', err);
					})
					.finally(() => (this.isLoading = false));
			}
		}
	}

	render() {
		// Get classes and styles
		let classes: any = {
			'icon-button': true,
			disabled: this.isDisabled,
			loading: this.isLoading
		};
		if (this.sizeClass) classes[this.sizeClass] = true;

		let styles: any = { '--color': this.cssColor, '--highlight-color': this.highlightCSSColor };
		if (this.size > 0) styles['--size'] = `${this.size}px`;

		// Render contents
		let contents = html`<e-svg src=${this.src} ?preserve=${this.preserve}></e-svg>${this.badge
				? html`<div class="badge">${this.badge}</div>`
				: null}`;

		// Either build link or div depending on the type
		if (this.href) {
			return html`<a
				href=${this.href}
				class=${classMap(classes)}
				style=${styleMap(styles)}
				@click=${this.onClick.bind(this)}
				>${contents}</a
			>`;
		} else {
			return html`<div
				class=${classMap(classes)}
				style=${styleMap(styles)}
				@click=${this.onClick.bind(this)}
			>
				${contents}
			</div>`;
		}
	}
}
