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
		return html`<div id="base">
			<h2>Primary</h2>
			<rvt-button primary extra-small>Button</rvt-button>
			<rvt-button primary small>Button</rvt-button>
			<rvt-button primary>Button</rvt-button>
			<rvt-button primary large>Button</rvt-button>
			<rvt-button primary extra-large>Button</rvt-button>

			<h2>Secondary</h2>
			<rvt-button extra-small>Button</rvt-button>
			<rvt-button small>Button</rvt-button>
			<rvt-button>Button</rvt-button>
			<rvt-button large>Button</rvt-button>
			<rvt-button extra-large>Button</rvt-button>

			<h2>Icon</h2>
			<rvt-button primary extra-small icon="solid/plus">Button</rvt-button>
			<rvt-button primary small icon="solid/plus">Button</rvt-button>
			<rvt-button primary icon="solid/plus">Button</rvt-button>
			<rvt-button primary large icon="solid/plus">Button</rvt-button>
			<rvt-button primary extra-large icon="solid/plus">Button</rvt-button>

			<h2>Icon right</h2>
			<rvt-button primary extra-small icon-right="solid/plus">Button</rvt-button>
			<rvt-button primary small icon-right="solid/plus">Button</rvt-button>
			<rvt-button primary icon-right="solid/plus">Button</rvt-button>
			<rvt-button primary large icon-right="solid/plus">Button</rvt-button>
			<rvt-button primary extra-large icon-right="solid/plus">Button</rvt-button>
		</div> `;
	}
}
