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
import { GroupMemberSettingsMenu } from "../components/group-member-settings-menu";
import { useGroupMemberTransferOwnership } from "../hooks/use-group-member-transfer-ownership";

interface GroupDetailedMembersProps {
  groupId: string;
}

export function GroupDetailedMembers({ groupId }: GroupDetailedMembersProps) {
  const { data: groupOwnerIdentityId } = useSuspenseQuery(
    groupOnwerQueryOptions(groupId),
  );
  const { data } = useSuspenseQuery(groupMembersQueryOptions(groupId));

  const { confirmTransferOwnership, dialog } =
    useGroupMemberTransferOwnership();

  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        {dialog}
        <Grid gap="4">
          {data.members.map((member) => (
            <Flex
              key={member.identity.identityId}
              direction="row"
              gap="4"
              items="center"
            >
              <Flex w="full" gap="4">
                <UserAvatar {...member.identity} />
                <Flex gap="2" items="center">
                  <Text>{member.identity.displayName}</Text>
                  {groupOwnerIdentityId === member.identity.identityId && (
                    <Crown className="w-4 text-primary" />
                  )}
                </Flex>
              </Flex>
              <GroupMemberSettingsMenu
                identityId={member.identity.identityId}
                groupId={groupId}
                onTransferOwnership={confirmTransferOwnership}
              />
            </Flex>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
