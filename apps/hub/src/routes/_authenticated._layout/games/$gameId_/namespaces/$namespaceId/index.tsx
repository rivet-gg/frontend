import {
  gameNamespaceQueryOptions,
  gameVersionQueryOptions,
} from "@/domains/game/queries";
import { Button, Grid, ValueCard } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

function NamespaceIdRoute() {
  const { gameId, namespaceId } = Route.useParams();

  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));
  const { data: version } = useSuspenseQuery(
    gameVersionQueryOptions({ gameId, versionId: namespace.versionId }),
  );

  return (
    <Grid columns="3" gap="4">
      <ValueCard
        title="Current version"
        value={version.displayName}
        footer={
          <Button asChild variant="outline">
            <Link
              to="/games/$gameId/namespaces/$namespaceId/versions"
              params={{
                gameId,
                namespaceId,
              }}
            >
              Manage version
            </Link>
          </Button>
        }
      />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/",
)({
  component: NamespaceIdRoute,
});
