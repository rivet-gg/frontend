import * as api from '../utils/api';
import * as cloud from '@rivet-gg/cloud';
import global from '../utils/global';
import { readCache, writeCache } from '../utils/cache';
import { HttpHandlerOptions } from '@aws-sdk/types';
import { RepeatingRequest, RepeatingRequestOptions } from '../utils/repeating-request';

export namespace RootCache {
	interface Payload {
		identity: api.identity.IdentityProfile;
		watch: api.identity.WatchResponse;
	}

	export async function get(): Promise<Payload> {
		return await readCache(['/']);
	}

	export function set(payload: Payload) {
		writeCache(['/'], payload);
	}
}

export namespace GroupProfileCache {
	type Payload = api.group.GetGroupProfileCommandOutput;

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
			api.group.GetGroupProfileCommandInput,
			api.group.GetGroupProfileCommandOutput,
			Payload
		>(
			name,
			global.live.group.getGroupProfile.bind(global.live.group),
			{ groupId },
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
	type Payload = cloud.GetGameByIdCommandOutput;

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
	): RepeatingRequest<cloud.GetGameByIdCommandOutput> {
		return abstractWatch<cloud.GetGameByIdCommandInput, cloud.GetGameByIdCommandOutput, Payload>(
			name,
			global.cloud.getGameById.bind(global.cloud),
			{ gameId },
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
	export type Payload = cloud.GetGamesCommandOutput;

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
	): RepeatingRequest<cloud.GetGamesCommandOutput> {
		return abstractWatch<cloud.GetGamesCommandInput, cloud.GetGamesCommandOutput, Payload>(
			name,
			global.cloud.getGames.bind(global.cloud),
			{},
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
function abstractWatch<T, U, V>(
	name: string,
	request: (input: T, overrides?: HttpHandlerOptions) => Promise<U>,
	commandArgs: T,
	cache: (...args: any[]) => Promise<V>,
	resCb: (res: U) => void,
	cacheCb: (cache: V) => void,
	reqOpts?: RepeatingRequestOptions
): RepeatingRequest<U> {
	// Create a paused repeating request
	let req = new RepeatingRequest(
		name,
		async (abortSignal, watchIndex) =>
			await request(Object.assign(commandArgs, { watchIndex }), { abortSignal }),
		{ pauseOnCreation: true }
	);
	req.onMessage(resCb);

	// Fetch cache and start the request async
	cache().then(cacheRes => {
		// Return cached information to callback
		cacheCb(cacheRes);

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
