import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "./global";
import { getMetaWatchIndex } from "./utils";

export const identityTokenQueryOptions = () => {
  return queryOptions({
    queryKey: ["identityToken"],
    queryFn: () =>
      rivetClient.auth.tokens.refreshIdentityToken({ logout: false }),
  });
};

export const selfProfileQueryOptions = (opts: { enabled?: boolean } = {}) => {
  return queryOptions({
    ...opts,
    queryKey: ["selfProfile"],
    queryFn: ({ meta }) => {
      return rivetClient.identity.getSelfProfile({
        watchIndex: getMetaWatchIndex(meta),
      });
    },
    meta: { watch: true },
  });
};