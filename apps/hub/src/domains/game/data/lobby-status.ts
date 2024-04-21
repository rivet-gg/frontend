import { Rivet } from "@rivet-gg/api";

export type LobbyStatus =
  | "running"
  | "not-started"
  | "failed"
  | "closed"
  | "unknown";

export function formatLobbyStatus(status: LobbyStatus) {
  const map: Record<LobbyStatus, string> = {
    running: "Running",
    "not-started": "Not started",
    failed: "Failed",
    closed: "Closed",
    unknown: "Unknown status",
  };

  return map[status];
}

export function getLobbyStatus(
  status: Rivet.cloud.LogsLobbyStatus,
  startTs: Date | undefined,
): LobbyStatus {
  if (status.stopped?.stopTs) {
    return status.stopped.failed ? "failed" : "closed";
  }

  if (status.running !== undefined) {
    return startTs ? "running" : "not-started";
  }

  return "unknown";
}
