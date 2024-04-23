import { NamespaceMatchmakerLobbies } from "@/domains/game/views/namespace-matchmaker-lobbies";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLobbiesView() {
  const { gameId, namespaceId } = Route.useParams();

  return (
    <NamespaceMatchmakerLobbies gameId={gameId} namespaceId={namespaceId} />
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
)({
  component: MatchmakerLobbiesView,
});
