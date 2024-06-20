import { queryClient, rivetEeClient } from "@/queries/global";
import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { useMutation } from "@tanstack/react-query";
import {
  gameBackendProjectEnvQueryOptions,
  gameBackendProjectEnvsQueryOptions,
} from "./query-options";

export const useCreateBackendProjectEnvMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: RivetEe.ee.cloud.backend.projects.envs.CreateResponse,
  ) => void;
}) =>
  useMutation({
    mutationFn: ({
      projectId,
      ...data
    }: RivetEe.ee.cloud.backend.projects.envs.CreateRequest & {
      projectId: string;
    }) => rivetEeClient.ee.cloud.backend.projects.envs.create(projectId, data),
    onSuccess: async (data, { projectId }) => {
      await queryClient.invalidateQueries(
        gameBackendProjectEnvsQueryOptions(projectId),
      );
      onSuccess?.(data);
    },
  });

export const useBackendAutoScalingConfigMutation = () =>
  useMutation({
    mutationFn: ({
      projectId,
      environmentId,
      ...data
    }: RivetEe.ee.cloud.backend.projects.envs.UpdateConfigRequest & {
      projectId: string;
      environmentId: string;
    }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.updateConfig(
        projectId,
        environmentId,
        data,
      ),
    onSuccess: async (data, { projectId, environmentId }) => {
      await queryClient.invalidateQueries(
        gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
      );
    },
  });

export const useBackendUpdateVariablesMutation = () =>
  useMutation({
    mutationFn: ({
      projectId,
      environmentId,
      ...data
    }: RivetEe.ee.cloud.backend.projects.envs.UpdateVariablesRequest & {
      projectId: string;
      environmentId: string;
    }) =>
      rivetEeClient.ee.cloud.backend.projects.envs.updateVariables(
        projectId,
        environmentId,
        data,
      ),
    onSuccess: async (data, { projectId, environmentId }) => {
      await queryClient.invalidateQueries(
        gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
      );
      // TODO: invalidate variables query
    },
  });
