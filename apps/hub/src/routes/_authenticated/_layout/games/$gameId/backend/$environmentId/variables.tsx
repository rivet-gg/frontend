import {
  gameBackendProjectEnvQueryOptions,
  gameBackendProjectEnvVariablesQueryOptions,
} from "@/domains/game/queries";
import { GameBackendEnvironmentVariables } from "@/domains/game/views/game-backend-environment-variables";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdVariablesRoute() {
  const { projectId } = Route.useRouteContext();
  const { environmentId } = Route.useParams();

  return (
    <GameBackendEnvironmentVariables
      projectId={projectId}
      environmentId={environmentId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId/variables",
)({
  beforeLoad: async ({
    context: { queryClient, projectId },
    params: { environmentId },
  }) => {
    await queryClient.ensureQueryData(
      gameBackendProjectEnvVariablesQueryOptions({ projectId, environmentId }),
    );
  },
  component: GameBackendEnvironmentIdVariablesRoute,
});
