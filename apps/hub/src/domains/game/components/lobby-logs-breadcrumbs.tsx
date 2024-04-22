import { Flex } from "@rivet-gg/components";
import { LobbyLogsSelect } from "./lobby-logs-select";
import { Link, useNavigate } from "@tanstack/react-router";

interface LobbyLogsBreadcrumbsProps {
  gameId: string;
  namespaceId: string;
  lobbyId?: string;
}

export function LobbyLogsBreadcrumbs({
  gameId,
  namespaceId,
  lobbyId,
}: LobbyLogsBreadcrumbsProps) {
  const navigate = useNavigate();
  return (
    <Flex items="center" justify="start" minH="10">
      <span className="mr-1 min-w-0 flex-shrink-0">
        <Link
          to="/games/$gameId/namespaces/$namespaceId/matchmaker/logs/"
          params={{ gameId, namespaceId }}
        >
          Logs
        </Link>
        {lobbyId ? <> /</> : null}
      </span>
      {lobbyId ? (
        <LobbyLogsSelect
          onLobbySelect={(lobbyId) => {
            navigate({
              to: "/games/$gameId/namespaces/$namespaceId/matchmaker/logs/$lobbyId",
              params: {
                gameId,
                namespaceId,
                lobbyId,
              },
            });
          }}
          gameId={gameId}
          namespaceId={namespaceId}
          lobbyId={lobbyId}
        />
      ) : null}
    </Flex>
  );
}
