import { Badge } from "@rivet-gg/components";
import { Loader2, ShieldAlert, ShieldQuestion } from "lucide-react";
import type { LobbyStatus } from "../data/lobby-status";

interface LobbyStatusBadgeProps {
  status: LobbyStatus;
}

export function LobbyStatusBadge({ status }: LobbyStatusBadgeProps) {
  if (status === "running") {
    return (
      <Badge>
        <div className="bg-foreground mr-1 size-2 animate-pulse rounded-full" />
        Running
      </Badge>
    );
  }
  if (status === "failed") {
    return (
      <Badge variant="destructive">
        <ShieldAlert className="mr-1 size-4" />
        Failed
      </Badge>
    );
  }

  if (status === "not-started") {
    return (
      <Badge variant="secondary">
        <Loader2 className="mr-1 size-4 animate-spin" />
        Not Started
      </Badge>
    );
  }

  if (status === "closed") {
    return <Badge variant="outline">Finished</Badge>;
  }

  if (status === "idle") {
    return <Badge variant="secondary">Idle</Badge>;
  }

  return (
    <Badge variant="outline">
      <ShieldQuestion className="mr-1 size-4" />
      Unknown
    </Badge>
  );
}
