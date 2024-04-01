import { useSuspenseQuery } from "@tanstack/react-query";
import { gamesQueryOptions } from "@/queries/games";
import { Group } from "./group-view";
import { Flex } from "@rivet-gg/components";

export function GroupListView() {
  const { data } = useSuspenseQuery(gamesQueryOptions());
  return (
    <Flex direction="col">
      {data.map((group) => (
        <Group key={group.groupId} {...group} />
      ))}
    </Flex>
  );
}
