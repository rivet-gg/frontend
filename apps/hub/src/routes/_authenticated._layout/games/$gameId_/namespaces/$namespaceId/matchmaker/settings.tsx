import { createFileRoute } from "@tanstack/react-router";

function MatchmakerSettingsView() {
  return "settings";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/settings",
)({
  component: MatchmakerSettingsView,
});
