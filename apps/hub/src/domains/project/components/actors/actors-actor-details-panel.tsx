import { Flex, Text } from "@rivet-gg/components";
import { ActorsActorDetails } from "./actors-actor-details";

interface ActorsActorDetailsPanelProps {
  projectId: string;
  environmentId: string;
  actorId: string | undefined;
}

export function ActorsActorDetailsPanel({
  projectId,
  environmentId,
  actorId,
}: ActorsActorDetailsPanelProps) {
  if (!actorId) {
    return (
      <Flex items="center" justify="center" className="h-full">
        <Text textAlign="center">Please select an actor from the list.</Text>
      </Flex>
    );
  }

  return (
    <ActorsActorDetails
      projectId={projectId}
      environmentId={environmentId}
      actorId={actorId}
    />
  );
}
ActorsActorDetailsPanel.Skeleton = ActorsActorDetails.Skeleton;
