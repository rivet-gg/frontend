import { groupSubNav } from "@/domains/group/data/route";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Page, Flex, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdBillingView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <Page title={data.displayName}>
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
  staticData: {
    subNav: groupSubNav,
  },
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
