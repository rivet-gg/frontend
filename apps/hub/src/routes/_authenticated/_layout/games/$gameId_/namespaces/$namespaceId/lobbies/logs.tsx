import { gameNamespaceLogsLobbiesQueryOptions } from "@/domains/game/queries";
import { NamespaceMatchmakerLogs } from "@/domains/game/views/namespace-matchmaker-logs";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function MatchmakerLogsView() {
  const { gameId, namespaceId } = Route.useParams();
  const search = Route.useSearch();

  return (
    <NamespaceMatchmakerLogs
      gameId={gameId}
      namespaceId={namespaceId}
      lobbyId={search?.lobbyId}
    />
  );
}

const searchSchema = z.object({
  lobbyId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/lobbies/logs",
)({
  validateSearch: (search) => searchSchema.parse(search),
  staticData: {
    layout: "full",
  },
  beforeLoad: async ({ params: { gameId, namespaceId }, context }) => {
    await context.queryClient.ensureQueryData(
      gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
    );
  },
  component: MatchmakerLogsView,
});
