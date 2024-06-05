import { GroupAvatar } from "@/domains/group/components/group-avatar";
import {
  groupInviteQueryOptions,
  useGroupInviteAcceptMutation,
} from "@/domains/group/queries";
import * as Layout from "@/layouts/page-centered";
import { queryClient } from "@/queries/global";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Strong,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

function InviteCodeInviteRoute() {
  const { inviteCode } = Route.useParams();

  const { data } = useSuspenseQuery(groupInviteQueryOptions(inviteCode));
  const { mutate, isPending } = useGroupInviteAcceptMutation();

  return (
    <Layout.Root>
      <Card>
        <CardHeader>
          <CardTitle>
            <Flex items="center" gap="2">
              Invitation from
              <Flex items="center" gap="2">
                <GroupAvatar
                  displayName={data.group.displayName}
                  avatarUrl={data.group.avatarUrl}
                />
                {data.group.displayName}
              </Flex>
            </Flex>
          </CardTitle>
          <CardDescription>
            You've been invited to join the team{" "}
            <Strong>{data.group.displayName}</Strong>. Do you want to accept the
            invitation?
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Flex gap="4">
            <Button variant="secondary" asChild>
              <Link to="/">Reject</Link>
            </Button>
            <Button isLoading={isPending} onClick={() => mutate(inviteCode)}>
              Accept
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/invite/$inviteCode")({
  component: InviteCodeInviteRoute,
  beforeLoad: async ({ params: { inviteCode } }) => {
    const invite = await queryClient.ensureQueryData(
      groupInviteQueryOptions(inviteCode),
    );

    if (!invite) {
      throw notFound();
    }
  },
});
