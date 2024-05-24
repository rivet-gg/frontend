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
  useUpdateGameNamespaceVersionMutation,
} from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  namespaceId: string;
  versionId: string;
}

export default function DeployNamespaceVersionDialogContent({
  gameId,
  namespaceId,
  versionId,
  onClose,
}: ContentProps) {
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutate, isPending } = useUpdateGameNamespaceVersionMutation({
    onSuccess: onClose,
  });

  const chosenVersion = game.versions.find((v) => v.versionId === versionId);
  const chosenNamespace = game.namespaces.find(
    (ns) => ns.namespaceId === namespaceId,
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Deploy version {chosenVersion?.displayName} to{" "}
          {chosenNamespace?.displayName} of {game.displayName}
        </DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Are you sure you want to deploy version{" "}
          <Strong>{chosenVersion?.displayName}</Strong> created at{" "}
          {chosenVersion?.createTs.toLocaleString()} to namespace{" "}
          <Strong>{chosenNamespace?.displayName}</Strong> of game{" "}
          <Strong>{game.displayName}</Strong>?
        </Text>
      </Flex>
      <DialogFooter>
        <Button
          onClick={() => mutate({ versionId, namespaceId, gameId })}
          isLoading={isPending}
        >
          Deploy
        </Button>
      </DialogFooter>
    </>
  );
}
