import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Page, Flex } from "@rivet-gg/components";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { GroupDetailedMembers } from "@/domains/group/views/group-detailed-members";

function GroupIdMembersView() {
  const { group } = Route.useLoaderData();

  return (
    <>
      <Page title={group.displayName}>
        <Flex direction="row" gap="4">
          <GroupDetailedMembers groupId={group.groupId} />
        </Flex>
      </Page>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/members",
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
  component: GroupIdMembersView,
});
