import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { LitElement, html, PropertyValues } from 'lit';
import { cssify } from '../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import emojiData from '../../data/emoji.json';
import Fuse from 'fuse.js';
import styles from './emoji-picker.scss';
import { repeat } from 'lit/directives/repeat.js';
import EmojiPickerRow from '../emoji/emoji-picker-row';

const EMOJI_PAIRS: [string, EmojiItemData][] = Object.entries(emojiData.items);

export interface EmojiItemData {
	id: string;
	name: string;
	tags: string[];
	group: string;
	symbol: string;
}

// TODO: Simplify this to a normal search, this fuse gets very laggy with longer queries
const emojiFuse = new Fuse<EmojiItemData, {}>(Object.values(emojiData.items), {
	keys: [
		{ name: 'name', weight: 0.52 },
		{ name: 'tags', weight: 0.42 },
		{ name: 'group', weight: 0.05 }
	]
});

export class EmojiSelectEvent extends Event {
	constructor(public item: EmojiItemData) {
		super('select');
	}
}

const CATEGORY_BUTTON_ICONS = [
	'material/emoticon-happy',
	'material/leaf',
	'material/hamburger',
	'material/soccer',
	'material/car',
	'material/cellphone-android',
	'material/cards-heart'
];

@customElement('emoji-picker')
export default class EmojiPicker extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	activeEmojiList: { name: string; items: EmojiItemData[] }[];

	emojiList: { name: string; items: EmojiItemData[] }[];

	@query('#search-bar')
	searchInput: HTMLInputElement;

	@query('#element-list')
	elementList: HTMLElement;

	@queryAll('.group-title')
	groupTitles: HTMLElement[];

	@property({ type: Number })
	categoryScrollIndex = 0;

	constructor() {
		super();

		// Cache emoji list
		let emojiList = [];
		for (let group of emojiData.groups) {
			emojiList.push({
				name: group.name,
				items: EMOJI_PAIRS.filter((i: [string, EmojiItemData]) => i[1].group == group.id).map(
					i => i[1]
				)
			});
		}

		this.emojiList = emojiList;
		this.activeEmojiList = this.emojiList;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update visibility
		if (changedProperties.has('activeEmojiList')) {
			this.updateEmojiVisibility(this.elementList);
		}
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.updateEmojiVisibility(this.elementList);
	}

	onScroll(event: Event) {
		let scroller = event.currentTarget as HTMLElement;

		// Light up the proper category element
		for (let i = this.groupTitles.length - 1; i >= 0; i--) {
			let titleElement = this.groupTitles[i];

			if (scroller.scrollTop >= titleElement.offsetTop - 50) {
				this.categoryScrollIndex = i;
				this.requestUpdate('categoryScrollIndex');
				break;
			}
		}

		this.updateEmojiVisibility(scroller);
	}

	updateEmojiVisibility(scroller: HTMLElement) {
		let emojiRows: EmojiPickerRow[] = Array.from(scroller.querySelectorAll('emoji-picker-row'));

		for (let row of emojiRows) {
			if (
				scroller.scrollTop >= row.offsetTop - scroller.clientHeight - 50 &&
				scroller.scrollTop <= row.offsetTop
			) {
				row.active = true;
			} else row.active = false;
		}
	}

	onKeyPress(event: KeyboardEvent): boolean {
		// If press enter with results, select that element
		if (event.code == 'Enter' && this.activeEmojiList[0].items.length > 0) {
			this.selectElement(this.activeEmojiList[0].items[0].name);
			return false;
		}

		return true;
	}

	updateEmojiList(event?: Event) {
		// Get search term
		let searchTerm = event && (event.target as HTMLInputElement).value.trim();

		// Create list
		if (searchTerm) {
			// Search results
			this.activeEmojiList = [
				{
					name: 'Results',
					items: emojiFuse.search(searchTerm, { limit: 48 })
				}
			];

			// Scroll to top
			this.groupTitles[0].scrollIntoView();
		} else this.activeEmojiList = this.emojiList;
	}

	selectElement(elementId: string) {
		// Clear input
		this.searchInput.value = '';
		this.updateEmojiList();

		// Create event
		if (emojiData.items[elementId]) {
			let event = new EmojiSelectEvent(emojiData.items[elementId]);
			this.dispatchEvent(event);
		}
	}

	propagateSelectEvent(event: EmojiSelectEvent) {
		this.dispatchEvent(new EmojiSelectEvent(event.item));
	}

	focusSearch() {
		this.searchInput.focus();
	}

	scrollToCategory(categoryIndex: number) {
		// Find the given category header
		if (categoryIndex < CATEGORY_BUTTON_ICONS.length && categoryIndex >= 0) {
			let oldSearch = this.searchInput.value;

			// Reset search
			this.searchInput.value = '';
			this.updateEmojiList();

			// Add a delay if a search was being made
			if (oldSearch != '') {
				setTimeout(() => {
					this.groupTitles[categoryIndex].scrollIntoView();
				}, 0);
			} else this.groupTitles[categoryIndex].scrollIntoView();
		}
	}

	render() {
		return html`
			<div id="emoji-picker">
				<input
					id="search-bar"
					class="search"
					type="text"
					placeholder="Search for emoji..."
					@keypress="${this.onKeyPress}"
					@input=${this.updateEmojiList}
				/>
				<div id="element-list" @scroll=${this.onScroll.bind(this)}>
					${repeat(
						this.activeEmojiList,
						g => g.name,
						group => html`
							<div class="group" name=${group.name}>
								<div class="group-title">${group.name}</div>
								<div class="group-items">
									${repeat(
										chunkArray(group.items, 6),
										a => a[0].name,
										array =>
											html`<emoji-picker-row
												class="group-row"
												.parent=${this}
												.emojis=${array}
												@select=${this.propagateSelectEvent.bind(this)}
											></emoji-picker-row>`
									)}
								</div>
							</div>
						`
					)}
				</div>

				<!-- Emoji categories -->
				<div id="emoji-categories">
					${repeat(
						CATEGORY_BUTTON_ICONS,
						a => a,
						(a, i) => {
							let classes = classMap({
								'category-button': true,
								selected:
									this.searchInput &&
									this.searchInput.value == '' &&
									i == this.categoryScrollIndex
							});

							return html` <div class=${classes} @click=${this.scrollToCategory.bind(this, i)}>
								<e-svg src=${a}></e-svg>
							</div>`;
						}
					)}
				</div>
			</div>
		`;
	}
}

function chunkArray(inputArray: any[], chunkSize: number): any[][] {
	return inputArray.reduce((resultArray, item, index) => {
		let chunkIndex = Math.floor(index / chunkSize);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [];
		}

		resultArray[chunkIndex].push(item);

		return resultArray;
	}, []);
}
