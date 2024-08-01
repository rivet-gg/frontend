import {
  faSealExclamation,
  faSealQuestion,
  faSpinnerThird,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@rivet-gg/components";
import type { LobbyStatus } from "../../data/lobby-status";

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
        <FontAwesomeIcon className="size-4 mr-1" icon={faSealExclamation} />
        Failed
      </Badge>
    );
  }

  if (status === "not-started") {
    return (
      <Badge variant="secondary">
        <FontAwesomeIcon
          className="size-4 mr-1 animate-spin"
          icon={faSpinnerThird}
        />
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
      <FontAwesomeIcon className="size-4 mr-1" icon={faSealQuestion} />
      Unknown
    </Badge>
  );
}
