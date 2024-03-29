import { gameQueryOptions } from "@/queries/games";
import { GameView } from "@/views/game-view";
import { createFileRoute } from "@tanstack/react-router";

function GameIdRoute() {
  return <GameView gameId={Route.useParams().gameId} />;
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId")({
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
