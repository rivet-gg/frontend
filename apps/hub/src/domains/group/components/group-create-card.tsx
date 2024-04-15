import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useGroupCreateDialog } from "../hooks/use-group-create-dialog";

export function GroupCreateCard() {
  const { openGroupCreateDialog, dialog } = useGroupCreateDialog();

  return (
    <>
      {dialog}
      <Card w="1/2" my="4">
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
