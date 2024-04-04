import { Page } from "@rivet-gg/components";
import { gameQueryOptions } from "@/queries/games";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GameNamespaces } from "@/views/game/game-namespaces";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  return (
    <Page title={data?.game.displayName}>
      <GameNamespaces gameId={gameId} />
    </Page>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId")({
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
