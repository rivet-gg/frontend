import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient, rivetClient } from "../../../queries/global";
import { Rivet } from "@rivet-gg/api";
import { getMetaWatchIndex } from "@/queries/utils";
import { toast } from "@rivet-gg/components";
import { getLobbyStatus } from "../data/lobby-status";

export type GroupGames = Rivet.group.Summary & { games: Rivet.game.Summary[] };

export const gamesQueryOptions = () => {
  return queryOptions({
    queryKey: ["games"],
    queryFn: ({ meta }) =>
      rivetClient.cloud.games.games.getGames({
        watchIndex: getMetaWatchIndex(meta),
      }),
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
    meta: { watch: true },
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

export const groupOnwerQueryOptions = (groupId: string) => {
  return queryOptions({
    ...groupGamesQueryOptions(groupId),
    select: (data) => {
      return groupGamesQueryOptions(groupId).select!(data).ownerIdentityId;
    },
  });
};

export const gameQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["game", gameId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
      ],
      meta,
    }) =>
      rivetClient.cloud.games.games.getGameById(gameId, {
        watchIndex: getMetaWatchIndex(meta),
      }),
    meta: { watch: true },
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

export const gameVersionsQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId).select!(data).game.versions.sort(
        (a, b) => b.createTs.getTime() - a.createTs.getTime(),
      ),
  });
};

export const gameRegionsQueryOptions = (gameId: string) => {
  return queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId).select!(data).game.availableRegions,
  });
};

export const gameVersionQueryOptions = ({
  gameId,
  versionId,
}: {
  gameId: string;
  versionId: string;
}) =>
  queryOptions({
    ...gameQueryOptions(gameId),
    select: (data) =>
      gameQueryOptions(gameId).select!(data).game.versions.find(
        (version) => version.versionId === versionId,
      )!,
  });

export const useGameCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: Rivet.cloud.games.CreateGameResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: (data: Rivet.cloud.games.CreateGameRequest) =>
      rivetClient.cloud.games.games.createGame(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(gamesQueryOptions());
      onSuccess?.(data);
    },
  });
};

export const useNamespaceCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Rivet.cloud.games.namespaces.CreateGameNamespaceResponse,
  ) => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      ...data
    }: Rivet.cloud.games.namespaces.CreateGameNamespaceRequest & {
      gameId: string;
    }) => rivetClient.cloud.games.namespaces.createGameNamespace(gameId, data),
    onSuccess: async (data, values) => {
      await Promise.all([
        queryClient.invalidateQueries(gameQueryOptions(values.gameId)),
        queryClient.invalidateQueries(gamesQueryOptions()),
      ]);
      onSuccess?.(data);
    },
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
    queryKey: ["gameNamespace", gameId, namespaceId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        namespaceId,
      ],
    }) =>
      rivetClient.cloud.games.namespaces.getGameNamespaceById(
        gameId,
        namespaceId,
      ),
  });
};

export const useUpdateGameNamespaceVersionMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      versionId,
    }: {
      gameId: string;
      namespaceId: string;
    } & Rivet.cloud.games.namespaces.UpdateGameNamespaceVersionRequest) =>
      rivetClient.cloud.games.namespaces.updateGameNamespaceVersion(
        gameId,
        namespaceId,
        { versionId },
      ),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      onSuccess?.();
    },
  });
};

export const useNamespaceDomainPublichAuthMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      enabled,
    }: {
      gameId: string;
      namespaceId: string;
      enabled: boolean;
    }) =>
      rivetClient.cloud.games.namespaces.toggleNamespaceDomainPublicAuth(
        gameId,
        namespaceId,
        {
          enabled,
        },
      ),
    onError: () => {
      toast.error("Failed to update domain-based authentication");
    },
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      await queryClient.invalidateQueries(
        gameNamespaceQueryOptions({
          gameId: values.gameId,
          namespaceId: values.namespaceId,
        }),
      );
      onSuccess?.();
    },
  });
};

export const useNamespaceAuthTypeMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      authType,
    }: {
      gameId: string;
      namespaceId: string;
      authType: Rivet.cloud.CdnAuthType;
    }) =>
      rivetClient.cloud.games.namespaces.setNamespaceCdnAuthType(
        gameId,
        namespaceId,
        {
          authType,
        },
      ),
    onError: () => {
      toast.error("Failed to update authentication type");
    },
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      await queryClient.invalidateQueries(
        gameNamespaceQueryOptions({
          gameId: values.gameId,
          namespaceId: values.namespaceId,
        }),
      );
      onSuccess?.();
    },
  });
};

export const useNamespaceUpdateCdnAuthUserMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      user,
      password,
    }: {
      gameId: string;
      namespaceId: string;
    } & Rivet.cloud.games.namespaces.UpdateNamespaceCdnAuthUserRequest) =>
      rivetClient.cloud.games.namespaces.updateNamespaceCdnAuthUser(
        gameId,
        namespaceId,
        {
          user,
          password,
        },
      ),
  });
};

export const useNamespaceRemoveCdnAuthUserMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      user,
    }: {
      gameId: string;
      namespaceId: string;
      user: string;
    }) =>
      rivetClient.cloud.games.namespaces.removeNamespaceCdnAuthUser(
        gameId,
        namespaceId,
        user,
      ),
  });
};

export const useNamespaceAddDomainMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      domain,
    }: {
      gameId: string;
      namespaceId: string;
    } & Rivet.cloud.games.namespaces.AddNamespaceDomainRequest) =>
      rivetClient.cloud.games.namespaces.addNamespaceDomain(
        gameId,
        namespaceId,
        { domain },
      ),
  });
};

export const useNamespaceRemoveDomainMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      domain,
    }: {
      gameId: string;
      namespaceId: string;
      domain: string;
    }) =>
      rivetClient.cloud.games.namespaces.removeNamespaceDomain(
        gameId,
        namespaceId,
        domain,
      ),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      await queryClient.invalidateQueries(
        gameNamespaceQueryOptions({
          gameId: values.gameId,
          namespaceId: values.namespaceId,
        }),
      );
    },
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
    queryKey: ["gameNamespaceTokenPublic", gameId, namespaceId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
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
    queryKey: ["gameNamespaceLogsLobbies", gameId, namespaceId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
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
    queryKey: ["gameNamespaceLogsLobby", gameId, namespaceId, lobbyId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        namespaceId,
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

export const gameNamespaceLogsLobbyLogsQueryOptions = ({
  gameId,
  lobbyId,
  stream,
}: {
  gameId: string;
  lobbyId: string;
} & Rivet.cloud.games.GetLobbyLogsRequest) => {
  return queryOptions({
    queryKey: ["gameNamespaceLogsLobbyLogs", gameId, lobbyId, stream],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
        lobbyId,
        stream,
      ],
    }) =>
      rivetClient.cloud.games.matchmaker.getLobbyLogs(gameId, lobbyId, {
        stream: stream as Rivet.cloud.games.LogStream,
      }),
  });
};
