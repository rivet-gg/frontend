import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './loading-wheel.scss';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('loading-wheel')
export default class LoadingWheel extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'small' })
	isSmall = false;

	@property({ type: Boolean, attribute: 'custom' })
	isCustom = false;

	@property({ type: Boolean, attribute: 'inline' })
	isInline = false;

	@property({ type: Boolean, attribute: 'no-fade' })
	noFade = false;

	@property({ type: String })
	color: string = null;

	@property({ type: String })
	message = 'Loading...';

	render() {
		let classes = classMap({
			small: this.isSmall,
			custom: this.isCustom,
			inline: this.isInline,
			'no-fade': this.noFade
		});

		let style = styleMap({
			'--color': this.color
		});

		return html`
			<div id="base" class=${classes} style=${style}>
				<e-svg id="wheel" src="regular/circle-notch"></e-svg>
				${this.message.length ? html`<h1>${this.message ?? 'Loading...'}</h1>` : null}
				<slot></slot>
			</div>
		`;
	}
}
