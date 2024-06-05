import * as Layout from "@/domains/game/layouts/game-settings-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function GameIdSettingsView() {
  const { gameId } = Route.useParams();
  return (
    <Layout.Root gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/settings",
)({
  component: GameIdSettingsView,
});
