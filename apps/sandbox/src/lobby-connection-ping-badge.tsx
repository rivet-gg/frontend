import { Badge } from "@rivet-gg/components";
import { useLobbyConnection } from "./lobby-connection-context";

export function LobbyConnectionPingBadge() {
  const connection = useLobbyConnection();
  if (
    !connection ||
    !connection.connectionState ||
    !connection.state ||
    !connection.state.pings ||
    connection.connectionState !== "open" ||
    connection.state.pings?.length === 0
  ) {
    return null;
  }

  const {
    state: { pings = [] },
  } = connection;

  const latestPing = pings[pings.length - 1] || 0;

  if (latestPing < 200) {
    return <Badge variant="outline">{latestPing}ms</Badge>;
  }
  return <Badge variant="destructive">{latestPing}ms</Badge>;
}
