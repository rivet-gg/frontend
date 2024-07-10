import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Text,
  useBreakpoint,
} from "@rivet-gg/components";
import type { BackendEvent } from "../../queries";
import { GameBackendEventDetailsPanel } from "./game-backend-event-details-panel";
import { GameBackendEventsListPanel } from "./game-backend-events-list-panel";

interface GameBackendListEventsPreviewProps {
  events: BackendEvent[];
  environmentId: string;
  projectId: string;
  eventId?: string;
}

export function GameBackendListEventsPreview({
  events,
  eventId,
  environmentId,
  projectId,
}: GameBackendListEventsPreviewProps) {
  if (events.length === 0) {
    return (
      <Text my="10" textAlign="center">
        No events found.
      </Text>
    );
  }

  const isMd = useBreakpoint("md");

  return (
    <ResizablePanelGroup
      className="min-w-0 w-full h-full max-h-full"
      autoSaveId="rivet-game-backend-logs"
      direction={isMd ? "horizontal" : "vertical"}
    >
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full truncate min-w-0">
          <GameBackendEventsListPanel events={events} eventId={eventId} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={25} maxSize={75}>
        <div className="h-full max-h-full overflow-hidden w-full">
          <GameBackendEventDetailsPanel
            projectId={projectId}
            environmentId={environmentId}
            eventId={eventId}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
