import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "./global";
import { Rivet } from "@rivet-gg/api";

export type GroupGames = Rivet.group.Summary & { games: Rivet.game.Summary[] };

export const gamesQueryOptions = () => {
  return queryOptions({
    queryKey: ["games"],
    queryFn: () => rivetClient.cloud.games.games.getGames(),
    select: (data) => {
      return data.groups.map((group) => {
        return {
          ...group,
          games: data.games.filter(
            (game) => game.developer.groupId === group.groupId,
          ),
        };
      });
    },
  });
};

export const groupGamesQueryOptions = (groupId: string) => {
  return queryOptions({
    ...gamesQueryOptions(),
    select: (data) => {
      const group = data.groups.find((group) => group.groupId === groupId)!;
      const games = data.games.filter(
        (game) => game.developer.groupId === group.groupId,
      );
      return {
        ...group,
        games,
      };
    },
  });
};

export const gameQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["game", gameId],
    queryFn: ({ queryKey: [_, gameId] }) =>
      rivetClient.cloud.games.games.getGameById(gameId),
    select: (data) => ({
      ...data,
      game: {
        ...data.game,
        namespaces: data.game.namespaces.map((namespace) => ({
          ...namespace,
          version: data.game.versions.find(
            (version) => version.versionId === namespace.versionId,
          ),
        })),
      },
    }),
  });
};

export const gameNamespacesQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) => gameQueryOptions(gameId).select!(data).game.namespaces,
  });
};
