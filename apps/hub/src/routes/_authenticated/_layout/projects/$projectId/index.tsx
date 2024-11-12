import * as Layout from "@/domains/project/layouts/project-layout";
import { ProjectEnvironmentsView } from "@/domains/project/views/project-environments";
import { createFileRoute } from "@tanstack/react-router";

function ProjectIdRoute() {
  const { projectId } = Route.useParams();
  return <ProjectEnvironmentsView projectId={projectId} />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/",
)({
  component: ProjectIdRoute,
  pendingComponent: Layout.Root.Skeleton,
});
