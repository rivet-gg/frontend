import { rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { queryOptions } from "@tanstack/react-query";

export const gameServersQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["servers"],
    queryFn: () => rivetClient.servers.list(gameId),
  });
};

export const serverQueryOptions = (gameId: string, serverId: string) => {
  return queryOptions({
    queryKey: ["server", serverId],
    queryFn: () => rivetClient.servers.get(gameId, serverId),
    select: (data) => ({
      ...data.server,
      createTs: data.server.createdAt
        ? new Date(data.server.createdAt)
        : new Date(),
      startTs: data.server.destroyedAt
        ? new Date(data.server.destroyedAt)
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
    serverId,
    stream,
  }: {
    gameId: string;
    serverId: string;
    stream: Rivet.servers.LogStream;
  },
  opts: { refetchInterval?: number } = {},
) => {
  return queryOptions({
    ...opts,
    queryKey: ["server", serverId, "logs", stream],
    queryFn: () =>
      rivetClient.servers.logs.getServerLogs(gameId, serverId, { stream }),
    select: (data) => ({
      ...data,
      lines: data.lines.map((line) => window.atob(line)),
    }),
  });
};

export const gameBuildsQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["game", gameId, "builds"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
      ],
    }) => rivetClient.cloud.games.builds.listGameBuilds(gameId),
    select: (data) => data.builds,
  });
};

export const buildQueryOptions = (gameId: string, buildId: string) => {
  return queryOptions({
    queryFn: () => rivetClient.servers.builds.getBuild(gameId, buildId),
    queryKey: ["game", gameId, "build", buildId],
    select: (data) => data.build,
  });
};
