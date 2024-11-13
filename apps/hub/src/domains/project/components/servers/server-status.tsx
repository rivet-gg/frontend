import type { Rivet } from "@rivet-gg/api";
import { cn } from "@rivet-gg/components";
import { ServerStatusIndicator } from "./server-status-indicator";
import { ServerStatusLabel } from "./server-status-label";

interface ServerStatusProps extends Rivet.servers.Server {
  className?: string;
}

export const ServerStatus = ({ className, ...props }: ServerStatusProps) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <ServerStatusIndicator {...props} />
      <ServerStatusLabel {...props} />
    </div>
  );
};
