import { createFileRoute } from "@tanstack/react-router";
import { gameSubNav } from "@/domains/game/data/route";
import { gameQueryOptions } from "@/domains/game/queries";
import { Page } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  return <Page title={data?.game.displayName}>Tokens</Page>;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/tokens",
)({
  staticData: {
    subNav: gameSubNav,
  },
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
