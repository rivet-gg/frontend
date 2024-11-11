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
import { gameEnvironmentTokenPublicQueryOptions } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  environmentId: string;
}

export default function EnvironmentGeneratePublicTokenDialogContent({
  gameId,
  environmentId,
  onClose,
}: ContentProps) {
  const { data } = useSuspenseQuery(
    gameEnvironmentTokenPublicQueryOptions({ gameId, environmentId }),
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
