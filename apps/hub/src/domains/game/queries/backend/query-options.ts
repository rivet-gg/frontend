import { mergeWatchStreams } from "@/lib/watch-utilities";
import { rivetEeClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { BackendEvent } from "./types";

const partialEnvLogsResponse = z
  .object({
    events: z.array(z.object({}).passthrough()),
  })
  .passthrough();

export const gameBackendQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["game", gameId, "environment", environmentId, "backend"],
    queryFn: ({ queryKey: [_, gameId, __, environmentId], signal }) =>
      rivetEeClient.ee.backend.get(
        gameId,
        environmentId,
        {},
        { abortSignal: signal },
      ),
    select: (data) => data.backend,
  });

export const gameBackendEnvVariablesQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["game", gameId, "backend-env", environmentId, "variables"],
    queryFn: ({ queryKey: [_, gameId, __, environmentId], signal }) =>
      rivetEeClient.ee.backend.getVariables(gameId, environmentId, {
        abortSignal: signal,
      }),
    select: (data) => data.variables,
  });

export const gameBackendEnvEventsQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["game", gameId, "backend-env", environmentId, "events"],
    queryFn: async ({
      queryKey: [_, gameId, __, environmentId],
      meta,
      signal,
    }) => {
      const response = await rivetEeClient.ee.backend.getEvents(
        gameId,
        environmentId,
        { watchIndex: getMetaWatchIndex(meta) },
        { abortSignal: signal },
      );
      return {
        ...response,
        events: z.array(BackendEvent).parse(response.events),
      };
    },
    select: (data) => data.events,
    meta: {
      watch: mergeWatchStreams,
    },
  });

export const gameBackendEnvEventQueryOptions = ({
  gameId,
  environmentId,
  eventId,
}: {
  gameId: string;
  environmentId: string;
  eventId: string;
}) =>
  queryOptions({
    ...gameBackendEnvEventsQueryOptions({ gameId, environmentId }),
    select: (data) =>
      data.events.find((event) => event.eventTimestamp === eventId),
  });

export const gameBackendProjectEnvDatabaseQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["game", gameId, "backend-env", environmentId, "database-url"],
    queryFn: ({ queryKey: [_, gameId, __, environmentId] }) =>
      rivetEeClient.ee.backend.getDbUrl(gameId, environmentId),
  });

/**
 * Used only for storing query key
 */
export const gameBackendProjectEnvDatabasePreviewQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    gcTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    enabled: false,
    queryKey: [
      "game",
      gameId,
      "backend-env",
      environmentId,
      "database",
      "preview",
    ],
  });
