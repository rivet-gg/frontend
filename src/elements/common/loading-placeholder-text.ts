import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './loading-placeholder-text.scss';

// TODO: Make randomly generated
@customElement('loading-placeholder-text')
export default class LoadingPlaceholderText extends LitElement {
	static styles = cssify(styles);

	@property({ type: Number })
	size: number = null;

	render() {
		let style = styleMap({
			'--size': this.size ? `${this.size}px` : null
		});

		return html`
			<div id="base" style=${style}>
				<div class="row">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
				<div class="row">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
				<div class="row">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
			</div>
		`;
	}
}
