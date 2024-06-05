import { RivetClient } from "@rivet-gg/api";
import { RivetClient as RivetEeClient } from "@rivet-gg/api-ee";
import { getConfig, toast } from "@rivet-gg/components";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import superjson from "superjson";
import { identityTokenQueryOptions } from "../domains/user/queries";
import { withQueryWatch } from "./watch";

const opts: RivetClient.Options = {
  environment: getConfig().apiUrl,
  fetcher: async (args) => {
    const identity = args.url.includes("/auth/tokens/identity")
      ? undefined
      : await queryClient.fetchQuery(identityTokenQueryOptions());

    const url = new URL(args.url);
    for (const [key, value] of Object.entries(args.queryParameters || {})) {
      url.searchParams.append(key, value as string);
    }

    try {
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
        } as const;
      }
      return {
        ok: false,
        status: response.status,
        error: {
          reason: "status-code",
          statusCode: response.status,
          body: await response.json(),
        },
      } as const;
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: {
          reason: "status-code",
          statusCode: 0,
          body: error,
        },
      } as const;
    }
  },
};

export const rivetClient = new RivetClient(opts);
export const rivetEeClient = new RivetEeClient(opts);

const queryCache = new QueryCache({
  ...withQueryWatch(),
});

const mutationCache = new MutationCache({
  onError(error, variables, context, mutation) {
    toast.error("An error occurred while performing the operation.");
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
  queryCache,
  mutationCache,
});

export const queryClientPersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: superjson.stringify,
  deserialize: superjson.parse,
});
