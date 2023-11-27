import {
	customElement,
	html,
	LitElement,
	property,
	PropertyValues,
	query,
	queryAll,
	TemplateResult
} from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './drop-down-list.scss';
import { styleMap } from 'lit-html/directives/style-map.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { when } from 'lit-html/directives/when.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { Orientation } from '../common/overlay-positioning';
import RvtRoot from '../root/rvt-root';

// TODO: Implement arrow key movement and enter key to complete

export class DropDownSelectEvent<T> extends Event {
	constructor(public selection: DropDownSelection<T>) {
		super('select', { bubbles: true, composed: true });
	}
}

export interface DropDownSelection<T> {
	value: T;
	// Set even if template is used instead to enable filtering.
	label?: string;
	template?: TemplateResult;
	title?: string;
	disabled?: boolean;
	// Denotes whether or not this option is solely used as a header, not a value
	header?: boolean;
	// Doesn't apply padding or hover styling
	unstyled?: boolean;
}

// TODO: Add ability to disable
// TODO: Close when window resizes
@customElement('drop-down-list')
export default class DropDownList<T> extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	options: DropDownSelection<T>[];

	@property({ type: Object })
	selection: DropDownSelection<T>;

	@property({ type: String })
	placeholder = 'Select option';

	@property({ type: Boolean, attribute: 'with-border' })
	border = false;

	@property({ type: Boolean })
	light = false;

	@property({ type: Boolean, attribute: 'filter' })
	filter = false;

	@property({ type: Boolean, attribute: 'fixed' })
	isFixed = false;

	@query('#base')
	baseElement: HTMLElement;

	@property({ type: Boolean, attribute: 'overlay' })
	isOverlay = false;

	@property({ type: Number })
	orientation: Orientation = Orientation.TopLeft;

	bgColor: string = null;
	highlightColor: string = null;

	@query('#filter-input')
	filterInput: HTMLInputElement;

	@queryAll('.option')
	optionElements: HTMLElement[];

	recentClick: number = performance.now();
	@property({ type: Number })
	filterSelection = 0;
	@property({ type: String })
	filterString = '';

	// === GET HEIGHT OF SELECTION ===
	@property({ type: Number })
	maxHeight = 0;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update max height on selection change
		if (changedProperties.has('selection')) {
			this.updateComplete.then(async () => {
				this.maxHeight = this.baseElement.querySelector<HTMLElement>('#controls').offsetHeight;
			});
		}
	}

	onClick() {
		this.recentClick = performance.now();
	}

	onControlsClick(e: Event) {
		if (this.isOverlay) {
			this.dispatchEvent(new Event('close'));
		} else {
			let style = window.getComputedStyle(this.shadowRoot.host as HTMLElement);

			RvtRoot.shared.openDropDownList({
				contextElement: this,
				active: true,
				fixed: this.isFixed,
				orientation: this.orientation,
				options: this.options,
				light: this.light,
				selection: this.selection,
				selectionCb: (event: DropDownSelectEvent<T>) => {
					this.selection = event.selection;
					this.dispatchEvent(new DropDownSelectEvent(event.selection));
				},
				// Fetches own colors from style and sends it to the overlay
				bgColor: style.getPropertyValue('--bg-color'),
				highlightColor: style.getPropertyValue('--highlight-color')
			});
		}
	}

	onOptionClick(selection: DropDownSelection<T>) {
		this.selection = selection;
		this.dispatchEvent(new Event('close'));
		this.dispatchEvent(new DropDownSelectEvent(this.selection));
	}

	onFilterKeyDown(e: KeyboardEvent) {
		let modShift = e.getModifierState('Shift');
		let modCtrl = e.getModifierState('Control');

		let previousSelection = this.filterSelection;
		let filteredOptions = this.getFilteredOptions();

		// Move list cursor
		if (
			e.code == 'ArrowUp' ||
			e.code == 'ArrowDown' ||
			(e.code == 'KeyN' && modShift && modCtrl) ||
			(e.code == 'KeyN' && modCtrl)
		) {
			e.preventDefault();

			// Decrease/increase selection index
			let dx = e.code == 'ArrowUp' || (e.code == 'KeyN' && modShift && modCtrl) ? -1 : 1;

			this.filterSelection += dx;
			// Skip disabled and header options
			let tick = 0;
			while (
				(filteredOptions[this.filterSelection]?.disabled ||
					filteredOptions[this.filterSelection]?.header) &&
				tick < filteredOptions.length
			) {
				this.filterSelection += dx;
				tick++;
			}
		}
		// Select current list option
		else if (e.code == 'Enter') {
			e.preventDefault();

			this.onOptionClick(filteredOptions[this.filterSelection]);
		}

		// Bound index
		if (this.filterSelection < 0) this.filterSelection = filteredOptions.length - 1;
		else if (this.filterSelection >= filteredOptions.length) this.filterSelection = 0;

		if (this.filterSelection != previousSelection) {
			// Scroll to option
			let selectedElement = this.optionElements[this.filterSelection];
			selectedElement.scrollIntoView({
				block: 'nearest'
			});
		}
	}

	onFilterInput(e: KeyboardEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.filterString = target.value.trim().toLowerCase();
	}

	render() {
		// let bounds = this.baseElement.getBoundingClientRect();
		let classes = classMap({
			open: this.isOverlay,
			border: this.border,
			light: this.light,
			fixed: this.isFixed
		});

		let style = styleMap({
			'--bg-color': this.bgColor,
			'--highlight-color': this.bgColor
		});

		let caret = this.isOverlay ? 'solid/caret-up' : 'solid/caret-down';
		let options = this.getFilteredOptions();

		return html`
			<div id="base" class=${classes} style=${style}>
				<div id="controls" @click=${this.onControlsClick.bind(this)}>
					${when(
						this.isOverlay && this.filter,
						() =>
							html`<input
								id="filter-input"
								maxlength="64"
								type="text"
								placeholder="Filter..."
								@click=${(e: Event) => e.stopPropagation()}
								@keydown=${this.onFilterKeyDown.bind(this)}
								@input=${this.onFilterInput.bind(this)}
							/>`,
						() =>
							html`<p id="selection" title=${this.selection ? this.selection.title ?? '' : ''}>
								${this.selection
									? this.selection.template ?? this.selection.label ?? '<Empty>'
									: this.placeholder}
							</p>`
					)}
					<e-svg id="icon" src=${caret}></e-svg>
				</div>
				${when(
					this.isOverlay,
					() =>
						html`<div id="spacer"></div>
							<div id="options">
								${when(
									!options.length,
									() => html`<p class="muted">No options available</p>`
								)}
								<div>
									${repeat(
										options,
										o => o,
										(o, i) => {
											let classes = classMap({
												option: true,
												disabled: o.disabled,
												header: o.header,
												unstyled: o.unstyled,
												selected: this.filter && this.filterSelection == i
											});

											return html`<div
												class=${classes}
												@click=${o.header ? null : this.onOptionClick.bind(this, o)}
												title=${o.title ?? ''}
											>
												${o.template ?? o.label ?? '<Empty>'}
											</div>`;
										}
									)}
								</div>
							</div>`
				)}
			</div>
		`;
	}

	getFilteredOptions() {
		return this.filterString.trim()
			? this.options.filter(a => a.label?.toLowerCase().includes(this.filterString))
			: this.options;
	}
}
