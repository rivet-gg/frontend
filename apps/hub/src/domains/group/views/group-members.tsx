import { groupMembersQueryOptions } from "@/domains/group/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Grid,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserAvatar } from "../../user/components/user-avatar";
import { groupOnwerQueryOptions } from "@/domains/game/queries";
import { Crown } from "lucide-react";

interface GroupMembersProps {
  groupId: string;
}

export function GroupMembers({ groupId }: GroupMembersProps) {
  const { data: groupOwnerIdentityId } = useSuspenseQuery(
    groupOnwerQueryOptions(groupId),
  );
  const { data } = useSuspenseQuery(groupMembersQueryOptions(groupId));

  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Grid gap="4">
          {data.members.map((member) => (
            <Flex
              key={member.identity.identityId}
              direction="row"
              gap="4"
              items="center"
            >
              <UserAvatar {...member.identity} />
              <Flex gap="2" items="center">
                <Text>{member.identity.displayName}</Text>
                {groupOwnerIdentityId === member.identity.identityId && (
                  <Crown className="w-4 text-primary" />
                )}
              </Flex>
            </Flex>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
