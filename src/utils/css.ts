import { CSSResult, unsafeCSS } from 'lit';
import tailwindStyles from '../common.css';

export function cssify(styleSheet?: string): CSSResult {
	if (styleSheet) return unsafeCSS(styleSheet + '\n' + tailwindStyles);
	else return unsafeCSS(tailwindStyles);
}
