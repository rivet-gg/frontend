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

// From twemoji
export function getTwemojiIconName(rawText: string) {
	// if variant is present as \uFE0F
	return toCodePoint(rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, '') : rawText);
}

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

export function getRegionEmoji(regionId: number) {
	let regionEmoji = REGION_EMOJI[regionId] ?? REGION_EMOJI[0];
	return `emoji/${getTwemojiIconName(regionEmoji)}`;
}
