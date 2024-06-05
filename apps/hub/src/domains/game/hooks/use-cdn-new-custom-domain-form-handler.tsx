import type { SubmitHandler } from "@/domains/game/forms/cdn-new-custom-domain-form";
import { isRivetError } from "@/lib/utils";
import { queryClient } from "@/queries/global";
import { useCallback } from "react";
import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
  useNamespaceAddDomainMutation,
} from "../queries";

interface UseCdnManageAuthUsersProps {
  gameId: string;
  namespaceId: string;
  onSuccess?: () => void;
}

export function useCdnNewCustomDomainFormHandler({
  onSuccess,
  gameId,
  namespaceId,
}: UseCdnManageAuthUsersProps) {
  const { mutateAsync } = useNamespaceAddDomainMutation();

  return useCallback<SubmitHandler>(
    async (values, form) => {
      try {
        await mutateAsync({
          gameId,
          namespaceId,
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
        gameNamespaceQueryOptions({ gameId, namespaceId }),
      );
      onSuccess?.();
    },
    [gameId, mutateAsync, namespaceId, onSuccess],
  );
}
