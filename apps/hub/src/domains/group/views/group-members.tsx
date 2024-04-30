import { groupMembersQueryOptions } from "@/domains/group/queries";
import {
  Button,
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
import { Link } from "@tanstack/react-router";

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
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Members</CardTitle>
          <Button asChild variant="secondary">
            <Link search={{ modal: "invite" }}>Invite</Link>
          </Button>
        </Flex>
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
                  <Crown className="text-primary w-4" />
                )}
              </Flex>
            </Flex>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
