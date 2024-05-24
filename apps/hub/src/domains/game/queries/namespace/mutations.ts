import { queryClient, rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { toast } from "@rivet-gg/components";
import { useMutation } from "@tanstack/react-query";
import { gameQueryOptions } from "../query-options";
import { gameNamespaceQueryOptions } from "./query-options";

export const useNamepsaceMatchmakerUpdateConfigMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      namespaceId,
      lobbyCountMax,
      maxPlayers,
    }: {
      gameId: string;
      namespaceId: string;
    } & Rivet.cloud.games.namespaces.UpdateGameNamespaceMatchmakerConfigRequest) =>
      rivetClient.cloud.games.namespaces.updateGameNamespaceMatchmakerConfig(
        gameId,
        namespaceId,
        { lobbyCountMax, maxPlayers },
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

export const useNamespaceDomainPublicAuthMutation = ({
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
