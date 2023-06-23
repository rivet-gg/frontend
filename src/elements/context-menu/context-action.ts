import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { cssify } from '../../utils/css';
import styles from './context-action.scss';
import logging from '../../utils/logging';
import { globalEventGroups } from '../../utils/global-events';

type TriggerResult = Promise<any> | void;

@customElement('context-action')
export default class ContextAction extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href: string = null;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled = false;

	@property({ type: Function })
	trigger?: (ev?: Event) => TriggerResult = null;

	onClick(ev: Event) {
		// Make sure the button is not disabled
		if (this.isDisabled || this.isLoading) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}

		// Call the trigger if needed
		if (this.trigger) {
			// Execute trigger and handle state if needed
			let promise = this.trigger(ev);

			if (promise && promise instanceof Promise) {
				this.isLoading = true;

				promise
					.catch(err => {
						logging.error('Error caught in button trigger', err);
						globalEventGroups.dispatch('error', err);
					})
					.finally(() => {
						this.isLoading = false;
						this.dispatchEvent(new Event('triggered'));
					});
			} else {
				this.dispatchEvent(new Event('triggered'));
			}
		}
	}

	render() {
		let classes = classMap({ disabled: this.isDisabled, loading: this.isLoading });

		return html`<div id="base" class=${classes} @click=${this.onClick.bind(this)}>
			${when(this.href != null, () => html`<a id="link" href=${this.href}></a>`)}
			<div id="content">
				<slot></slot>
			</div>
			<div id="badge">${when(this.isLoading, () => html`<loading-wheel custom></loading-wheel>`)}</div>
		</div>`;
	}
}
