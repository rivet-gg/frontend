import { rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { queryOptions } from "@tanstack/react-query";
import { getLiveLobbyStatus, getLobbyStatus } from "../../data/lobby-status";
import { gameQueryOptions } from "../query-options";

export const gameNamespacesQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    // biome-ignore lint/style/noNonNullAssertion: when we get here, we know the game exists
    select: (data) => gameQueryOptions(gameId).select?.(data).namespaces!,
  });
};

export const gameNamespaceQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", namespaceId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        namespaceId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.getGameNamespaceById(
        gameId,
        namespaceId,
      ),
  });
};

export const gameNamespaceDisplayNameQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) =>
  queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId)
        .select?.(data)
        .namespaces.find((namespace) => namespace.namespaceId === namespaceId)
        ?.displayName,
  });

export const gameNamespaceVersionQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId)
        .select?.(data)
        .namespaces.find((namespace) => namespace.namespaceId === namespaceId)
        ?.version,
  });
};

export const gameNamespaceLobbyQueryOptions = (
  {
    gameId,
    namespaceId,
    lobbyId,
  }: {
    gameId: string;
    namespaceId: string;
    lobbyId: string;
  },
  opts?: { refetchInterval?: number; throwOnError?: boolean },
) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", namespaceId, "lobby", lobbyId],
    refetchInterval: opts?.refetchInterval,
    throwOnError: opts?.throwOnError,
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        namespaceId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ___,
        lobbyId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.logs.getNamespaceLobby(
        gameId,
        namespaceId,
        lobbyId,
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

export const gameNamespaceTokenPublicQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) => {
  return queryOptions({
    staleTime: 0,
    gcTime: 0,
    queryKey: ["game", gameId, "namespace", namespaceId, "token", "public"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        namespaceId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.createGameNamespaceTokenPublic(
        gameId,
        namespaceId,
      ),
    select: (data) => data.token,
  });
};

export const gameNamespaceLogsLobbiesQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", namespaceId, "lobbies"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        namespaceId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.logs.listNamespaceLobbies(
        gameId,
        namespaceId,
      ),
    select: (data) =>
      data.lobbies.map((lobby) => ({
        ...lobby,
        readableStatus: getLobbyStatus(lobby.status, lobby.startTs),
      })),
  });
};

export const gameNamespaceLogsLobbyLogsQueryOptions = (
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
    }) => {
      const response = await rivetClient.cloud.games.matchmaker.getLobbyLogs(
        gameId,
        lobbyId,
        {
          stream: stream as Rivet.cloud.games.LogStream,
        },
      );
      return {
        ...response,
        lines: response.lines.map((line) => window.atob(line)),
      };
    },
  });
};

export const gameNamespaceLobbiesLiveQueryOptions = ({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", namespaceId, "lobbies", "live"],
    refetchInterval: 1000,
    queryFn: async ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __,
        namespaceId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.analytics.getAnalyticsMatchmakerLive(
        gameId,
        namespaceId,
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
