// Make sure this file has no dependencies

// Provide default env if env variable is not defined. Any uses of `ENV.ABC` will be
// overridden because of the WebPack `DefinePlugin`, so these act as defaults.

const BASE_URL = localStorage.BASE_URL || ENV_BASE_URL;

const config = {
	RIVET_NAMESPACE: ENV_RIVET_NAMESPACE,
	IS_PROD: ENV_RIVET_NAMESPACE == 'prod',
	ALLOW_PAGE_CACHE: window.localStorage.getItem('rivet:disable-page-cache') == null,

	GIT_COMMIT: ENV_GIT_COMMIT,
	GIT_BRANCH: ENV_GIT_BRANCH,

	BASE_URL: BASE_URL as string,
	ASSETS_URL: ENV_ASSETS_URL as string,

	MEDIA_URL: modifyBaseUrl(BASE_URL, 'media.'),

	API_AUTH_URL: modifyBaseUrl(BASE_URL, 'auth.api.', '/v1'),
	API_PORTAL_URL: modifyBaseUrl(BASE_URL, 'portal.api.', '/v1'),
	API_IDENTITY_URL: modifyBaseUrl(BASE_URL, 'identity.api.', '/v1'),
	API_GROUP_URL: modifyBaseUrl(BASE_URL, 'group.api.', '/v1'),
	API_CHAT_URL: modifyBaseUrl(BASE_URL, 'chat.api.', '/v1'),
	API_CLOUD_URL: modifyBaseUrl(BASE_URL, 'cloud.api.', '/v1'),
	API_KV_URL: modifyBaseUrl(BASE_URL, 'kv.api.', '/v1'),
	API_PARTY_URL: modifyBaseUrl(BASE_URL, 'party.api.', '/v1'),

	COMMUNITY_URL: 'https://discord.gg/MskhvCXPEh',
	DOCUMENTATION_URL: 'https://docs.rivet.gg',

	THUMBNAIL_MEDIA_SIZE: { width: 640, height: 480 },
	LARGE_BANNER_SIZE: { width: 768, height: 432 },

	AVATAR_IDS: ['clown', 'derby', 'greg', 'grump', 'smart'],

	enableServiceWorkers: 'serviceWorker' in navigator,
	enableNotifications: 'serviceWorker' in navigator && 'Notification' in window
};

if (!config.IS_PROD) console.log('Config', config);

function modifyBaseUrl(urlRaw: string, prefix: string, path: string = ''): string {
	let url = new URL(urlRaw);
	url.hostname = prefix + url.hostname;
	url.pathname = path;
	return url.toString();
}

export default config;
