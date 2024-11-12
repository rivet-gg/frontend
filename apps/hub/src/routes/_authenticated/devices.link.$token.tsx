import * as DeviceLinkForm from "@/domains/auth/forms/device-link-form";
import {
  deviceLinkTokenQueryOptions,
  useCompleteDeviceLinkMutation,
} from "@/domains/auth/queries";
import * as Layout from "@/layouts/page-centered";
import { queryClient } from "@/queries/global";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Text,
} from "@rivet-gg/components";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
function DeviceLinkTokenRoute() {
  const { token } = Route.useParams();

  const { mutateAsync, isSuccess } = useCompleteDeviceLinkMutation();

  if (isSuccess) {
    return (
      <Layout.Root>
        <Card>
          <CardHeader>
            <CardTitle>Project Linked Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>
              You may safely close this tab and return to your project.
            </Text>
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary">
              <Link to="/">Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </Layout.Root>
    );
  }

  return (
    <DeviceLinkForm.Form
      onSubmit={async (values) => {
        await mutateAsync({
          deviceLinkToken: token,
          gameId: values.projectId,
        });
      }}
      defaultValues={{ token, projectId: "" }}
    >
      <Layout.Root>
        <Card>
          <CardHeader>
            <CardTitle>Link project</CardTitle>
            <CardDescription>
              Link your project to your device here to continue with Rivet
              setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceLinkForm.Project />
          </CardContent>
          <CardFooter>
            <Flex gap="4">
              <Button asChild variant="secondary">
                <Link to="/">Cancel</Link>
              </Button>
              <DeviceLinkForm.Submit>Continue</DeviceLinkForm.Submit>
            </Flex>
          </CardFooter>
        </Card>
      </Layout.Root>
    </DeviceLinkForm.Form>
  );
}

export const Route = createFileRoute("/_authenticated/devices/link/$token")({
  component: DeviceLinkTokenRoute,
  loader: async ({ params: { token } }) => {
    try {
      const response = await queryClient.fetchQuery(
        deviceLinkTokenQueryOptions(token),
      );
      if (!response) {
        throw notFound();
      }
    } catch {
      throw notFound();
    }
  },
});
