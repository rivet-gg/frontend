// We need to re-export this here instead of referencing `COLORS` directly since the Webpack define plugin is a simple
// find-replace, so it'd be redefining the constants in many places. `SHARED_COLORS` will be

import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

// replaced by Webpack.
export const COLORS: { [color: string]: string } = SHARED_COLORS;

// Colors from https://gradients.cssgears.com/
export interface GradientData {
	start: number;
	stop: number;
}

export const GRADIENTS: GradientData[] = [
	{ start: 0xce9ffc, stop: 0x7367f0 },
	{ start: 0xe3e3e3, stop: 0x5d6874 },
	{ start: 0xdfec51, stop: 0x73aa0a },
	{ start: 0xb1ea4d, stop: 0x459522 },
	{ start: 0xc3ec52, stop: 0x0ba29d },
	{ start: 0x0ff0b3, stop: 0x036ed9 },
	{ start: 0x13f1fc, stop: 0x0470dc },
	{ start: 0xc56cd6, stop: 0x3425af },
	{ start: 0xff57b9, stop: 0xa704fd },
	{ start: 0xf36265, stop: 0x961276 },
	{ start: 0xf5515f, stop: 0xa1051d },
	{ start: 0xf2d50f, stop: 0xda0641 },
	{ start: 0xfad961, stop: 0xf76b1c },
	{ start: 0x5b247a, stop: 0x1bcedf },
	{ start: 0x184e68, stop: 0x57ca85 },
	{ start: 0x65799b, stop: 0x5e2563 },
	{ start: 0xf02fc2, stop: 0x6094ea },
	{ start: 0x42e695, stop: 0x3bb2b8 },
	{ start: 0x7117ea, stop: 0xea6060 },
	{ start: 0x622774, stop: 0xc53364 },
	{ start: 0x17ead9, stop: 0x6078ea },
	{ start: 0xf65599, stop: 0x4d0316 },
	{ start: 0xfcdf8a, stop: 0xf38381 }
];

export function buildCSSGradientStyle(gradient: GradientData): string {
	return `linear-gradient(to right bottom, ${hexToColor(gradient.start)} 0%, ${hexToColor(
		gradient.stop
	)} 100%)`;
}

export function buildCanvasGradient(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	gradient: GradientData
): CanvasGradient {
	let g = ctx.createLinearGradient(0, 0, width, height);
	g.addColorStop(0, hexToColor(gradient.start));
	g.addColorStop(1, hexToColor(gradient.stop));
	return g;
}

export function hexToColor(hex: number): string {
	let stringified = ('000000' + hex.toString(16)).slice(-6);
	return `#${stringified}`;
}

export function colorToHex(color: string): number {
	return parseInt(color.slice(1), 16);
}

export class ColorExtractor {
	imageUrl: string;
	extractor: Vibrant;
	palette: Palette;

	private currentRequest: Promise<void | Palette> = null;

	update(imageUrl: string) {
		this.imageUrl = imageUrl;

		this.extractor = new Vibrant(this.imageUrl, {
			useWorker: true
		});
		this.currentRequest = null;
	}

	reset() {
		this.palette = null;
		this.currentRequest = null;
	}

	getPalette() {
		if (!this.imageUrl) return new Promise(() => {});

		if (!this.currentRequest) {
			this.currentRequest = this.extractor
				.getPalette()
				.then(res => {
					this.palette = res;

					this.currentRequest = null;

					return res;
				})
				.catch(console.debug);
		}

		return this.currentRequest;
	}

	createTextColor() {
		if (this.palette?.LightVibrant) {
			let c = this.palette.LightVibrant.getHsl();
			let saturation = 75; // Percent
			let lightness = 120; // Percent
			return `hsl(
				${c[0] * 360},
				${c[1] * saturation}%,
				${Math.max(45, c[2] * lightness)}%
			)`;
		}

		return null;
	}

	createBackgroundGradient() {
		if (this.palette?.LightVibrant && this.palette?.DarkVibrant) {
			let c1 = this.palette.LightVibrant.getHsl();
			let c2 = this.palette.DarkVibrant.getHsl();

			let saturation = 60; // Percent
			let lightness = 120; // Percent
			let alpha = 0.8;

			return `linear-gradient(142deg,
				hsla(${c1[0] * 360}, ${c1[1] * saturation}%, ${c1[2] * 100}%, ${alpha}) 0%,
				hsla(${c2[0] * 360}, ${c2[1] * saturation}%, ${c2[2] * lightness}%, ${alpha}) 120%
			)`;
		}

		return null;
	}
}
