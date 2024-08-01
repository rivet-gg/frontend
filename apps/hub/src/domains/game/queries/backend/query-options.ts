import { rivetEeClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { BackendEvent } from "./types";

export const gameBackendProjectQueryOptions = (gameId: string) =>
  queryOptions({
    retry: false,
    queryKey: ["game", gameId, "backend-project"],
    // retry only when service is unavailable
    // retry: (count) => {}
    queryFn: ({ queryKey: [_, gameId] }) =>
      rivetEeClient.ee.cloud.games.projects.get(gameId),
  });

export const gameBackendProjectEnvsQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "envs"],
    queryFn: ({ queryKey: [_, projectId] }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.list(projectId),
    select: (data) => data.environments,
  });

export const gameBackendProjectEnvQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "env", environmentId],
    queryFn: ({ queryKey: [_, projectId, __, environmentId] }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.get(
        projectId,
        environmentId,
      ),
    select: (data) => data.environment,
  });

export const gameBackendProjectEnvVariablesQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "env", environmentId, "variables"],
    queryFn: ({ queryKey: [_, projectId, __, environmentId] }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.getVariables(
        projectId,
        environmentId,
      ),
    select: (data) => data.variables,
  });

export const gameBackendProjectEnvConfigQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "env", environmentId, "config"],
    queryFn: ({ queryKey: [_, projectId, __, environmentId] }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.getConfig(
        projectId,
        environmentId,
      ),
    select: (data) => data.config,
  });

export const gameBackendProjectEnvEventsQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "env", environmentId, "events"],
    queryFn: async ({ queryKey: [_, projectId, __, environmentId], meta }) => {
      const response =
        await rivetEeClient.ee.cloud.backend.projects.envs.getEvents(
          projectId,
          environmentId,
          { watchIndex: getMetaWatchIndex(meta) },
        );
      return {
        ...response,
        events: z.array(BackendEvent).parse(response.events),
      };
    },
    select: (data) => data.events,
    meta: {
      watch: {
        mergeResponses: true,
      },
    },
  });

export const gameBackendProjectEnvEventQueryOptions = ({
  projectId,
  environmentId,
  eventId,
}: {
  projectId: string;
  environmentId: string;
  eventId: string;
}) =>
  queryOptions({
    ...gameBackendProjectEnvEventsQueryOptions({ projectId, environmentId }),
    select: (data) =>
      data.events.find((event) => event.eventTimestamp === eventId),
  });

export const gameBackendProjectEnvDatabaseQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "env", environmentId, "database"],
    queryFn: ({ queryKey: [_, projectId, __, environmentId] }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.getDbUrl(
        projectId,
        environmentId,
      ),
  });

/**
 * Used only for storing query key
 */
export const gameBackendProjectEnvDatabasePreviewQueryOptions = ({
  projectId,
  environmentId,
}: {
  projectId: string;
  environmentId: string;
}) =>
  queryOptions({
    gcTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    enabled: false,
    queryKey: [
      "backend-project",
      projectId,
      "env",
      environmentId,
      "database",
      "preview",
    ],
  });
