import * as Layout from "@/domains/game/layouts/game-layout";
import { gameQueryOptions } from "@/domains/game/queries";

import { Outlet, createFileRoute } from "@tanstack/react-router";

function GameIdRoute() {
  const { gameId } = Route.useParams();
  return (
    <Layout.Root gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId")({
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
