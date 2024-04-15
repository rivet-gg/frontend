import { useSuspenseQuery } from "@tanstack/react-query";
import { gamesQueryOptions } from "@/domains/game/queries";
import { Group } from "../components/group";
import { Flex } from "@rivet-gg/components";
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
