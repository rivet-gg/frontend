import { faUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  CardHeader,
  CardTitle,
  Flex,
  LogsSelect,
  SmallText,
  Text,
  Uptime,
  WithTooltip,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { LiveLobbyLogs, LobbyLogs } from "../queries";
import { LobbyRegion } from "./lobby-region";
import { LobbyStatusBadge } from "./lobby-status";
import { LobbySummary } from "./lobby-summary";

interface LobbyListLogsPreviewProps {
  lobbies: (LobbyLogs | LiveLobbyLogs)[];
  lobbyId?: string;
  gameId: string;
  namespaceId: string;
  sort?: ReactNode;
}

export function LobbyListLogsPreview({
  lobbies,
  lobbyId,
  gameId,
  sort,
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
          <CardHeader>
            <Flex gap="2" items="center" justify="between">
              <CardTitle>Lobbies</CardTitle>
              {sort}
            </Flex>
          </CardHeader>
          <div className="px-6 pb-6 w-full flex flex-col gap-2">
            {lobbies.map((lobby) => (
              <Button
                key={lobby.lobbyId}
                variant={lobbyId === lobby.lobbyId ? "secondary" : "outline"}
                asChild
              >
                <Link search={(old) => ({ ...old, lobbyId: lobby.lobbyId })}>
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
                        <WithTooltip
                          trigger={
                            <SmallText>
                              <Uptime createTs={lobby.createTs} />
                            </SmallText>
                          }
                          content={lobby.createTs.toLocaleString()}
                        />
                      )}
                    </SmallText>
                  </Flex>
                </Link>
              </Button>
            ))}
          </div>
        </>
      }
      content={
        <div className="p-6">
          {!lobbyId ? (
            <Text my="10" textAlign="center">
              Please select select lobby.
            </Text>
          ) : (
            <LobbySummary
              gameId={gameId}
              namespaceId={namespaceId}
              lobbyId={lobbyId}
            />
          )}
        </div>
      }
    />
  );
}
