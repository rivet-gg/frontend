import { Card, CardContent, CardHeader, CardTitle } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LobbyListLogsPreview } from "../components/lobby-list-logs-preview";
import { gameNamespaceLogsLobbiesQueryOptions } from "../queries";

interface NamespaceMatchmakerLogsProps {
  gameId: string;
  namespaceId: string;
  lobbyId?: string;
}

export function NamespaceMatchmakerLogs({
  gameId,
  namespaceId,
  lobbyId,
}: NamespaceMatchmakerLogsProps) {
  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <LobbyListLogsPreview
          lobbies={lobbies}
          gameId={gameId}
          namespaceId={namespaceId}
          lobbyId={lobbyId}
        />
      </CardContent>
    </Card>
  );
}
