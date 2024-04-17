import { createFileRoute } from "@tanstack/react-router";

function MatchmakerSettingsView() {
  return "settings";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/_layout/settings",
)({
  component: MatchmakerSettingsView,
});
