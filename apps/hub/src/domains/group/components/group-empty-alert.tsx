import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { Ghost } from "lucide-react";

interface GroupEmptyAlertProps {
  groupId: string;
  showCreateButton?: boolean;
}

export function GroupEmptyAlert({
  groupId,
  showCreateButton,
}: GroupEmptyAlertProps) {
  return (
    <>
      <Alert>
        <Ghost className="h-4 w-4" />
        <AlertTitle>It's a ghost town!</AlertTitle>
        <AlertDescription>
          <Flex direction="col" items="start" gap="4">
            This group doesn't have any games yet. Get started by creating a new
            one.
            {showCreateButton ? (
              <Button asChild>
                <Link to="/" search={{ modal: "create-game", groupId }}>
                  Create a new game
                </Link>
              </Button>
            ) : null}
          </Flex>
        </AlertDescription>
      </Alert>
    </>
  );
}
