import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useBreakpoint,
} from "@rivet-gg/components";
import { Suspense } from "react";
import { ActorsActorDetailsPanel } from "./actors-actor-details-panel";
import { ActorsListPanel } from "./actors-list-panel";

interface ActorsListPreview {
  projectId: string;
  environmentId: string;
  actorId?: string;
}

export function ActorsListPreview({
  projectId,
  environmentId,
  actorId,
}: ActorsListPreview) {
  const isMd = useBreakpoint("md");

  return (
    <ResizablePanelGroup
      className="min-w-0 w-full h-full max-h-full"
      autoSaveId="rivet-project-actor-logs"
      direction={isMd ? "horizontal" : "vertical"}
    >
      <ResizablePanel minSize={40} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full truncate min-w-0">
          <ActorsListPanel
            projectId={projectId}
            environmentId={environmentId}
            actorId={actorId}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={40} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full">
          <Suspense fallback={<ActorsActorDetailsPanel.Skeleton />}>
            <ActorsActorDetailsPanel
              projectId={projectId}
              environmentId={environmentId}
              actorId={actorId}
            />
          </Suspense>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
