const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

const REGION_EMOJI = [
	'❓',
	'🖥️', // 1
	'🇳🇱',
	'🇮🇳',
	'🇩🇪',
	'🇬🇧', // 5
	'🇺🇸',
	'🇺🇸',
	'🇸🇬',
	'🇨🇦',
	'🇮🇳', // 10
	'🇦🇺',
	'🇺🇸',
	'🇺🇸',
	'❓',
	'🇯🇵' // 15
];

export function getRegionEmoji(regionId: number) {
	let regionEmoji = REGION_EMOJI[regionId] ?? REGION_EMOJI[0];
	return `emoji/${converEmojiToUriFriendlyString(regionEmoji)}`;
}

/**
 * @see [Twemoji Repository](https://github.com/twitter/twemoji/blob/d94f4cf793e6d5ca592aa00f58a88f6a4229ad43/scripts/build.js#L344-L350)
 */

function converEmojiToUriFriendlyString(rawText: string) {
	return toCodePoint(rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, '') : rawText);
}

/**
 *
 * @see [Twemoji Repository](https://github.com/twitter/twemoji/blob/d94f4cf793e6d5ca592aa00f58a88f6a4229ad43/scripts/build.js#L571-L589)
 */
function toCodePoint(unicodeSurrogates: string, sep?: string) {
	let r = [],
		c = 0,
		p = 0,
		i = 0;

	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++);
		if (p) {
			r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
			p = 0;
		} else if (0xd800 <= c && c <= 0xdbff) {
			p = c;
		} else {
			r.push(c.toString(16));
		}
	}

	return r.join(sep || '-');
}
