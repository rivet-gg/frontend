import { gameNamespaceLobbiesLiveQueryOptions } from "@/domains/game/queries";
import { NamespaceMatchmakerLobbies } from "@/domains/game/views/namespace-matchmaker-lobbies";
import { queryClient } from "@/queries/global";
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
  beforeLoad: async ({ params: { gameId, namespaceId } }) => {
    await queryClient.ensureQueryData(
      gameNamespaceLobbiesLiveQueryOptions({ gameId, namespaceId }),
    );
  },
  component: MatchmakerLobbiesView,
});
