import logging from './logging';
import config from '../config';
import { AuthManager } from './auth';
import settings, { SettingChange } from './settings';
import timing, { wait } from './timing';
import { globalEventGroups, windowEventGroups } from './global-events';
import * as api from './api';
import * as cloud from '@rivet-gg/cloud';
import { CurrentIdentityCache, BootstrapCache } from '../data/cache';
import { BroadcastEvent, BroadcastEventKind } from '../data/broadcast';
import { ls } from './cache';
import { BroadcastSystem } from './broadcast';
import { Rivet, RivetClient } from '@rivet-gg/api-internal';
import { Fetcher, fetcher } from '@rivet-gg/api-internal/core';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { HttpHandlerOptions } from '@aws-sdk/types';
import { FailedResponse } from '@rivet-gg/api-internal/types/core/fetcher/APIResponse';
import { RepeatingRequest } from './repeating-request';

/*

Global init steps:

1. init
2. bootstrap (will use BootstrapCache if exists)
3. grantConsent (if has not already consented, will wait for UI action)
4. setupApi
5. setupLive (will use CurrentIdentityCache if exists)

*/

// Keep in sync with mobile widths in consts.css
export enum WindowSize {
	Small = 585,
	Mobile = 850,
	Medium = 945,
	Large = 1270,
	Full = Infinity
}

export enum GlobalStatus {
	// Loading
	Loading, // Waiting for script to start
	Bootstrapping, // Waiting for bootstrap to finish
	Connecting, // Waiting for live to connect (i.e. currentIdentity not accessible)
	Reconnecting, // Waiting for live to reconnect

	// Interactive
	Consenting, // Waiting for user to click consent button
	Unregistered, // User is not registered
	LinkingGame,
	Connected,

	// Failures
	AuthFailed,
	BootstrapFailed
}

export class GlobalState {
	api: RivetClient = null;

	deprecatedApi: {
		auth: api.auth.AuthService;
		cloud: cloud.CloudService;
		portal: api.portal.PortalService;
		identity: api.identity.IdentityService;
		group: api.group.GroupService;
		kv: api.kv.KvService;
	};

	authManager: AuthManager;

	broadcast: BroadcastSystem = new BroadcastSystem(true);

	status: GlobalStatus = GlobalStatus.Loading;

	bootstrapFailed = false;
	bootstrapData: Rivet.cloud.BootstrapResponse;
	bootstrapError?: Error;

	didSetupApi = false;

	setupLiveAttempts = 0;
	troubleConnecting = false;
	liveBlockingBypass: number = null;
	get liveInitiated() {
		return !!this.currentIdentity;
	}

	// If the consent button was just clicked and we want to stay on the login
	// screen without showing the loading screen again
	suppressLoadingAnimationDuringConsent = false;

	/// Data for the current signed in identity.
	currentIdentity: api.identity.IdentityProfile;
	currentIdentityWatch: api.identity.WatchResponse;

	identityStream: RepeatingRequest<api.identity.GetIdentitySelfProfileCommandOutput>;
	eventStream: RepeatingRequest<api.identity.WatchEventsCommandOutput>;

	// Mobile information
	windowSize: number = WindowSize.Large;

	/// Effectively the constructor. Called on page load.
	async init() {
		// Load cache
		await this.loadCache();

		// Bootstrap
		await this.bootstrap();

		// IMPORTANT: If on the /access-token/ page, automatically consent to continue loading. This is only
		// done on OSS.
		if (
			window.location.pathname.startsWith('/access-token/') &&
			this.bootstrapData.cluster == Rivet.cloud.BootstrapCluster.Oss
		) {
			global.grantConsent();
		}

		// Set initial status to trigger initial UI update
		this.updateStatus();

		// Handle evens from all instances of the hub
		this.broadcast.addEventListener('message', this.handleBroadcastMessages.bind(this));

		// Handle resize
		windowEventGroups.add('resize', this.onResize.bind(this), timing.milliseconds(100));
		this.onResize();

		// Setup API if already consented. If not, will be triggered on grantConsent.
		if (settings.didConsent) {
			this.setupApi();
		}
	}

	async loadCache() {
		// Bootstrap
		let bootstrap = await BootstrapCache.get();
		if (bootstrap) {
			this.bootstrapData = bootstrap;
		}

		// Current identity
		let currentIdentity = await CurrentIdentityCache.get();
		if (currentIdentity) {
			logging.event('Current identity cache loaded');
			this.currentIdentity = currentIdentity.profile;
			this.currentIdentityWatch = currentIdentity.watch;
		}
	}

	public grantConsent() {
		// Update state
		settings.didConsent = true;
		this.updateStatus();
		this.setupApi();
	}

	async setupApi() {
		if (!settings.didConsent) throw new Error('Cannot setup API without consent');

		if (this.didSetupApi) {
			logging.warn('API already setup');
			return;
		}
		this.didSetupApi = true;

		// Create auth client. This will automatically fetch a token.
		this.authManager = new AuthManager();

		// Create API middleware, automatically refreshes the api token on expiration
		let _global = global;
		let getToken = async () => (await global.authManager.fetchToken()).token;
		let refreshMiddleware = (init?: RequestInit) => {
			let requestHandlerMiddleware = api.requestHandlerMiddleware(getToken, init).handle;

			return {
				handle: async (req: HttpRequest, opts?: HttpHandlerOptions) => {
					let res = await requestHandlerMiddleware(req, opts);

					if (res.response.statusCode != 200) {
						let body;

						try {
							// TODO:
							body = JSON.parse(await (res.response.body as any).text());
						} catch (err) {
							logging.debug('Failed to decode API error body', err);
						}

						if (body && body.code == 'CLAIMS_ENTITLEMENT_EXPIRED') {
							if (body.hasOwnProperty('code')) {
								logging.debug('Auth expired, refreshing token from middleware');

								await _global.authManager.fetchToken(true);

								// Retry request after refreshing auth
								res = await requestHandlerMiddleware(req, opts);
							} else {
								logging.debug('API error body does not have `code` property', body);
							}
						}
					}

					return res;
				}
			};
		};

		// Create live instance.
		logging.net('Connecting to live...', config.ORIGIN_API);
		this.api = new RivetClient({
			environment: config.ORIGIN_API,
			token: async () => (await _global.authManager.fetchToken()).token,
			fetcher: async args => {
				let response = await fetcher(args);

				// Check for auth expired error
				let error = (response as FailedResponse<Fetcher.Error>).error;
				if (
					error &&
					error.reason == 'status-code' &&
					(error.body as any).code == 'CLAIMS_ENTITLEMENT_EXPIRED'
				) {
					logging.debug('Auth expired, refreshing token from middleware');

					await _global.authManager.fetchToken(true);

					// Retry request after refreshing auth
					return await fetcher(args);
				}

				return response;
			}
		});
		this.deprecatedApi = {
			auth: new api.auth.AuthService({
				endpoint: config.ORIGIN_API + '/auth',
				// Force the credentials to be included, since we need to be able to modify cookies here
				requestHandler: refreshMiddleware({ credentials: 'include' })
			}),
			cloud: new cloud.CloudService({
				endpoint: config.ORIGIN_API + '/cloud',
				tls: true,
				maxAttempts: 0,
				requestHandler: refreshMiddleware()
			}),
			portal: new api.portal.PortalService({
				endpoint: config.ORIGIN_API + '/portal',
				requestHandler: refreshMiddleware()
			}),
			identity: new api.identity.IdentityService({
				endpoint: config.ORIGIN_API + '/identity',
				requestHandler: refreshMiddleware()
			}),
			group: new api.group.GroupService({
				endpoint: config.ORIGIN_API + '/group',
				requestHandler: refreshMiddleware()
			}),
			kv: new api.kv.KvService({
				endpoint: config.ORIGIN_API + '/kv',
				requestHandler: refreshMiddleware()
			})
		};

		ls.setGlobalListener(this.onSettingChange.bind(this));

		this.setupLive();

		// Set initial status
		this.updateStatus();
	}

	/// Fetches configuration information from the servers
	///
	/// This affects how the entire hub behaves and is required to be called before
	/// the hub can be used
	async bootstrap() {
		if (this.bootstrapData) return;

		// Reset bootstrap state
		this.bootstrapFailed = false;
		this.bootstrapData = undefined;

		let retry = 1;
		while (retry <= 3) {
			try {
				// Initial bootstrap occurs before the api is fully created, make fallback
				let api =
					this.api ??
					new RivetClient({
						environment: config.ORIGIN_API
					});

				// Bootstrap
				logging.event('Bootstrapping');
				let response = await api.cloud.bootstrap();

				// Handle response
				logging.event('Bootstrapp success', response);
				this.bootstrapFailed = false;
				this.bootstrapData = response;
				this.updateStatus();

				return;
			} catch (err) {
				logging.error(`Bootstrapping failed ${retry} `, err);
				await wait(timing.milliseconds(750 * retry));
				this.bootstrapError = err;
				retry++;
			}
		}

		logging.error('Bootstrapping failed after retries');
		this.bootstrapFailed = true;
		this.bootstrapData = undefined;
		this.updateStatus();
	}

	/// Watches realtime data for the current identity
	async setupLive(noCache = false) {
		let hasResolved = false;

		// Reload cache in case of cleared cache from auth
		let watchIndex = noCache ? null : this.currentIdentityWatch;

		return new Promise<void>((resolve, reject) => {
			// Due to the nature of our blocking requests, the code that sets `this.troubleConnecting`
			// in the `this.identityStream.onMessage()` handler to true after a successful request won't
			// be called immediately after reconnection because its blocked.
			window.clearTimeout(this.liveBlockingBypass);
			this.liveBlockingBypass = window.setTimeout(() => {
				if (this.troubleConnecting && this.authManager !== undefined) {
					logging.event('Reconnection successful');

					this.setupLiveAttempts = 0;
					this.troubleConnecting = false;
					this.updateStatus();
				}
			}, timing.seconds(5.5));

			// Load the current identity data
			if (this.identityStream) this.identityStream.cancel();
			this.identityStream = new RepeatingRequest(
				'GlobalState.identityStream',
				async (abortSignal, watchIndex) => {
					return await this.deprecatedApi.identity.getIdentitySelfProfile(
						{ watchIndex },
						{
							abortSignal
						}
					);
				},
				{ watchIndex }
			);

			this.identityStream.onMessage(res => {
				// Save new identity
				this.currentIdentity = res.identity;
				CurrentIdentityCache.set({
					profile: res.identity,
					watch: res.watch
				});

				// Update global state
				this.updateStatus();
				this.setupLiveAttempts = 0;

				logging.event('New current identity', this.currentIdentity);

				// Call events
				globalEventGroups.dispatch('identity-change', res.identity);

				// Resolve promise if needed
				if (!hasResolved) {
					resolve();
					hasResolved = true;
				}
			});

			this.identityStream.onError(error => {
				// Reject initiation and cancel repeating request
				if (!hasResolved) reject(error);

				// Update global state
				this.setupLiveAttempts++;
				if (this.setupLiveAttempts > 3) {
					this.troubleConnecting = true;
					this.updateStatus();
				}

				// Attempt to reconnect in a few seconds
				setTimeout(
					() => {
						this.setupLive(true);
					},
					this.setupLiveAttempts <= 3 ? timing.seconds(1) : timing.seconds(5)
				);
			});
		});
	}

	private async startServiceWorker() {
		if ('serviceWorker' in navigator) {
			return navigator.serviceWorker
				.register('/service-worker.js')
				.then(registration => {
					logging.event('Service worker registered', registration);
				})
				.catch(err => {
					logging.error('Failed to start service worker', err);
				});
		} else {
			logging.warn('Service workers not enabled');
		}
	}

	private handleBroadcastMessages(e: MessageEvent<BroadcastEvent>) {
		let event = e.data;

		if (event.kind == BroadcastEventKind.Refresh) {
			window.location.reload();
		}
	}

	updateStatus() {
		// Derive the status
		let status: GlobalStatus;
		if (this.bootstrapFailed) status = GlobalStatus.BootstrapFailed;
		else if (!this.bootstrapData) status = GlobalStatus.Bootstrapping;
		else if (!settings.didConsent) status = GlobalStatus.Consenting;
		else if (this.suppressLoadingAnimationDuringConsent && (!this.authManager || !this.liveInitiated))
			status = GlobalStatus.Consenting;
		else if (!this.authManager) status = GlobalStatus.Loading;
		else if (this.authManager.authenticationFailed) status = GlobalStatus.AuthFailed;
		else if (!this.liveInitiated) status = GlobalStatus.Connecting;
		else if (
			global.currentIdentity &&
			(!global.currentIdentity.isRegistered || !global.currentIdentity.isAdmin)
		)
			status = GlobalStatus.Unregistered;
		else if (this.troubleConnecting) status = GlobalStatus.Reconnecting;
		else status = GlobalStatus.Connected;

		// Dispatch event
		if (status !== this.status) {
			logging.event('New global status', GlobalStatus[status]);

			this.status = status;
			globalEventGroups.dispatch('status-change', status);
		}
	}

	onSettingChange(change: SettingChange) {
		globalEventGroups.dispatch('setting-change', change);
	}

	onResize() {
		let oldSize = this.windowSize;

		let width = window.innerWidth;

		if (width <= WindowSize.Small) this.windowSize = WindowSize.Small;
		else if (width <= WindowSize.Mobile) this.windowSize = WindowSize.Mobile;
		else if (width <= WindowSize.Medium) this.windowSize = WindowSize.Medium;
		else if (width <= WindowSize.Large) this.windowSize = WindowSize.Large;
		else this.windowSize = WindowSize.Full;

		// Dispatch resize event
		if (this.windowSize != oldSize) globalEventGroups.dispatch('resize', this.windowSize);
	}
}

export const global = new GlobalState();

if (config.DEBUG) (window as any).rivet = global;

export default global;
