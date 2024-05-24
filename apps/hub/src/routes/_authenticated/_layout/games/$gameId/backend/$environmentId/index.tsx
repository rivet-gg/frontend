import { gameBackendProjectEnvQueryOptions } from "@/domains/game/queries";
import { GameBackendEnvironmentOverview } from "@/domains/game/views/game-backend-environment-overview";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdOverviewRoute() {
  const { environmentId } = Route.useParams();
  const { projectId } = Route.useRouteContext();

  return (
    <GameBackendEnvironmentOverview
      projectId={projectId}
      environmentId={environmentId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId/",
)({
  component: GameBackendEnvironmentIdOverviewRoute,
  beforeLoad: async ({
    context: { queryClient, projectId },
    params: { environmentId },
  }) => {
    await queryClient.ensureQueryData(
      gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
    );
  },
});
