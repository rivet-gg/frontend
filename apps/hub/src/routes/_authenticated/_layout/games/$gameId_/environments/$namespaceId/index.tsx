import { GameBackendEnvironmentDatabaseLink } from "@/domains/game/components/game-backend/game-backend-environment-database-link";
import {
  gameBackendQueryOptions,
  gameBuildsQueryOptions,
  gameMetadataQueryOptions,
  gameNamespaceQueryOptions,
  gameVersionQueryOptions,
} from "@/domains/game/queries";
import {
  Button,
  Grid,
  Link as RivetLink,
  ValueCard,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const FeaturedModules = lazy(
  () => import("@/components/featured-modules-grid"),
);

function NamespaceIdRoute() {
  const params = Route.useParams();
  const { gameId } = params;
  const {
    data: { legacyLobbiesEnabled },
  } = useSuspenseQuery(gameMetadataQueryOptions({ gameId }));

  return (
    <>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
        <CurrentBuildCard />
        <BackendEndpointCard />
        {legacyLobbiesEnabled ? <CurrentVersionCard /> : null}
      </Grid>
      <FeaturedModules
        footer={
          <RivetLink asChild>
            <Link
              to="/games/$gameId/environments/$namespaceId/modules"
              params={params}
            >
              View all modules
            </Link>
          </RivetLink>
        }
      />
    </>
  );
}

function BackendEndpointCard() {
  const { gameId, namespaceId: environmentId } = Route.useParams();
  const { data } = useSuspenseQuery(
    gameBackendQueryOptions({ gameId, environmentId }),
  );

  return (
    <ValueCard
      title="Backend"
      value={
        <RivetLink
          href={data.endpoint}
          target="_blank"
          rel="norefferer"
          className="text-base truncate inline-block w-full"
        >
          {data.endpoint}
        </RivetLink>
      }
      footer={
        <>
          <Button asChild variant="outline" className="mr-2">
            <Link
              to="/games/$gameId/environments/$namespaceId/backend"
              params={{
                gameId,
                namespaceId: environmentId,
              }}
            >
              Backend Logs
            </Link>
          </Button>
          <GameBackendEnvironmentDatabaseLink
            variant="outline"
            gameId={gameId}
            environmentId={environmentId}
            startIcon={undefined}
          >
            Database
          </GameBackendEnvironmentDatabaseLink>
        </>
      }
    />
  );
}

function CurrentBuildCard() {
  const { gameId, namespaceId: environmentId } = Route.useParams();
  const {
    data: [build],
  } = useSuspenseQuery(
    gameBuildsQueryOptions({
      gameId,
      environmentId,
      tags: { current: "true" },
    }),
  );

  return (
    <ValueCard
      title="Current Build"
      value={build ? build.name : "n/a"}
      footer={
        <>
          <Button asChild variant="outline" className="mr-2">
            <Link
              to="/games/$gameId/environments/$namespaceId/servers"
              params={{
                gameId,
                namespaceId: environmentId,
              }}
            >
              Server Logs
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              to="/games/$gameId/environments/$namespaceId/servers/builds"
              params={{
                gameId,
                namespaceId: environmentId,
              }}
            >
              Manage Builds
            </Link>
          </Button>
        </>
      }
    />
  );
}

function CurrentVersionCard() {
  const { gameId, namespaceId } = Route.useParams();
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));
  const { data: version } = useSuspenseQuery(
    gameVersionQueryOptions({ gameId, versionId: namespace.versionId }),
  );

  return (
    <ValueCard
      title="Current Version"
      value={version.displayName}
      footer={
        <Button asChild variant="outline">
          <Link
            to="/games/$gameId/environments/$namespaceId/versions"
            params={{
              gameId,
              namespaceId,
            }}
          >
            Manage Version
          </Link>
        </Button>
      }
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/",
)({
  component: NamespaceIdRoute,
});
