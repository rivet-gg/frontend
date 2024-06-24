import { queryClient, rivetClient, rivetEeClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { toast } from "@rivet-gg/components";
import { useMutation } from "@tanstack/react-query";
import { gameBillingQueryOptions } from "./namespace/query-options";
import { gameQueryOptions, gamesQueryOptions } from "./query-options";

export const useGameCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: Rivet.cloud.games.CreateGameResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: (data: Rivet.cloud.games.CreateGameRequest) =>
      rivetClient.cloud.games.createGame(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(gamesQueryOptions());
      await onSuccess?.(data);
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

export const useExportLobbyLogsMutation = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      lobbyId,
      stream,
    }: {
      gameId: string;
      lobbyId: string;
    } & Rivet.cloud.games.ExportLobbyLogsRequest) =>
      rivetClient.cloud.games.matchmaker.exportLobbyLogs(gameId, lobbyId, {
        stream,
      }),
    onSuccess: async (data) => {
      window.open(data.url, "_blank");
      toast.success("Logs exported successfully");
    },
  });
};

const useGameLogoUploadCompleteMutation = () => {
  return useMutation({
    mutationFn: ({ gameId, uploadId }: { gameId: string; uploadId: string }) =>
      rivetClient.cloud.games.gameLogoUploadComplete(gameId, uploadId),
    onSuccess(_, variables) {
      return Promise.all([
        queryClient.invalidateQueries(gameQueryOptions(variables.gameId)),
        queryClient.invalidateQueries(gamesQueryOptions()),
      ]);
    },
  });
};

export const useGameLogoUploadMutation = (gameId: string) => {
  const { mutateAsync } = useGameLogoUploadCompleteMutation();
  return useMutation({
    mutationFn: ({ file }: { file: File }) =>
      rivetClient.cloud.games.gameLogoUploadPrepare(gameId, {
        mime: file.type,
        contentLength: file.size,
        path: file.name,
      }),
    onSuccess: async (response, data) => {
      await fetch(response.presignedRequest.url, {
        method: "PUT",
        body: data.file,
        mode: "cors",
        headers: {
          "Content-Type": data.file.type,
        },
      });
      await mutateAsync({
        gameId,
        uploadId: response.uploadId,
      });
    },
  });
};

export const useUpdateGameBillingMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationFn: ({
      gameId,
      plan,
    }: {
      gameId: string;
    } & RivetEe.ee.cloud.games.billing.UpdatePlanRequest) =>
      rivetEeClient.ee.cloud.games.billing.updatePlan(gameId, { plan }),
    onSuccess: async (data, values) => {
      await queryClient.invalidateQueries(
        gameBillingQueryOptions(values.gameId),
      );
      onSuccess?.();
    },
  });
};

export const useCreateBillingPortalSessionMutation = () => {
  return useMutation({
    mutationFn: ({
      groupId,
      intent,
    }: {
      groupId: string;
    } & RivetEe.ee.cloud.groups.billing.CreateStripePortalSessionRequest) =>
      rivetEeClient.ee.cloud.groups.billing.createStripePortalSession(groupId, {
        intent,
      }),
    onSuccess: async (data) => {
      window.open(data.stripeSessionUrl, "_blank");
    },
  });
};
