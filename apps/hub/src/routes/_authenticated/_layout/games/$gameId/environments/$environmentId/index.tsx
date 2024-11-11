import { GameBackendEnvironmentDatabaseLink } from "@/domains/game/components/game-backend/game-backend-environment-database-link";
import * as Layout from "@/domains/game/layouts/game-layout";
import {
  gameBackendQueryOptions,
  gameBuildsQueryOptions,
  gameEnvironmentQueryOptions,
  gameMetadataQueryOptions,
  gameVersionQueryOptions,
} from "@/domains/game/queries";
import { GuardEnterprise } from "@/lib/guards";
import {
  Button,
  Grid,
  Link as RivetLink,
  ValueCard,
} from "@rivet-gg/components";
import { Icon, faArrowRight } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { lazy } from "react";

const FeaturedModules = lazy(
  () => import("@/components/featured-modules-grid"),
);

function environmentIdRoute() {
  const params = Route.useParams();
  const { gameId } = params;
  const {
    data: { legacyLobbiesEnabled },
  } = useSuspenseQuery(gameMetadataQueryOptions({ gameId }));

  return (
    <>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
        <CurrentBuildCard />
        <GuardEnterprise>
          <BackendEndpointCard />
        </GuardEnterprise>
        {legacyLobbiesEnabled ? <CurrentVersionCard /> : null}
      </Grid>
      <GuardEnterprise>
        <FeaturedModules
          footer={
            <RivetLink asChild>
              <Link
                to="/games/$gameId/environments/$environmentId/modules"
                params={params}
              >
                View All Modules
                <Icon className="ml-2" icon={faArrowRight} />
              </Link>
            </RivetLink>
          }
        />
      </GuardEnterprise>
    </>
  );
}

function BackendEndpointCard() {
  const { gameId, environmentId } = Route.useParams();
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
              to="/games/$gameId/environments/$environmentId/backend"
              params={{
                gameId,
                environmentId: environmentId,
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
  const { gameId, environmentId } = Route.useParams();
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
              to="/games/$gameId/environments/$environmentId/servers"
              params={{
                gameId,
                environmentId: environmentId,
              }}
            >
              Server Logs
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              to="/games/$gameId/environments/$environmentId/servers/builds"
              params={{
                gameId,
                environmentId: environmentId,
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
  const { gameId, environmentId } = Route.useParams();
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(gameEnvironmentQueryOptions({ gameId, environmentId }));
  const { data: version } = useSuspenseQuery(
    gameVersionQueryOptions({ gameId, versionId: environment.versionId }),
  );

  return (
    <ValueCard
      title="Current Version"
      value={version.displayName}
      footer={
        <Button asChild variant="outline">
          <Link
            to="/games/$gameId/environments/$environmentId/versions"
            params={{
              gameId,
              environmentId,
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
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/environments/$environmentId/servers",
      params,
    });
  },
  component: environmentIdRoute,
  pendingComponent: Layout.Root.Skeleton,
});
