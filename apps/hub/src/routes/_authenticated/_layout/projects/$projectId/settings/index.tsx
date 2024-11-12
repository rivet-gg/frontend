import { ProjectLogoSettingsCard } from "@/domains/project/components/project-logo-settings-card";
import { Flex } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function ProjectIdSettingsView() {
  const { projectId } = Route.useParams();
  return (
    <Flex gap="4" direction="col">
      {/* <ProjectDynamicServersFeatureCard /> */}
      <ProjectLogoSettingsCard projectId={projectId} />
    </Flex>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/settings/",
)({
  component: ProjectIdSettingsView,
});
