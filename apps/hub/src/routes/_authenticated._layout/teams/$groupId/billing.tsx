import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Page, Flex, Text } from "@rivet-gg/components";
import { createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdBillingView() {
  const { group } = Route.useLoaderData();

  return (
    <>
      <Page title={group.displayName}>
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
  loader: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }

    return { group };
  },
  component: GroupIdBillingView,
});
