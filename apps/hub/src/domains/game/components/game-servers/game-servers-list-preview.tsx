import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useBreakpoint,
} from "@rivet-gg/components";
import { Suspense } from "react";
import { GameServersListPanel } from "./game-servers-list-panel";
import { GameServersServerDetailsPanel } from "./game-servers-server-details-panel";

interface GameServersListPreview {
  gameId: string;
  environmentId: string;
  serverId?: string;
}

export function GameServersListPreview({
  gameId,
  environmentId,
  serverId,
}: GameServersListPreview) {
  const isMd = useBreakpoint("md");

  return (
    <ResizablePanelGroup
      className="min-w-0 w-full h-full max-h-full"
      autoSaveId="rivet-game-backend-logs"
      direction={isMd ? "horizontal" : "vertical"}
    >
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full truncate min-w-0">
          <GameServersListPanel
            gameId={gameId}
            environmentId={environmentId}
            serverId={serverId}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full">
          <Suspense fallback={<GameServersServerDetailsPanel.Skeleton />}>
            <GameServersServerDetailsPanel
              gameId={gameId}
              environmentId={environmentId}
              serverId={serverId}
            />
          </Suspense>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
