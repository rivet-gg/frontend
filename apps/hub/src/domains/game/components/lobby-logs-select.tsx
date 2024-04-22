import {
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameNamespaceLogsLobbiesQueryOptions,
  gameRegionsQueryOptions,
} from "../queries";
import { LobbyRegion } from "./lobby-region";
import { LobbyStatusBadge } from "./lobby-status";

interface LobbyLogsSelectProps {
  onLobbySelect: (lobbyId: string) => void;
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

export function LobbyLogsSelect({
  lobbyId,
  gameId,
  namespaceId,
  onLobbySelect,
}: LobbyLogsSelectProps) {
  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );

  const { data: regions } = useSuspenseQuery(gameRegionsQueryOptions(gameId));

  return (
    <Select value={lobbyId} onValueChange={onLobbySelect}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select lobby" />
      </SelectTrigger>
      <SelectContent>
        {lobbies.map((lobby) => {
          const region = regions.find(
            (region) => region.regionId === lobby.regionId,
          );
          return (
            <SelectItem key={lobby.lobbyId} value={lobby.lobbyId}>
              <Flex gap="2">
                <LobbyRegion region={region?.universalRegion || "unknown"} />{" "}
                {lobby.lobbyGroupNameId} ({lobby.lobbyId})
                <LobbyStatusBadge status={lobby.readableStatus} />
              </Flex>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
