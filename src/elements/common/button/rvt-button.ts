import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import { when } from 'lit/directives/when.js';
import { ButtonVariant, ButtonSize, icon, button } from './rvt-button.styles';
import clsx from 'clsx';

@customElement('rvt-button')
export default class RvtButton extends LitElement {
	static styles = cssify(':host { display: inline-block }');

	@property({ type: String })
	class?: string;

	@property({ type: String })
	type?: 'button' | 'submit' | 'a' = 'button';

	@property({ type: String })
	variant?: ButtonVariant = 'primary';

	@property({ type: String })
	size?: ButtonSize = 'md';

	@property({ type: Boolean })
	disabled?: boolean = false;

	@property({ type: Boolean })
	loading?: boolean = false;

	// #region icons
	@property({ type: String })
	icon?: string;

	@property({ type: String, attribute: 'icon-right' })
	iconRight?: string;
	// #endregion

	// #region anchor props
	@property({ type: String })
	href?: HTMLAnchorElement['href'];

	@property({ type: String })
	target?: HTMLAnchorElement['target'];

	@property({ type: String })
	rel?: HTMLAnchorElement['rel'];
	// #endregion

	private renderContent() {
		let classes = icon({ variant: this.variant, size: this.size });
		return html`
			<slot name="prefix">
				${when(
					this.loading,
					() => html`<e-svg class="animate-spin ${classes}" src="regular/spinner-third"></e-svg>`,
					() => when(this.icon, () => html`<e-svg class="${classes}" .src=${this.icon}></e-svg>`)
				)}
			</slot>
			<slot></slot>
			<slot name="suffix">
				${when(this.iconRight, () => html`<e-svg class="${classes}" .src=${this.iconRight}></e-svg>`)}
			</slot>
		`;
	}

	private handleClick(e: MouseEvent) {
		if (this.loading || this.disabled) {
			e.preventDefault();
			return;
		}
	}

	render() {
		let classes = clsx(button({ variant: this.variant, size: this.size }), this.class);
		if (this.type === 'a' || this.href) {
			return html` <a
				href=${this.href}
				target=${this.target}
				rel=${this.rel}
				class=${classes}
				?aria-selected=${this.ariaSelected !== null}
			>
				${this.renderContent()}
			</a>`;
		}
		return html`<button
			@click=${this.handleClick.bind(this)}
			?disabled=${this.disabled || this.loading}
			type=${this.type}
			class=${classes}
			?aria-disabled=${this.disabled}
			?aria-busy=${this.loading}
			aria-live="polite"
			?aria-selected=${this.ariaSelected !== null}
		>
			${this.renderContent()}
		</button>`;
	}
}
