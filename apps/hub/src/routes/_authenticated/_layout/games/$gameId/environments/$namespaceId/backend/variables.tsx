import * as Layout from "@/domains/game/layouts/backend-layout";
import { GameBackendEnvironmentVariables } from "@/domains/game/views/game-backend-environment-variables";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdVariablesRoute() {
  const { namespaceId, gameId } = Route.useParams();

  return (
    <GameBackendEnvironmentVariables
      gameId={gameId}
      environmentId={namespaceId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/backend/variables",
)({
  component: GameBackendEnvironmentIdVariablesRoute,
  pendingComponent: Layout.Content.Skeleton,
});
