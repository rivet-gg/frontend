import { rivetClient } from "@/queries/global";
import { useCallback } from "react";
import { useNamepsaceMatchmakerUpdateConfigMutation } from "../queries";
import { SubmitHandler } from "@/domains/game/forms/matchmaker-lobby-config-form";
import { validateAgainstApi } from "@/lib/async-validation";

interface UseMatchmakerLobbyConfigFormHandlerProps {
  gameId: string;
  namespaceId: string;
}

export function useMatchmakerLobbyConfigFormHandler({
  gameId,
  namespaceId,
}: UseMatchmakerLobbyConfigFormHandlerProps) {
  const { mutateAsync } = useNamepsaceMatchmakerUpdateConfigMutation();

  return useCallback<SubmitHandler>(
    async (values, form) => {
      const res =
        await rivetClient.cloud.games.namespaces.validateGameNamespaceMatchmakerConfig(
          gameId,
          namespaceId,
          values,
        );

      const { isValid } = validateAgainstApi({
        group: "GAME_NAMESPACE_CONFIG",
        errors: res.errors,
      }).setFormErrors(form, {
        lobbyCountMax: "lobby-count",
        maxPlayers: "max-players",
      });

      if (!isValid) return;

      try {
        await mutateAsync({ ...values, namespaceId, gameId });
      } catch {
        form.setError("lobbyCountMax", {
          type: "manual",
          message: "An error occurred while saving the config",
        });
      }
    },
    [gameId, mutateAsync, namespaceId],
  );
}
