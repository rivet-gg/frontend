import type { DialogContentProps } from "@/hooks/use-dialog";
import {
  Button,
  CopyArea,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameNamespaceTokenPublicQueryOptions } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  namespaceId: string;
}

export default function NamespaceGeneratePublicTokenDialogContent({
  gameId,
  namespaceId,
  onClose,
}: ContentProps) {
  const { data } = useSuspenseQuery(
    gameNamespaceTokenPublicQueryOptions({ gameId, namespaceId }),
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Environment Public Token</DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Copy this token to your clipboard. You will not be able to access this
          token again.
        </Text>
        <CopyArea value={data} isConfidential />
      </Flex>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </>
  );
}
