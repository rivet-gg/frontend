import { Flex } from "@rivet-gg/components";
import { Link, useNavigate } from "@tanstack/react-router";
import { LobbyLogsSelect } from "./lobby-logs-select";

interface LobbyLogsBreadcrumbsProps {
  gameId: string;
  namespaceId: string;
  lobbyId?: string;
  title: string;
}

export function MatchmakerLobbyBreadcrumbs({
  gameId,
  namespaceId,
  title,
  lobbyId,
}: LobbyLogsBreadcrumbsProps) {
  const navigate = useNavigate();
  return (
    <Flex items="center" justify="start" minH="10">
      <span className="mr-1 min-w-0 flex-shrink-0">
        <Link
          to="/games/$gameId/namespaces/$namespaceId/matchmaker/logs"
          params={{ gameId, namespaceId }}
        >
          {title}
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
