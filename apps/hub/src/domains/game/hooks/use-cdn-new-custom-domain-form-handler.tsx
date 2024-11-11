import type { SubmitHandler } from "@/domains/game/forms/cdn-new-custom-domain-form";
import { isRivetError } from "@/lib/utils";
import { queryClient } from "@/queries/global";
import { useCallback } from "react";
import {
  gameEnvironmentQueryOptions,
  gameQueryOptions,
  useEnvironmentAddDomainMutation,
} from "../queries";

interface UseCdnManageAuthUsersProps {
  gameId: string;
  environmentId: string;
  onSuccess?: () => void;
}

export function useCdnNewCustomDomainFormHandler({
  onSuccess,
  gameId,
  environmentId,
}: UseCdnManageAuthUsersProps) {
  const { mutateAsync } = useEnvironmentAddDomainMutation();

  return useCallback<SubmitHandler>(
    async (values, form) => {
      try {
        await mutateAsync({
          gameId,
          environmentId,
          domain: values.name,
        });
      } catch (error) {
        if (isRivetError(error)) {
          return form.setError("name", {
            type: "manual",
            message: error.body.message,
          });
        }
        return form.setError("name", {
          type: "manual",
          message: "Invalid domain name.",
        });
      }
      await queryClient.invalidateQueries(gameQueryOptions(gameId));
      await queryClient.invalidateQueries(
        gameEnvironmentQueryOptions({ gameId, environmentId }),
      );
      onSuccess?.();
    },
    [gameId, mutateAsync, environmentId, onSuccess],
  );
}
