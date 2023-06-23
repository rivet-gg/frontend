import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, PropertyValues } from 'lit';
import { cssify } from '../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import emojiData from '../../data/emoji.json';
import Fuse from 'fuse.js';
import styles from './inline-emoji-picker.scss';
import { repeat } from 'lit/directives/repeat.js';
import { EmojiItemData } from './emoji-picker';

const emojiFuse = new Fuse<EmojiItemData, {}>(Object.values(emojiData.items), {
	keys: [
		{ name: 'name', weight: 0.83 },
		{ name: 'tags', weight: 0.16 }
	]
});

@customElement('inline-emoji-picker')
export default class InlineEmojiPicker extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	emojiList: EmojiItemData[] = [];

	@property({ type: Object })
	input: HTMLInputElement | HTMLTextAreaElement;

	@property({ type: Number })
	selectedIndex = 0;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.updateQuery();
	}

	// Re-grants the input focus whenever clicked, this keeps the emoji picker from closing due to lost focus
	mouseDown() {
		setTimeout(() => {
			this.input.focus();
		}, 0);
	}

	softSelect(index: number) {
		this.selectedIndex = index;
	}

	select(item: EmojiItemData) {
		let caret = this.input.selectionStart + 1;
		let beginning = this.input.value.slice(0, caret);
		let emojiMatch = beginning.match(/:\w+:?$/);

		if (emojiMatch) {
			let replaceRegex = new RegExp(emojiMatch[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + `:?`);

			// Add emoji to input
			this.input.value =
				beginning.replace(replaceRegex, `:${item.name}:${emojiMatch[0].endsWith(':') ? '' : ' '}`) +
				this.input.value.slice(caret);

			// Set caret position
			this.input.selectionEnd = caret + item.name.length + 1;
			this.input.focus();
		}
	}

	control(event: KeyboardEvent) {
		// Move selection
		if (event.code == 'ArrowUp') {
			event.preventDefault();
			this.selectedIndex = (this.emojiList.length + this.selectedIndex - 1) % this.emojiList.length;
		} else if (event.code == 'ArrowDown') {
			event.preventDefault();
			this.selectedIndex = (this.emojiList.length + this.selectedIndex + 1) % this.emojiList.length;
		}
		// Select given emoji
		else if (event.code == 'Enter') {
			event.preventDefault();
			this.select(this.emojiList[this.selectedIndex]);
		}
	}

	updateQuery() {
		// Check if a potential emoji is in the selection
		let emojiMatch = this.input.value.slice(0, this.input.selectionStart).match(/:\w+$/);

		if (emojiMatch) {
			let query = emojiMatch[0].slice(1);

			// Search for the given emoji
			this.emojiList = emojiFuse.search(query, { limit: 6 });
			if (this.selectedIndex >= this.emojiList.length) this.selectedIndex = 0;
		}
	}

	render() {
		return html`
			<div id="base">
				<h1 id="title">Emoji search</h1>
				<div id="group-items">
					${repeat(
						this.emojiList,
						i => i.name,
						(item, i) => {
							let classes = classMap({
								'group-item': true,
								selected: i == this.selectedIndex
							});

							return html`<div
								class=${classes}
								@mousedown=${this.mouseDown.bind(this)}
								@click=${this.select.bind(this, item)}
								@mousemove=${this.softSelect.bind(this, i)}
							>
								<emoji-item emoji-id=${item.name} centered size="20"></emoji-item>
								<p>:${item.name}:</p>
							</div>`;
						}
					)}
				</div>
			</div>
		`;
	}
}
