import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './lazy-image.scss';
import { styleMap } from 'lit/directives/style-map.js';
import { resizeFor } from '../../utils/media-resize';
import logging from '../../utils/logging';

@customElement('lazy-img')
export default class LazyImage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	src: string;

	/// Resized version of the src.
	///
	/// If this exists, then the element has been loaded.
	@property({ type: String })
	srcResized?: string;

	/// Indicates that we should load the image. This is set to true after 1
	//tick in order to ensure we don't block page loads with this image
	//request.
	@property({ type: Boolean })
	isLoaded = false;

	@property({ type: String, attribute: 'bg-size' })
	bgSize: string = null;

	@property({ type: String, attribute: 'resize-for' })
	resizeFor?: string;

	resizeObserver?: ResizeObserver;

	constructor() {
		super();

		if ('ResizeObserver' in window) {
			this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
		} else {
			logging.warn('ResizeObserver is not supported, defaulting to fallback url');
		}
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('src') && this.isLoaded) {
			logging.debug('Resize src from changed property', this, this.clientWidth, this.clientHeight);
			this.resizeSrc();
		}
	}

	connectedCallback() {
		super.connectedCallback();

		// This will automatically call `onResize`
		this.resizeObserver?.observe(this);

		// Start loading image on next tick
		setTimeout(() => {
			this.isLoaded = true;
		}, 0);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.resizeObserver?.disconnect();
	}

	onResize() {
		logging.debug('Resize src from ResizeObserver', this, this.clientWidth, this.clientHeight);
		this.resizeSrc();
	}

	resizeSrc() {
		if (!this.src) return;

		this.srcResized = resizeFor(this.src, this.clientWidth, this.clientHeight);
		logging.debug('Resized src', this, this.clientWidth, this.clientHeight, this.srcResized);
	}

	render() {
		let showImage = this.isLoaded && (this.srcResized || !this.resizeObserver);

		return html`<div
			id="base"
			style=${styleMap({
				backgroundImage: showImage ? `url("${this.srcResized ?? this.src}"` : null,
				backgroundSize: this.bgSize
			})}
		>
			<slot></slot>
		</div>`;
	}
}
