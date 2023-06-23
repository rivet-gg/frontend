import { CSSResult, unsafeCSS } from 'lit';

export function cssify(styleSheet: string): CSSResult {
	return unsafeCSS(styleSheet);
}
