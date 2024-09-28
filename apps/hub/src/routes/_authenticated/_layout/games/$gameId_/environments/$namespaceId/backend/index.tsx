import * as Layout from "@/domains/game/layouts/backend-layout";
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
  pendingComponent: Layout.Content.Skeleton,
});
