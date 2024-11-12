import { MatchMakerLobbyConfigSettingsCard } from "@/domains/project/components/matchmaker-lobby-config-settings-card";
import * as Layout from "@/domains/project/layouts/matchmaker-layout";
import { Grid } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerSettingsView() {
  const { environmentId, projectId } = Route.useParams();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <MatchMakerLobbyConfigSettingsCard
        projectId={projectId}
        environmentId={environmentId}
      />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/lobbies/settings",
)({
  staticData: {
    layout: "full",
  },
  component: MatchmakerSettingsView,
  pendingComponent: Layout.Content.Skeleton,
});
