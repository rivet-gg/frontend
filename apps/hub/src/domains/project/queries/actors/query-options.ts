import { mergeWatchStreams } from "@/lib/watch-utilities";
import { rivetClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import { Rivet } from "@rivet-gg/api";
import {
  type InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";

export const projectActorsQueryOptions = ({
  projectId,
  environmentId,
}: { projectId: string; environmentId: string }) => {
  return infiniteQueryOptions({
    queryKey: ["project", projectId, "environment", environmentId, "actors"],
    refetchInterval: 5000,
    initialPageParam: "",
    queryFn: ({
      signal: abortSignal,
      pageParam,
      queryKey: [_, project, __, environment],
    }) =>
      rivetClient.actor.list(
        { project, environment, cursor: pageParam ? pageParam : undefined },
        { abortSignal },
      ),
    select: (data) => data.pages.flatMap((page) => page.actors || []),
    getNextPageParam: (lastPage) => {
      if (!lastPage.actors) return null;
      return lastPage.actors[lastPage.actors?.length - 1]?.id;
    },
    meta: {
      updateCache: (
        data: InfiniteData<Rivet.actor.ListActorsResponse>,
        client,
      ) => {
        for (const page of data.pages) {
          for (const actor of page.actors) {
            client.setQueryData(
              [
                "project",
                projectId,
                "environment",
                environmentId,
                "actor",
                actor.id,
              ],
              (oldData) => {
                if (!oldData) return oldData;
                return {
                  actor,
                };
              },
            );
          }
        }
      },
    },
  });
};

export const actorQueryOptions = ({
  projectId,
  environmentId,
  actorId,
}: {
  projectId: string;
  environmentId: string;
  actorId: string;
}) => {
  return queryOptions({
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "actor",
      actorId,
    ],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, project, __, environment, ___, actorId],
    }) =>
      rivetClient.actor.get(
        actorId,
        { project, environment },
        {
          abortSignal,
        },
      ),
    select: (data) => ({
      ...data.actor,
      createTs: data.actor.createdAt
        ? new Date(data.actor.createdAt)
        : new Date(),
      startTs: data.actor.startedAt
        ? new Date(data.actor.startedAt)
        : undefined,
      destroyTs: data.actor.destroyedAt
        ? new Date(data.actor.destroyedAt)
        : undefined,
      runtime: {
        ...data.actor.runtime,
        arguments: data.actor.runtime.arguments?.filter((arg) => arg !== ""),
      },
    }),
  });
};

export const actorLogsQueryOptions = (
  {
    projectId,
    environmentId,
    actorId,
    stream,
  }: {
    projectId: string;
    environmentId: string;
    actorId: string;
    stream: Rivet.actor.LogStream;
  },
  opts: { refetchInterval?: number } = {},
) => {
  return queryOptions({
    ...opts,
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "actor",
      actorId,
      "logs",
      stream,
    ],
    queryFn: ({
      signal: abortSignal,
      meta,
      queryKey: [_, project, __, environment, ___, actorId, ____, stream],
    }) =>
      rivetClient.actor.logs.get(
        actorId,
        {
          project,
          environment,
          stream: stream as Rivet.actor.LogStream,
          watchIndex: getMetaWatchIndex(meta),
        },
        { abortSignal },
      ),
    select: (data) => ({
      ...data,
      timestamps: data.timestamps.map((ts) => ts.toISOString()),
      lines: data.lines.map((line) => window.atob(line)),
    }),
    meta: {
      watch: mergeWatchStreams,
    },
  });
};

export const actorErrorsQueryOptions = ({
  projectId,
  environmentId,
  actorId,
}: {
  projectId: string;
  environmentId: string;
  actorId: string;
}) => {
  return queryOptions({
    ...actorLogsQueryOptions({
      projectId,
      environmentId,
      actorId,
      stream: Rivet.actor.LogStream.StdErr,
    }),
    select: (data) => data.lines.length > 0,
  });
};

export const actorBuildsQueryOptions = ({
  environmentId,
  projectId,
  tags = {},
}: {
  projectId: string;
  environmentId: string;
  tags?: Record<string, string>;
}) => {
  return queryOptions({
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "actor-builds",
      tags,
    ] as const,
    refetchInterval: 5000,
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        project,
        __,
        environment,
        ___,
        tagsJson,
      ],
      signal: abortSignal,
    }) =>
      rivetClient.actor.builds.list(
        { project, environment },
        {
          abortSignal,
        },
      ),
    select: (data) => data.builds,
  });
};

export const actorBuildQueryOptions = ({
  projectId,
  environmentId,
  buildId,
}: {
  projectId: string;
  environmentId: string;
  buildId: string;
}) => {
  return queryOptions({
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "actor-build",
      buildId,
    ],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, project, __, environment, ___, build],
    }) =>
      rivetClient.actor.builds.get(
        build,
        { project, environment },
        {
          abortSignal,
        },
      ),
    select: (data) => data.build,
  });
};

export const actorRegionsQueryOptions = ({
  projectId,
  environmentId,
}: { projectId: string; environmentId: string }) => {
  return queryOptions({
    queryKey: ["project", projectId, "environment", environmentId, "regions"],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, project, __, environment],
    }) =>
      rivetClient.actor.regions.list(
        { project, environment },
        {
          abortSignal,
        },
      ),
    select: (data) => data.regions,
  });
};

export const actorRegionQueryOptions = ({
  projectId,
  environmentId,
  regionId,
}: {
  projectId: string;
  environmentId: string;
  regionId: string;
}) => {
  return queryOptions({
    ...actorRegionsQueryOptions({ projectId, environmentId }),
    select: (data) =>
      actorRegionsQueryOptions({ projectId, environmentId })
        .select?.(data)
        .find((region) => region.id === regionId),
  });
};
