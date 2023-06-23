import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './toggle-switch.scss';

export class ToggleSwitchEvent extends Event {
	constructor(public value: boolean) {
		super('toggle');
	}
}

@customElement('toggle-switch')
export default class ToggleSwitch extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	value = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Boolean })
	stopImmediatePropagation = false;

	toggleValue(e: PointerEvent) {
		if (this.stopImmediatePropagation) e.stopImmediatePropagation();
		if (this.isDisabled) return;

		this.value = !this.value;

		let event = new ToggleSwitchEvent(this.value);
		this.dispatchEvent(event);
	}

	render() {
		let classes = classMap({
			active: this.value,
			disabled: this.isDisabled
		});
		return html`<div id="base" class=${classes} @click=${this.toggleValue.bind(this)}>
			<div id="knob"></div>
		</div>`;
	}
}
