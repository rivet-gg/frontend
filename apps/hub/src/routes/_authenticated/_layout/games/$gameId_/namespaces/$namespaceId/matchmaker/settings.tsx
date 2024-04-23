import { MatchMakerLobbyConfigSettingsCard } from "@/domains/game/components/matchmaker-lobby-config-settings-card";
import { Grid } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerSettingsView() {
  const { namespaceId, gameId } = Route.useParams();
  return (
    <Grid columns="2" gap="4">
      <MatchMakerLobbyConfigSettingsCard
        gameId={gameId}
        namespaceId={namespaceId}
      />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/settings",
)({
  component: MatchmakerSettingsView,
});
