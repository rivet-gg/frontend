import { rivetClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import type { Rivet } from "@rivet-gg/api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const gameServersQueryOptions = ({
  gameId,
  environmentId,
}: { gameId: string; environmentId: string }) => {
  return infiniteQueryOptions({
    queryKey: ["game", gameId, "namespace", environmentId, "servers"],
    refetchInterval: 5000,
    initialPageParam: "",
    queryFn: ({
      signal: abortSignal,
      pageParam,
      queryKey: [_, gameId, __, environmentId],
    }) =>
      rivetClient.servers.list(
        gameId,
        environmentId,
        {
          includeDestroyed: true,
          cursor: pageParam ? pageParam : undefined,
        },
        { abortSignal },
      ),
    select: (data) => data.pages.flatMap((page) => page.servers),
    getNextPageParam: (lastPage) =>
      lastPage.servers[lastPage.servers?.length - 1]?.id,
  });
};

export const serverQueryOptions = ({
  gameId,
  environmentId,
  serverId,
}: {
  gameId: string;
  environmentId: string;
  serverId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", environmentId, "server", serverId],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, gameId, __, environmentId, ___, serverId],
    }) =>
      rivetClient.servers.get(gameId, environmentId, serverId, { abortSignal }),
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
    }),
  });
};

export const serverLogsQueryOptions = (
  {
    gameId,
    environmentId,
    serverId,
    stream,
  }: {
    gameId: string;
    environmentId: string;
    serverId: string;
    stream: Rivet.servers.LogStream;
  },
  opts: { refetchInterval?: number } = {},
) => {
  return queryOptions({
    ...opts,
    queryKey: [
      "game",
      gameId,
      "namespace",
      environmentId,
      "server",
      serverId,
      "logs",
      stream,
    ],
    queryFn: ({
      signal: abortSignal,
      meta,
      queryKey: [_, gameId, __, environmentId, ___, serverId, ____, stream],
    }) =>
      rivetClient.servers.logs.getServerLogs(
        gameId,
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
      watch: true,
    },
  });
};
export const gameBuildsQueryOptions = ({
  environmentId,
  gameId,
  tags = {},
}: {
  gameId: string;
  environmentId: string;
  tags?: Record<string, string>;
}) => {
  return queryOptions({
    queryKey: [
      "game",
      gameId,
      "namespace",
      environmentId,
      "builds",
      tags,
    ] as const,
    refetchInterval: 5000,
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        __,
        environmentId,
        ___,
        tags,
      ],
      signal: abortSignal,
    }) =>
      rivetClient.servers.builds.listBuilds(gameId, environmentId, tags, {
        abortSignal,
      }),
    select: (data) => data.builds,
  });
};

export const buildQueryOptions = ({
  gameId,
  environmentId,
  buildId,
}: {
  gameId: string;
  environmentId: string;
  buildId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", environmentId, "build", buildId],
    queryFn: ({
      signal: abortSignal,
      queryKey: [_, gameId, __, environmentId, ___, buildId],
    }) =>
      rivetClient.servers.builds.getBuild(
        gameId,
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