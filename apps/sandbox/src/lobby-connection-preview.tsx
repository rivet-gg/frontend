import { Grid, Strong } from "@rivet-gg/components";
import { LobbyConnectionActions } from "./lobby-connection-actions";
import { useLobbyConnection } from "./lobby-connection-context";
import { LobbyConnectionCustomConfig } from "./lobby-connection-custom-config";
import { LobbyConnectionDetails } from "./lobby-connection-details";
import { LobbyConnectionLadeboardState } from "./lobby-connection-ladeboard-state";
import { LobbyConnectionLobbyMemoryStats } from "./lobby-connection-lobby-memory-stats";
import { LobbyConnectionPingStats } from "./lobby-connection-ping-stats";

export function LobbyConnectionPreview() {
  const state = useLobbyConnection();

  if (!state?.connectionState || state.connectionState !== "open") {
    return (
      <div className="h-full flex justify-center items-center">
        <Strong>Not connected</Strong>
      </div>
    );
  }

  return (
    <>
      <Grid columns="2" mb="4" gap="4">
        <LobbyConnectionDetails />
        <LobbyConnectionLobbyMemoryStats />
        <LobbyConnectionPingStats />
        <LobbyConnectionCustomConfig />
        <LobbyConnectionLadeboardState />
        <LobbyConnectionActions />
      </Grid>
    </>
  );
}
