import { groupMembersQueryOptions } from "@/queries/groups";
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
import { UserAvatar } from "../user/user-avatar";

interface GroupMembersProps {
  groupId: string;
}

export function GroupMembers({ groupId }: GroupMembersProps) {
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
              <Grid>
                <Text>{member.identity.displayName}</Text>
              </Grid>
            </Flex>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
