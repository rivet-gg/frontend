import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';
import { when } from 'lit/directives/when.js';

@customElement('rvt-button')
export default class RvtButton extends LitElement {
	static styles = cssify();

	@property({ type: String })
	href?: string;

	@property({ type: String })
	type?: 'button' | 'submit' | 'a' = 'button';

	@property({ type: String })
	variant?: keyof RvtButton['variantClasses'] = 'primary';

	@property({ type: String })
	size?: keyof RvtButton['sizeClasses'] = 'medium';

	@property({ type: String })
	target?: string;

	// Icon
	@property({ type: String })
	icon?: string;

	@property({ type: String, attribute: 'icon-right' })
	iconRight?: string;

	private get variantClasses() {
		return {
			primary:
				'align-middle bg-violet-500 mb-1 will-change-transform text-shite font-bold min-w-30 shadow-foldup-md border-b border-violet-400 shadow-violet-600 transition-all hover:shadow-foldup-lg hover:-translate-y-0.5 active:shadow-foldup-none active:translate-y-1 active:border-transparent',
			secondary: ''
		};
	}

	private get sizeClasses() {
		return {
			small: '',
			medium: 'px-4 py-2 text-sm rounded-md',
			large: ''
		};
	}

	render() {
		// TODO: dynamic type
		let type = this.type === 'a' ? 'a' : 'button';
		let classes = [this.variantClasses[this.variant], this.sizeClasses[this.size]].join(' ');

		return html`<button type=${this.type} class=${classes}>
			<slot name="prefix">
				${when(this.icon, () => html`<e-svg class="-ml-0.5 h-5 w-5" .src=${this.icon}></e-svg>`)}
			</slot>
			<slot></slot>
			<slot name="suffix">
				${when(
					this.iconRight,
					() => html`<e-svg class="-mr-0.5 h-5 w-5" .src=${this.iconRight}></e-svg>`
				)}
			</slot>
		</button>`;
	}
}
