import * as MatchmakerLobbyConfigForm from "@/domains/game/forms/matchmaker-lobby-config-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatchmakerLobbyConfigFormHandler } from "../hooks/use-matchmaker-lobby-config-form-handler";
import { gameNamespaceQueryOptions } from "../queries";

interface MatchMakerLobbyConfigSettingsCardProps {
  gameId: string;
  namespaceId: string;
}

export function MatchMakerLobbyConfigSettingsCard({
  namespaceId,
  gameId,
}: MatchMakerLobbyConfigSettingsCardProps) {
  const { data } = useSuspenseQuery(
    gameNamespaceQueryOptions({ gameId, namespaceId }),
  );

  const handleSubmit = useMatchmakerLobbyConfigFormHandler({
    namespaceId,
    gameId,
  });

  return (
    <MatchmakerLobbyConfigForm.Form
      onSubmit={handleSubmit}
      defaultValues={{
        maxPlayers: data.namespace.config.matchmaker.maxPlayersPerClient,
        lobbyCountMax: data.namespace.config.matchmaker.lobbyCountMax,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Config</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex gap="4" direction="col">
            <MatchmakerLobbyConfigForm.LobbyCountMax />
            <MatchmakerLobbyConfigForm.MaxPlayers />
          </Flex>
        </CardContent>
        <CardFooter>
          <MatchmakerLobbyConfigForm.Submit>
            Save
          </MatchmakerLobbyConfigForm.Submit>
        </CardFooter>
      </Card>
    </MatchmakerLobbyConfigForm.Form>
  );
}
