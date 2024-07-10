import { Badge } from "@rivet-gg/components";
import type { BackendEvent } from "../../queries";

const getResponseType = (event: BackendEvent["event"]) => {
  if (event.response.status >= 300 && event.response.status < 400) {
    return "warning";
  }
  if (event.response.status >= 400) {
    return "error";
  }
  return "success";
};

const getResponseTypeVariant = (type: "warning" | "error" | "success") => {
  if (type === "warning") {
    return "warning";
  }
  if (type === "error") {
    return "destructive-muted";
  }
  return "outline";
};

interface GameBackendResponseBadgeProps extends BackendEvent {}

export function GameBackendResponseBadge({
  backendCall,
  event,
}: GameBackendResponseBadgeProps) {
  const type = getResponseType(event);
  const variant = getResponseTypeVariant(type);

  if (backendCall) {
    return (
      <>
        <Badge>CALL</Badge>
        <Badge variant={variant}>{type === "error" ? "ERROR" : "OK"}</Badge>
      </>
    );
  }
  return (
    <>
      <Badge>HTTP</Badge>
      <Badge variant={variant}>
        {event.response.status} {type === "error" ? "ERROR" : "OK"}
      </Badge>
    </>
  );
}
