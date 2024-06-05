import { gameNamespaceLobbiesLiveQueryOptions } from "@/domains/game/queries";
import { NamespaceMatchmakerLobbies } from "@/domains/game/views/namespace-matchmaker-lobbies";
import { queryClient } from "@/queries/global";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function MatchmakerLobbiesView() {
  const { gameId, namespaceId } = Route.useParams();
  const search = Route.useSearch();

  return (
    <NamespaceMatchmakerLobbies
      gameId={gameId}
      lobbyId={search?.lobbyId}
      namespaceId={namespaceId}
    />
  );
}

const searchSchema = z.object({
  lobbyId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
)({
  validateSearch: (search) => searchSchema.parse(search),
  staticData: {
    layout: "full",
  },
  beforeLoad: async ({ params: { gameId, namespaceId } }) => {
    await queryClient.ensureQueryData(
      gameNamespaceLobbiesLiveQueryOptions({ gameId, namespaceId }),
    );
  },
  component: MatchmakerLobbiesView,
});
