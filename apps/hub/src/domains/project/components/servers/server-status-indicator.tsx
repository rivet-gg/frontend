import type { Rivet } from "@rivet-gg/api";
import { cn } from "@rivet-gg/components";

export function getServerStatus(
  server: Pick<Rivet.servers.Server, "createdAt" | "startedAt" | "destroyedAt">,
) {
  const { createdAt, startedAt, destroyedAt } = server;

  if (createdAt && !startedAt && !destroyedAt) {
    return "starting";
  }

  if (createdAt && startedAt && !destroyedAt) {
    return "running";
  }

  if (createdAt && startedAt && destroyedAt) {
    return "stopped";
  }

  if (createdAt && !startedAt && destroyedAt) {
    return "crashed";
  }

  return "unknown";
}

interface ServerStatusIndicatorProps extends Rivet.servers.Server {}

export const ServerStatusIndicator = ({
  createdAt,
  startedAt,
  destroyedAt,
}: ServerStatusIndicatorProps) => {
  const status = getServerStatus({ createdAt, startedAt, destroyedAt });

  return (
    <div
      className={cn("size-3 rounded-full", {
        "bg-green-600": status === "running",
        "bg-blue-600 animate-pulse": status === "starting",
        "bg-destructive": status === "crashed",
        "bg-foreground/10": status === "stopped",
      })}
    />
  );
};
