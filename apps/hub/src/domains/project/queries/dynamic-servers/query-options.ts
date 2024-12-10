import { mergeWatchStreams } from "@/lib/watch-utilities";
import { rivetClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import type { Rivet } from "@rivet-gg/api";
import {
  type InfiniteData,
  infiniteQueryOptions,
  queryOptions,
} from "@tanstack/react-query";

export const projectServersQueryOptions = ({
  projectId,
  environmentId,
}: { projectId: string; environmentId: string }) => {
  return infiniteQueryOptions({
    queryKey: ["project", projectId, "environment", environmentId, "servers"],
    refetchInterval: 5000,
    initialPageParam: "",
    queryFn: ({
      signal: abortSignal,
      pageParam,
      queryKey: [_, projectId, __, environmentId],
    }) =>
      rivetClient.servers.list(
        projectId,
        environmentId,
        {
          includeDestroyed: true,
          cursor: pageParam ? pageParam : undefined,
        },
        { abortSignal },
      ),
    select: (data) => data.pages.flatMap((page) => page.servers || []),
    getNextPageParam: (lastPage) => {
      if (!lastPage.servers) return null;
      return lastPage.servers[lastPage.servers?.length - 1]?.id;
    },
    meta: {
      updateCache: (
        data: InfiniteData<Rivet.servers.ListServersResponse>,
        client,
      ) => {
        for (const page of data.pages) {
          for (const server of page.servers) {
            client.setQueryData(
              [
                "project",
                projectId,
                "environment",
                environmentId,
                "server",
                server.id,
              ],
              (oldData) => {
                if (!oldData) return oldData;
                return {
                  server,
                };
              },
            );
          }
        }
      },
    },
  });
};

export const serverQueryOptions = ({
  projectId,
  environmentId,
  serverId,
}: {
  projectId: string;
  environmentId: string;
  serverId: string;
}) => {
  return queryOptions({
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "server",
      serverId,
    ],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, projectId, __, environmentId, ___, serverId],
    }) =>
      rivetClient.servers.get(projectId, environmentId, serverId, {
        abortSignal,
      }),
    select: (data) => ({
      ...data.server,
      createTs: data.server.createdAt
        ? new Date(data.server.createdAt)
        : new Date(),
      startTs: data.server.startedAt
        ? new Date(data.server.startedAt)
        : undefined,
      destroyTs: data.server.destroyedAt
        ? new Date(data.server.destroyedAt)
        : undefined,
      runtime: {
        ...data.server.runtime,
        arguments: data.server.runtime.arguments?.filter((arg) => arg !== ""),
      },
    }),
  });
};

export const serverLogsQueryOptions = (
  {
    projectId,
    environmentId,
    serverId,
    stream,
  }: {
    projectId: string;
    environmentId: string;
    serverId: string;
    stream: Rivet.servers.LogStream;
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
      "server",
      serverId,
      "logs",
      stream,
    ],
    queryFn: ({
      signal: abortSignal,
      meta,
      queryKey: [_, projectId, __, environmentId, ___, serverId, ____, stream],
    }) =>
      rivetClient.servers.logs.getServerLogs(
        projectId,
        environmentId,
        serverId,
        {
          stream: stream as Rivet.servers.LogStream,
          watchIndex: getMetaWatchIndex(meta),
        },
        { abortSignal },
      ),
    select: (data) => ({
      ...data,
      lines: data.lines.map((line) => window.atob(line)),
    }),
    meta: {
      watch: mergeWatchStreams,
    },
  });
};
export const projectBuildsQueryOptions = ({
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
      "builds",
      tags,
    ] as const,
    refetchInterval: 5000,
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
        __,
        environmentId,
        ___,
        tags,
      ],
      signal: abortSignal,
    }) =>
      rivetClient.servers.builds.listBuilds(projectId, environmentId, tags, {
        abortSignal,
      }),
    select: (data) => data.builds,
  });
};

export const buildQueryOptions = ({
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
      "build",
      buildId,
    ],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, projectId, __, environmentId, ___, buildId],
    }) =>
      rivetClient.servers.builds.getBuild(
        projectId,
        environmentId,
        buildId,
        {},
        {
          abortSignal,
        },
      ),

    select: (data) => data.build,
  });
};

export const dataCentersQueryOptions = ({
  projectId,
  environmentId,
}: { projectId: string; environmentId: string }) => {
  return queryOptions({
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "datacenters",
    ],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, projectId, __, environmentId],
    }) =>
      rivetClient.servers.datacenters.listDatacenters(
        projectId,
        environmentId,
        {
          abortSignal,
        },
      ),
    select: (data) => data.datacenters,
  });
};

export const dataCenterQueryOptions = ({
  projectId,
  environmentId,
  datacenterId,
}: {
  projectId: string;
  environmentId: string;
  datacenterId: string;
}) => {
  return queryOptions({
    ...dataCentersQueryOptions({ projectId, environmentId }),
    select: (data) =>
      dataCentersQueryOptions({ projectId, environmentId })
        .select?.(data)
        .find((datacenter) => datacenter.id === datacenterId),
  });
};
