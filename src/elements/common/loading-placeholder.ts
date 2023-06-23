import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './loading-placeholder.scss';
import { classMap } from 'lit/directives/class-map.js';

@customElement('loading-placeholder')
export default class LoadingPlaceholder extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	// TEMPORARY BUG FIX: https://stackoverflow.com/questions/70176073/strange-bug-on-chrome-when-combining-flex-direction-column-reverse-and-a-fixe
	@property({ type: Boolean, attribute: 'not-fixed' })
	notFixed = false;

	render() {
		let classes = classMap({
			disabled: this.isDisabled
		});

		return html`<div id="base" class=${classes}></div>`;
	}
}
