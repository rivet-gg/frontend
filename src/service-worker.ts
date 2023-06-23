import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';

(self as any).__WB_DISABLE_DEV_LOGS = true;
console.log('Service worker started.');

// Make SW work on first load
clientsClaim();

// TODO: Only enable in development
self.addEventListener('install', event => {
	(self as any).skipWaiting();
});

// TODO: Make preloading assets actually useful
// Preload assets
const manifest = (self as any).__WB_MANIFEST;
console.log('SW manifest', manifest);
// precacheAndRoute(manifest);

registerRoute(
	({ request }) => request.mode === 'navigate',
	new NetworkFirst({
		cacheName: 'pages',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200]
			})
		]
	})
);

registerRoute(
	({ request }) =>
		request.destination === 'style' ||
		request.destination === 'script' ||
		request.destination === 'worker',
	new StaleWhileRevalidate({
		cacheName: 'assets',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200]
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
			})
		]
	})
);

registerRoute(
	({ request }) => request.destination === 'image',
	new CacheFirst({
		cacheName: 'images',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200]
			}),
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
			})
		]
	})
);
