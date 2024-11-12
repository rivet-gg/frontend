import * as Layout from "@/domains/project/layouts/project-settings-layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function ProjectIdSettingsView() {
  const { projectId } = Route.useParams();
  return (
    <Layout.Root projectId={projectId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/settings",
)({
  component: ProjectIdSettingsView,
});
