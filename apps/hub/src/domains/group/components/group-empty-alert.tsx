import { faGhost } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";

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
        <FontAwesomeIcon className="size-4" icon={faGhost} />
        <AlertTitle>It's a ghost town!</AlertTitle>
        <AlertDescription>
          <Flex direction="col" items="start" gap="4">
            This group doesn't have any games yet. Get started by creating a new
            one.
            {showCreateButton ? (
              <Button asChild variant="secondary">
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
