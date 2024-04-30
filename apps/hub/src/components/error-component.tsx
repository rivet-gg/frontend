import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Code,
  H1,
  Text,
} from "@rivet-gg/components";
import { ErrorComponentProps } from "@tanstack/react-router";
import * as Layout from "@/layouts/page-centered";
import { Bomb } from "lucide-react";
import { hasMethod } from "@/lib/utils";

export const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  return (
    <div className="flex min-h-screen">
      <Layout.Root>
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
      </Layout.Root>
    </div>
  );
};
