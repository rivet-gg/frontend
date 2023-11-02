// Make sure this file has no dependencies

// Provide default env if env variable is not defined. Any uses of `ENV.ABC` will be
// overridden because of the WebPack `DefinePlugin`, so these act as defaults.

const RIVET_API_ENDPOINT = localStorage.RIVET_API_ENDPOINT || ENV_RIVET_API_ENDPOINT;

const config = {
	RIVET_NAMESPACE: ENV_RIVET_NAMESPACE,
	DEBUG: localStorage.RIVET_DEBUG || ENV_RIVET_NAMESPACE != 'prod',
	ALLOW_PAGE_CACHE: window.localStorage.getItem('rivet:disable-page-cache') == null,

	GIT_COMMIT: ENV_GIT_COMMIT,
	GIT_BRANCH: ENV_GIT_BRANCH,

	ORIGIN_API: RIVET_API_ENDPOINT as string,
	ASSETS_URL: ENV_ASSETS_URL as string,

	MEDIA_URL: RIVET_API_ENDPOINT + '/media',

	API_AUTH_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'auth.', '/v1'),
	API_PORTAL_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'portal.', '/v1'),
	API_IDENTITY_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'identity.', '/v1'),
	API_GROUP_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'group.', '/v1'),
	API_CHAT_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'chat.', '/v1'),
	API_CLOUD_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'cloud.', '/v1'),
	API_KV_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'kv.', '/v1'),
	API_PARTY_URL: modifyBaseUrl(RIVET_API_ENDPOINT, 'party.', '/v1'),

	COMMUNITY_URL: 'https://discord.com/invite/aXYfyNxYVn',
	DOCUMENTATION_URL: 'https://rivet.gg/docs',

	THUMBNAIL_MEDIA_SIZE: { width: 640, height: 480 },
	LARGE_BANNER_SIZE: { width: 768, height: 432 },

	AVATAR_IDS: ['clown', 'derby', 'greg', 'grump', 'smart'],

	enableServiceWorkers: 'serviceWorker' in navigator,
	enableNotifications: 'serviceWorker' in navigator && 'Notification' in window
};

if (config.DEBUG) console.log('Config', config);

function modifyBaseUrl(urlRaw: string, prefix: string, path: string = ''): string {
	let url = new URL(urlRaw);
	url.hostname = prefix + url.hostname;
	url.pathname = path;
	return url.toString();
}

export default config;
