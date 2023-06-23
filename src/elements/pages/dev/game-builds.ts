import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './game-builds.scss';
import * as cloud from '@rivet-gg/cloud';
import { cssify } from '../../../utils/css';

@customElement('page-dev-game-builds')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	render() {
		return html`
			<div id="base">
				<dev-builds ?uploadable=${true} .game=${this.game}></dev-builds>
			</div>
		`;
	}
}
