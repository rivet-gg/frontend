import * as Layout from "@/domains/game/layouts/game-backend-env-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function GameBackendEnvIdView() {
  const { gameId, environmentId } = Route.useParams();
  return (
    <Layout.Root gameId={gameId} environmentId={environmentId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId",
)({
  component: GameBackendEnvIdView,
});
