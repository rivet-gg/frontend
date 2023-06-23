import { customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './rich-text.scss';
import { classMap } from 'lit-html/directives/class-map.js';
import { lexer } from '../../utils/chat';

@customElement('rich-text')
export default class RichText extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	content: string;

	@property({ type: Boolean, attribute: 'inline' })
	inline = false;

	@property({ type: Object })
	timestamp: number;

	@property({ type: Array })
	renderedContent: TemplateResult = null;

	async updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('content')) {
			this.renderedContent = lexer
				.lex(this.content, this.inline ? lexer.SIMPLE_SYNTAXES : lexer.ROOT_SYNTAXES)
				.render(this.content) as TemplateResult;
		}
	}

	render() {
		return html`
			<div id="base" class=${classMap({ inline: this.inline })}>
				<!-- Content -->
				<span>${this.renderedContent}</span>
				${this.timestamp
					? html`<date-display class="text-date" short .timestamp=${this.timestamp}></date-display>`
					: null}
			</div>
		`;
	}
}
