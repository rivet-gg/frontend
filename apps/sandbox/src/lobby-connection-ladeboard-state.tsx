import { Badge, Flex, H4 } from "@rivet-gg/components";
import { useLobbyConnection } from "./lobby-connection-context";
import { JsonPreview } from "./lobby-connection-custom-config";

export function LobbyConnectionLadeboardState() {
  const connection = useLobbyConnection();

  if (!connection?.state?.leaderboard) {
    return null;
  }

  return (
    <Flex gap="2" direction="col">
      <Flex gap="2" items="center">
        <H4>Scores</H4>
        <Badge variant="outline">Internal state</Badge>
      </Flex>
      <JsonPreview value={connection.state.leaderboard} />
    </Flex>
  );
}
