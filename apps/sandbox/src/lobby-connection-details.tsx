import { Code, Dd, Dl, Dt, Flex, H4 } from "@rivet-gg/components";
import { useLobbyConnection } from "./lobby-connection-context";

export function LobbyConnectionDetails() {
  const connection = useLobbyConnection();

  if (
    !connection ||
    !connection.mutationState ||
    !connection.mutationState.data
  ) {
    return null;
  }

  const {
    mutationState: {
      data: {
        lobby,
        ports: {
          default: { host },
        },
      },
    },
    state,
  } = connection;

  return (
    <Flex gap="2" direction="col" className="col-span-2">
      <H4>Lobby</H4>
      <Dl mt="2">
        <Dt>Lobby ID</Dt>
        <Dd>
          <Code>{lobby.lobbyId}</Code>
        </Dd>
        <Dt>Region</Dt>
        <Dd>
          {lobby.region.displayName} ({lobby.region.regionId})
        </Dd>
        <Dt>Host</Dt>
        <Dd>
          <Code>{host}</Code>
        </Dd>
        <Dt>Find duration</Dt>
        <Dd>TODO</Dd>
        <Dt>X-Forwarded-For</Dt>
        <Dd>
          <Code>{state.forwardedFor || "-"}</Code>
        </Dd>
      </Dl>
    </Flex>
  );
}
