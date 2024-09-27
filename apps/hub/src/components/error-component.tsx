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
import { Icon, faBomb } from "@rivet-gg/icons";
import * as Sentry from "@sentry/react";
import { useQueryClient } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";
import { NotFoundComponent } from "./not-found-component";

export const ErrorComponent = ({
  error,
  reset,
}: Partial<ErrorComponentProps>) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

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
          <Icon icon={faBomb} />
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
        <Button
          onClick={async () => {
            await queryClient.invalidateQueries({ refetchType: "all" });
            reset?.();
          }}
        >
          Retry
        </Button>
      </CardFooter>
    </Card>
  );
};
