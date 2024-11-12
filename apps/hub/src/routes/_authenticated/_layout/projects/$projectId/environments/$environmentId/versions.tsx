import * as Layout from "@/domains/project/layouts/project-layout";
import { EnvironmentVersions } from "@/domains/project/views/environment-versions";
import { createFileRoute } from "@tanstack/react-router";

function EnvironmentVersionsRoute() {
  const { projectId, environmentId } = Route.useParams();
  return (
    <EnvironmentVersions projectId={projectId} environmentId={environmentId} />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/versions",
)({
  component: EnvironmentVersionsRoute,
  pendingComponent: Layout.Root.Skeleton,
});
