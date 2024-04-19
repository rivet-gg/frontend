import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Flex,
  Strong,
  Text,
} from "@rivet-gg/components";
import {
  gameQueryOptions,
  useUpdateGameNamespaceVersionMutation,
} from "../../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import { Suspense } from "react";

interface ContentProps {
  gameId: string;
  namespaceId: string;
  versionId: string;
  onSuccess?: () => void;
}

function Content({ gameId, namespaceId, versionId, onSuccess }: ContentProps) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutate, isPending } = useUpdateGameNamespaceVersionMutation({
    onSuccess,
  });

  const chosenVersion = data.game.versions.find(
    (v) => v.versionId === versionId,
  );
  const chosenNamespace = data.game.namespaces.find(
    (ns) => ns.namespaceId === namespaceId,
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Deploy version {chosenVersion?.displayName} to{" "}
          {chosenNamespace?.displayName} of {data.game.displayName}
        </DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Are you sure you want to deploy version{" "}
          <Strong>{chosenVersion?.displayName}</Strong> created at{" "}
          {chosenVersion?.createTs.toLocaleString()} to namespace{" "}
          <Strong>{chosenNamespace?.displayName}</Strong> of game{" "}
          <Strong>{data.game.displayName}</Strong>?
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

interface DeployNamespaceVersionDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function DeployNamespaceVersionDialog({
  gameId,
  namespaceId,
  versionId,
  ...dialogProps
}: DeployNamespaceVersionDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {gameId && namespaceId && versionId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content
              gameId={gameId}
              namespaceId={namespaceId}
              versionId={versionId}
              onSuccess={() => dialogProps.onOpenChange?.(false)}
            />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
