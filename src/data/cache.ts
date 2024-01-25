import * as api from '../utils/api';
import { Rivet } from '@rivet-gg/api';
import global from '../utils/global';
import { readCache, writeCache } from '../utils/cache';
import { RepeatingRequest, RepeatingRequestOptions } from '../utils/repeating-request';

export namespace BootstrapCache {
	type Payload = Rivet.cloud.BootstrapResponse;

	export async function get(): Promise<Payload> {
		return await readCache(['bootstrap']);
	}

	export function set(payload: Payload) {
		writeCache(['bootstrap'], payload);
	}
}

export namespace CurrentIdentityCache {
	interface Payload {
		profile: api.identity.IdentityProfile;
		watch: api.identity.WatchResponse;
	}

	export async function get(): Promise<Payload> {
		return await readCache(['current-identity']);
	}

	export function set(payload: Payload) {
		writeCache(['current-identity'], payload);
	}
}

const hasWatchIndex = (res: unknown): res is { watch: { index: string } } => {
	return (
		res &&
		typeof res === 'object' &&
		'watch' in res &&
		typeof res.watch === 'object' &&
		'index' in res.watch
	);
};

export interface CachedQuery<Input extends object, Output extends object> {
	watch(
		name: string,
		variables: Input,
		cb: (data: Output) => void,
		requestOptions?: RepeatingRequestOptions
	): RepeatingRequest<Output>;
}

const createQuery = <Input extends object, Output extends object>(cfg: {
	cache: {
		get: (variables: Input) => Promise<Output>;
		set: (variables: Input, payload: Output) => Promise<void>;
	};
	fn: (opts: { variables: Input; request: object; requestOptions: object }) => Promise<Output>;
}): CachedQuery<Input, Output> => {
	return {
		watch: (
			name: string,
			variables: Input,
			cb: (data: Output) => void,
			requestOptions: RepeatingRequestOptions
		) => {
			// Create a paused repeating request
			let req = new RepeatingRequest(
				name,
				async (abortSignal, watchIndex) => {
					return await cfg.fn({
						variables,
						request: { watchIndex },
						requestOptions: { abortSignal }
					});
				},
				{ pauseOnCreation: true }
			);

			req.onMessage(res => {
				cb(res);
				cfg.cache.set(variables, res);
			});

			// Fetch cache and start the request async
			cfg.cache.get(variables).then(cacheRes => {
				// Check req has not been cancelled in race condition
				if (req.cancelled) return;

				// Return cached information to callback
				if (cacheRes) cb(cacheRes);

				req.setOpts({
					...requestOptions,
					watchIndex:
						requestOptions?.watchIndex === null
							? null
							: hasWatchIndex(cacheRes)
							? cacheRes.watch
							: null
				});

				req.start();
			});

			return req;
		}
	} as CachedQuery<Input, Output>;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace v2 {
	export let GroupProfile = createQuery<{ groupId: string }, Rivet.group.GetProfileResponse>({
		cache: {
			get: variables => readCache(['groups', variables.groupId]),
			set: (variables, payload) => writeCache(['groups', variables.groupId], payload)
		},
		fn: ({ variables, request, requestOptions }) =>
			global.api.group.getProfile(variables.groupId, request, requestOptions)
	});

	export type GroupProfile = typeof GroupProfile;

	export let Game = createQuery<{ gameId: string }, Rivet.cloud.games.GetGameByIdResponse>({
		cache: {
			get: variables => readCache(['cloud-games', variables.gameId]),
			set: (variables, payload) => writeCache(['cloud-games', variables.gameId], payload)
		},
		fn: ({ variables, request, requestOptions }) =>
			global.api.cloud.games.games.getGameById(variables.gameId, request, requestOptions)
	});

	export type Game = typeof Game;
}

export namespace GroupProfileCache {
	export type Payload = api.group.GetGroupProfileCommandOutput;

	export async function get(groupId: string): Promise<Payload> {
		return await readCache(['groups', groupId]);
	}

	export async function set(groupId: string, payload: Payload) {
		await writeCache(['groups', groupId], payload);
	}

	export function watch(
		name: string,
		groupId: string,
		cb: (data: Payload) => void,
		reqOpts?: RepeatingRequestOptions
	): RepeatingRequest<api.group.GetGroupProfileCommandOutput> {
		return abstractWatch<
			[api.group.GetGroupProfileCommandInput],
			api.group.GetGroupProfileCommandOutput,
			Payload
		>(
			name,
			global.deprecatedApi.group.getGroupProfile.bind(global.deprecatedApi.group),
			[{ groupId }],
			GroupProfileCache.get.bind(GroupProfileCache, groupId),
			res => {
				cb(res);
				GroupProfileCache.set(groupId, res);
			},
			cb,
			reqOpts
		);
	}
}

export namespace CloudGameCache {
	type Payload = Rivet.cloud.games.games.GetGameByIdResponse;

	export async function get(gameId: string): Promise<Payload> {
		return await readCache(['cloud-games', gameId]);
	}

	export async function set(gameId: string, payload: Payload) {
		await writeCache(['cloud-games', gameId], payload);
	}

	export function watch(
		name: string,
		gameId: string,
		cb: (data: Payload) => void,
		reqOpts?: RepeatingRequestOptions
	): RepeatingRequest<Rivet.cloud.games.games.GetGameByIdResponse> {
		return abstractWatch<[string, {}], Rivet.cloud.games.games.GetGameByIdResponse, Payload>(
			name,
			global.api.cloud.games.games.getGameById.bind(global.api.cloud.games.games),
			[gameId, {}],
			CloudGameCache.get.bind(CloudGameCache, gameId),
			res => {
				cb(res);
				CloudGameCache.set(gameId, res);
			},
			cb,
			reqOpts
		);
	}
}

export namespace CloudDashboardCache {
	export type Payload = Rivet.cloud.games.GetGamesResponse;

	export async function get(): Promise<Payload> {
		return await readCache(['cloud-games']);
	}

	export async function set(payload: Payload) {
		await writeCache(['cloud-games'], payload);
	}

	export function watch(
		name: string,
		cb: (data: Payload) => void,
		reqOpts?: RepeatingRequestOptions
	): RepeatingRequest<Rivet.cloud.games.GetGamesResponse> {
		return abstractWatch<
			[Rivet.cloud.games.GetGamesRequest],
			Rivet.cloud.games.GetGamesResponse,
			Payload
		>(
			name,
			global.api.cloud.games.games.getGames.bind(global.api.cloud.games.games),
			[{}],
			CloudDashboardCache.get.bind(CloudDashboardCache),
			res => {
				cb(res);
				CloudDashboardCache.set(res);
			},
			cb,
			reqOpts
		);
	}
}

// Watches a given endpoint in conjunction with a given cache
function abstractWatch<T extends [...any[], { watchIndex?: string }], U, V>(
	name: string,
	request: (...input: [...T, any]) => Promise<U>,
	commandArgs: T,
	cache: (...args: any[]) => Promise<V>,
	resCb: (res: U) => void,
	cacheCb: (cache: V) => void,
	reqOpts?: RepeatingRequestOptions
): RepeatingRequest<U> {
	// Create a paused repeating request
	let req = new RepeatingRequest(
		name,
		async (abortSignal, watchIndex) => {
			let newArgs: T = [...commandArgs];
			newArgs[newArgs.length - 1] = Object.assign({}, commandArgs[commandArgs.length - 1], {
				watchIndex
			});
			return await request(...newArgs, { abortSignal });
		},
		{ pauseOnCreation: true }
	);
	req.onMessage(resCb);

	// Fetch cache and start the request async
	cache().then(cacheRes => {
		// Check req has not been cancelled in race condition
		if (req.cancelled) return;

		// Return cached information to callback
		if (cacheRes) cacheCb(cacheRes);

		req.setOpts(
			cacheRes
				? Object.assign(
						{ watchIndex: reqOpts?.watchIndex === null ? null : (cacheRes as any)?.watch },
						reqOpts ?? {}
				  )
				: reqOpts
		);

		// Start repeating request
		req.start();
	});

	return req;
}
