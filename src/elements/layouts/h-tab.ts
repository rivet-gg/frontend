import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { cssify } from '../../utils/css';
import styles from './h-tab.scss';

@customElement('h-tab')
export default class HTab extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active = false;

	@property({ type: String })
	href?: string = null;

	@property({ type: String })
	target?: string = null;

	@property({ type: Function })
	trigger?: () => void;

	constructor() {
		super();
	}

	render() {
		let classes = classMap({ active: this.active });

		return html`
			<stylized-button
				.href=${this.href}
				.target=${this.target}
				.trigger=${this.trigger}
				class=${classes}
				><slot></slot
			></stylized-button>
		`;
	}
}
