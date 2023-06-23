import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './info-panel-body.scss';

@customElement('info-panel-body')
export default class InfoPanelBody extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'right' })
	floatRight = false;

	@property({ type: Boolean, attribute: 'noindent' })
	noIndent = false;

	constructor() {
		super();
	}

	render() {
		// Get classes and styles
		let classes = classMap({ right: this.floatRight, noIndent: this.noIndent });

		return html`
			<div id="base" class=${classes}>
				<slot></slot>
			</div>
		`;
	}
}
