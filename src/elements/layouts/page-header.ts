import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './page-header.scss';
import { classMap } from 'lit/directives/class-map.js';

@customElement('page-header')
export default class PageHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'on-mobile' })
	onMobile = false;

	@property({ type: Boolean })
	rightAlign = false;

	render() {
		let classes = classMap({
			'on-mobile': this.onMobile,
			'right-align': this.rightAlign
		});

		return html`<div id="base" class=${classes}><slot></slot></div>`;
	}
}
