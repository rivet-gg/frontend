import { CSSResult, unsafeCSS } from 'lit';
import tailwindStyles from '../common.css';

export function cssify(styleSheet: string): CSSResult {
	return unsafeCSS(styleSheet + '\n' + tailwindStyles);
}
