import { Card, CardContent, CardHeader, CardTitle } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { LobbyListLogsPreview } from "../components/lobby-list-logs-preview";
import { LobbySortSelect } from "../components/lobby-sort-select";
import { gameNamespaceLobbiesLiveQueryOptions } from "../queries";

interface NamespaceMatchmakerLobbiesProps {
  gameId: string;
  namespaceId: string;
  lobbyId?: string;
  sort?: string;
}

export function NamespaceMatchmakerLobbies({
  gameId,
  namespaceId,
  lobbyId,
  sort,
}: NamespaceMatchmakerLobbiesProps) {
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
    <Card>
      <LobbyListLogsPreview
        lobbies={sorted}
        gameId={gameId}
        namespaceId={namespaceId}
        lobbyId={lobbyId}
        sort={
          <LobbySortSelect
            defaultValue="creation-date-newest"
            value={sort}
            onValueChange={(value) => {
              navigate({ search: (prev) => ({ ...prev, sort: value }) });
            }}
          />
        }
      />
    </Card>
  );
}
