import { faFlagCheckered } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";

export const NotFoundComponent = () => {
  return (
    <Card w="full">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <FontAwesomeIcon icon={faFlagCheckered} />
          Wrong direction!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text>This page does not exists!</Text>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to="/">Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
