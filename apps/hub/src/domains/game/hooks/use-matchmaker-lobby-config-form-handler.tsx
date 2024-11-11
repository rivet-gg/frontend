import type { SubmitHandler } from "@/domains/game/forms/matchmaker-lobby-config-form";
import { validateAgainstApi } from "@/lib/async-validation";
import { rivetClient } from "@/queries/global";
import { useCallback } from "react";
import { useEnvironmentMatchmakerUpdateConfigMutation } from "../queries";

interface UseMatchmakerLobbyConfigFormHandlerProps {
  gameId: string;
  environmentId: string;
}

export function useMatchmakerLobbyConfigFormHandler({
  gameId,
  environmentId,
}: UseMatchmakerLobbyConfigFormHandlerProps) {
  const { mutateAsync } = useEnvironmentMatchmakerUpdateConfigMutation();

  return useCallback<SubmitHandler>(
    async (values, form) => {
      const res =
        await rivetClient.cloud.games.namespaces.validateGameNamespaceMatchmakerConfig(
          gameId,
          environmentId,
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
        await mutateAsync({ ...values, environmentId, gameId });
      } catch {
        form.setError("lobbyCountMax", {
          type: "manual",
          message: "An error occurred while saving the config",
        });
      }
    },
    [gameId, mutateAsync, environmentId],
  );
}
