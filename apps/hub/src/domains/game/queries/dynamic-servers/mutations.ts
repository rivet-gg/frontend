import { queryClient, rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { useMutation } from "@tanstack/react-query";
import { gameServersQueryOptions, serverQueryOptions } from "./query-options";

export function useDestroyServerMutation() {
  return useMutation({
    mutationFn: (opts: {
      gameId: string;
      environmentId: string;
      serverId: string;
    }) =>
      rivetClient.servers.destroy(
        opts.gameId,
        opts.environmentId,
        opts.serverId,
      ),
    onSuccess: async (_, { gameId, environmentId, serverId }) => {
      await queryClient.invalidateQueries(
        serverQueryOptions({ gameId, environmentId, serverId }),
      );
    },
  });
}

export function usePatchBuildTagsMutation() {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      buildId,
      ...request
    }: {
      gameId: string;
      environmentId: string;
      buildId: string;
    } & Rivet.servers.PatchBuildTagsRequest) =>
      rivetClient.servers.builds.patchTags(
        gameId,
        environmentId,
        buildId,
        request,
      ),
  });
}

export function useCreateDynamicServerMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  return useMutation({
    mutationFn: ({
      gameId,
      environmentId,
      ...request
    }: {
      gameId: string;
      environmentId: string;
    } & Rivet.servers.CreateServerRequest) =>
      rivetClient.servers.create(gameId, environmentId, request),
    onSuccess: async (_, { gameId, environmentId }) => {
      await queryClient.invalidateQueries(
        gameServersQueryOptions({ gameId, environmentId }),
      );
      onSuccess?.();
    },
  });
}
