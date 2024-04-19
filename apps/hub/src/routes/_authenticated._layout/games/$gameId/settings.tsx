import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@rivet-gg/components";

function GameSettingsRoute() {
  return <Text>Settings</Text>;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/settings",
)({
  component: GameSettingsRoute,
});
