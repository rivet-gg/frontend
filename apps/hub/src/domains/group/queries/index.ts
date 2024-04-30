import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  queryClient,
  rivetClient,
  rivetEeClient,
} from "../../../queries/global";
import { Rivet } from "@rivet-gg/api";
import { gamesQueryOptions } from "../../game/queries";
import { getMetaWatchIndex } from "@/queries/utils";
import { toast } from "@rivet-gg/components";
import { isRivetError } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

export const groupMembersQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ["group", groupId],
    queryFn: ({ meta }) =>
      rivetClient.group.getMembers(groupId, {
        watchIndex: getMetaWatchIndex(meta),
      }),
    meta: {
      watch: true,
    },
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

export const useGroupUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: ({
      groupId,
      ...data
    }: Rivet.group.UpdateProfileRequest & { groupId: string }) =>
      rivetClient.group.updateProfile(groupId, data),
    onSuccess: async (_, variables) => {
      return Promise.all([
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
        queryClient.invalidateQueries(gamesQueryOptions()),
      ]);
    },
  });
};

const useAvatarUploadCompleteMutation = () => {
  return useMutation({
    mutationFn: ({
      groupId,
      uploadId,
    }: {
      groupId: string;
      uploadId: string;
    }) => rivetClient.group.completeAvatarUpload(groupId, uploadId),
    onSuccess(_, variables) {
      return Promise.all([
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
        queryClient.invalidateQueries(gamesQueryOptions()),
      ]);
    },
  });
};

export const useAvatarUploadMutation = (groupId: string) => {
  const { mutateAsync } = useAvatarUploadCompleteMutation();
  return useMutation({
    mutationFn: ({ file }: { file: File }) =>
      rivetClient.group.prepareAvatarUpload({
        mime: file.type,
        contentLength: file.size,
        path: file.name,
      }),
    onSuccess: async (response, data) => {
      await fetch(response.presignedRequest.url, {
        method: "PUT",
        body: data.file,
        mode: "cors",
        headers: {
          "Content-Type": data.file.type,
        },
      });
      await mutateAsync({
        groupId: groupId,
        uploadId: response.uploadId,
      });
    },
  });
};

export const useGroupTransferOwnershipMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      groupId,
      ...rest
    }: { groupId: string } & Rivet.group.TransferOwnershipRequest) =>
      rivetClient.group.transferOwnership(groupId, rest),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(gamesQueryOptions()),
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
      ]);
      onSuccess?.();
    },
  });
};

export const useGroupKickMemberMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      groupId,
      identityId,
    }: {
      groupId: string;
      identityId: string;
    }) => rivetClient.group.kickMember(groupId, identityId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(gamesQueryOptions()),
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
      ]);
      onSuccess?.();
    },
  });
};

export const useGroupBanMemberMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: ({
      groupId,
      identityId,
    }: {
      groupId: string;
      identityId: string;
    }) => rivetClient.group.banIdentity(groupId, identityId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries(gamesQueryOptions()),
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
      ]);
      onSuccess?.();
    },
  });
};

export const useGroupInviteMutation = () => {
  return useMutation({
    mutationFn: ({
      groupId,
      ...rest
    }: { groupId: string } & Rivet.group.CreateInviteRequest) =>
      rivetClient.group.invites.createInvite(groupId, rest),
  });
};

export const useGroupCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: Rivet.group.CreateResponse) => void;
} = {}) => {
  return useMutation({
    mutationFn: (data: Rivet.group.CreateRequest) =>
      rivetClient.group.create(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(gamesQueryOptions());
      onSuccess?.(data);
    },
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

export const useGroupInviteAcceptMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (inviteId: string) =>
      rivetClient.group.invites.consumeInvite(inviteId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(gamesQueryOptions());
      navigate({ to: "/teams/$groupId", params: { groupId: data.groupId! } });
    },
    onError: (error) => {
      if (isRivetError(error)) {
        return toast.error("Failed to accept invite", {
          description: error.body.message,
        });
      }
      return toast.error("Failed to accept invite.");
    },
  });
};
