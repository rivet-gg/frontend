import {
  CancelledError,
  type Query,
  type QueryCache,
  type QueryKey,
} from "@tanstack/react-query";
import { z } from "zod";
import { queryClient } from "./global";

const watchIndexSchemaFragment = z.object({
  watch: z.object({ index: z.string() }),
});

const watch = async (query: Query<unknown, unknown, unknown, QueryKey>) => {
  try {
    if (
      query.queryKey.includes("watch") ||
      !query.meta ||
      (query.meta && !("watch" in query.meta))
    ) {
      return;
    }

    const isFetching = await queryClient.isFetching({
      queryKey: [...query.queryKey, "watch"],
    });

    if (isFetching) {
      return;
    }

    const queryData = await queryClient.getQueryData(query.queryKey);
    // Check if the last query data has a watch index
    const result = watchIndexSchemaFragment.safeParse(queryData);

    if (!result.success) {
      return;
    }

    // Fetch the query with the watch index
    // Use different queryKey to avoid cache conflicts (e.g. when the query is refetched with different variables)
    const fetchResult = await queryClient.fetchQuery({
      ...query.options,
      queryKey: [...query.queryKey, "watch"],
      queryHash: undefined,
      staleTime: 1,
      meta: {
        watchIndex: result.data.watch.index,
      },
    });

    queryClient.setQueryData(query.queryKey, fetchResult);

    // Check if the query is still being observed
    const observerCount = queryClient
      .getQueryCache()
      .get(query.queryHash)
      ?.getObserversCount();

    if (observerCount && observerCount > 0) {
      // If the query is still being observed, watch it again
      await watch(query);
    }
  } catch (e) {
    if (!(e instanceof CancelledError)) {
      query.setState({ error: e });
    }
  }
};

export const metaWatchQuery = () => ({ watch: true }) as const;

export const withQueryWatch = (
  opts: ConstructorParameters<typeof QueryCache>[0] = {},
) => {
  const oldOnSuccess = opts?.onSuccess;

  return {
    ...opts,
    onSuccess: (
      data: unknown,
      query: Query<unknown, unknown, unknown, QueryKey>,
    ) => {
      oldOnSuccess?.(data, query);

      watch(query);
    },
  };
};
