import { gamesQueryOptions } from "@/domains/game/queries";
import { groupMembersQueryOptions } from "@/domains/group/queries";
import { rivetClient, queryClient } from "@/queries/global";
import { useMutation } from "@tanstack/react-query";
import { selfProfileQueryOptions } from "./query-options";
import { Rivet } from "@rivet-gg/api";

const useAvatarUploadCompleteMutation = () => {
  return useMutation({
    mutationFn: ({ uploadId }: { uploadId: string }) =>
      rivetClient.identity.completeAvatarUpload(uploadId),
    onSuccess() {
      return Promise.all([
        queryClient.invalidateQueries(selfProfileQueryOptions()),
      ]);
    },
  });
};

export const useAvatarUploadMutation = () => {
  const { mutateAsync } = useAvatarUploadCompleteMutation();
  return useMutation({
    mutationFn: ({ file }: { file: File }) =>
      rivetClient.identity.prepareAvatarUpload({
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
        uploadId: response.uploadId,
      });
    },
  });
};

export const useIdentityUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data: Rivet.identity.UpdateProfileRequest) =>
      rivetClient.identity.updateProfile(data),
    onSuccess: async () => {
      return Promise.all([
        queryClient.invalidateQueries(selfProfileQueryOptions()),
      ]);
    },
  });
};

export const useIdentityDeletionMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: (markDeletion: boolean) =>
      markDeletion
        ? rivetClient.identity.markDeletion()
        : rivetClient.identity.unmarkDeletion(),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(selfProfileQueryOptions()),
      ]);
      onSuccess?.();
      return;
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () =>
      rivetClient.auth.tokens.refreshIdentityToken({ logout: true }),
    onSettled: () => {
      return queryClient.resetQueries();
    },
  });
};
