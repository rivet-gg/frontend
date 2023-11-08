export interface _ {
	// Allows us to use `declare global`
}

declare global {
	let SHARED_COLORS: { [color: string]: string };

	let ENV_IS_PROD: string;

	let ENV_GIT_COMMIT: string;
	let ENV_GIT_BRANCH: string;

	let ENV_RIVET_NAMESPACE: string;

	let ENV_RIVET_API_ENDPOINT: string;
	let ENV_ASSETS_URL: string;

	interface Element {
		webkitRequestFullscreen(): Promise<void>;

		mozRequestFullScreen(): Promise<void>;

		msRequestFullscreen(): Promise<void>;
	}

	interface Document {
		fullscreenElement?: Element;
		webkitFullscreenElement?: Element;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;

		webkitExitFullscreen(): Promise<void>;

		mozCancelFullScreen(): Promise<void>;

		msExitFullscreen(): Promise<void>;
	}

	namespace Turnstile {
		type WidgetId = string;

		enum Theme {
			Light = 'light',
			Dark = 'dark'
		}

		enum Retry {
			Auto = 'auto',
			Never = 'never'
		}

		enum Size {
			Normal = 'normal',
			Compact = 'compact'
		}

		interface RenderParameters {
			sitekey: string;
			callback: (token: string) => void;
			action?: string;
			cData?: string;
			'expired-callback'?: () => void;
			'timeout-callback'?: () => void;
			'error-callback'?: (err: Error) => void;
			theme?: Theme;
			tabindex?: number;
			'response-field'?: boolean;
			'response-field-name'?: string;
			size?: Size;
			retry?: Retry;
			'retry-interval'?: number;
		}

		interface Turnstile {
			render(container: string | HTMLElement, params: RenderParameters): WidgetId;
			getResponse(widgetId: WidgetId): void;
			reset(widgetId: WidgetId): void;
			remove(widgetId: WidgetId): void;
		}
	}
	let turnstile: Turnstile.Turnstile;
}
