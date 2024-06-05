import { gamesQueryOptions } from "@/domains/game/queries";
import { Flex } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Group } from "../components/group";
import { GroupCreateCard } from "../components/group-create-card";

export function GroupListView() {
  const { data } = useSuspenseQuery(gamesQueryOptions());
  return (
    <Flex direction="col">
      {data.map((group) => (
        <Group key={group.groupId} {...group} />
      ))}
      <GroupCreateCard />
    </Flex>
  );
}

GroupListView.Skeleton = () => {
  return (
    <Flex direction="col">
      <Group.Skeleton />
      <Group.Skeleton />
      <Group.Skeleton />
    </Flex>
  );
};
