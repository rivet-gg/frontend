import * as Layout from "@/domains/game/layouts/game-layout";
import { EnvironmentVersions } from "@/domains/game/views/environment-versions";
import { createFileRoute } from "@tanstack/react-router";

function EnvironmentVersionsRoute() {
  const { gameId, environmentId } = Route.useParams();
  return <EnvironmentVersions gameId={gameId} environmentId={environmentId} />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/versions",
)({
  component: EnvironmentVersionsRoute,
  pendingComponent: Layout.Root.Skeleton,
});
