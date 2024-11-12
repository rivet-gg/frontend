import type { Rivet } from "@rivet-gg/api";
import { ServerStatusIndicator } from "./server-status-indicator";
import { ServerStatusLabel } from "./server-status-label";

interface ServerStatusProps extends Rivet.servers.Server {}

export const ServerStatus = (props: ServerStatusProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <ServerStatusIndicator {...props} />
      <ServerStatusLabel {...props} />
    </div>
  );
};
