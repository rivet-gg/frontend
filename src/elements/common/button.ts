import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';
import { when } from 'lit/directives/when.js';

type TriggerResult = Promise<any> | void;

@customElement('rvt-button')
export default class StylizedButton extends LitElement {
	static styles = cssify();

	@property({ type: String })
	href?: string;

	@property({ type: String })
	target?: string;

	// @property({ type: String })
	// color: string = null;

	// @property({ type: Boolean, attribute: 'non-icon' })
	// nonIcon = false;

	// @property({ type: String, attribute: 'text' })
	// textColor: string;

	// @property({ type: String, attribute: 'align' })
	// align: 'left' | 'center' | 'right' = 'center';

	// @property({ type: Boolean, attribute: 'small' })
	// isSmall = false;

	// // TODO: Deprecate
	// @property({ type: Boolean, attribute: 'large' })
	// isLarge = false;

	// @property({ type: Boolean, attribute: 'loading' })
	// isLoading = false;

	// @property({ type: Boolean, attribute: 'disabled' })
	// isDisabled = false;

	// @property({ type: Boolean, attribute: 'no-action' })
	// noAction = false;

	// @property({ type: Boolean, attribute: 'splashy' })
	// isSplashy = false;

	// @property({ type: Boolean, attribute: 'force' })
	// forceActive = false;

	// @property({ type: Function })
	// trigger?: (ev?: Event) => TriggerResult = null;

	// onClick(ev: Event) {
	// 	// Make sure the button is not disabled
	// 	if (this.isDisabled || this.isLoading) {
	// 		ev.preventDefault();
	// 		ev.stopImmediatePropagation();
	// 		return;
	// 	}

	// 	// Call the trigger if needed
	// 	if (this.trigger) {
	// 		// Execute trigger and handle state if needed
	// 		let promise = this.trigger(ev);

	// 		if (promise && promise instanceof Promise) {
	// 			this.isLoading = true;

	// 			promise
	// 				.catch(err => {
	// 					logging.error('Error caught in button trigger', err);
	// 					globalEventGroups.dispatch('error', err);
	// 				})
	// 				.finally(() => (this.isLoading = false));
	// 		}
	// 	}
	// }

	// Style
	@property({ type: Boolean, attribute: 'primary' })
	primary: boolean = false;

	// Size
	@property({ type: Boolean, attribute: 'extra-small' })
	extraSmall: boolean = false;

	@property({ type: Boolean, attribute: 'small' })
	small: boolean = false;

	@property({ type: Boolean, attribute: 'large' })
	large: boolean = false;

	@property({ type: Boolean, attribute: 'extra-large' })
	extraLarge: boolean = false;

	// Icon
	@property({ type: String, attribute: 'icon' })
	icon?: string;

	@property({ type: String, attribute: 'icon-right' })
	iconRight?: string;

	render() {
		let size = 0;
		if (this.extraSmall) size = -2;
		if (this.small) size = -1;
		if (this.large) size = 1;
		if (this.extraLarge) size = 2;

		let classes = 'flex items-center gap-x-1.5 font-semibold text-white shadow-sm ';
		if (this.primary) {
			classes +=
				'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ';
		} else {
			classes +=
				'bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ';
		}
		switch (size) {
			case -2:
				classes += 'rounded px-2 py-1 text-xs';
				break;
			case -1:
				classes += 'rounded px-2 py-1 text-sm';
				break;
			case 0:
				classes += 'rounded-md px-2.5 py-1.5 text-sm';
				break;
			case 1:
				classes += 'rounded-md px-3 py-2 text-sm';
				break;
			case 2:
				classes += 'rounded-md px-3.5 py-2.5 text-sm';
				break;
			default:
				throw 'Unreachable';
		}

		return html`<button type="button" class=${classes}>
			${when(this.icon, () => html`<e-svg class="-ml-0.5 h-5 w-5" .src=${this.icon}></e-svg>`)}
			<slot></slot>
			${when(
				this.iconRight,
				() => html`<e-svg class="-mr-0.5 h-5 w-5" .src=${this.iconRight}></e-svg>`
			)}
		</button>`;
	}

	// render() {
	// 	// Get classes and styles
	// 	let classes = classMap({
	// 		'rvt-button': true,
	// 		[this.sizeClass]: true,
	// 		disabled: this.isDisabled,
	// 		'no-action': this.noAction,
	// 		active: this.forceActive,
	// 		loading: this.isLoading,
	// 		splashy: this.isSplashy,
	// 		[`align-${this.align}`]: this.align != 'center'
	// 	});
	// 	let styles = styleMap({ '--color': this.cssColor, '--bg-color': this.cssBackgroundColor });

	// 	// Icon
	// 	let icon = null;
	// 	if (this.icon != null) {
	// 		icon = html`<e-svg id="icon" .nonIcon=${this.nonIcon} src=${this.icon}></e-svg>`;
	// 	}

	// 	// Right icon
	// 	let rightIcon = null;
	// 	if (this.rightIcon != null) {
	// 		rightIcon = html`<e-svg id="right-icon" .nonIcon=${this.nonIcon} src=${this.rightIcon}></e-svg>`;
	// 	}

	// 	// Either build link or div depending on the type
	// 	if (this.href) {
	// 		return html`<a
	// 			href=${this.href}
	// 			target=${ifDefined(this.target)}
	// 			class=${classes}
	// 			style=${styles}
	// 			@click=${this.onClick.bind(this)}
	// 			>${icon}<slot></slot>${rightIcon}</a
	// 		>`;
	// 	} else {
	// 		return html`<div class=${classes} style=${styles} @click=${this.onClick.bind(this)}>
	// 			${icon}<slot></slot>${rightIcon}
	// 		</div>`;
	// 	}
	// }
}
