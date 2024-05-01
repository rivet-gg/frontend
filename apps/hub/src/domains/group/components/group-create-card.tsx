import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useDialog } from "@/hooks/use-dialog";

export function GroupCreateCard() {
  const { open: openGroupCreateDialog, dialog } = useDialog.CreateGroup({});

  return (
    <>
      {dialog}
      <Card w={{ initial: "full", md: "1/2" }} my="4">
        <CardHeader>
          <CardTitle>Create a new team</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={openGroupCreateDialog}>Create a new team</Button>
        </CardFooter>
      </Card>
    </>
  );
}
