import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import { when } from 'lit/directives/when.js';
import { ButtonVariant, ButtonSize, ButtonElevation, icon, button } from './rvt-button.styles';

@customElement('rvt-button')
export default class RvtButton extends LitElement {
	static styles = cssify();

	@property({ type: String })
	type?: 'button' | 'submit' | 'a' = 'button';

	@property({ type: String })
	variant?: ButtonVariant = 'primary';

	@property({ type: String })
	size?: ButtonSize = 'md';

	@property({ type: String })
	elevation?: ButtonElevation = 'none';

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

	private forwardClick() {
		this.dispatchEvent(
			new CustomEvent('click', {
				bubbles: true,
				composed: true
			})
		);
	}

	private renderContent() {
		let classes = icon({ size: this.size });
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

	render() {
		let classes = button({ variant: this.variant, size: this.size, elevation: this.elevation });
		if (this.type === 'a') {
			return html` <a
				@click=${this.forwardClick}
				href=${this.href}
				target=${this.target}
				rel=${this.rel}
				class=${classes}
			>
				${this.renderContent()}
			</a>`;
		}
		return html`<button
			?disabled=${this.disabled}
			@click=${this.forwardClick}
			type=${this.type}
			class=${classes}
			?aria-disabled=${this.disabled}
			?aria-busy=${this.loading}
			aria-live="polite"
		>
			${this.renderContent()}
		</button>`;
	}
}
