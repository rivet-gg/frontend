import * as Layout from "@/layouts/page-centered";
import { rivetClient } from "@/queries/global";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
} from "@rivet-gg/components";
import { Link, createFileRoute } from "@tanstack/react-router";

function InviteCodeInviteRoute() {
  return (
    <Layout.Root>
      <Card>
        <CardHeader>
          <CardTitle>Login succeed</CardTitle>
          <CardDescription>
            No further action is required. You may now return to the home page.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Flex gap="4">
            <Button asChild>
              <Link to="/">Homepage</Link>
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/access-token/$token")({
  component: InviteCodeInviteRoute,
  beforeLoad: async ({ params: { token } }) => {
    await rivetClient.auth.identity.accessToken.completeAccessTokenVerification(
      { accessToken: token },
    );
  },
});
