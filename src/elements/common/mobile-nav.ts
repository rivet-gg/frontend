import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, PropertyValues } from 'lit';
import { cssify } from '../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import { bodyEventGroups, windowEventGroups } from '../../utils/global-events';
import timing from '../../utils/timing';
import UIRouter from '../root/ui-router';
import styles from './mobile-nav.scss';

@customElement('mobile-nav')
export default class MobileNavigation extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	title = '';

	@property({ type: Boolean })
	stuck = false;

	@property({ type: Boolean })
	showNav = false;

	@query('#title')
	titleElement: HTMLElement;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleScroll: (e: Event) => void;

	constructor() {
		super();

		// Handle scroll
		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll, timing.milliseconds(100));

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Update after initial render to make sure the title element's width is taken into account
		this.requestUpdate();
	}

	onScroll(e: Event) {
		let target = (e.currentTarget || e.target) as HTMLElement;

		if (!(target instanceof Window)) {
			this.showNav = target.scrollTop > 55;
		}
	}

	// Update on resize
	onResize() {
		this.requestUpdate();
	}

	render() {
		// Don't show nav on home page
		if (this.title == 'Sidebar') this.showNav = false;

		// Used to make title smaller for long titles
		let titleWidth = this.titleElement ? this.titleElement.clientWidth : Infinity;

		// Mobile nav classes
		let navClasses = classMap({
			shown: this.showNav,
			stuck: this.stuck,
			small: textWidth(this.title, '700 16px "Open Sans", sans-serif') > titleWidth,
			ellipsis: textWidth(this.title, '700 14px "Open Sans", sans-serif') > titleWidth
		});

		return html`
			<div id="base" class=${navClasses}>
				<e-svg id="close" src="solid/chevron-left" @click=${this.navigateBack.bind(this)}></e-svg>
				<h1 id="title">${this.title}</h1>
			</div>
		`;
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}

// Returns the width of any text as rendered in the dom
function textWidth(text: string, fontProp: string) {
	let tag = document.createElement('div');
	tag.style.position = 'absolute';
	tag.style.left = '-99in';
	tag.style.whiteSpace = 'nowrap';
	tag.style.font = fontProp;
	tag.innerHTML = text;

	document.body.append(tag);
	let result = tag.clientWidth;
	tag.remove();

	return result;
}
