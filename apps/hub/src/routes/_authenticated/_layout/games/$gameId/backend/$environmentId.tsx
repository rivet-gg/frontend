import * as Layout from "@/domains/game/layouts/game-backend-env-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function GameBackendEnvIdView() {
  const { gameId, environmentId } = Route.useParams();
  const { projectId } = Route.useRouteContext();
  return (
    <Layout.Root
      gameId={gameId}
      environmentId={environmentId}
      projectId={projectId}
    >
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId",
)({
  component: GameBackendEnvIdView,
});
