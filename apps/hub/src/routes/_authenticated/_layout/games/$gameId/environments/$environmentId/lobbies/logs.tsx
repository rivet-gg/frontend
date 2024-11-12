import { GameMatchmakerListLobbyPreview } from "@/domains/game/components/game-matchmaker/game-matchmaker-list-lobby-preview";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import { gameEnvironmentLogsLobbiesQueryOptions } from "@/domains/game/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function MatchmakerLogsView() {
  const { gameId, environmentId } = Route.useParams();
  const search = Route.useSearch();

  const { data: lobbies } = useSuspenseQuery(
    gameEnvironmentLogsLobbiesQueryOptions({ gameId, environmentId }),
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
          environmentId={environmentId}
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
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/lobbies/logs",
)({
  validateSearch: zodSearchValidator(searchSchema),
  staticData: {
    layout: "full",
  },
  component: MatchmakerLogsView,
  pendingComponent: Layout.Content.Skeleton,
});
