import { GroupPageTabs } from "@/components/group/group-page-tabs";
import { groupGamesQueryOptions } from "@/queries/games";
import { Page, Flex, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdBillingView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <Page
        title={data.displayName}
        header={<GroupPageTabs groupId={groupId} currentTab="billing" />}
      >
        <Flex direction="row" gap="4">
          <Text>Billing</Text>
        </Flex>
      </Page>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/billing",
)({
  beforeLoad: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }
  },
  component: GroupIdBillingView,
});
