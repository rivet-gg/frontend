import { Card, CardContent, CardHeader, CardTitle } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LobbyListLogsPreview } from "../components/lobby-list-logs-preview";
import { gameNamespaceLobbiesLiveQueryOptions } from "../queries";

interface NamespaceMatchmakerLobbiesProps {
  gameId: string;
  namespaceId: string;
  lobbyId?: string;
}

export function NamespaceMatchmakerLobbies({
  gameId,
  namespaceId,
  lobbyId,
}: NamespaceMatchmakerLobbiesProps) {
  const {
    data: { lobbies },
  } = useSuspenseQuery(
    gameNamespaceLobbiesLiveQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lobbies</CardTitle>
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
