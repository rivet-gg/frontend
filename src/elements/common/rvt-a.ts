import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';

@customElement('rvt-a')
export class RvtA extends LitElement {
	static styles = cssify();

	@property({ type: String, attribute: true })
	href: string;

	@property({ type: String, attribute: true })
	target: string;

	render() {
		return html`<a class="text-cream-400 hover:underline" href=${this.href} target=${this.target}
			><slot></slot
		></a>`;
	}
}
