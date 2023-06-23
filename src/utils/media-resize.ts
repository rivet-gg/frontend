import config from '../config';
import logging from './logging';

interface ResizePreset {
	sizes: [number, number][];
	format: 'png' | 'jpeg';
	scale: 'cover' | 'contain';
}

// Make sure this matches `backend/lib/bolt/core/src/utils/media_resize.rs`
const BUCKET_RESIZE_PRESETS: { [name: string]: ResizePreset } = {
	'user-avatar': {
		sizes: [
			[32, 32],
			[64, 64],
			[128, 128],
			[256, 256],
			[512, 512]
		],
		format: 'jpeg',
		scale: 'cover'
	},
	'team-avatar': {
		sizes: [
			[32, 32],
			[64, 64],
			[128, 128],
			[256, 256],
			[512, 512]
		],
		format: 'jpeg',
		scale: 'cover'
	},
	'game-logo': {
		sizes: [
			[64, 32],
			[128, 64],
			[256, 128],
			[512, 256],
			[1024, 512]
		],
		format: 'png',
		scale: 'contain'
	},
	'game-banner': {
		sizes: [
			[256, 128],
			[512, 256],
			[1024, 512],
			[2048, 1024],
			[4096, 2048]
		],
		format: 'jpeg',
		scale: 'cover'
	}
};

export function resizeFor(url: string, width: number, height: number): string {
	let parsedUrl = new URL(url);

	// Ignore requests that are not to the media server
	if (parsedUrl.origin != config.MEDIA_URL) {
		return url;
	}

	// Adjust the width for the pixel ratio
	let pixelRatio = window.devicePixelRatio || 1;
	let desiredWidth = width * pixelRatio;
	let desiredHeight = height * pixelRatio;

	// Find the resize config from the URL
	let bucket = parsedUrl.pathname.split('/')[1];
	let resizeConfig = BUCKET_RESIZE_PRESETS[bucket];
	if (!resizeConfig) {
		throw new Error(`Invalid bucket ${bucket} for ${url}`);
	}

	// Find the smallest size that will cover the requested size
	let desiredSize = null;
	for (let [w, h] of resizeConfig.sizes) {
		if (w >= desiredWidth && h >= desiredHeight) {
			desiredSize = [w, h];
			break;
		}
	}
	if (desiredSize == null) {
		logging.warn(
			'Exceeded max size, falling back to largest size',
			bucket,
			url,
			width,
			height,
			pixelRatio
		);
		desiredSize = resizeConfig.sizes[resizeConfig.sizes.length - 1];
	}

	// Build URL
	let searchParams = new URLSearchParams();
	searchParams.set('format', resizeConfig.format);
	searchParams.set('size', `${desiredSize[0]}x${desiredSize[1]}`);
	searchParams.set('scale', resizeConfig.scale);
	parsedUrl.search = searchParams.toString();

	return parsedUrl.toString();
}
