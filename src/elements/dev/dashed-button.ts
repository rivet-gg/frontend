import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './dashed-button.scss';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';

type TriggerResult = Promise<any> | void;

@customElement('dashed-button')
export default class DashedButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: String })
	icon: string = null;

	@property({ type: Boolean, attribute: 'large' })
	isLarge = false;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Boolean, attribute: 'selected' })
	isSelected = false;

	@property({ type: Boolean })
	light = false;

	@property({ type: Boolean, attribute: 'centered' })
	isCentered = false;

	@property({ type: Function })
	trigger?: () => TriggerResult = null;

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
			let promise = this.trigger();

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
		let classes = classMap({
			'stylized-button': true,
			large: this.isLarge,
			disabled: this.isDisabled,
			loading: this.isLoading,
			selected: this.isSelected,
			light: this.light,
			centered: this.isCentered
		});

		// Icon
		let icon = null;
		if (this.icon != null) {
			icon = html`<e-svg id="icon" src=${this.icon}></e-svg>`;
		}

		// Either build link or div depending on the type
		if (this.href) {
			return html` <a id="base" class=${classes} href=${this.href} @click=${this.onClick.bind(this)}>
				<div id="content">
					${icon}
					<span><slot></slot></span>
				</div>
			</a>`;
		} else {
			return html` <div id="base" class=${classes} @click=${this.onClick.bind(this)}>
				<div id="content">
					${icon}
					<span><slot></slot></span>
				</div>
			</div>`;
		}
	}
}
