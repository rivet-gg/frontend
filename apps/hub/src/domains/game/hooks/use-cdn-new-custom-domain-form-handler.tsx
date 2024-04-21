import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
  useNamespaceAddDomainMutation,
} from "../queries";
import { useCallback } from "react";
import { SubmitHandler } from "@/domains/game/forms/cdn-new-custom-domain-form";
import { RivetError } from "@rivet-gg/api";
import { queryClient } from "@/queries/global";
import { isRivetError } from "@/lib/utils";

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
