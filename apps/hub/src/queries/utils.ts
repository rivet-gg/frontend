import type { Rivet } from "@rivet-gg/api";

export const hasWatchIndex = (
  data: unknown,
): data is { watch: Rivet.WatchResponse } => {
  return typeof data === "object" && data !== null && "watch" in data;
};

export const getWatchIndex = (data: unknown): string | undefined => {
  if (hasWatchIndex(data)) {
    return data.watch.index;
  }
  return undefined;
};

export const getMetaWatchIndex = (
  meta: Record<string, unknown> | undefined,
): Rivet.WatchQuery => {
  if (meta && "watchIndex" in meta) {
    return typeof meta.watchIndex === "string" ? meta.watchIndex : undefined;
  }
  return undefined;
};
