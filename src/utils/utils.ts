import logging from './logging';
import { COLORS } from './colors';
import config from '../config';
import * as uuid from 'uuid';
import timing from './timing';
import * as api from '../utils/api';
import numbro from 'numbro';

export type EnumData<T, C> = { t: T; c: C };
export type ErrorHandler = (e: Error | Response) => void;

const ENCODER = new TextEncoder();
const LOG_1000 = Math.log(1000);

export class OAuthProvider {
	constructor(public id: string, public name: string, public color: string) {}

	static forId(id: string): OAuthProvider {
		return OAUTH_PROVIDERS.find(l => l.id == id);
	}

	get iconPath(): string {
		return `social/${this.id}`;
	}

	get oauthUrl(): string {
		let nextUrl = `${window.location.origin}${window.location.pathname}?linked=${this.id}`;
		return `${config.API_AUTH_URL}/oauth/${encodeURIComponent(this.id)}?next=${encodeURIComponent(
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

	statusColor(identity?: api.identity.IdentityHandle): string {
		if (!identity) return COLORS['status-offline'];
		// if (identity.activity && identity.activity.t == "Game") return COLORS["status-in-game"];
		switch (identity.presence.status) {
			case api.identity.IdentityStatus.ONLINE:
				return COLORS['status-online'];
			case api.identity.IdentityStatus.OFFLINE:
				return COLORS['status-offline'];
			case api.identity.IdentityStatus.AWAY:
				return COLORS['status-away'];
			default:
				logging.error('Invalid status', identity.presence.status);
				return null;
		}
	},

	statusText(identity?: api.identity.IdentityHandle): string {
		if (!identity) return '...';

		switch (identity.presence.status) {
			case api.identity.IdentityStatus.ONLINE:
				return 'Online';
			case api.identity.IdentityStatus.OFFLINE:
				return 'Offline';
			case api.identity.IdentityStatus.AWAY:
				return 'Away';
			default:
				logging.error('Invalid status', identity.presence.status);
				return '?';
		}
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

	formatActivity(
		presence: api.identity.IdentityPresence,
		party?: api.party.PartyHandle | api.party.PartySummary
	): string {
		if (presence.gameActivity) {
			if (party) {
				return `Playing ${presence.gameActivity.game.displayName} with party`;
			} else {
				return `Playing ${presence.gameActivity.game.displayName}`;
			}
		} else if (party) {
			return `In party`;
		} else {
			return null;
		}
	},

	formatIdentityListName(
		identities: api.identity.IdentityHandle[],
		currentIdentity: api.identity.IdentityHandle
	) {
		// One identity in a chat
		if (identities.length < 2) {
			return 'Empty chat';
		}
		// Two identities in a chat, make the chat title the username of the other identity
		else if (identities.length == 2) {
			return identities.find(identity => identity.identityId != currentIdentity.identityId).displayName;
		} else {
			// Render list of identities
			let displayNames = identities.map(
				(u, i) =>
					`${u.displayName}${
						i == identities.length - 2 ? ', and ' : i != identities.length - 1 ? ', ' : ''
					}`
			);

			// Truncate list to 3
			if (identities.length > 3) {
				displayNames.length = 3;
				displayNames.push(`and ${identities.length - 3} more`);
			}

			return displayNames.join('').trim();
		}
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

	detectMobile(): boolean {
		let a = navigator.userAgent || navigator.vendor || (window as any).opera;

		return (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		);
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

if (!config.IS_PROD) (window as any).utils = utils;

export default utils;
