import type { Rivet } from "@rivet-gg/api";

interface ServerStatusLabelProps extends Rivet.servers.Server {}

export const ServerStatusLabel = ({
  createdAt,
  startedAt,
  destroyedAt,
}: ServerStatusLabelProps) => {
  const isStarting = createdAt && !startedAt && !destroyedAt;
  const isRunning = createdAt && startedAt && !destroyedAt;
  const isStopped = createdAt && startedAt && destroyedAt;
  const isCrashed = createdAt && !startedAt && destroyedAt;

  if (isRunning) {
    return <span>Running</span>;
  }

  if (isStarting) {
    return <span>Starting</span>;
  }

  if (isCrashed) {
    return <span>Crashed</span>;
  }

  if (isStopped) {
    return <span>Stopped</span>;
  }
};
