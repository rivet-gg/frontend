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
import { GroupMemberSettingsMenu } from "../components/group-member-settings-menu";
import { useGroupMemberTransferOwnership } from "../hooks/use-group-member-transfer-ownership";
import { useGroupMemberKick } from "../hooks/use-group-member-kick";
import { useGroupMemberBan } from "../hooks/use-group-member-ban";
import { useGroupInvite } from "../hooks/use-group-invite";

interface GroupDetailedMembersProps {
  groupId: string;
}

export function GroupDetailedMembers({ groupId }: GroupDetailedMembersProps) {
  const { data: groupOwnerIdentityId } = useSuspenseQuery(
    groupOnwerQueryOptions(groupId),
  );
  const { data } = useSuspenseQuery(groupMembersQueryOptions(groupId));

  const { confirmTransferOwnership, dialog: confirmTransferOwnershipDialog } =
    useGroupMemberTransferOwnership(groupId);

  const { confirmMemberKick, dialog: confirmMemberKickDialog } =
    useGroupMemberKick(groupId);

  const { confirmMemberBan, dialog: confirmMemberBanDialog } =
    useGroupMemberBan(groupId);

  const { openGroupInviteDialog, dialog: groupInviteDialog } =
    useGroupInvite(groupId);

  return (
    <Card w="full">
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Members</CardTitle>
          <Button variant="secondary" onClick={openGroupInviteDialog}>
            Invite
          </Button>
        </Flex>
      </CardHeader>
      <CardContent>
        {confirmTransferOwnershipDialog}
        {confirmMemberKickDialog}
        {confirmMemberBanDialog}
        {groupInviteDialog}
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
                onKick={confirmMemberKick}
                onBan={confirmMemberBan}
              />
            </Flex>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
