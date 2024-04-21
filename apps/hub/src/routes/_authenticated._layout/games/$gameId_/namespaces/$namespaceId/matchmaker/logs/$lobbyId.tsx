import { NamespaceMatchmakerLobbyLogs } from "@/domains/game/views/namespace-matchmaker-lobby-logs";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLobbyLogsView() {
  const { gameId, namespaceId, lobbyId } = Route.useParams();

  return (
    <NamespaceMatchmakerLobbyLogs
      gameId={gameId}
      namespaceId={namespaceId}
      lobbyId={lobbyId}
    />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/logs/$lobbyId",
)({
  component: MatchmakerLobbyLogsView,
});
