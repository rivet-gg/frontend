import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './loading-bar.scss';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('loading-bar')
export default class LoadingBar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Number })
	progress: number; // Float between 0 and 1

	render() {
		let progressStyles = styleMap({
			width: `${100 * this.progress}%`
		});

		return html`
			<div id="base">
				<div id="progress" style=${progressStyles}></div>
			</div>
		`;
	}
}
