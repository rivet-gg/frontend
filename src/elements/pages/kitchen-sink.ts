import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './kitchen-sink.scss';
import global from '../../utils/global';
import cloud from '@rivet-gg/cloud';

@customElement('page-kitchen-sink')
export default class KitchenSink extends LitElement {
	static styles = cssify(styles);

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData(forceRestart: boolean = false) {
		let profile = await global.api.identity.getSelfProfile();
		console.log('fetched profile', profile);
	}

	render() {
		return html` <div id="base">Hello, world!</div> `;
	}
}
