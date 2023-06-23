import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './price-display.scss';
import numbro from 'numbro';
import { classMap } from 'lit/directives/class-map.js';

@customElement('price-display')
export default class PriceDisplay extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	symbol = '$';

	@property({ type: Number })
	amount = 0;

	@property({ type: Number, attribute: 'decimal-places' })
	decimalPlaces = 2;

	@property({ type: Boolean, attribute: 'decimal' })
	showDecimal = true;

	@property({ type: Boolean, attribute: 'no-small-text' })
	noSmallText = false;

	render() {
		let match = this.amount.toString().match(/^(-?)(\d+)(?:\.(\d+))?$/);
		let sign = '';
		let whole = '';
		let decimal = '';
		let valid = true;

		let classes = classMap({
			'no-small-text': this.noSmallText
		});

		if (match) {
			sign = match[1];
			whole = numbro(match[2]).format('0,0');
			decimal = match[3]
				? `${match[3]}${'0'.repeat(this.decimalPlaces - 1)}`.slice(0, this.decimalPlaces)
				: '0'.repeat(this.decimalPlaces);
		} else {
			valid = false;
		}

		return html`
			<div id="base" class=${classes}>
				${valid
					? html`${sign}${this.symbol}${whole}${this.showDecimal
							? html`<span>.${decimal}</span>`
							: ''}`
					: '<null>'}
			</div>
		`;
	}
}
