import { Flex, Text } from "@rivet-gg/components";
import { GameBackendEventDetails } from "./game-backend-event-details";

interface GameBackendEventDetailsPanelProps {
  environmentId: string;
  projectId: string;
  eventId: string | undefined;
}

export function GameBackendEventDetailsPanel({
  eventId,
  projectId,
  environmentId,
}: GameBackendEventDetailsPanelProps) {
  if (!eventId) {
    return (
      <Flex items="center" justify="center" className="h-full">
        <Text textAlign="center">
          Please select an event from the list on the left.
        </Text>
      </Flex>
    );
  }
  return (
    <GameBackendEventDetails
      environmentId={environmentId}
      projectId={projectId}
      eventId={eventId}
    />
  );
}
