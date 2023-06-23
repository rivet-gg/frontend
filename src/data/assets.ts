import config from '../config';
import { ls } from '../utils/cache';

const assets = {
	static(path: string): string {
		if (path.startsWith('/')) {
			return window.location.origin + path;
		} else {
			return window.location.origin + '/' + path;
		}
	},

	asset(path: string): string {
		if (path.startsWith('/')) {
			return config.ASSETS_URL + path;
		} else {
			return config.ASSETS_URL + '/' + path;
		}
	},

	iconUrl(path: string): string {
		// Make path assertions
		if (path.startsWith('/')) throw new Error(`SVG path ${path} must not start with a slash`);
		if (path.endsWith('.svg')) throw new Error(`SVG path ${path} must not end with ".svg"`);

		// Build URL
		return this.asset(`icons/${path}.svg`);
	},

	nonIconUrl(path: string): string {
		// Make path assertions
		if (path.endsWith('.svg')) throw new Error(`SVG path ${path} must not end with ".svg"`);

		// Build URL
		return this.asset(`${path}.svg`);
	},

	// TODO: remove all 3 of these functions

	/**
	 * @deprecated Use `game.logoUrl` instead
	 */
	gameLogoUrl(nameId: string): string {
		return assets.asset(`/games/${nameId}/logo.png`);
	},

	/**
	 * @deprecated
	 */
	gameSnapshotUrl(nameId: string, snapshotSize: [number, number], snapshotId: number): string {
		return assets.asset(
			`/games/${nameId}/snapshots/${snapshotSize[0]}x${snapshotSize[1]}-${('000' + snapshotId).slice(
				-3
			)}.png`
		);
	},

	/**
	 * @deprecated
	 */
	gameClipUrl(nameId: string, snapshotSize: [number, number]): string {
		return assets.asset(`/games/${nameId}/clips/${snapshotSize[0]}x${snapshotSize[1]}.mp4`);
	},

	blogGraphicUrl(nameId: string): string {
		return 'https://source.unsplash.com/random';
	},

	stackImageUrl(nameId: string): string {
		return assets.asset(`/stack/${nameId}${nameId.endsWith('.svg') ? '' : '.png'}`);
	},

	async loadAsset(url: string): Promise<string> {
		let storageKey = ls.buildId(`asset-cache:${url}`);

		// Check if cached already; we use localstorage instead of relying on the browser cache, since this is faster
		// and more reliable
		let data: string = localStorage.getItem(storageKey);

		// Fetch data from server
		if (data == null) {
			// Fetch data
			let response = await fetch(url, { redirect: 'follow', mode: 'cors' });

			// Validate status
			if (response.status != 200)
				throw new Error(
					`Invalid status code fetching asset: ${response.status} ${response.statusText}`
				);

			// Parse data
			data = await response.text();

			// Save to load storage
			localStorage.setItem(storageKey, data);
		}

		return data;
	}
};

// logging.data("Assets", assets.ASSET_REGISTER);

export default assets;
