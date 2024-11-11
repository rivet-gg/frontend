import { rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { queryOptions } from "@tanstack/react-query";
import { getLiveLobbyStatus, getLobbyStatus } from "../../data/lobby-status";
import { gameQueryOptions } from "../query-options";

export const gameEnvironmentsQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    // biome-ignore lint/style/noNonNullAssertion: when we get here, we know the game exists
    select: (data) => gameQueryOptions(gameId).select?.(data).namespaces!,
  });
};

export const gameEnvironmentQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "environment", environmentId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
      ],
      signal,
    }) =>
      rivetClient.cloud.games.namespaces.getGameNamespaceById(
        gameId,
        environmentId,
        { abortSignal: signal },
      ),
  });
};

export const gameEnvironmentDisplayNameQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) =>
  queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId)
        .select?.(data)
        .namespaces.find((namespace) => namespace.namespaceId === environmentId)
        ?.displayName,
  });

export const gameEnvironmentVersionQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId)
        .select?.(data)
        .namespaces.find((namespace) => namespace.namespaceId === environmentId)
        ?.version,
  });
};

export const gameEnvironmentLobbyQueryOptions = (
  {
    gameId,
    environmentId,
    lobbyId,
  }: {
    gameId: string;
    environmentId: string;
    lobbyId: string;
  },
  opts?: { refetchInterval?: number; throwOnError?: boolean },
) => {
  return queryOptions({
    queryKey: ["game", gameId, "environment", environmentId, "lobby", lobbyId],
    refetchInterval: opts?.refetchInterval,
    throwOnError: opts?.throwOnError,
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ___,
        lobbyId,
      ],
      signal,
    }) =>
      rivetClient.cloud.games.namespaces.logs.getNamespaceLobby(
        gameId,
        environmentId,
        lobbyId,
        { abortSignal: signal },
      ),
    select: (data) => ({
      ...data,
      lobby: {
        ...data.lobby,
        readableStatus: getLobbyStatus(data.lobby.status, data.lobby.startTs),
        stopTs: data.lobby.status.stopped?.stopTs,
      },
    }),
  });
};

export const gameEnvironmentTokenPublicQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) => {
  return queryOptions({
    staleTime: 0,
    gcTime: 0,
    queryKey: ["game", gameId, "environment", environmentId, "token", "public"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
      ],
      signal,
    }) =>
      rivetClient.cloud.games.namespaces.createGameNamespaceTokenPublic(
        gameId,
        environmentId,
        { abortSignal: signal },
      ),
    select: (data) => data.token,
  });
};

export const gameEnvironmentLogsLobbiesQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "environment", environmentId, "lobbies"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
      ],
      signal,
    }) =>
      rivetClient.cloud.games.namespaces.logs.listNamespaceLobbies(
        gameId,
        environmentId,
        {},
        { abortSignal: signal },
      ),
    select: (data) =>
      data.lobbies.map((lobby) => ({
        ...lobby,
        readableStatus: getLobbyStatus(lobby.status, lobby.startTs),
      })),
  });
};

export const gameEnvironmentLogsLobbyLogsQueryOptions = (
  {
    gameId,
    lobbyId,
    stream,
  }: {
    gameId: string;
    lobbyId: string;
  } & Rivet.cloud.games.GetLobbyLogsRequest,
  opts?: { refetchInterval?: number },
) => {
  return queryOptions({
    // watch does not work on this query
    refetchInterval: opts?.refetchInterval,
    queryKey: ["game", gameId, "lobby", lobbyId, "logs", stream],
    queryFn: async ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        lobbyId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ___,
        stream,
      ],
      signal,
    }) => {
      const response = await rivetClient.cloud.games.matchmaker.getLobbyLogs(
        gameId,
        lobbyId,
        {
          stream: stream as Rivet.cloud.games.LogStream,
        },
        { abortSignal: signal },
      );
      return {
        ...response,
        lines: response.lines.map((line) => window.atob(line)),
      };
    },
  });
};

export const gameEnvironmentLobbiesLiveQueryOptions = ({
  gameId,
  environmentId,
}: {
  gameId: string;
  environmentId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "environment", environmentId, "lobbies", "live"],
    refetchInterval: 1000,
    queryFn: async ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        environmentId,
      ],
      signal,
    }) =>
      rivetClient.cloud.games.namespaces.analytics.getAnalyticsMatchmakerLive(
        gameId,
        environmentId,
        { abortSignal: signal },
      ),
    select: (data) => ({
      ...data,
      lobbies: data.lobbies
        .map((lobby) => ({
          ...lobby,
          readableStatus: getLiveLobbyStatus(lobby),
        }))
        .sort((a, b) => {
          // sort by created time
          return +b.createTs - +a.createTs;
        }),
    }),
  });
};
