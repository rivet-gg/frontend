import type { DialogContentProps } from "@/hooks/use-dialog";
import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Strong,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameQueryOptions,
  useUpdateGameEnvironmentVersionMutation,
} from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  environmentId: string;
  versionId: string;
}

export default function DeployEnvironmentVersionDialogContent({
  gameId,
  environmentId,
  versionId,
  onClose,
}: ContentProps) {
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutate, isPending } = useUpdateGameEnvironmentVersionMutation({
    onSuccess: onClose,
  });

  const chosenVersion = game.versions.find((v) => v.versionId === versionId);
  const chosenEnvironment = game.namespaces.find(
    (ns) => ns.namespaceId === environmentId,
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Deploy version {chosenVersion?.displayName} to{" "}
          {chosenEnvironment?.displayName} of {game.displayName}
        </DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Are you sure you want to deploy version{" "}
          <Strong>{chosenVersion?.displayName}</Strong> created at{" "}
          {chosenVersion?.createTs.toLocaleString()} to environment{" "}
          <Strong>{chosenEnvironment?.displayName}</Strong> of game{" "}
          <Strong>{game.displayName}</Strong>?
        </Text>
      </Flex>
      <DialogFooter>
        <Button
          onClick={() => mutate({ versionId, environmentId, gameId })}
          isLoading={isPending}
        >
          Deploy
        </Button>
      </DialogFooter>
    </>
  );
}
