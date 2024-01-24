import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';

@customElement('rvt-page-error')
export default class ErrorPage extends LitElement {
	static styles = cssify();

	@property({ type: String })
	title: string;

	@property({ type: String })
	message: string;

	@property({ type: Object })
	stack: any;

	render() {
		return html`
			<div class="retro-elevated p-8">
				<rvt-error .title=${this.title} .message=${this.message} .stack=${this.stack}></rvt-error>
			</div>
		`;
	}
}
