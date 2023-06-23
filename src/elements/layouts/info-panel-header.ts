import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './info-panel-header.scss';

@customElement('info-panel-header')
export default class InfoPanelHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'right' })
	floatRight = false;

	constructor() {
		super();
	}

	render() {
		// Get classes and styles
		let classes = classMap({ right: this.floatRight });

		return html`
			<div id="base" class=${classes}>
				<slot name="icon"></slot>
				<slot name="title"></slot>
			</div>
		`;
	}
}
