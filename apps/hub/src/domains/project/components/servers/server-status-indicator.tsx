import type { Rivet } from "@rivet-gg/api";
import { cn } from "@rivet-gg/components";

interface ServerStatusIndicatorProps extends Rivet.servers.Server {}

export const ServerStatusIndicator = ({
  createdAt,
  startedAt,
  destroyedAt,
}: ServerStatusIndicatorProps) => {
  const isStarting = createdAt && !startedAt && !destroyedAt;
  const isRunning = createdAt && startedAt && !destroyedAt;
  const isStopped = createdAt && startedAt && destroyedAt;
  const isCrashed = createdAt && !startedAt && destroyedAt;

  return (
    <div
      className={cn("size-3 rounded-full", {
        "bg-green-600": isRunning,
        "bg-blue-600 animate-pulse": isStarting,
        "bg-destructive": isCrashed,
        "bg-foreground/10": isStopped,
      })}
    />
  );
};
