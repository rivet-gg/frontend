import { createFileRoute } from "@tanstack/react-router";

function MatchmakerOverviewView() {
  return "overview";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/_layout/",
)({
  component: MatchmakerOverviewView,
});
