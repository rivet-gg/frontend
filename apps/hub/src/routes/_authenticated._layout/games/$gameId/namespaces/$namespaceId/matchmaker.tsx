import { Outlet, createFileRoute } from "@tanstack/react-router";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";

function MatchmakerLayoutView() {
  const { namespaceId, gameId } = Route.useParams();

  return (
    <Layout.Root namespaceId={namespaceId} gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker",
)({
  component: MatchmakerLayoutView,
});
