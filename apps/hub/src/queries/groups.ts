import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient, rivetClient } from "./global";
import { Rivet } from "@rivet-gg/api";
import { gamesQueryOptions } from "./games";

export const groupMembersQueryOptions = (groupId: string) => {
  return queryOptions({
    queryKey: ["group", groupId],
    queryFn: () => rivetClient.group.getMembers(groupId),
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
