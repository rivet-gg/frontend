import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "./global";

export const groupMembersQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ["group", groupId],
    queryFn: () => rivetClient.group.getMembers(groupId),
  });
};
