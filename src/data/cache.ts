import * as api from '../utils/api';
import * as cloud from '@rivet-gg/cloud';
import global from '../utils/global';
import { readCache, writeCache } from '../utils/cache';
import { HttpHandlerOptions } from '@aws-sdk/types';

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

export namespace ThreadHistoryCache {
	interface Payload {
		chatMessages: api.chat.ChatMessage[];
	}

	export async function get(threadId: string): Promise<Payload> {
		return await readCache(['threads2', threadId, 'history']);
	}

	export function set(threadId: string, payload: Payload) {
		writeCache(['threads2', threadId, 'history'], payload);
	}
}

export namespace ThreadLiveCache {
	interface Payload {
		lastReadTs: Date;
		watch: api.chat.WatchResponse;
	}

	export async function get(threadId: string): Promise<Payload> {
		return await readCache(['threads2', threadId]);
	}

	export function set(threadId: string, payload: Payload) {
		writeCache(['threads2', threadId], payload);
	}
}

export namespace RecentThreadsCache {
	interface Payload {
		threads: api.identity.ChatThread[];
		watch: api.identity.WatchResponse;
	}

	export async function get(): Promise<Payload> {
		return await readCache(['threads2', 'recent']);
	}

	export function set(payload: Payload) {
		writeCache(['threads2', 'recent'], payload);
	}
}

export namespace IdentityProfileCache {
	type Payload = api.identity.GetIdentityProfileCommandOutput;

	export async function get(identityId: string): Promise<Payload> {
		return await readCache(['identities', identityId]);
	}

	export async function set(identityId: string, payload: Payload) {
		await writeCache(['identities', identityId], payload);
	}

	// Watches an identity endpoint while automatically taking care of reading/writing cache
	export async function watch(
		identityId: string,
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	) {
		return await abstractWatch<
			api.identity.GetIdentityProfileCommandInput,
			api.identity.GetIdentityProfileCommandOutput,
			Payload
		>(
			global.live.identity.getIdentityProfile.bind(global.live.identity),
			{ identityId },
			IdentityProfileCache.get.bind(IdentityProfileCache, identityId),
			res => {
				cb(res);
				IdentityProfileCache.set(identityId, res);
			},
			cb,
			reqOpts
		);
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

	export async function watch(
		groupId: string,
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>> {
		return await abstractWatch<
			api.group.GetGroupProfileCommandInput,
			api.group.GetGroupProfileCommandOutput,
			Payload
		>(
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

export namespace PartyProfileCache {
	type Payload = api.party.GetPartyProfileCommandOutput;

	export async function get(partyId: string): Promise<Payload> {
		return await readCache(['parties', partyId]);
	}

	export async function set(partyId: string, payload: Payload) {
		await writeCache(['parties', partyId], payload);
	}

	// Watches an party endpoint while automatically taking care of reading/writing cache
	export async function watch(
		partyId: string,
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<api.party.GetPartyProfileCommandOutput>> {
		return await abstractWatch<
			api.party.GetPartyProfileCommandInput,
			api.party.GetPartyProfileCommandOutput,
			Payload
		>(
			global.live.party.getPartyProfile.bind(global.live.party),
			{ partyId },
			PartyProfileCache.get.bind(PartyProfileCache, partyId),
			res => {
				cb(res);
				PartyProfileCache.set(partyId, res);
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

	export async function watch(
		gameId: string,
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<cloud.GetGameByIdCommandOutput>> {
		return await abstractWatch<cloud.GetGameByIdCommandInput, cloud.GetGameByIdCommandOutput, Payload>(
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

	export async function watch(
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<cloud.GetGamesCommandOutput>> {
		return await abstractWatch<cloud.GetGamesCommandInput, cloud.GetGamesCommandOutput, Payload>(
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

export namespace ActivitiesCache {
	type Payload = api.identity.ListActivitiesCommandOutput;

	export async function get(): Promise<Payload> {
		return await readCache(['activities']);
	}

	export async function set(payload: Payload) {
		await writeCache(['activities'], payload);
	}

	export async function watch(cb: (data: Payload) => void, reqOpts?: api.RepeatingRequestOptions) {
		return await abstractWatch<
			api.identity.ListActivitiesCommandInput,
			api.identity.ListActivitiesCommandOutput,
			Payload
		>(
			global.live.identity.listActivities.bind(global.live.identity),
			{},
			ActivitiesCache.get.bind(ActivitiesCache),
			res => {
				cb(res);
				ActivitiesCache.set(res);
			},
			cb,
			reqOpts
		);
	}
}

// Watches a given endpoint in conjunction with a given cache
async function abstractWatch<T, U, V>(
	request: (input: T, overrides?: HttpHandlerOptions) => Promise<U>,
	commandArgs: T,
	cache: (...args: any[]) => Promise<V>,
	resCb: (res: U) => void,
	cacheCb: (cache: V) => void,
	reqOpts?: api.RepeatingRequestOptions
): Promise<api.RepeatingRequest<U>> {
	// Fetch cache
	let cacheRes = await cache();

	// Return cached information to callback
	if (cacheRes) cacheCb(cacheRes);

	// Start repeating request
	let req = new api.RepeatingRequest(
		async (abortSignal, watchIndex) =>
			await request(Object.assign(commandArgs, { watchIndex }), { abortSignal }),
		cacheRes
			? Object.assign(
					{ watchIndex: reqOpts?.watchIndex === null ? null : (cacheRes as any)?.watch },
					reqOpts ?? {}
			  )
			: reqOpts
	);
	req.onMessage(resCb);

	return req;
}
