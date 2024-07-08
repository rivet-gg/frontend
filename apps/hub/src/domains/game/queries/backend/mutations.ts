import { useAuth } from "@/domains/auth/contexts/auth";
import { queryClient, rivetEeClient } from "@/queries/global";
import { OuterbaseError } from "@/queries/types";
import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { getConfig, toast } from "@rivet-gg/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostHog } from "posthog-js/react";
import { extractPostgressCredentials } from "../../helpers/extract-postgress-credentials";
import {
  gameBackendProjectEnvDatabasePreviewQueryOptions,
  gameBackendProjectEnvDatabaseQueryOptions,
  gameBackendProjectEnvQueryOptions,
  gameBackendProjectEnvsQueryOptions,
} from "./query-options";
import { OuterbaseStarlinkResponse } from "./types";

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

export const useGameBackendEnvDatabasePreviewMutation = (
  opts: { onSuccess?: (url: string) => void } = {},
) => {
  const postHog = usePostHog();
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  return useMutation({
    mutationKey: ["backend-project", "env", "database-preview"],
    mutationFn: async ({
      projectId,
      environmentId,
    }: {
      projectId: string;
      environmentId: string;
    }) => {
      const response = await queryClient.fetchQuery(
        gameBackendProjectEnvDatabaseQueryOptions({ projectId, environmentId }),
      );

      if (!response.url) {
        throw new Error("Database URL not found");
      }

      const credentials = extractPostgressCredentials(response.url);

      const token = getConfig().outerbaseProviderToken;

      const starlinkResponse = await fetch(
        "https://app.outerbase.com/api/v1/starlink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "x-provider-token": token } : {}),
          },
          body: JSON.stringify({
            credentials: {
              ...credentials,
              ssl_config: {
                require: true,
              },
            },
            providerUniqueId: profile?.identity.identityId,
          }),
        },
      );

      if (!starlinkResponse.ok) {
        throw await starlinkResponse.json();
      }

      const parsedResponse = OuterbaseStarlinkResponse.parse(
        await starlinkResponse.json(),
      );
      return parsedResponse.response.url;
    },
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData(
        gameBackendProjectEnvDatabasePreviewQueryOptions(variables).queryKey,
        data,
      );
      opts.onSuccess?.(data);
    },
    onError: (error, variables) => {
      const result = OuterbaseError.safeParse(error);
      if (
        result.success &&
        result.data.error.description === "RATE_LIMIT_EXCEEDED"
      ) {
        postHog.capture("outerbase_rate_limit_exceeded", variables);
        return toast.error("Rate limit exceeded. Please try again later.");
      }
    },
  });
};
