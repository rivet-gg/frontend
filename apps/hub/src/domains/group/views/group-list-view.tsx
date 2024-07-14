import { useAuth } from "@/domains/auth/contexts/auth";
import { gamesQueryOptions } from "@/domains/game/queries";
import { Flex } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Group } from "../components/group";
import { GroupCreateCard } from "../components/group-create-card";

export function GroupListView() {
  const { profile } = useAuth();
  const { data } = useSuspenseQuery(gamesQueryOptions());
  return (
    <Flex direction="col">
      {data.map((group) => (
        <Group key={group.groupId} {...group} />
      ))}
      {profile?.identity.isAdmin ? <GroupCreateCard /> : null}
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
