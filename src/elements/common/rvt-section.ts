import { LitElement, html } from 'lit';
import { cssify } from '../../utils/css';
import { customElement } from 'lit/decorators.js';

@customElement('rvt-section')
export default class RvtSection extends LitElement {
	static styles = cssify();

	render() {
		// Needs to be full width and full height because there's a host element as a parent who receives size contraints
		return html`<div class="bg-zinc-800 p-4 rounded-lg w-full h-full flex flex-col">
			<slot name="title"></slot>
			<div class="grow my-4">
				<slot></slot>
			</div>
			<slot name="footer"></slot>
		</div>`;
	}
}
