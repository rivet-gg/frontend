import { rivetClient, rivetEeClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import { queryOptions } from "@tanstack/react-query";

export const groupMembersQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ["group", groupId],
    queryFn: ({ meta }) =>
      rivetClient.group.getMembers(groupId, {
        watchIndex: getMetaWatchIndex(meta),
      }),
  });
};

export const groupBillingQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ["group", groupId, "billing"],
    queryFn: () => rivetEeClient.ee.cloud.groups.billing.get(groupId),
  });
};

export const groupInviteQueryOptions = (inviteId: string) => {
  return queryOptions({
    queryKey: ["groupInvite", inviteId],
    queryFn: () => rivetClient.group.invites.getInvite(inviteId),
  });
};

export const groupMemberQueryOptions = ({
  groupId,
  identityId,
}: {
  groupId: string;
  identityId: string;
}) => {
  return queryOptions({
    ...groupMembersQueryOptions(groupId),
    select: (data) =>
      data.members.find((m) => m.identity.identityId === identityId),
  });
};
