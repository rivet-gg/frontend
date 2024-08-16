import { Flex, Text } from "@rivet-gg/components";
import { GameServersServerDetails } from "./game-servers-server-details";

interface GameServersServerDetailsPanelProps {
  gameId: string;
  environmentId: string;
  serverId: string | undefined;
}

export function GameServersServerDetailsPanel({
  gameId,
  environmentId,
  serverId,
}: GameServersServerDetailsPanelProps) {
  if (!serverId) {
    return (
      <Flex items="center" justify="center" className="h-full">
        <Text textAlign="center">
          Please select a server from the list on the left.
        </Text>
      </Flex>
    );
  }

  return (
    <GameServersServerDetails
      gameId={gameId}
      environmentId={environmentId}
      serverId={serverId}
    />
  );
}
GameServersServerDetailsPanel.Skeleton = GameServersServerDetails.Skeleton;
