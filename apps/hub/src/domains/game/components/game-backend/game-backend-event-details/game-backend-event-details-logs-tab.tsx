import { LogsView } from "@rivet-gg/components";
import type { BackendEvent } from "../../../queries";

interface GameBackendEventDetailsLogsTabProps
  extends Pick<BackendEvent, "logs" | "logTimestamps"> {}

export function GameBackendEventDetailsLogsTab({
  logs,
  logTimestamps,
}: GameBackendEventDetailsLogsTabProps) {
  return (
    <div className="h-full py-4 px-4">
      <LogsView
        timestamps={logTimestamps}
        lines={logs}
        showFollowToggle={false}
        empty={<p>No logs available.</p>}
      />
    </div>
  );
}
