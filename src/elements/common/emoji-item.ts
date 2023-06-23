import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { getTwemojiIconName } from '../../utils/emoji';
import { classMap } from 'lit/directives/class-map.js';
import styles from './emoji-item.scss';
import emojiData from '../../data/emoji.json';

interface EmojiItemData {
	name: string;
	symbol?: string;
}

@customElement('emoji-item')
export default class EmojiItem extends LitElement {
	static styles = cssify(styles);

	@property({ attribute: 'emoji-id', type: String })
	emojiId: string;

	// Used for the emoji picker grid
	@property({ type: Boolean })
	centered = false;

	@property({ type: Number })
	size = 32;

	get emojiItem() {
		if (emojiData.items.hasOwnProperty(this.emojiId)) return emojiData.items[this.emojiId];
		else return false;
	}

	render() {
		let item: EmojiItemData = this.emojiItem;

		// Emoji found
		if (item) {
			let icon = getTwemojiIconName(item.symbol);
			let classes = classMap({ centered: this.centered });

			return html`<e-svg
				class=${classes}
				src="emoji/${icon}"
				style=${`width: ${this.size}px; height: ${this.size}px;`}
				preserve
			></e-svg>`;
		}
		// No emoji found, fallback to text
		else {
			return html`:${this.emojiId}:`;
		}
	}
}
