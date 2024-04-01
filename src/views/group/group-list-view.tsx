import { Flex } from "@/components/ui/flex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gamesQueryOptions } from "@/queries/games";
import { Group } from "./group-view";

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
