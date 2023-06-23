import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './stylized-button.scss';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';

type TriggerResult = Promise<any> | void;

@customElement('stylized-button')
export default class StylizedButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: String })
	target?: string;

	@property({ type: String })
	color: string = null;

	@property({ type: String })
	icon: string = null;

	@property({ type: String, attribute: 'right-icon' })
	rightIcon: string = null;

	@property({ type: Boolean, attribute: 'non-icon' })
	nonIcon = false;

	@property({ type: String, attribute: 'text' })
	textColor: string;

	@property({ type: String, attribute: 'align' })
	align: 'left' | 'center' | 'right' = 'center';

	@property({ type: Boolean, attribute: 'small' })
	isSmall = false;

	// TODO: Deprecate
	@property({ type: Boolean, attribute: 'large' })
	isLarge = false;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Boolean, attribute: 'no-action' })
	noAction = false;

	@property({ type: Boolean, attribute: 'splashy' })
	isSplashy = false;

	@property({ type: Boolean, attribute: 'force' })
	forceActive = false;

	@property({ type: Function })
	trigger?: (ev?: Event) => TriggerResult = null;

	get cssColor(): string {
		if (this.textColor) return this.textColor;
		return this.color == 'white' ? 'black' : 'white';
	}

	get cssBackgroundColor(): string {
		return this.color;
	}

	get sizeClass(): string {
		if (this.isSmall) return 'small';
		else if (this.isLarge) return 'large';
		else return 'medium';
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
		let classes = classMap({
			'stylized-button': true,
			[this.sizeClass]: true,
			disabled: this.isDisabled,
			'no-action': this.noAction,
			active: this.forceActive,
			loading: this.isLoading,
			splashy: this.isSplashy,
			[`align-${this.align}`]: this.align != 'center'
		});
		let styles = styleMap({ '--color': this.cssColor, '--bg-color': this.cssBackgroundColor });

		// Icon
		let icon = null;
		if (this.icon != null) {
			icon = html`<e-svg id="icon" .nonIcon=${this.nonIcon} src=${this.icon}></e-svg>`;
		}

		// Right icon
		let rightIcon = null;
		if (this.rightIcon != null) {
			rightIcon = html`<e-svg id="right-icon" .nonIcon=${this.nonIcon} src=${this.rightIcon}></e-svg>`;
		}

		// Either build link or div depending on the type
		if (this.href) {
			return html`<a
				href=${this.href}
				target=${ifDefined(this.target)}
				class=${classes}
				style=${styles}
				@click=${this.onClick.bind(this)}
				>${icon}<slot></slot>${rightIcon}</a
			>`;
		} else {
			return html`<div class=${classes} style=${styles} @click=${this.onClick.bind(this)}>
				${icon}<slot></slot>${rightIcon}
			</div>`;
		}
	}
}
