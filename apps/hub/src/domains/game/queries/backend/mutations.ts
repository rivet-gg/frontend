import { queryClient, rivetEeClient } from "@/queries/global";
import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { useMutation } from "@tanstack/react-query";
import { gameBackendProjectEnvsQueryOptions } from "./query-options";

export const useCreateBackendProjectEnvMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: RivetEe.ee.cloud.opengb.projects.envs.CreateResponse,
  ) => void;
}) =>
  useMutation({
    mutationFn: ({
      projectId,
      ...data
    }: RivetEe.ee.cloud.opengb.projects.envs.CreateRequest & {
      projectId: string;
    }) => rivetEeClient.ee.cloud.opengb.projects.envs.create(projectId, data),
    onSuccess: async (data, { projectId }) => {
      await queryClient.invalidateQueries(
        gameBackendProjectEnvsQueryOptions(projectId),
      );
      onSuccess?.(data);
    },
  });
