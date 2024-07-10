import type { DialogContentProps } from "@/hooks/use-dialog";
import { faExternalLink } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Link,
  Text,
} from "@rivet-gg/components";
import { useGameBackendEnvDatabasePreviewMutation } from "../../queries";

interface ContentProps extends DialogContentProps {
  projectId: string;
  environmentId: string;
}

export default function ConfirmOuterbaseConnectionDialogContent({
  projectId,
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
          endIcon={
            <FontAwesomeIcon icon={faExternalLink} className={"size-4"} />
          }
          isLoading={isPending}
          onClick={() => {
            mutate({ environmentId, projectId });
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  );
}
