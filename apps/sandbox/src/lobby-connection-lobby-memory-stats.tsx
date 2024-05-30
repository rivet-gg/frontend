import { Badge, Dd, Dl, Dt, Flex, H4 } from "@rivet-gg/components";
import { Fragment } from "react/jsx-runtime";
import { useLobbyConnection } from "./lobby-connection-context";

const formatter = Intl.NumberFormat("en-US", {});

export function LobbyConnectionLobbyMemoryStats() {
  const connection = useLobbyConnection();
  if (!connection || !connection.connectionState) {
    return null;
  }

  const { state } = connection;

  return (
    <Flex gap="2" direction="col">
      <H4>Memory stats</H4>
      <Dl>
        {state.stats?.memory ? (
          Object.entries(state.stats.memory).map(([key, value]) => (
            <Fragment key={key}>
              <Dt>{key}</Dt>
              <Dd>
                <Badge variant="outline">
                  {formatter.format(Number.parseInt(value, 10))}B
                </Badge>
              </Dd>
            </Fragment>
          ))
        ) : (
          <Dd>Not available yet</Dd>
        )}
      </Dl>
    </Flex>
  );
}
