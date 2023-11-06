import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { when } from 'lit/directives/when.js';

@customElement('rvt-button')
export default class RvtButton extends LitElement {
	static styles = cssify();

	@property({ type: String })
	type?: 'button' | 'submit' | 'a' = 'button';

	@property({ type: String })
	variant?: keyof RvtButton['variantClasses'] = 'primary';

	@property({ type: String })
	size?: keyof RvtButton['sizeClasses'] = 'md';

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

	private get stateClasses() {
		let active = `active:shadow-foldup-none active:translate-y-1 active:border-transparent`;
		let hover = `hover:shadow-foldup-lg hover:-translate-y-0.5`;

		if (this.disabled) {
			return 'cursor-not-allowed shadow-foldup-none pb-3 mb-1 mt-1 border-transparent';
		}
		if (this.loading) {
			return 'cursor-wait';
		}
		return `${active} ${hover}`;
	}

	private get variantClasses() {
		let common = `inline-block align-middle shadow-foldup-md border-b mb-1 will-change-transform font-bold min-w-30 transition-all ${this.stateClasses}`;

		return {
			primary:
				'align-middle bg-violet-500 mb-1 will-change-transform text-shite font-bold min-w-30 shadow-foldup-md border-b border-violet-400 shadow-violet-600 transition-all hover:shadow-foldup-lg hover:-translate-y-0.5 active:shadow-foldup-none active:translate-y-1 active:border-transparent',
			secondary: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-bold'
		};
	}

	private get sizeClasses() {
		return {
			sm: 'px-2 py-1 text-xs rounded-md',
			md: 'px-4 py-2 text-sm rounded-md',
			lg: 'px-6 py-4 text-base rounded-md'
		};
	}

	private get iconSizeClasses() {
		return {
			sm: 'h-2.5 w-2.5',
			md: 'h-5 w-5"',
			lg: 'h-6 w-6'
		};
	}

	private forwardClick() {
		this.dispatchEvent(
			new CustomEvent('click', {
				bubbles: true,
				composed: true
			})
		);
	}

	private renderContent() {
		return html`
			<slot name="prefix">
				${when(
					this.loading,
					() =>
						html`<e-svg
							class="animate-spin ${this.iconSizeClasses[this.size]}"
							src="regular/spinner-third"
						></e-svg>`,
					() =>
						when(
							this.icon,
							() =>
								html`<e-svg
									class="${this.iconSizeClasses[this.size]}"
									.src=${this.icon}
								></e-svg>`
						)
				)}
			</slot>
			<slot></slot>
			<slot name="suffix">
				${when(
					this.iconRight,
					() =>
						html`<e-svg
							class="${this.iconSizeClasses[this.size]}"
							.src=${this.iconRight}
						></e-svg>`
				)}
			</slot>
		`;
	}

	render() {
		let classes = [this.variantClasses[this.variant], this.sizeClasses[this.size]].join(' ');

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
		>
			${this.renderContent()}
		</button>`;
	}
}
