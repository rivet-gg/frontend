import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLobbiesView() {
  return "lobbies";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
)({
  component: MatchmakerLobbiesView,
});
