import { useQuery } from "@tanstack/react-query";
import { useGameBackendEnvDatabasePreviewMutation } from "./mutations";
import { gameBackendProjectEnvDatabasePreviewQueryOptions } from "./query-options";

export function useGameBackendProjectEnvDatabasePreview(variables: {
  projectId: string;
  environmentId: string;
}) {
  const { isPending, mutateAsync } = useGameBackendEnvDatabasePreviewMutation();
  const { data: cachedData } = useQuery(
    gameBackendProjectEnvDatabasePreviewQueryOptions(variables),
  );

  return {
    isLoading: isPending,
    data: cachedData,
    mutateAsync,
  };
}
