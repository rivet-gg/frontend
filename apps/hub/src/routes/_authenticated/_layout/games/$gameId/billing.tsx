import { createFileRoute } from "@tanstack/react-router";

import { GameBillingView } from "@/domains/game/views/game-billing-view";

function GameBillingRoute() {
  const { gameId } = Route.useParams();

  return <GameBillingView gameId={gameId} />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/billing",
)({
  component: GameBillingRoute,
});
