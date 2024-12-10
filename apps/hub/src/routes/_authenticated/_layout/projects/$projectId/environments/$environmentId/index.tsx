import { BackendEnvironmentDatabaseLink } from "@/domains/project/components/backend/backend-environment-database-link";
import * as Layout from "@/domains/project/layouts/project-layout";
import {
  actorBuildsQueryOptions,
  projectBackendQueryOptions,
  projectEnvironmentQueryOptions,
  projectMetadataQueryOptions,
  projectVersionQueryOptions,
} from "@/domains/project/queries";
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
  const { projectId, environmentId } = params;
  const {
    data: { legacyLobbiesEnabled, backendModulesEnabled },
  } = useSuspenseQuery(
    projectMetadataQueryOptions({ projectId, environmentId }),
  );

  return (
    <>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
        <CurrentBuildCard />
        {backendModulesEnabled ? (
          <GuardEnterprise>
            <BackendEndpointCard />
          </GuardEnterprise>
        ) : null}
        {legacyLobbiesEnabled ? <CurrentVersionCard /> : null}
      </Grid>
      <GuardEnterprise>
        <FeaturedModules
          footer={
            <RivetLink asChild>
              <Link
                to="/projects/$projectId/environments/$environmentId/modules"
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
  const { projectId, environmentId } = Route.useParams();
  const { data } = useSuspenseQuery(
    projectBackendQueryOptions({ projectId, environmentId }),
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
              to="/projects/$projectId/environments/$environmentId/backend"
              params={{
                projectId,
                environmentId: environmentId,
              }}
            >
              Backend Logs
            </Link>
          </Button>
          <BackendEnvironmentDatabaseLink
            variant="outline"
            projectId={projectId}
            environmentId={environmentId}
            startIcon={undefined}
          >
            Database
          </BackendEnvironmentDatabaseLink>
        </>
      }
    />
  );
}

function CurrentBuildCard() {
  const { projectId, environmentId } = Route.useParams();
  const {
    data: [build],
  } = useSuspenseQuery(
    actorBuildsQueryOptions({
      projectId,
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
              to="/projects/$projectId/environments/$environmentId/servers"
              params={{
                projectId,
                environmentId: environmentId,
              }}
            >
              Server Logs
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              to="/projects/$projectId/environments/$environmentId/builds"
              params={{
                projectId,
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
  const { projectId, environmentId } = Route.useParams();
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(
    projectEnvironmentQueryOptions({ projectId, environmentId }),
  );
  const { data: version } = useSuspenseQuery(
    projectVersionQueryOptions({ projectId, versionId: environment.versionId }),
  );

  return (
    <ValueCard
      title="Current Version"
      value={version.displayName}
      footer={
        <Button asChild variant="outline">
          <Link
            to="/projects/$projectId/environments/$environmentId/versions"
            params={{
              projectId,
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
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/projects/$projectId/environments/$environmentId/servers",
      params,
    });
  },
  component: environmentIdRoute,
  pendingComponent: Layout.Root.Skeleton,
});
