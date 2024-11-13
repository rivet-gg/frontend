import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useBreakpoint,
} from "@rivet-gg/components";
import { Suspense } from "react";
import { ServersListPanel } from "./servers-list-panel";
import { ServersServerDetailsPanel } from "./servers-server-details-panel";

interface ServersListPreview {
  projectId: string;
  environmentId: string;
  serverId?: string;
}

export function ServersListPreview({
  projectId,
  environmentId,
  serverId,
}: ServersListPreview) {
  const isMd = useBreakpoint("md");

  return (
    <ResizablePanelGroup
      className="min-w-0 w-full h-full max-h-full"
      autoSaveId="rivet-project-backend-logs"
      direction={isMd ? "horizontal" : "vertical"}
    >
      <ResizablePanel minSize={40} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full truncate min-w-0">
          <ServersListPanel
            projectId={projectId}
            environmentId={environmentId}
            serverId={serverId}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={40} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full">
          <Suspense fallback={<ServersServerDetailsPanel.Skeleton />}>
            <ServersServerDetailsPanel
              projectId={projectId}
              environmentId={environmentId}
              serverId={serverId}
            />
          </Suspense>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
