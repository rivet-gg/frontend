import { rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { useMutation } from "@tanstack/react-query";

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
