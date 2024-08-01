import { GameMatchmakerListLobbyPreview } from "@/domains/game/components/game-matchmaker/game-matchmaker-list-lobby-preview";
import { LobbySortSelect } from "@/domains/game/components/game-matchmaker/lobby-sort-select";
import { gameNamespaceLobbiesLiveQueryOptions } from "@/domains/game/queries";
import { queryClient } from "@/queries/global";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LiveBadge,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";

function MatchmakerLobbiesView() {
  const { gameId, namespaceId } = Route.useParams();
  const { sort, lobbyId } = Route.useSearch();

  const navigate = useNavigate();
  const {
    data: { lobbies },
  } = useSuspenseQuery(
    gameNamespaceLobbiesLiveQueryOptions({ gameId, namespaceId }),
  );

  const sorted = useMemo(() => {
    if (!lobbies) {
      return [];
    }

    if (sort === "creation-date-oldest") {
      return lobbies.sort((a, b) => {
        return +a.createTs - +b.createTs;
      });
    }

    if (sort === "status") {
      return lobbies.sort((a, b) => {
        return a.readableStatus.localeCompare(b.readableStatus);
      });
    }

    if (sort === "player-count-biggest") {
      return lobbies.sort((a, b) => {
        return b.totalPlayerCount - a.totalPlayerCount;
      });
    }

    if (sort === "player-count-smallest") {
      return lobbies.sort((a, b) => {
        return a.totalPlayerCount - b.totalPlayerCount;
      });
    }

    return lobbies.sort((a, b) => {
      return +b.createTs - +a.createTs;
    });
  }, [lobbies, sort]);

  return (
    <Card className="h-full max-h-full flex flex-col p-0">
      <CardHeader className="border-b flex flex-row justify-between items-center">
        <CardTitle className="flex gap-4">
          Lobbies
          <LiveBadge />
        </CardTitle>
        <LobbySortSelect
          defaultValue="creation-date-newest"
          value={sort}
          onValueChange={(value) => {
            navigate({ search: (prev) => ({ ...prev, sort: value }) });
          }}
        />
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        <GameMatchmakerListLobbyPreview
          lobbies={sorted}
          gameId={gameId}
          namespaceId={namespaceId}
          lobbyId={lobbyId}
          isLive
        />
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  lobbyId: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/lobbies/",
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
