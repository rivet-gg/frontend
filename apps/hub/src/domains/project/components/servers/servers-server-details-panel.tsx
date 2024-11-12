import { Flex, Text } from "@rivet-gg/components";
import { ServersServerDetails } from "./servers-server-details";

interface ServersServerDetailsPanelProps {
  projectId: string;
  environmentId: string;
  serverId: string | undefined;
}

export function ServersServerDetailsPanel({
  projectId,
  environmentId,
  serverId,
}: ServersServerDetailsPanelProps) {
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
    <ServersServerDetails
      projectId={projectId}
      environmentId={environmentId}
      serverId={serverId}
    />
  );
}
ServersServerDetailsPanel.Skeleton = ServersServerDetails.Skeleton;
