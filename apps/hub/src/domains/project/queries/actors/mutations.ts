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
      projectNameId: string;
      environmentNameId: string;
      actorId: string;
    }) =>
      rivetClient.actor.destroy(opts.actorId, {
        environment: opts.projectNameId,
        project: opts.environmentNameId,
      }),
    onSuccess: async (_, { projectNameId, environmentNameId, actorId }) => {
      await queryClient.invalidateQueries(
        actorQueryOptions({ projectNameId, environmentNameId, actorId }),
      );
      await queryClient.invalidateQueries({
        ...projectActorsQueryOptions({ projectNameId, environmentNameId }),
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
      projectNameId,
      environmentNameId,
      buildId,
      ...request
    }: {
      projectNameId: string;
      environmentNameId: string;
      buildId: string;
    } & Rivet.servers.PatchBuildTagsRequest) =>
      rivetClient.actor.builds.patchTags(buildId, {
        project: projectNameId,
        environment: environmentNameId,
        body: request,
      }),
    onSuccess: async (_, { projectNameId, environmentNameId, buildId }) => {
      await Promise.allSettled([
        queryClient.invalidateQueries(
          projectActorsQueryOptions({ projectNameId, environmentNameId }),
        ),
        queryClient.invalidateQueries(
          actorBuildQueryOptions({ buildId, projectNameId, environmentNameId }),
        ),
      ]);
      onSuccess?.();
    },
  });
}
