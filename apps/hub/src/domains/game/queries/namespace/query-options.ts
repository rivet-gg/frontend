import { rivetClient, rivetEeClient } from "@/queries/global";
import { Rivet } from "@rivet-gg/api";
import { queryOptions } from "@tanstack/react-query";
import { getLobbyStatus, getLiveLobbyStatus } from "../../data/lobby-status";
import { gameQueryOptions } from "../query-options";

export const gameNamespacesQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) => gameQueryOptions(gameId).select!(data).namespaces,
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
      gameQueryOptions(gameId).select!(data).namespaces.find(
        (namespace) => namespace.namespaceId === namespaceId,
      )!.displayName,
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
      gameQueryOptions(gameId).select!(data).namespaces.find(
        (namespace) => namespace.namespaceId === namespaceId,
      )!.version,
  });
};

export const gameNamespaceLogsLobbyQueryOptions = ({
  gameId,
  namespaceId,
  lobbyId,
}: {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}) => {
  return queryOptions({
    queryKey: ["game", gameId, "namespace", namespaceId, "lobby", lobbyId],
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

export const gameNamespaceLogsLobbyLogsQueryOptions = ({
  gameId,
  lobbyId,
  stream,
}: {
  gameId: string;
  lobbyId: string;
} & Rivet.cloud.games.GetLobbyLogsRequest) => {
  return queryOptions({
    queryKey: ["game", gameId, "lobby", lobbyId, "logs", stream],
    queryFn: ({
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
    }) =>
      rivetClient.cloud.games.matchmaker.getLobbyLogs(gameId, lobbyId, {
        stream: stream as Rivet.cloud.games.LogStream,
      }),
  });
};

export const gameBillingQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["game", gameId, "billing"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
      ],
    }) => rivetEeClient.ee.cloud.games.billing.get(gameId),
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
    refetchInterval: 15000,
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
      rivetClient.cloud.games.namespaces.analytics.getAnalyticsMatchmakerLive(
        gameId,
        namespaceId,
      ),
    select: (data) => ({
      ...data,
      lobbies: data.lobbies.map((lobby) => ({
        ...lobby,
        readableStatus: getLiveLobbyStatus(lobby),
      })),
    }),
  });
};
