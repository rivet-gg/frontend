import { Badge } from "@rivet-gg/components";
import { useLobbyConnection } from "./lobby-connection-context";

export function LobbyConnectionBadge() {
  const state = useLobbyConnection();

  if (!state || !state.mutationState) {
    return null;
  }

  if (state.connectionState === "open") {
    return <Badge>Connected</Badge>;
  }

  if (state.mutationState.status === "pending") {
    return <Badge variant="secondary">Creating / Searching...</Badge>;
  }

  if (
    state.mutationState.status === "success" &&
    state.connectionState !== "closed"
  ) {
    return <Badge variant="secondary">Connecting...</Badge>;
  }

  return <Badge variant="destructive">Disconnected</Badge>;
}
