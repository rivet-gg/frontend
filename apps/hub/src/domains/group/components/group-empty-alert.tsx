import { useDialog } from "@/hooks/use-dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
} from "@rivet-gg/components";
import { Ghost } from "lucide-react";

interface GroupEmptyAlertProps {
  groupId: string;
}

export function GroupEmptyAlert({ groupId }: GroupEmptyAlertProps) {
  const { open, dialog } = useDialog.CreateGroupGame({ groupId });

  return (
    <>
      {dialog}
      <Alert>
        <Ghost className="h-4 w-4" />
        <AlertTitle>It's a ghost town!</AlertTitle>
        <AlertDescription>
          <Flex direction="col" items="start" gap="4">
            This group doesn't have any games yet. Get started by creating a new
            one.
            <Button onClick={open}>Create a new game</Button>
          </Flex>
        </AlertDescription>
      </Alert>
    </>
  );
}
