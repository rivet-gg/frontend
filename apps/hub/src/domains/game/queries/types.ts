import type { Rivet } from "@rivet-gg/api";

export type GroupGames = Rivet.group.Summary & { games: Rivet.game.Summary[] };

export type Game = Rivet.game.Summary & {
  namespaces: Rivet.cloud.NamespaceSummary[];
};

export type Namespace = Rivet.cloud.NamespaceSummary & {
  version: Rivet.cloud.version.Summary | undefined;
};
