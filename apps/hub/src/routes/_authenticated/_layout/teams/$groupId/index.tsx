import { GroupGames } from "@/domains/group/views/group-games";
import { GroupMembers } from "@/domains/group/views/group-members";
import { Flex } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function GroupIdView() {
  const { groupId } = Route.useParams();
  return (
    <Flex direction={{ initial: "col", md: "row" }} gap="4">
      <Flex w={{ initial: "full", md: "2/3" }} direction="row" items="start">
        <GroupGames groupId={groupId} />
      </Flex>
      <Flex w={{ initial: "full", md: "1/3" }} direction="row" items="start">
        <GroupMembers groupId={groupId} />
      </Flex>
    </Flex>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/teams/$groupId/")(
  {
    component: GroupIdView,
  },
);
