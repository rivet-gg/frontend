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

export function NoGroupsAlert() {
  return (
    <>
      <Alert>
        <FontAwesomeIcon className="size-4" icon={faGhost} />
        <AlertTitle>It's a ghost town!</AlertTitle>
        <AlertDescription>
          <Flex direction="col" items="start" gap="4">
            You are not a member of any team yet. Get started by creating a new
            team.
            <Button asChild>
              <Link to="/" search={{ modal: "create-group" }}>
                Create a team
              </Link>
            </Button>
          </Flex>
        </AlertDescription>
      </Alert>
    </>
  );
}
