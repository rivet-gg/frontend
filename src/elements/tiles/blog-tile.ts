import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './blog-tile.scss';

@customElement('blog-tile')
export default class BlogTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	blog: any; // api.portal.BlogPostSummary

	@property({ type: Boolean })
	featured = false;

	render() {
		return html`
			<a id="base" href=${this.blog.url}>
				<lazy-img id="thumbnail" src=${this.blog.imageUrl} bg-size="cover"></lazy-img>
				${this.featured ? html`<h3>FEATURED POST - 9/17/2020</h3>` : null}
				<h1>${this.blog.title}</h2>
				<h2>${this.blog.categories.join(', ')}</h2>

				<!-- Dropdown on hover -->
				<div id='hover-drop'>
					VIEW ON <e-svg src="social/medium-wordmark" preserve></e-svg>
				</div>
			</a>
		`;
	}
}
