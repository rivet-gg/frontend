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
    onSuccess: async (_, variables) => {
      return Promise.all([
        queryClient.invalidateQueries(
          groupMembersQueryOptions(variables.groupId),
        ),
        queryClient.invalidateQueries(gamesQueryOptions()),
      ]);
    },
    mutationFn: ({
      groupId,
      ...data
    }: Rivet.group.UpdateProfileRequest & { groupId: string }) =>
      rivetClient.group.updateProfile(groupId, data),
  });
};
