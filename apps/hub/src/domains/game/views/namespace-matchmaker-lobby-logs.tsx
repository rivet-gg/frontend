import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Grid,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  ValueDisplay,
  WithTooltip,
  formatDuration,
  formatExitCodeMessage,
} from "@rivet-gg/components";
import { LobbyStatusBadge } from "../components/lobby-status";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameRegionsQueryOptions,
  gameNamespaceLogsLobbiesQueryOptions,
  gameNamespaceLogsLobbyQueryOptions,
} from "../queries";
import { LobbyRegion } from "../components/lobby-region";
import { Link, useNavigate } from "@tanstack/react-router";
import { LobbyLogs } from "../components/lobby-logs";

interface NamespaceMatchmakerLobbyLogsProps {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

export function NamespaceMatchmakerLobbyLogs({
  gameId,
  namespaceId,
  lobbyId,
}: NamespaceMatchmakerLobbyLogsProps) {
  const navigate = useNavigate();

  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );
  const { data: lobby } = useSuspenseQuery(
    gameNamespaceLogsLobbyQueryOptions({ gameId, namespaceId, lobbyId }),
  );

  const { data: regions } = useSuspenseQuery(gameRegionsQueryOptions(gameId));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Flex items="center">
              <span className="w-full">
                <Link
                  to="/games/$gameId/namespaces/$namespaceId/matchmaker/logs/"
                  params={{ gameId, namespaceId }}
                >
                  Logs
                </Link>{" "}
                /
              </span>
              <Select
                value={lobbyId}
                onValueChange={(newLobbyId) => {
                  navigate({
                    to: `/games/$gameId/namespaces/$namespaceId/matchmaker/logs/$lobbyId`,
                    params: { gameId, namespaceId, lobbyId: newLobbyId },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expiration" />
                </SelectTrigger>
                <SelectContent>
                  {lobbies.map((lobby) => {
                    const region = regions.find(
                      (region) => region.regionId === lobby.regionId,
                    );
                    return (
                      <SelectItem key={lobby.lobbyId} value={lobby.lobbyId}>
                        <Flex gap="2">
                          <LobbyRegion
                            region={region?.universalRegion || "unknown"}
                          />{" "}
                          {lobby.lobbyGroupNameId} ({lobby.lobbyId})
                          <LobbyStatusBadge status={lobby.readableStatus} />
                        </Flex>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </Flex>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Flex gap="4" direction="col" mb="6">
            <Grid columns="4" gap="4">
              <ValueDisplay
                label="Status"
                value={<LobbyStatusBadge status={lobby.lobby.readableStatus} />}
              />
              {lobby.lobby.status.stopped ? (
                <ValueDisplay
                  label="Exit code"
                  value={
                    <WithTooltip
                      content={formatExitCodeMessage(
                        lobby.lobby.status.stopped.exitCode,
                      )}
                      trigger={
                        <Badge variant="outline">
                          {lobby.lobby.status.stopped.exitCode}
                        </Badge>
                      }
                    />
                  }
                />
              ) : null}
            </Grid>
            <Grid columns="4" gap="4">
              <ValueDisplay
                label="Created at"
                value={lobby.lobby.createTs?.toLocaleString() || "-"}
              />
              <ValueDisplay
                label="Started at"
                value={lobby.lobby.startTs?.toLocaleString() || "-"}
              />
              <ValueDisplay
                label="Ready at"
                value={lobby.lobby.readyTs?.toLocaleString() || "-"}
              />
              <ValueDisplay
                label="Stopped / finished at"
                value={
                  lobby.lobby.status.stopped?.stopTs?.toLocaleString() || "-"
                }
              />
            </Grid>
            <Grid columns="4" gap="4">
              {lobby.lobby.status.stopped ? (
                <ValueDisplay
                  label="Duration"
                  value={formatDuration(
                    lobby.lobby.status.stopped.stopTs.getTime() -
                      lobby.lobby.createTs.getTime(),
                    { showSeconds: true },
                  )}
                />
              ) : (
                <ValueDisplay
                  label="Since created"
                  value={formatDuration(
                    Date.now() - lobby.lobby.createTs.getTime(),
                    { showSeconds: true },
                  )}
                />
              )}
              {lobby.lobby.startTs ? (
                <ValueDisplay
                  label="Start duration"
                  value={formatDuration(
                    lobby.lobby.startTs?.getTime() -
                      lobby.lobby.createTs.getTime(),
                    { showSeconds: true },
                  )}
                />
              ) : null}
              {lobby.lobby.readyTs ? (
                <ValueDisplay
                  label="Ready duration"
                  value={formatDuration(
                    lobby.lobby.readyTs?.getTime() -
                      lobby.lobby.createTs.getTime(),
                    { showSeconds: true },
                  )}
                />
              ) : null}
            </Grid>
          </Flex>
          <Separator />
          <LobbyLogs lobbyId={lobbyId} gameId={gameId} />
        </CardContent>
      </Card>
    </>
  );
}
