import { hasMethod, isRivetError } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  Text,
} from "@rivet-gg/components";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Bomb } from "lucide-react";
import { NotFoundComponent } from "./not-found-component";

export const ErrorComponent = ({
  error,
  reset,
}: Partial<ErrorComponentProps>) => {
  if (isRivetError(error)) {
    if (error.statusCode === 404) {
      return <NotFoundComponent />;
    }
  } else if (!error) {
    return <NotFoundComponent />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          <Bomb />
          Uh, oh!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text>Something went wrong!</Text>
        <Code>
          {hasMethod(error, "toString")
            ? (error.toString() as string)
            : JSON.stringify(error)}
        </Code>
      </CardContent>
      <CardFooter>
        <Button onClick={reset}>Retry</Button>
      </CardFooter>
    </Card>
  );
};
