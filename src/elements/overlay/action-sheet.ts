import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cssify } from '../../utils/css';
import styles from './action-sheet.scss';
import { COLORS } from '../../utils/colors';

export class SelectOptionEvent extends Event {
	constructor(public index: number) {
		super('select');
	}
}

export type ActionSheetItem =
	| {
			type: 'element';
			template: TemplateResult;
	  }
	| {
			type: 'action';
			label: string;
			icon: string;
			destructive?: boolean;
			color?: string;
			cb?: (e: PointerEvent) => void;
	  }
	| {
			type: 'separator';
	  };

@customElement('action-sheet')
export default class ActionSheet extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	options: ActionSheetItem[] = [];

	constructor() {
		super();
	}

	selectOption(index: number, e: PointerEvent) {
		// Call the callback
		let option = this.options[index];
		if (option.type == 'action' && option.cb) option.cb(e);

		// Dispatch event
		this.dispatchEvent(new SelectOptionEvent(index));
	}

	renderOption(option: ActionSheetItem, idx: number) {
		switch (option.type) {
			case 'element':
				return html`<div class="element">${option.template}</div>`;
			case 'action':
				return html`<div
					class="option"
					style=${styleMap({
						'--color':
							COLORS[option.color] || option.color || (option.destructive ? 'red' : 'white')
					})}
					@click=${this.selectOption.bind(this, idx)}
				>
					<e-svg src=${option.icon}></e-svg><span>${option.label}</span>
				</div>`;
			case 'separator':
				return html`<div class="separator"></div>`;
			default:
				throw new Error(`Unknown option type ${(option as any).type}.`);
		}
	}

	render() {
		return html`
			<div id="base">
				<div id="options">${this.options.map((option, idx) => this.renderOption(option, idx))}</div>
			</div>
		`;
	}
}
