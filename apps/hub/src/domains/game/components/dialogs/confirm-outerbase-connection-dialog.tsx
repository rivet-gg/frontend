import type { DialogContentProps } from "@/hooks/use-dialog";
import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Link,
  Text,
} from "@rivet-gg/components";
import { Icon, faExternalLink } from "@rivet-gg/icons";
import { useGameBackendEnvDatabasePreviewMutation } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  environmentId: string;
}

export default function ConfirmOuterbaseConnectionDialogContent({
  gameId,
  environmentId,
  onClose,
}: ContentProps) {
  const { isPending, mutate } = useGameBackendEnvDatabasePreviewMutation({
    onSuccess: (url) => {
      window.open(url, "_blank", "noreferrer,noopener");
      onClose?.();
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Connect Rivet to Outerbase</DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          This will give Outerbase credentials to your database. Read more about
          Outerbase security{" "}
          <Link
            href="https://www.outerbase.com/security/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </Link>
          .
        </Text>
      </Flex>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          endIcon={<Icon icon={faExternalLink} className={"size-4"} />}
          isLoading={isPending}
          onClick={() => {
            mutate({ environmentId, gameId });
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  );
}
