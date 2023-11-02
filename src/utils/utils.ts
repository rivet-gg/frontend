import logging from './logging';
import config from '../config';
import * as uuid from 'uuid';
import timing from './timing';
import numbro from 'numbro';

export type EnumData<T, C> = { t: T; c: C };
export type ErrorHandler = (e: Error | Response) => void;

const ENCODER = new TextEncoder();
const LOG_1000 = Math.log(1000);

export class OAuthProvider {
	constructor(
		public id: string,
		public name: string,
		public color: string
	) {}

	static forId(id: string): OAuthProvider {
		return OAUTH_PROVIDERS.find(l => l.id == id);
	}

	get iconPath(): string {
		return `social/${this.id}`;
	}

	get oauthUrl(): string {
		let nextUrl = `${window.location.origin}${window.location.pathname}?linked=${this.id}`;
		return `${config.ORIGIN_API}/auth/oauth/${encodeURIComponent(this.id)}?next=${encodeURIComponent(
			nextUrl
		)}`;
	}
}

// Deferred promise
export class Deferred<T = void> {
	promise: Promise<T>;
	reject: (value: any) => void;
	resolve: (value?: T) => void;

	constructor(startResolved = false) {
		this.reset();

		if (startResolved) this.resolve();
	}

	reset() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject;
			this.resolve = resolve;
		});
	}
}

export interface DurationOptions {
	showSeconds?: boolean;
	showMilliseconds?: boolean;
	shorten?: boolean;
	show0Min?: boolean;
}

export enum SwipeDirection {
	None,
	Up,
	Right,
	Down,
	Left
}

export const OAUTH_PROVIDERS = [
	new OAuthProvider('google', 'Google', '#4285F4'),
	new OAuthProvider('facebook', 'Facebook', '#4172B8'),
	new OAuthProvider('discord', 'Discord', '#7289DA'),
	new OAuthProvider('twitch', 'Twitch', '#6441A4'),
	new OAuthProvider('instagram', 'Instagram', '#E4405F'),
	new OAuthProvider('twitter', 'Twitter', '#1DA1F2')
];

const utils = {
	/**
	 * Changes element to active or inactive.
	 */
	setActive(element: HTMLElement, active: boolean) {
		element.classList.remove('loading');
		element.classList.toggle('active', active);
		element.classList.toggle('inactive', !active);
	},

	/**
	 * Changes element to loading.
	 */
	setLoading(element: HTMLElement, loading = true) {
		element.classList.toggle('loading', loading);
	},

	/**
	 * Enters fullscreen.
	 */
	requestFullscreen(element: HTMLElement = document.documentElement) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	},

	/**
	 * Exits fullscreen.
	 */
	exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	},

	/**
	 * Returns the current fullscreen element.
	 */
	get fullscreenElement() {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement
		);
	},

	/**
	 * Parses a bool from the given string.
	 */
	parseBool(s: string): boolean {
		if (typeof s === 'string') {
			return s.toLowerCase() === 'true';
		} else {
			return !!s;
		}
	},

	/**
	 * Decreases font size until element with matches the desired width.
	 */
	sizeToFitText(element: HTMLElement, width: number) {
		let fontSize = parseInt(getComputedStyle(element).fontSize);
		while (element.scrollWidth > width && fontSize > 1) {
			fontSize -= 1;
			element.style.fontSize = `${fontSize}px`;
		}
	},

	/// Modified from http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
	shallowEqual(a: any, b: any): boolean {
		// Create arrays of property names
		let aProps = Object.getOwnPropertyNames(a);
		let bProps = Object.getOwnPropertyNames(b);

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length != bProps.length) {
			return false;
		}

		for (let i = 0; i < aProps.length; i++) {
			let propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return true;
	},

	/// Determines if two objects are deep equal.
	/// Adapted from http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html.
	deepEqual(a: any, b: any): boolean {
		// Create arrays of property names
		let aProps = Object.getOwnPropertyNames(a);
		let bProps = Object.getOwnPropertyNames(b);

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length != bProps.length) {
			return false;
		}

		for (let i = 0; i < aProps.length; i++) {
			let propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return true;
	},

	urlBase64ToUint8Array(base64String: string) {
		let padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		let base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
		let rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
	},

	weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	monthNames: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],

	formatDay(dateRaw: number | Date): string {
		let date = new Date(dateRaw);
		return `${this.monthNames[date.getMonth()]} ${date.getDate()}`;
	},

	formatMonth(dateRaw: number | Date): string {
		let date = new Date(dateRaw);
		return `${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
	},

	formatDateShort(dateRaw: number | Date): string {
		let date = new Date(dateRaw);
		return `${this.monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	},

	formatDateUTCShort(dateRaw: number | Date): string {
		let date = new Date(dateRaw);
		return `${this.monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
	},

	formatDateLong(dateRaw: number | Date, hasSeconds = false, multiStageDuration = false): string {
		let date = new Date(dateRaw);

		let diff = Date.now() - date.getTime();

		if (diff < 0) {
			logging.error('Date format error', 'Timestamp from the future');
			return 'Invalid Date';
		}

		if (multiStageDuration) {
			if (diff < timing.hours(1)) {
				return `${this.formatDurationLong(diff, true, hasSeconds)} ago`;
			}
		} else if (diff < timing.hours(24)) {
			return `${this.formatDurationLong(diff, true, hasSeconds)} ago`;
		}

		let hours = date.getHours();
		let suffix = 'AM';

		if (hours >= 12) suffix = 'PM';

		if (hours > 12) hours -= 12;
		else if (hours == 0) hours = 12;

		if (multiStageDuration && diff < timing.hours(24)) {
			return `${hours}:${`00${date.getMinutes()}`.slice(-2)} ${suffix}`;
		} else {
			return `${this.formatDateShort(dateRaw)} ${hours}:${`00${date.getMinutes()}`.slice(
				-2
			)} ${suffix}`;
		}
	},

	formatDuration(duration: number, opts: DurationOptions = {}) {
		let negative = Math.sign(duration) == -1;
		duration = Math.abs(duration);

		// Decompose duration
		let milliseconds = duration % 1000;
		let seconds = Math.floor(duration / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		let years = Math.floor(days / 365);

		// Format string
		let s = [];
		if (years > 0) s.push(`${years}y`);
		if (days > 0) s.push(`${days % 365}d`);
		if (hours > 0) s.push(`${hours % 24}h`);

		if (opts.showSeconds) {
			if (minutes > 0) s.push(`${minutes % 60}m`);
			if (seconds >= 0) s.push(`${seconds % 60}s`);
		} else {
			if (minutes > 0) s.push(`${minutes % 60}m`);
			// Make sure it says at least "1m"
			else if (!s.length) s.push(opts.show0Min ? '0m' : '1m');
		}

		if (opts.showMilliseconds && milliseconds) s.push(`${duration % 1000}ms`);

		return `${negative ? '-' : ''}${(opts.shorten ? s.slice(0, 2) : s).join(' ')}`;
	},

	formatDurationLong(duration: number, single = false, hasSeconds = false) {
		let negative = Math.sign(duration) == -1;
		duration = Math.abs(duration);

		// Decompose duration
		let seconds = Math.floor(duration / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		let years = Math.floor(days / 365);

		if (!hasSeconds && minutes <= 0 && !negative) {
			return 'Less than a minute';
		}

		// Format string
		let s = [];
		if (years > 0) {
			s.push(`${years} year${years == 1 ? '' : 's'}`);
		}
		if (days > 0) {
			s.push(`${days % 365} day${days == 1 ? '' : 's'}`);
		}
		if (hours > 0) {
			s.push(`${hours % 24} hour${hours == 1 ? '' : 's'}`);
		}
		if (minutes > 0) {
			s.push(`${minutes % 60} minute${minutes == 1 ? '' : 's'}`);
		}
		if (seconds >= 0) {
			s.push(`${seconds % 60} second${seconds == 1 ? '' : 's'}`);
		}

		return `${negative ? '-' : ''}${single ? s[0] : s.join(' ')}`;
	},

	formatContentLength(bytes: number) {
		let suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		return `${parseFloat(numbro(bytes).format('0.0a'))}${
			suffixes[Math.floor(Math.log(bytes) / LOG_1000)]
		}`;
	},

	formatContentLengthBinary(bytes: number) {
		return numbro(bytes).format('0.0b');
	},

	shuffle<T>(array: T[]) {
		array.sort(() => Math.random() - 0.5);
	},

	countCodePoints(s: string): number {
		return ENCODER.encode(s).length;
	},

	// Truncates a string to a certain code point length without cutting any characters in half
	truncateAtCodePoint(s: string, length: number): string {
		let chars = Array.from(s);
		let charsAsBytes = chars.map(c => ENCODER.encode(c));
		let accum = 0;

		for (let i = 0, l = charsAsBytes.length; i < l; i++) {
			accum += charsAsBytes[i].length;

			if (accum >= length + 1) {
				return chars.slice(0, i).join('');
			}
		}

		return s;
	},

	copyText(str: string) {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(str);
			return;
		}

		// Modified from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f

		// Create text area
		let el = document.createElement('textarea');
		el.value = str;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);

		// Save content that used to be selected if exists
		let selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : null;

		// Copy the text
		el.select();
		document.execCommand('copy');

		// Remove old element
		document.body.removeChild(el);

		// Restore selection if needed
		if (selected) {
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(selected);
		}
	},

	arraysEqual(a: any[], b: any[]): boolean {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;

		for (let i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}

		return true;
	},

	// Checks if string is a valid uuid, then returns it
	validateUuid(input: string): string {
		try {
			uuid.parse(input);
			return input;
		} catch {
			return null;
		}
	},

	getGroupInitials(groupName: string) {
		return groupName
			.trim()
			.split(/[^A-Za-z0-9]/g)
			.filter(Boolean)
			.slice(0, 3)
			.map(a => a[0]);
	},

	// Format a list of strings
	formatList(items: string[], truncationLength = 0, andSymbol = 'and') {
		// Render list of identities
		let formattedItems = items.map(
			(item, i) =>
				`${item}${
					i == items.length - 2
						? `${items.length != 2 ? ',' : ''} ${andSymbol} `
						: i != items.length - 1
						? ', '
						: ''
				}`
		);

		// Truncate list to 3
		if (truncationLength != 0 && items.length > truncationLength) {
			formattedItems.length = truncationLength;
			formattedItems.push(`${andSymbol} ${items.length - truncationLength} more`);
		}

		return formattedItems.join('').trim();
	},

	// Cuts off text a certain point and adds ellipsis at the end
	truncateText(text: string, stop: number): string {
		if (text.length > stop) return text.slice(0, stop - 3) + '...';
		else return text;
	},

	determineSwipeDirection(x: number, y: number): SwipeDirection {
		let swipeLength = Math.sqrt(x ** 2 + y ** 2);
		let normX = Math.abs(x / swipeLength);
		let normY = Math.abs(y / swipeLength);

		// No swipe detected
		if (normX < 0.5 && normY < 0.5) return SwipeDirection.None;

		// Only care about which swipe direction is longer
		x = normY >= normX ? 0 : x;
		y = normX > normY ? 0 : y;

		if (!x) {
			return y > 0 ? SwipeDirection.Down : SwipeDirection.Up;
		} else {
			return x > 0 ? SwipeDirection.Right : SwipeDirection.Left;
		}
	},

	convertStringToId(x: string): string {
		return x.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	},

	clickHiddenLink(url: string, downloadFilename: string = null) {
		let element = document.createElement('a');
		element.setAttribute('href', url);
		if (downloadFilename != null) element.setAttribute('download', downloadFilename);
		element.setAttribute('target', '_self');

		element.style.display = 'none';
		document.body.append(element);

		element.click();
		element.remove();
	},

	downloadData(filename: string, text: string) {
		let element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text)
		);
		element.setAttribute('download', filename);
		element.setAttribute('target', '_self');

		element.style.display = 'none';
		document.body.append(element);

		element.click();
		element.remove();
	}
};

if (config.DEBUG) (window as any).utils = utils;

export default utils;
