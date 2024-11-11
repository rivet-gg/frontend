import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useBreakpoint,
} from "@rivet-gg/components";
import { type ReactNode, Suspense } from "react";
import type { LiveLobbyLogs, LobbySummary } from "../../queries";
import { GameMatchmakerListLobbyPrefilledButton } from "./game-matchmaker-list-lobby-button";
import { GameMatchmakerLobbyListPanel } from "./game-matchmaker-list-lobby-panel";
import { GameMatchmakerLobbyDetailsPanel } from "./game-matchmaker-lobby-details-panel";

interface GameMatchmakerListLobbyPreviewProps {
  lobbies: (LobbySummary | LiveLobbyLogs)[];
  lobbyId?: string;
  gameId: string;
  environmentId: string;
  isLive?: boolean;
  sort?: ReactNode;
}

export function GameMatchmakerListLobbyPreview({
  lobbies,
  lobbyId,
  gameId,
  environmentId,
  isLive,
}: GameMatchmakerListLobbyPreviewProps) {
  const isMd = useBreakpoint("md");
  const doesLobbyExist =
    lobbies.find((lobby) => lobby.lobbyId === lobbyId) !== undefined;

  return (
    <ResizablePanelGroup
      className="min-w-0 w-full h-full max-h-full"
      autoSaveId="rivet-game-backend-logs"
      direction={isMd ? "horizontal" : "vertical"}
    >
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full min-w-0">
          <GameMatchmakerLobbyListPanel
            gameId={gameId}
            lobbies={lobbies}
            lobbyId={lobbyId}
          >
            {!doesLobbyExist && lobbyId ? (
              <GameMatchmakerListLobbyPrefilledButton
                isActive
                gameId={gameId}
                environmentId={environmentId}
                lobbyId={lobbyId}
              />
            ) : null}
          </GameMatchmakerLobbyListPanel>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full flex flex-col">
          <Suspense fallback={<GameMatchmakerLobbyDetailsPanel.Skeleton />}>
            <GameMatchmakerLobbyDetailsPanel
              lobbyId={lobbyId}
              gameId={gameId}
              environmentId={environmentId}
              isLive={isLive && doesLobbyExist}
            />
          </Suspense>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
