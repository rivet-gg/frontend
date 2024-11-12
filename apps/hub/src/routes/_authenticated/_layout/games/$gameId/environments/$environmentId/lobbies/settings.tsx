import { MatchMakerLobbyConfigSettingsCard } from "@/domains/game/components/matchmaker-lobby-config-settings-card";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import { Grid } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerSettingsView() {
  const { environmentId, gameId } = Route.useParams();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <MatchMakerLobbyConfigSettingsCard
        gameId={gameId}
        environmentId={environmentId}
      />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/lobbies/settings",
)({
  staticData: {
    layout: "full",
  },
  component: MatchmakerSettingsView,
  pendingComponent: Layout.Content.Skeleton,
});
