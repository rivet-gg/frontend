import * as Layout from "@/domains/project/layouts/backend-layout";
import { ProjectBackendEnvironmentOverview } from "@/domains/project/views/environment-overview";
import { createFileRoute } from "@tanstack/react-router";

function ProjectBackendEnvironmentIdOverviewRoute() {
  const { environmentId, projectId } = Route.useParams();

  return (
    <ProjectBackendEnvironmentOverview
      environmentId={environmentId}
      projectId={projectId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/backend/",
)({
  component: ProjectBackendEnvironmentIdOverviewRoute,
  pendingComponent: Layout.Content.Skeleton,
});
