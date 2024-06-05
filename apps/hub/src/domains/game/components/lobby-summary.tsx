import { Separator } from "@rivet-gg/components";
import { Suspense } from "react";
import { LobbyLogs } from "./lobby-logs";
import { LobbyLogsSummary } from "./lobby-logs-summary";

interface LobbySummaryProps {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

export function LobbySummary({
  gameId,
  namespaceId,
  lobbyId,
}: LobbySummaryProps) {
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
        <Separator mb="4" />
        <LobbyLogs lobbyId={lobbyId} gameId={gameId} />
      </Suspense>
    </>
  );
}
