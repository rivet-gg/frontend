import { rivetEeClient } from "@/queries/global";
import { queryOptions } from "@tanstack/react-query";

export const gameBackendProjectQueryOptions = (gameId: string) =>
  queryOptions({
    retry: false,
    queryKey: ["game", gameId, "backend-project"],
    // retry only when service is unavailable
    // retry: (count) => {}
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
      ],
    }) => rivetEeClient.ee.cloud.games.projects.get(gameId),
  });

export const gameBackendProjectEnvsQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["backend-project", projectId, "envs"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
      ],
    }) => rivetEeClient.ee.cloud.opengb.projects.envs.list(projectId),
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
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
      ],
    }) =>
      rivetEeClient.ee.cloud.opengb.projects.envs.get(projectId, environmentId),
    select: (data) => data.environment,
  });
