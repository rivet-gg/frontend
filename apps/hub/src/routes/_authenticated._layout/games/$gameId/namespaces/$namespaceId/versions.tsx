import { NamespaceVersionTitle } from "@/domains/game/components/namespace-version-title";
import {
  gameQueryOptions,
  gameNamespaceQueryOptions,
} from "@/domains/game/queries";
import { NamespaceVersions } from "@/domains/game/views/namespace-versions";
import { queryClient } from "@/queries/global";
import { Page } from "@rivet-gg/components";
import { createFileRoute, notFound } from "@tanstack/react-router";

function NamespaceVersionsRoute() {
  const { namespace, version, game } = Route.useLoaderData();
  return (
    <Page
      title={
        <NamespaceVersionTitle
          namespace={namespace.displayName}
          version={version.displayName}
        />
      }
    >
      <NamespaceVersions
        gameId={game.gameId}
        namespaceId={namespace.namespaceId}
      />
    </Page>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/versions",
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
  component: NamespaceVersionsRoute,
});
