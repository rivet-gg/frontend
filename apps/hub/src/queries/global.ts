import { isLikeRivetError, isRivetError } from "@/lib/utils";
import { type Rivet, RivetClient } from "@rivet-gg/api";
import { RivetClient as RivetEeClient } from "@rivet-gg/api-ee";
import { type APIResponse, type Fetcher, fetcher } from "@rivet-gg/api/core";
import { getConfig, toast } from "@rivet-gg/components";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import superjson from "superjson";
import { identityTokenQueryOptions } from "../domains/user/queries";
import { watchBlockingQueries } from "./watch";

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      /**
       * Injected by the watch function to indicate the index to watch for
       * do not use this directly
       */
      __watcher?: { index: string };
      /**
       * If true, the query will be watched for a response
       */
      watch?: true;
    };
  }
}

export async function getToken() {
  const tokenCache = queryClient
    .getQueryCache()
    .find<Rivet.auth.RefreshIdentityTokenResponse>(identityTokenQueryOptions());

  if (tokenCache?.state.status === "success" && tokenCache.state.data) {
    return tokenCache.state.data.token as string;
  }

  if (tokenCache?.state.status === "pending") {
    const token = (await tokenCache.promise)?.token;

    if (token) {
      return token;
    }
  }

  return (await queryClient.fetchQuery(identityTokenQueryOptions())).token;
}

const clientOptions: RivetClient.Options = {
  environment: getConfig().apiUrl,
  fetcher: async <R = unknown>(
    args: Fetcher.Args,
  ): Promise<APIResponse<R, Fetcher.Error>> => {
    const response = await fetcher<R>({
      ...args,
      withCredentials: true,
      maxRetries: 0,
    });

    if (
      "error" in response &&
      isLikeRivetError(response.error) &&
      [
        "CLAIMS_ENTITLEMENT_EXPIRED",
        "TOKEN_REVOKED",
        "IDENTITY_NOT_REGISTERED",
      ].includes(response.error.body.code || "")
    ) {
      await queryClient.invalidateQueries({
        ...identityTokenQueryOptions(),
      });
    }

    return response;
  },
  token: getToken,
};

export const rivetClientTokeneless = new RivetClient({
  environment: clientOptions.environment,
  fetcher: clientOptions.fetcher,
});
export const rivetClient = new RivetClient(clientOptions);
export const rivetEeClient = new RivetEeClient(clientOptions);

const queryCache = new QueryCache({
  async onError(error, query) {
    // When we reached this point, it means:
    // 1) The query failed to fetch
    // 2) The query failed to fetch after refreshing the access token after 3 retries
    // At this point, we can assume that:
    // 1) the user is not authenticated anymore, or
    // 2) the user's entitlements have changed, or
    // 3) the user's identity is not registered anymore (e.g. user is deleted, etc.), or
    // 4) the user's token is revoked/expired/invalid
    // 7) there's an issue with the backend
    // and we should reset all queries to force the user to re-authenticate
    if (
      isLikeRivetError(error) &&
      [
        "CLAIMS_ENTITLEMENT_EXPIRED",
        "TOKEN_REVOKED",
        "IDENTITY_NOT_REGISTERED",
      ].includes(error.body.code || "")
    ) {
      await queryClient.resetQueries();
    }
  },
});

const mutationCache = new MutationCache({
  onError(error, variables, context, mutation) {
    console.error(error);
    if (mutation.meta?.hideErrorToast) {
      return;
    }
    toast.error("Error occurred while performing the operation.", {
      description: isRivetError(error) ? error.body.message : undefined,
    });
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 2,
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

watchBlockingQueries(queryClient);

broadcastQueryClient({
  queryClient,
  broadcastChannel: "rivet-gg-hub",
});
