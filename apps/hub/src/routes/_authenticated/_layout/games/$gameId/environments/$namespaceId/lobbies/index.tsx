import { GameMatchmakerListLobbyPreview } from "@/domains/game/components/game-matchmaker/game-matchmaker-list-lobby-preview";
import { LobbySortSelect } from "@/domains/game/components/game-matchmaker/lobby-sort-select";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import { gameNamespaceLobbiesLiveQueryOptions } from "@/domains/game/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LiveBadge,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
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
            navigate({ to: ".", search: (prev) => ({ ...prev, sort: value }) });
          }}
        />
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        {sorted.length === 0 ? (
          <div className="flex items-center mx-auto flex-col gap-2 my-10">
            <span>No lobbies created.</span>
            <span className="text-xs">
              Run your game client & connect to start a lobby.
            </span>
          </div>
        ) : (
          <GameMatchmakerListLobbyPreview
            lobbies={sorted}
            gameId={gameId}
            namespaceId={namespaceId}
            lobbyId={lobbyId}
            isLive
          />
        )}
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  lobbyId: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/lobbies/",
)({
  validateSearch: zodSearchValidator(searchSchema),
  staticData: {
    layout: "full",
  },
  component: MatchmakerLobbiesView,
  pendingComponent: Layout.Content.Skeleton,
});
