import * as Layout from "@/domains/game/layouts/backend-layout";
import { GameBackendEnvironmentVariables } from "@/domains/game/views/environment-variables";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdVariablesRoute() {
  const { environmentId, gameId } = Route.useParams();

  return (
    <GameBackendEnvironmentVariables
      gameId={gameId}
      environmentId={environmentId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/backend/variables",
)({
  component: GameBackendEnvironmentIdVariablesRoute,
  pendingComponent: Layout.Content.Skeleton,
});
