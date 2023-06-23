import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './page-filter.scss';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

const MAX_FILTERS = 6;

@customElement('page-filter')
export default class PageFilter extends LitElement {
	static styles = cssify(styles);

	@property({ type: Function })
	selectionchange: (selection: any[]) => void;

	@property({ type: Array })
	options: any[] = [];

	@property({ type: Array })
	selectedOptions: any[] = [];

	@query('[name=input]')
	textInputSlot: HTMLSlotElement;

	@queryAll('.option')
	optionElements: HTMLElement[];

	focused = false;
	hovered = false;
	selection = 0;
	filter = '';

	get filteredOptions(): any[] {
		return this.options.filter(a => a.includes(this.filter));
	}

	firstUpdated(p: PropertyValues) {
		super.firstUpdated(p);

		// Add event listener to text input
		if (this.textInputSlot) {
			let input = this.textInputSlot.assignedElements()[0] as HTMLInputElement;

			// TODO: Redo all event handlers to be put in HTML via `@event`

			// Focus event handlers
			input.addEventListener('focusin', () => {
				// Set focus to true (renders options list)
				this.focused = true;
				this.requestUpdate();
			});
			input.addEventListener('focusout', () => {
				// Does not hide when hovering the options list
				if (!this.hovered) {
					// Set focus to false (hides options list)
					this.focused = false;
					this.selection = 0;
					this.requestUpdate();
				}
				// Clicking on the options list keeps focus on input
				else input.focus();
			});

			// Up, down arrow keys and enter key
			input.addEventListener('keydown', (event: KeyboardEvent) => {
				let modShift = event.getModifierState('Shift');
				let modCtrl = event.getModifierState('Control');

				// Move list cursor
				if (
					event.code == 'ArrowUp' ||
					event.code == 'ArrowDown' ||
					(event.code == 'KeyN' && modShift && modCtrl) ||
					(event.code == 'KeyN' && modCtrl)
				) {
					event.preventDefault();

					// Decrease/increase selection index
					this.selection +=
						event.code == 'ArrowUp' || (event.code == 'KeyN' && modShift && modCtrl) ? -1 : 1;

					// Bound index
					if (this.selection < 0) this.selection = this.filteredOptions.length - 1;
					else if (this.selection >= this.filteredOptions.length) this.selection = 0;

					this.requestUpdate();

					// Scroll to option
					let selectedElement = this.optionElements[this.selection];
					selectedElement.scrollIntoView({
						block: 'nearest'
					});
				}
				// Select current list option
				else if (event.code == 'Enter') {
					event.preventDefault();

					this.selectOption(this.selection);

					// Special case for end of list selection
					if (this.selection >= this.options.length) this.selection--;
				}
				// Deselect input (reset all)
				else if (event.code == 'Escape') {
					this.hovered = false;
					input.value = '';
					this.filter = '';
					input.blur();
				}
			});

			// Text handler
			input.addEventListener('input', () => {
				this.filter = input.value.trim();
				this.requestUpdate();
			});
		}
	}

	selectOption(index: number) {
		// Index check
		if (index == -1 || index >= this.options.length) return;
		// Set maximum active filters (TODO: add indicator for this)
		if (this.selectedOptions.length >= MAX_FILTERS) return;

		// Move option to selected array
		let selected = this.options.splice(this.options.indexOf(this.filteredOptions[index]), 1);
		this.selectedOptions.push(...selected);
		this.requestUpdate();

		// Dispatch event for capture by parent
		this.selectionchange(this.selectedOptions);
	}

	removeSelection(index: number) {
		// Move option from selected array to options list
		this.options.push(...this.selectedOptions.splice(index, 1));
		this.requestUpdate();

		// Dispatch event for capture by parent
		this.selectionchange(this.selectedOptions);
	}

	render() {
		// Re-sort options alphabetically
		if (this.focused) this.options.sort((a, b) => a.localeCompare(b));

		return html`
			<slot name="label"></slot>
			<div id="selected-options">
				${repeat(
					this.selectedOptions,
					a => a,
					(a, i) => this.renderSelectedOption(a, i)
				)}
			</div>
			<div id="search-box" class=${classMap({ active: this.focused })}>
				<slot name="icon"></slot>
				<slot name="input"></slot>
				${this.focused
					? html`<div
							id="options"
							@pointerenter=${() => (this.hovered = true)}
							@pointerleave=${() => (this.hovered = false)}
					  >
							${this.filteredOptions.length
								? html` <div>
										${repeat(
											this.filteredOptions,
											a => a,
											(a, i) => this.renderOption(a, i)
										)}
								  </div>`
								: 'No results found'}
					  </div>`
					: null}
			</div>
		`;
	}

	renderOption(text: string, index: number) {
		let classes = classMap({ option: true, selected: this.selection == index });
		let clickHandler = () => this.selectOption(index);

		return html`<div class=${classes} @click=${clickHandler}>${text}</div>`;
	}

	renderSelectedOption(text: string, index: number) {
		let clickHandler = () => this.removeSelection(index);

		return html`<div class="option" @click=${clickHandler}>
			${text}<e-svg src="regular/xmark"></e-svg>
		</div>`;
	}
}
