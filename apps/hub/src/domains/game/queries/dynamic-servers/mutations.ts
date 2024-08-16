import { rivetClient } from "@/queries/global";
import { useMutation } from "@tanstack/react-query";

export function useDestroyServerMutation() {
  return useMutation({
    mutationFn: (opts: {
      gameId: string;
      environmentId: string;
      serverId: string;
    }) =>
      rivetClient.servers.destroy(
        opts.gameId,
        opts.environmentId,
        opts.serverId,
      ),
  });
}
