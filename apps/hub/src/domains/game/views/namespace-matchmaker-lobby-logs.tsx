import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@rivet-gg/components";
import { LobbyLogs } from "../components/lobby-logs";
import { LobbyLogsSummary } from "../components/lobby-logs-summary";
import { LobbyLogsBreadcrumbs } from "../components/lobby-logs-breadcrumbs";
import { Suspense } from "react";
interface ContentProps {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

function Content({ gameId, namespaceId, lobbyId }: ContentProps) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <LobbyLogsSummary.Skeleton />
            <Separator />
            <LobbyLogs.Skeleton />
          </>
        }
      >
        <LobbyLogsSummary
          lobbyId={lobbyId}
          namespaceId={namespaceId}
          gameId={gameId}
        />
        <Separator />
        <LobbyLogs lobbyId={lobbyId} gameId={gameId} />
      </Suspense>
    </>
  );
}

interface NamespaceMatchmakerLobbyLogsProps {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

export function NamespaceMatchmakerLobbyLogs({
  gameId,
  namespaceId,
  lobbyId,
}: NamespaceMatchmakerLobbyLogsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <LobbyLogsBreadcrumbs
              gameId={gameId}
              namespaceId={namespaceId}
              lobbyId={lobbyId}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Content
            gameId={gameId}
            namespaceId={namespaceId}
            lobbyId={lobbyId}
          />
        </CardContent>
      </Card>
    </>
  );
}
