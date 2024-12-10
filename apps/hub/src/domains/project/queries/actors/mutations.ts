import { queryClient, rivetClient } from "@/queries/global";
import type { Rivet } from "@rivet-gg/api";
import { useMutation } from "@tanstack/react-query";
import {
  actorBuildQueryOptions,
  actorQueryOptions,
  projectActorsQueryOptions,
} from "./query-options";

export function useDestroyActorMutation() {
  return useMutation({
    mutationFn: (opts: {
      projectId: string;
      environmentId: string;
      actorId: string;
    }) =>
      rivetClient.actor.destroy(opts.actorId, {
        environment: opts.environmentId,
        project: opts.projectId,
      }),
    onSuccess: async (_, { projectId, environmentId, actorId }) => {
      await queryClient.invalidateQueries(
        actorQueryOptions({ projectId, environmentId, actorId }),
      );
      await queryClient.invalidateQueries({
        ...projectActorsQueryOptions({ projectId, environmentId }),
        refetchType: "all",
      });
    },
  });
}

export function usePatchActorBuildTagsMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  return useMutation({
    mutationFn: ({
      projectId,
      environmentId,
      buildId,
      ...request
    }: {
      projectId: string;
      environmentId: string;
      buildId: string;
    } & Rivet.servers.PatchBuildTagsRequest) =>
      rivetClient.actor.builds.patchTags(buildId, {
        project: projectId,
        environment: environmentId,
        body: request,
      }),
    onSuccess: async (_, { projectId, environmentId, buildId }) => {
      await Promise.allSettled([
        queryClient.invalidateQueries(
          projectActorsQueryOptions({ projectId, environmentId }),
        ),
        queryClient.invalidateQueries(
          actorBuildQueryOptions({ buildId, projectId, environmentId }),
        ),
      ]);
      onSuccess?.();
    },
  });
}
