import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './modal-body.scss';

@customElement('modal-body')
export default class ModalBody extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base" class="retro-elevated">
				<slot></slot>
			</div>
		`;
	}
}
