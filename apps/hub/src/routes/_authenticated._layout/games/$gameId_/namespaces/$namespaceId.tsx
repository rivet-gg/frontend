import * as Layout from "@/domains/game/layouts/namespace-layout";
import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { queryClient } from "@/queries/global";
import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

function NamespaceIdRoute() {
  return (
    <Layout.Root>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId",
)({
  beforeLoad: async ({ params: { gameId, namespaceId } }) => {
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
  },
  component: NamespaceIdRoute,
});