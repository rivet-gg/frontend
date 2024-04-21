import { NamespaceMatchmakerLogs } from "@/domains/game/views/namespace-matchmaker-logs";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLogsView() {
  const { gameId, namespaceId } = Route.useParams();

  return <NamespaceMatchmakerLogs gameId={gameId} namespaceId={namespaceId} />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/logs/",
)({
  component: MatchmakerLogsView,
});
