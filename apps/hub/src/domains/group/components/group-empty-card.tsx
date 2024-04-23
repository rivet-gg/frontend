import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useDialog } from "@/hooks/use-dialog";

interface GroupEmptyCardProps {
  groupId: string;
}

export function GroupEmptyCard({ groupId }: GroupEmptyCardProps) {
  const { open, dialog } = useDialog.CreateGroupGame({ groupId });

  return (
    <>
      {dialog}
      <Card w="1/2" my="4">
        <CardHeader>
          <CardTitle>This group is empty</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={open}>Create a new game</Button>
        </CardFooter>
      </Card>
    </>
  );
}
