import { GameNamespacesView } from "@/domains/game/views/game-namespaces";
import { createFileRoute } from "@tanstack/react-router";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  return <GameNamespacesView gameId={gameId} />;
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId/")({
  component: GameIdRoute,
});
