import * as Layout from "@/domains/game/layouts/backend-layout";
import { GameBackendEnvironmentOverview } from "@/domains/game/views/environment-overview";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdOverviewRoute() {
  const { environmentId, gameId } = Route.useParams();

  return (
    <GameBackendEnvironmentOverview
      environmentId={environmentId}
      gameId={gameId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/backend/",
)({
  component: GameBackendEnvironmentIdOverviewRoute,
  pendingComponent: Layout.Content.Skeleton,
});
