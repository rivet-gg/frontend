import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './check-box.scss';
import { classMap } from 'lit/directives/class-map.js';

@customElement('check-box')
export default class CheckBox extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	checked = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Boolean })
	radio = false;

	@property({ type: Boolean, attribute: 'large' })
	isLarge = false;

	onClick(event: Event) {
		if (this.isDisabled) return;

		this.checked = !this.checked;
		this.dispatchEvent(new Event('toggle', event));
	}

	render() {
		let classes = classMap({
			radio: this.radio,
			checked: this.checked,
			large: this.isLarge,
			disabled: this.isDisabled
		});

		return html`
			<div id="base" class=${classes} @click=${this.onClick.bind(this)}>
				${this.radio
					? html`<div id="radio-button"></div>`
					: html`<e-svg id="check" src="solid/check"></e-svg>`}
			</div>
		`;
	}
}
