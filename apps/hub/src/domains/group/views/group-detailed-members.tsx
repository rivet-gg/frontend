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
import { useGroupMemberTransferOwnershipDialog } from "../hooks/use-group-member-transfer-ownership-dialog";
import { useGroupMemberKickDialog } from "../hooks/use-group-member-kick-dialog";
import { useGroupMemberBanDialog } from "../hooks/use-group-member-ban-dialog";
import { useGroupInviteDialog } from "../hooks/use-group-invite-dialog";

interface GroupDetailedMembersProps {
  groupId: string;
}

export function GroupDetailedMembers({ groupId }: GroupDetailedMembersProps) {
  const { data: groupOwnerIdentityId } = useSuspenseQuery(
    groupOnwerQueryOptions(groupId),
  );
  const { data } = useSuspenseQuery(groupMembersQueryOptions(groupId));

  const { confirmTransferOwnership, dialog: confirmTransferOwnershipDialog } =
    useGroupMemberTransferOwnershipDialog(groupId);

  const { confirmMemberKick, dialog: confirmMemberKickDialog } =
    useGroupMemberKickDialog(groupId);

  const { confirmMemberBan, dialog: confirmMemberBanDialog } =
    useGroupMemberBanDialog(groupId);

  const { openGroupInviteDialog, dialog: groupInviteDialog } =
    useGroupInviteDialog(groupId);

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
