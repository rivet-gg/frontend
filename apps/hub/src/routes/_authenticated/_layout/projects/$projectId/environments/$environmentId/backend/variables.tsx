import * as Layout from "@/domains/project/layouts/backend-layout";
import { ProjectBackendEnvironmentVariables } from "@/domains/project/views/environment-variables";
import { createFileRoute } from "@tanstack/react-router";

function ProjectBackendEnvironmentIdVariablesRoute() {
  const { environmentId, projectId } = Route.useParams();

  return (
    <ProjectBackendEnvironmentVariables
      projectId={projectId}
      environmentId={environmentId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/backend/variables",
)({
  component: ProjectBackendEnvironmentIdVariablesRoute,
  pendingComponent: Layout.Content.Skeleton,
});
