import { isRivetError } from "@/lib/utils";
import { rivetEeClient } from "@/queries/global";
import type { QueryClient } from "@tanstack/react-query";
import { gameBackendQueryOptions } from "../queries";

export async function tryCreateBackend({
  gameId,
  environmentId,
  queryClient,
}: {
  gameId: string;
  environmentId: string;
  queryClient: QueryClient;
}) {
  try {
    await queryClient.fetchQuery(
      gameBackendQueryOptions({ gameId, environmentId }),
    );
  } catch (error) {
    if (isRivetError(error)) {
      if (error.body.code === "BACKEND_NOT_FOUND") {
        await rivetEeClient.ee.backend.create(gameId, environmentId, {});
        await queryClient.invalidateQueries({
          ...gameBackendQueryOptions({ gameId, environmentId }),
          refetchType: "all",
        });
        return;
      }
    }
  }
  return;
}
