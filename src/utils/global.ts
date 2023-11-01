import logging from './logging';
import config from '../config';
import { AuthManager, Token } from './auth';
import settings, { SettingChange } from './settings';
import timing from './timing';
import { windowEventGroups, globalEventGroups } from './global-events';
import * as api from './api';
import * as cloud from '@rivet-gg/cloud';
import { RootCache } from '../data/cache';
import PushNotifications from './push-notifications';
import { BroadcastEvent, BroadcastEventKind } from '../data/broadcast';
import { ls } from './cache';
import { BroadcastSystem } from './broadcast';
import { Rivet, RivetClient } from '@rivet-gg/api-internal';
import { Fetcher, fetcher } from '@rivet-gg/api-internal/core';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { HttpHandlerOptions } from '@aws-sdk/types';
import { FailedResponse } from '@rivet-gg/api-internal/types/core/fetcher/APIResponse';

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
	Loading,  // Waiting for script to start
	Bootstrapping,  // Waiting for bootstrap to finish
	Connecting,  // Waiting for live to connect
	Reconnecting,  // Waiting for live to reconnect

	// Interactive
	Consenting,
	LinkingGame,
	Connected,

	// Failures
	AuthFailed,
	BootstrapFailed,
}

export class GlobalState {
	// Consent.
	consentResolve?: () => void;

	// Authentication client.
	authManager: AuthManager;

	/// Apis
	api: RivetClient = null;

	// TODO: Implement authentication middleware that requests a token
	live: {
		portal: api.portal.PortalService;
		identity: api.identity.IdentityService;
		group: api.group.GroupService;
		chat: api.chat.ChatService;
		kv: api.kv.KvService;
		party: api.party.PartyService;
	};
	auth: api.auth.AuthService;
	cloud: cloud.CloudService;

	// Push notifications client.
	pushNotifications: PushNotifications;

	/// Data for the current signed in identity.
	currentIdentity: api.identity.IdentityProfile;

	status: GlobalStatus = GlobalStatus.Loading;

	broadcast: BroadcastSystem = new BroadcastSystem(true);

	setupLiveAttempts = 0;

	troubleConnecting = false;
	liveInitiated = false;
	liveBlockingBypass: number = null;

	bootstrapFailed: boolean = false;
	bootstrapData: Rivet.cloud.BootstrapResponse;

	identityStream: api.RepeatingRequest<api.identity.GetIdentitySelfProfileCommandOutput>;
	eventStream: api.RepeatingRequest<api.identity.WatchEventsCommandOutput>;

	// Mobile information
	windowSize: number = WindowSize.Large;

	async init() {
		// Request consent before doing anything else
		await this.requestConsent();

		// Load cache
		if (await this.loadCache()) {
			logging.event('Cache quick start');
			this.liveInitiated = true;
		}

		this.broadcast.addEventListener('message', this.handleBroadcastMessages.bind(this));

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
		logging.net('Connecting to live...', config.ORIGIN_API + '/portal');
		this.api = new RivetClient({
			environment: config.ORIGIN_API,
			token: async () => (await _global.authManager.fetchToken(true)).token,
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
				} else {
					return response;
				}

				return response;
			}
		});
		this.live = {
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
			chat: new api.chat.ChatService({
				endpoint: config.ORIGIN_API + '/chat',
				requestHandler: refreshMiddleware()
			}),
			kv: new api.kv.KvService({
				endpoint: config.ORIGIN_API + '/kv',
				requestHandler: refreshMiddleware()
			}),
			party: new api.party.PartyService({
				endpoint: config.ORIGIN_API + '/party',
				requestHandler: refreshMiddleware()
			})
		};


		this.auth = new api.auth.AuthService({
			endpoint: config.ORIGIN_API + '/auth',
			// Force the credentials to be included, since we need to be able to modify cookies here
			requestHandler: refreshMiddleware({ credentials: 'include' })
		});

		this.cloud = new cloud.CloudService({
			endpoint: config.ORIGIN_API + '/cloud',
			tls: true,
			maxAttempts: 0,
			requestHandler: refreshMiddleware()
		});

		ls.setGlobalListener(this.onSettingChange.bind(this));

		this.bootstrap();

		// Establish push notifications
		this.pushNotifications = new PushNotifications();

		// Set initial status
		this.updateStatus();

		// Establish resize event handler
		windowEventGroups.add('resize', this.onResize.bind(this), timing.milliseconds(100));
		this.onResize();
	}

	private async requestConsent(): Promise<void> {
		// Check if already consented
		if (settings.didConsent) {
			return;
		}

		this.updateStatus();

		// Wait for consent to finish
		await new Promise(resolve => {
			this.consentResolve = () => resolve(undefined);
		});
	}

	async loadCache() {
		let payload = await RootCache.get();
		if (payload) this.currentIdentity = payload.identity;

		return payload?.watch;
	}

	public grantConsent() {
		// Update state
		settings.didConsent = true;
		this.updateStatus();

		// Complete promise
		if (this.consentResolve !== undefined) this.consentResolve();
	}

	/// Fetches configuration information from the servers & creates the intiital auth token.
	bootstrap(noCache: boolean = false) {
		// Reset bootstrap state
		this.bootstrapFailed = false;
		this.bootstrapData = undefined;

		// This will automatically create & test the initial auth token.
		logging.event('Bootstrapping');
		this.api.cloud.bootstrap().then(res => {
			logging.event('Bootstrapp success');

			this.bootstrapFailed = false;
			this.bootstrapData = res;
			this.updateStatus();
			this.setupLive(noCache);
		}).catch(err => {
			logging.error('Error bootstrapping', err);
			this.bootstrapFailed = true;
			this.bootstrapData = undefined;
		});

	}

	async setupLive(noCache = false) {
		let hasResolved = false;

		// Reload cache in case of cleared cache from auth
		let watchIndex = noCache ? null : await this.loadCache();

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
			this.identityStream = new api.RepeatingRequest(
				async (abortSignal, watchIndex) => {
					return await this.live.identity.getIdentitySelfProfile(
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
				this.updateCache(res.watch);

				// Update global state
				this.liveInitiated = true;
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
						// This calls `setupLive` on success
						this.bootstrap(true);
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

	updateCache(watch?: api.portal.WatchResponse) {
		RootCache.set({
			identity: this.currentIdentity,
			watch
		});
	}

	updateStatus() {
		// Derive the status
		let status: GlobalStatus;
		if (!settings.didConsent) {
			status = GlobalStatus.Consenting;
		} 
		else if (!this.authManager) status = GlobalStatus.Loading;
		else if (this.authManager.authenticationFailed) status = GlobalStatus.AuthFailed;
		else if (this.bootstrapFailed) status = GlobalStatus.BootstrapFailed;
		else if (!this.bootstrapData) {
			status = GlobalStatus.Bootstrapping;
		}
		else if (!this.liveInitiated) {
			status = GlobalStatus.Connecting;
		}
		else {
			if (this.troubleConnecting) status = GlobalStatus.Reconnecting;
			else status = GlobalStatus.Connected;
		}
		console.log('status', status);

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

if (!config.IS_PROD) (window as any).rivet = global;

export default global;
