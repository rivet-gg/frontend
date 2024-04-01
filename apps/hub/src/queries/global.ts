import { RivetClient, Rivet } from "@rivet-gg/api";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { identityTokenQueryOptions } from "./identity";

export const rivetClient = new RivetClient({
  environment: "https://api.staging2.gameinc.io",
  fetcher: async (args) => {
    const identity = (await queryClient.getQueryData(
      identityTokenQueryOptions().queryKey,
    )) as Rivet.auth.RefreshIdentityTokenResponse | undefined;
    const response = await fetch(args.url, {
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
    }

    return {
      ok: false,
      status: response.status,
      error: {
        reason: "unknown",
        errorMessage: response.statusText,
      },
    };
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const queryClientPersister = createSyncStoragePersister({
  storage: window.localStorage,
});
