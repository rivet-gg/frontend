import { subNav } from "@/domains/group/data/route";
import { groupGamesQueryOptions } from "@/queries/games";
import { GroupMembers } from "@/views/group/group-members";
import { Page, Flex } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdMembersView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <Page title={data.displayName}>
        <Flex direction="row" gap="4">
          <GroupMembers groupId={groupId} />
        </Flex>
      </Page>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/members",
)({
  staticData: { subNav },
  beforeLoad: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }
  },
  component: GroupIdMembersView,
});
