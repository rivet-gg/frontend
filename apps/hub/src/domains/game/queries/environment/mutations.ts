import { queryClient, rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { toast } from "@rivet-gg/components";
import { useMutation } from "@tanstack/react-query";
import { gameQueryOptions } from "../query-options";
import {
  gameEnvironmentLobbyQueryOptions,
  gameEnvironmentQueryOptions,
} from "./query-options";

export const useEnvironmentMatchmakerUpdateConfigMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      lobbyCountMax,
      maxPlayers,
    }: {
      gameId: string;
      environmentId: string;
    } & Rivet.cloud.games.namespaces.UpdateGameNamespaceMatchmakerConfigRequest) =>
      rivetClient.cloud.games.namespaces.updateGameNamespaceMatchmakerConfig(
        gameId,
        environmentId,
        { lobbyCountMax, maxPlayers },
      ),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      await queryClient.invalidateQueries(
        gameEnvironmentQueryOptions({
          gameId: values.gameId,
          environmentId: values.environmentId,
        }),
      );
    },
  });
};

export const useEnvironmentMatchmakeDeleteLobbyMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      lobbyId,
    }: {
      gameId: string;
      environmentId: string;
      lobbyId: string;
    }) =>
      rivetClient.cloud.games.matchmaker.deleteMatchmakerLobby(gameId, lobbyId),
    onSuccess: async (_, values) => {
      await queryClient.invalidateQueries(
        gameEnvironmentLobbyQueryOptions({
          gameId: values.gameId,
          environmentId: values.environmentId,
          lobbyId: values.lobbyId,
        }),
      );
    },
  });
};

export const useEnvironmentRemoveDomainMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      domain,
    }: {
      gameId: string;
      environmentId: string;
      domain: string;
    }) =>
      rivetClient.cloud.games.namespaces.removeNamespaceDomain(
        gameId,
        environmentId,
        domain,
      ),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      await queryClient.invalidateQueries(
        gameEnvironmentQueryOptions({
          gameId: values.gameId,
          environmentId: values.environmentId,
        }),
      );
    },
  });
};

export const useUpdateGameEnvironmentVersionMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      versionId,
    }: {
      gameId: string;
      environmentId: string;
    } & Rivet.cloud.games.namespaces.UpdateGameNamespaceVersionRequest) =>
      rivetClient.cloud.games.namespaces.updateGameNamespaceVersion(
        gameId,
        environmentId,
        { versionId },
      ),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(gameQueryOptions(values.gameId));
      onSuccess?.();
    },
  });
};

export const useEnvironmentDomainPublicAuthMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      enabled,
    }: {
      gameId: string;
      environmentId: string;
      enabled: boolean;
    }) =>
      rivetClient.cloud.games.namespaces.toggleNamespaceDomainPublicAuth(
        gameId,
        environmentId,
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
        gameEnvironmentQueryOptions({
          gameId: values.gameId,
          environmentId: values.environmentId,
        }),
      );
      onSuccess?.();
    },
  });
};

export const useEnvironmentAuthTypeMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      authType,
    }: {
      gameId: string;
      environmentId: string;
      authType: Rivet.cloud.CdnAuthType;
    }) =>
      rivetClient.cloud.games.namespaces.setNamespaceCdnAuthType(
        gameId,
        environmentId,
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
        gameEnvironmentQueryOptions({
          gameId: values.gameId,
          environmentId: values.environmentId,
        }),
      );
      onSuccess?.();
    },
  });
};

export const useEnvironmentUpdateCdnAuthUserMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      user,
      password,
    }: {
      gameId: string;
      environmentId: string;
    } & Rivet.cloud.games.namespaces.UpdateNamespaceCdnAuthUserRequest) =>
      rivetClient.cloud.games.namespaces.updateNamespaceCdnAuthUser(
        gameId,
        environmentId,
        {
          user,
          password,
        },
      ),
  });
};

export const useEnvironmentRemoveCdnAuthUserMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      user,
    }: {
      gameId: string;
      environmentId: string;
      user: string;
    }) =>
      rivetClient.cloud.games.namespaces.removeNamespaceCdnAuthUser(
        gameId,
        environmentId,
        user,
      ),
  });
};

export const useEnvironmentAddDomainMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      domain,
    }: {
      gameId: string;
      environmentId: string;
    } & Rivet.cloud.games.namespaces.AddNamespaceDomainRequest) =>
      rivetClient.cloud.games.namespaces.addNamespaceDomain(
        gameId,
        environmentId,
        { domain },
      ),
  });
};
