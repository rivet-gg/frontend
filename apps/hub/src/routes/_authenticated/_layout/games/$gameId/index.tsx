import * as Layout from "@/domains/game/layouts/game-layout";
import { GameEnvironmentsView } from "@/domains/game/views/game-environments";
import { createFileRoute } from "@tanstack/react-router";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  return <GameEnvironmentsView gameId={gameId} />;
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId/")({
  component: GameIdRoute,
  pendingComponent: Layout.Root.Skeleton,
});
