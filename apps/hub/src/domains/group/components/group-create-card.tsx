import { useDialog } from "@/hooks/use-dialog";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";

export function GroupCreateCard() {
  const { open: openGroupCreateDialog, dialog } = useDialog.CreateGroup({});

  return (
    <>
      {dialog}
      <Card w="full" my="4">
        <CardFooter>
          <Button onClick={openGroupCreateDialog} variant="secondary">
            Create a new team
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
