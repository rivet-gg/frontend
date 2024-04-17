import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import {
  gameQueryOptions,
  gameNamespaceQueryOptions,
} from "@/domains/game/queries";
import { queryClient } from "@/queries/global";

function MatchmakerLayoutView() {
  const { namespace, game } = Route.useLoaderData();

  return (
    <Layout.Root namespaceId={namespace.namespaceId} gameId={game.gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/_layout",
)({
  loader: async ({ params: { gameId, namespaceId } }) => {
    const { game } = await queryClient.ensureQueryData(
      gameQueryOptions(gameId),
    );
    const { namespace } = await queryClient.ensureQueryData(
      gameNamespaceQueryOptions({ gameId, namespaceId }),
    );

    const version = game.versions.find(
      (version) => version.versionId === namespace.versionId,
    );

    if (!namespace || !game || !version) {
      throw notFound();
    }

    return { namespace, version, game };
  },
  component: MatchmakerLayoutView,
});
