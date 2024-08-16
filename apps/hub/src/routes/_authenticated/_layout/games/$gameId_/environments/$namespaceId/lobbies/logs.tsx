import { GameMatchmakerListLobbyPreview } from "@/domains/game/components/game-matchmaker/game-matchmaker-list-lobby-preview";
import { gameNamespaceLogsLobbiesQueryOptions } from "@/domains/game/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function MatchmakerLogsView() {
  const { gameId, namespaceId } = Route.useParams();
  const search = Route.useSearch();

  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Card className="h-full max-h-full flex flex-col p-0">
      <CardHeader className="border-b">
        <CardTitle>Logs</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        <GameMatchmakerListLobbyPreview
          lobbies={lobbies}
          gameId={gameId}
          namespaceId={namespaceId}
          lobbyId={search.lobbyId}
        />
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  lobbyId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/lobbies/logs",
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
