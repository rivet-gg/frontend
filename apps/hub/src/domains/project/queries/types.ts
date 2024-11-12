import type { Rivet } from "@rivet-gg/api";
import type { LobbyStatus } from "../data/lobby-status";

export type GroupProjects = Rivet.group.Summary & {
  projects: Rivet.game.Summary[];
};

export type Project = Rivet.game.Summary & {
  namespaces: Rivet.cloud.NamespaceSummary[];
};

export type Environment = Rivet.cloud.NamespaceSummary & {
  version: Rivet.cloud.version.Summary | undefined;
};

export type LobbySummary = Rivet.cloud.LogsLobbySummary & {
  readableStatus: LobbyStatus;
};

export type LiveLobbyLogs = Rivet.cloud.LobbySummaryAnalytics & {
  readableStatus: LobbyStatus;
};
export * from "./backend/types";
