import { groupSubNav } from "@/domains/group/data/route";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { GroupGames } from "@/domains/group/views/group-games";
import { GroupMembers } from "@/domains/group/views/group-members";
import { Page, Flex } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <Page title={data.displayName}>
        <Flex direction="row" gap="4">
          <Flex w="2/3" direction="row" items="start">
            <GroupGames groupId={groupId} />
          </Flex>
          <Flex w="1/3" direction="row" items="start">
            <GroupMembers groupId={groupId} />
          </Flex>
        </Flex>
      </Page>
    </>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/teams/$groupId/")(
  {
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
    component: GroupIdView,
  },
);
