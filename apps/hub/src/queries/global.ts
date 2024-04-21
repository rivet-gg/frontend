import { RivetClient, Rivet } from "@rivet-gg/api";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { identityTokenQueryOptions } from "../domains/user/queries";
import superjson from "superjson";

export const rivetClient = new RivetClient({
  environment: "https://api.staging2.gameinc.io",
  fetcher: async (args) => {
    const identity = (await queryClient.getQueryData(
      identityTokenQueryOptions().queryKey,
    )) as Rivet.auth.RefreshIdentityTokenResponse | undefined;

    const url = new URL(args.url);
    for (const [key, value] of Object.entries(args.queryParameters || {})) {
      url.searchParams.append(key, value as string);
    }

    const response = await fetch(url.href, {
      method: args.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(identity ? { Authorization: `Bearer ${identity.token}` } : {}),
      },
      body: args.method === "GET" ? undefined : JSON.stringify(args.body),
    });

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        body: await response.json(),
      };
    } else {
      return {
        ok: false,
        status: response.status,
        error: {
          reason: "status-code",
          statusCode: response.status,
          body: await response.json(),
        },
      };
    }
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
  queryCache: new QueryCache({
    onSuccess: async (data, query) => {
      if (query.meta?.watch && data) {
        // FIXME: is not working as intended
        // const index = getWatchIndex(data);
        // await queryClient.fetchQuery({
        //   ...query.options,
        //   queryKey: query.options.queryKey || query.queryKey,
        //   staleTime: 0,
        //   meta: { watchIndex: index },
        // });
      }
    },
  }),
});

export const queryClientPersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: superjson.stringify,
  deserialize: superjson.parse,
});