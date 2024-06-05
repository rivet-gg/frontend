import { faUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Flex,
  LogsSelect,
  SmallText,
  Text,
  Uptime,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { LiveLobbyLogs, LobbyLogs } from "../queries";
import { LobbyRegion } from "./lobby-region";
import { LobbyStatusBadge } from "./lobby-status";
import { LobbySummary } from "./lobby-summary";

interface LobbyListLogsPreviewProps {
  lobbies: (LobbyLogs | LiveLobbyLogs)[];
  lobbyId?: string;
  gameId: string;
  namespaceId: string;
}

export function LobbyListLogsPreview({
  lobbies,
  lobbyId,
  gameId,
  namespaceId,
}: LobbyListLogsPreviewProps) {
  if (lobbies.length === 0) {
    return (
      <Text my="10" textAlign="center">
        No lobbies found.
      </Text>
    );
  }

  return (
    <LogsSelect
      list={
        <>
          {lobbies.map((lobby) => (
            <Button
              key={lobby.lobbyId}
              variant={lobbyId === lobby.lobbyId ? "secondary" : "outline"}
              asChild
            >
              <Link search={{ lobbyId: lobby.lobbyId }}>
                <Flex gap="2" items="center" w="full">
                  <Badge variant="outline">
                    <LobbyRegion gameId={gameId} regionId={lobby.regionId} />
                  </Badge>
                  <LobbyStatusBadge status={lobby.readableStatus} />
                  <span className="flex-1 text-left">
                    {lobby.lobbyGroupNameId}
                  </span>
                  {"totalPlayerCount" in lobby ? (
                    <Badge variant="outline">
                      <Flex gap="2">
                        <span>
                          {lobby.totalPlayerCount} / {lobby.maxPlayersNormal}
                        </span>

                        <FontAwesomeIcon className="size-4" icon={faUsers} />
                      </Flex>
                    </Badge>
                  ) : null}
                  <SmallText>
                    {["closed", "failed"].includes(lobby.readableStatus) ? (
                      lobby.createTs.toLocaleString()
                    ) : (
                      <Uptime createTs={lobby.createTs} />
                    )}
                  </SmallText>
                </Flex>
              </Link>
            </Button>
          ))}
        </>
      }
      content={
        !lobbyId ? (
          <Text my="10" textAlign="center">
            Please select select lobby.
          </Text>
        ) : (
          <LobbySummary
            gameId={gameId}
            namespaceId={namespaceId}
            lobbyId={lobbyId}
          />
        )
      }
    />
  );
}
