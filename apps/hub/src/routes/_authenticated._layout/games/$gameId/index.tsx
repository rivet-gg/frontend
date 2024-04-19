import { createFileRoute } from "@tanstack/react-router";
import { GameNamespacesView } from "@/domains/game/views/game-namespaces";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  return <GameNamespacesView gameId={gameId} />;
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId/")({
  component: GameIdRoute,
});
