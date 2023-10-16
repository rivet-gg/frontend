import config from '../config';
import posthog from 'posthog-js';
import global from './global';
import logging from './logging';
import { clearCache, ls } from './cache';
import timing, { wait } from './timing';
import { BroadcastEvent, BroadcastEventKind, logout } from '../data/broadcast';
import { BroadcastSystem } from './broadcast';
import utils from './utils';
import * as api from './api';

export class Token {
	public readonly identityId: string;
	public readonly expiration: number;

	public constructor(private tokenResponse: api.auth.RefreshIdentityTokenCommandOutput) {
		this.identityId = tokenResponse.identityId;
		this.expiration = this.tokenResponse.exp.getTime();
		logging.debug(
			'New token expiration',
			this.expiration,
			utils.formatDuration(this.expiration - Date.now(), { showSeconds: true })
		);
	}

	public get token(): string {
		return this.tokenResponse.token;
	}
}

// TODO: Delay changing global status when refreshing token by 1-3 seconds so there is no state change
// that causes the <ui-router> to be unloaded and then reloaded again
export class AuthManager {
	public token?: Token;
	public authenticationFailed = false;

	private fetchTokenPromise?: Promise<Token>;
	private auth: api.auth.AuthService;

	private tryIdentityToken = false;

	// === EVENT HANDLERS ===
	handleStorage: (e: StorageEvent) => void;

	// Communication between all open tabs of Rivet
	private broadcast: BroadcastSystem = new BroadcastSystem();

	public constructor() {
		this.auth = new api.auth.AuthService({
			endpoint: config.ORIGIN_API + '/auth',
			// Force the credentials to be included, since we need to be able to modify cookies here
			requestHandler: api.requestHandlerMiddleware(null, { credentials: 'include' })
		});

		// Preemptively fetch token
		this.fetchToken();

		// Logout from all tabs when a logout message is broadcast
		this.broadcast.addEventListener('message', e => {
			let event = e.data as BroadcastEvent;

			if (event.kind == BroadcastEventKind.Logout) {
				logging.event('Broadcast logout');

				(async () => {
					await this.logout(true);
					window.location.reload();
				})();
			}
		});
	}

	// `refresh` forces the token to be refreshed instead of just returning the current token
	async fetchToken(refresh = false): Promise<Token> {
		if (this.token !== undefined && !refresh) {
			// Token is valid
			return this.token;
		} else if (this.fetchTokenPromise !== undefined) {
			// Wait for the existing request for the token
			let result = await this.fetchTokenPromise;
			return result;
		} else {
			// Fetch new token
			let promise = this._refreshToken();
			this.fetchTokenPromise = promise;
			let result = await promise;
			this.fetchTokenPromise = undefined;

			return result;
		}
	}

	async logout(fromBroadcast = false) {
		logging.event('Log out');

		// Logout all sessions
		if (!fromBroadcast) this.broadcast.postMessage(logout());

		// Fetch new guest token
		let promise = this._refreshToken(true);
		this.fetchTokenPromise = promise;
		let result = await promise;
		this.fetchTokenPromise = undefined;

		return result;
	}

	private async _refreshToken(logout = false): Promise<Token> {
		let attempts = 0;

		// Delete cache before logout to ensure it is deleted regardless of a request error
		if (logout) {
			posthog.reset();
			await clearCache();
		}

		while (true) {
			try {
				this.authenticationFailed = false;
				global.updateStatus();

				return await this._refreshTokenInner(logout);
			} catch (err) {
				if (err.code == 'CLAIMS_ENTITLEMENT_EXPIRED') {
					logging.debug('Auth expired, refreshing token');
				} else if (err.code == 'TOKEN_REVOKED' && !this.tryIdentityToken) {
					logging.debug('refresh token revoked, trying identity token');
					this.tryIdentityToken = true;
				} else logging.error('Auth request failed', err);

				this.authenticationFailed = true;
				global.updateStatus();

				// Retry request
				attempts += 1;
				await wait(
					attempts <= 2
						? timing.seconds(1)
						: attempts <= 5
						? timing.seconds(2.5)
						: timing.seconds(10)
				);
			}
		}
	}

	private async _refreshTokenInner(logout: boolean): Promise<Token> {
		// Fetch the new token. This will include the refresh token in the header.
		let res;
		if (this.tryIdentityToken) {
			res = await this.auth.refreshIdentityToken({
				logout
			});
		} else {
			res = await this.auth.refreshIdentityToken({ logout });
		}

		// Identify the user
		//
		// This is in the same format as used by the backend. See analytics-event-create service.
		posthog.identify(`user:${res.identityId}`);

		// Build new token
		let token = new Token(res);
		logging.event('Authenticated', token.identityId);
		this.token = token;

		let lastIdentityId = ls.getString('identity-id', '');
		if (lastIdentityId != token.identityId) {
			// Identity changed, clear cache
			posthog.reset();
			await clearCache();

			if (lastIdentityId) {
				console.warn('Auth out of sync', lastIdentityId, token.identityId);
				global.setupLive(true);
			}
		}
		ls.setString('identity-id', token.identityId);
		ls.setString('identity-token', token.token);

		this.authenticationFailed = false;
		this.tryIdentityToken = false;
		global.updateStatus();

		return token;
	}
}
