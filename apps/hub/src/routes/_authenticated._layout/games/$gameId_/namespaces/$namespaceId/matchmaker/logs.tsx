import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLogsView() {
  return "logs";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/logs",
)({
  component: MatchmakerLogsView,
});
