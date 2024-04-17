import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { queryClient } from "@/queries/global";
import {
  Badge,
  Button,
  Flex,
  Grid,
  Page,
  ValueCard,
} from "@rivet-gg/components";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

function NamespaceIdRoute() {
  const { namespace, game, version } = Route.useLoaderData();
  return (
    <Page
      title={
        <Flex items="center">
          <span>{namespace.displayName}</span>
          <Badge ml="4">{version.displayName}</Badge>
        </Flex>
      }
    >
      <Grid columns="3" gap="4">
        <ValueCard
          title="Current version"
          description={version.displayName}
          footer={
            <Button asChild variant="outline">
              <Link
                to="/games/$gameId/namespaces/$namespaceId/versions/$versionId"
                params={{
                  gameId: game.gameId,
                  namespaceId: namespace.namespaceId,
                  versionId: version.versionId,
                }}
              >
                Manage version
              </Link>
            </Button>
          }
        />
      </Grid>
    </Page>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/",
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
  component: NamespaceIdRoute,
});
