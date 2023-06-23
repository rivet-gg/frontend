import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './service-card.scss';
import { classMap } from 'lit/directives/class-map.js';
import { ToggleSwitchEvent } from '../common/toggle-switch';

@customElement('service-card')
export default class ServiceCard extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	collapsed = true;

	@property({ type: Boolean })
	editing = false;

	@property({ type: Boolean })
	active = false;

	@property({ type: Boolean, attribute: 'error' })
	hasError = false;

	@property({ type: Boolean, attribute: 'beta' })
	isBeta = false;

	@property({ type: String })
	domain: string;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Collapse when inactive
		if (changedProperties.has('active')) {
			if (!this.active) this.collapsed = true;
		}
	}

	toggleCollapse(e: Event) {
		if (this.active) this.collapsed = !this.collapsed;
	}

	toggle(e: ToggleSwitchEvent) {
		this.active = !this.active;

		if (this.active) this.collapsed = false;

		// Propagate event
		this.dispatchEvent(new ToggleSwitchEvent(e.value));
	}

	render() {
		let classObj: any = {
			collapsed: this.collapsed,
			[this.domain ?? 'services']: true
		};

		let classes = classMap(classObj);

		let toggleCollapseClasses = classMap({
			hidden: !this.active
		});

		return html`
			<div id="base" class=${classes}>
				<div id="header" @click=${this.toggleCollapse.bind(this)}>
					<slot name="icon"></slot>
					<div id="title-area">
						<slot name="title"></slot>
						${this.isBeta ? html`<div id="beta-tag">Beta</div>` : null}
						${this.collapsed && this.hasError
							? html`<e-svg id="error" src="solid/triangle-exclamation"></e-svg>`
							: null}
					</div>
					${this.editing
						? html`<toggle-switch
								id="toggle-switch"
								?value=${this.active}
								@toggle=${this.toggle.bind(this)}
								.stopImmediatePropagation=${true}
						  ></toggle-switch>`
						: null}
					<e-svg
						class=${toggleCollapseClasses}
						id="collapse-state"
						src=${this.collapsed ? 'regular/chevron-down' : 'regular/chevron-up'}
						color=""
					></e-svg>
				</div>
				<div id="content-padding">
					<slot name="content"></slot>
				</div>

				<div id="footer"></div>
			</div>
		`;
	}
}
