import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import styles from './drop-down-modal.scss';
import timing from '../../utils/timing';

@customElement('drop-down-modal')
export default class DropDownModal extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active = false;

	@property({ type: Boolean })
	open = false;

	@property({ type: Boolean })
	closing = false;

	@property({ type: Boolean, attribute: 'no-dim-close' })
	noDimClose = false;

	@property({ type: Boolean, attribute: 'large-animation' })
	largeAnimation = false;

	@query('#base')
	baseElement: HTMLElement;

	timeout: number = null;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Toggles the view of this modal when the active property is changed
		if (changedProperties.has('active')) {
			this.toggle(!this.active);
		}
	}

	toggle(option: boolean = this.open) {
		if (option) {
			if (!this.closing && !this.noDimClose) {
				this.closing = true;

				// Trigger reflow for fade out animation
				this.baseElement.style.display = 'none';
				this.baseElement.offsetHeight;
				this.baseElement.style.display = null;

				window.clearTimeout(this.timeout);
				this.timeout = window.setTimeout(() => {
					this.open = false;
					this.dispatchEvent(new Event('close'));
				}, timing.milliseconds(300));
			}
		} else {
			window.clearTimeout(this.timeout);

			this.open = true;
			this.closing = false;
		}
	}

	render() {
		let modalClasses = classMap({
			closing: this.closing,
			open: this.open,
			large: this.largeAnimation
		});

		return html` <div id="base" class=${modalClasses}>
			<div id="close" @click=${() => this.toggle()}></div>
			<div id="animation">
				<slot name="body"></slot>
			</div>
		</div>`;
	}
}
