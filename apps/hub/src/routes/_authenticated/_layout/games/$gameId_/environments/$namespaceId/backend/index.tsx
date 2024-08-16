import { gameBackendQueryOptions } from "@/domains/game/queries";
import { GameBackendEnvironmentOverview } from "@/domains/game/views/game-backend-environment-overview";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdOverviewRoute() {
  const { namespaceId, gameId } = Route.useParams();

  return (
    <GameBackendEnvironmentOverview
      environmentId={namespaceId}
      gameId={gameId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/backend/",
)({
  component: GameBackendEnvironmentIdOverviewRoute,
  beforeLoad: async ({
    context: { queryClient },
    params: { namespaceId, gameId },
  }) => {
    await queryClient.fetchQuery(
      gameBackendQueryOptions({ gameId, environmentId: namespaceId }),
    );
  },
});
