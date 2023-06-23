import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { cssify } from '../../utils/css';
import styles from './embedded-svg.scss';
import assets from '../../data/assets';

@customElement('e-svg')
export default class EmbeddedSVG extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	src: string;

	@property({ type: Boolean, attribute: 'non-icon' })
	nonIcon = false;

	@property({ type: Boolean, attribute: 'absolute-position' })
	absolutePosition = false;

	@property({ type: Boolean })
	preserve = false;

	private loadedSrc!: string;
	private assetData!: string;
	private loadFailed = false;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// console.log(this.src, this.loadedSrc, this.assetData, this.loadFailed);
		if (this.src != this.loadedSrc && changedProperties.has('src')) {
			this.performUpdate();
		}
	}

	async performUpdate(): Promise<void> {
		// Fetch new assets if src changed or the asset has loaded already
		if (this.src != this.loadedSrc || (this.assetData == null && !this.loadFailed)) {
			try {
				// Save as the loaded src
				this.loadedSrc = this.src;

				// Load the asset from the server
				this.assetData = await assets.loadAsset(
					this.nonIcon ? assets.nonIconUrl(this.src) : assets.iconUrl(this.src)
				);

				// src changed in between asset fetching
				if (this.loadedSrc != this.src) {
					this.loadedSrc = null;
					await this.performUpdate();
					this.requestUpdate();
				}
			} catch (error) {
				// Don't load again and log error
				this.loadFailed = true;
				// logging.error('Failed to load external SVG', error);

				// Set asset to missing  // TODO: Make this a failed icon instead
				this.src = 'missing';
			}
		}

		// Perform the update
		super.performUpdate();
	}

	render() {
		return this.assetData ? html`${unsafeHTML(this.assetData)}` : null;
	}
}
