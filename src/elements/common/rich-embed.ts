import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './rich-embed.scss';

const THUMBNAIL_HEIGHT = 100;

@customElement('rich-embed')
export default class RichEmbed extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href: string;

	render() {
		let imgWidth = 784;
		let imgHeight = 444;
		let imgStyle = styleMap({ width: `${(imgWidth / imgHeight) * THUMBNAIL_HEIGHT}px` });

		return html`
			<div id="base">
				<div id="gutter"></div>
				<div id="content">
					<a id="title">Embed title</a>
					<p id="description">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim...
					</p>
					<lazy-img
						id="thumbnail"
						style=${imgStyle}
						src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
					></lazy-img>
				</div>
			</div>
		`;
	}
}
