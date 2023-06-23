import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './admin.scss';
import global from '../../utils/global';
import cloud from '@rivet-gg/cloud';

@customElement('page-admin')
export default class AdminPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	perfLists: cloud.SvcPerf[] = null;

	@property({ type: Object })
	perfError: any = null;

	async rayIdChange(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		if (!target.value.trim()) return;

		this.perfError = null;

		try {
			let data = await global.cloud.getRayPerfLogs({ rayId: target.value.trim() });
			this.perfLists = data.perfLists;
		} catch (err) {
			if (err.hasOwnProperty('statusText')) this.perfError = await err.json();
			else this.perfError = err;
		}
	}
	render() {
		return html`
			<div id="base">
				<!-- Header -->
				<page-header>
					<e-svg src="solid/screwdriver"></e-svg>
					<h1>Admin</h1>
				</page-header>
				<div id="body">
					<h3>Ray waterfall lookup</h3>
					<text-input
						placeholder="ray ID"
						@change=${this.rayIdChange.bind(this)}
						maxlength="36"
					></text-input>
					${this.perfError
						? html`<h4 class="error-header">Error</h4>
								<p class="error">${JSON.stringify(this.perfError, null, 4)}</p>`
						: this.perfLists
						? this.perfLists.length
							? html`<perf-waterfall .perfLists=${this.perfLists}></perf-waterfall>`
							: html`<p class="muted-text">No perf events found</p>`
						: null}
				</div>
			</div>
		`;
	}
}
