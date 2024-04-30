import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  WithTooltip,
  formatDuration,
} from "@rivet-gg/components";
import { LobbyStatusBadge } from "../components/lobby-status";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameRegionsQueryOptions,
  gameNamespaceLobbiesLiveQueryOptions,
} from "../queries";
import { Rivet } from "@rivet-gg/api";
import { type LobbyStatus } from "../data/lobby-status";
import { LobbyRegion } from "../components/lobby-region";
import { useNavigate } from "@tanstack/react-router";
import { MatchmakerLobbyBreadcrumbs } from "../components/lobby-logs-breadcrumbs";
import { useEffect, useState } from "react";

interface UptimeProps {
  createTs: Date;
}

function Uptime({ createTs }: UptimeProps) {
  const [uptime, setUptime] = useState(() => Date.now() - createTs.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(Date.now() - createTs.getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [createTs]);

  return <>{formatDuration(uptime)}</>;
}

interface LobbyRowProps extends Rivet.cloud.LobbySummaryAnalytics {
  readableStatus: LobbyStatus;
  regions: Rivet.cloud.RegionSummary[];
  gameId: string;
  namespaceId: string;
}

function LobbyRow({
  lobbyId,
  lobbyGroupNameId,
  createTs,
  readableStatus,
  regionId,
  regions,
  gameId,
  totalPlayerCount,
  maxPlayersNormal,
  maxPlayersDirect,
  maxPlayersParty,
  namespaceId,
}: LobbyRowProps) {
  const region = regions.find((region) => region.regionId === regionId);

  const navigate = useNavigate();

  return (
    <TableRow
      isClickable
      onClick={() =>
        navigate({
          to: "/games/$gameId/namespaces/$namespaceId/matchmaker/logs/$lobbyId",
          params: { lobbyId, namespaceId, gameId },
        })
      }
    >
      <TableCell>
        <LobbyRegion region={region?.universalRegion || "unknown"} />
      </TableCell>
      <TableCell>{lobbyGroupNameId}</TableCell>
      <TableCell>
        {
          <WithTooltip
            content={createTs.toLocaleString()}
            trigger={
              <div>
                <Uptime createTs={createTs} />
              </div>
            }
          />
        }
      </TableCell>
      <TableCell>
        {totalPlayerCount} /{" "}
        <WithTooltip
          content="Normal / Direct / Party max players"
          trigger={
            <span>
              ({maxPlayersNormal}/{maxPlayersDirect}/{maxPlayersParty})
            </span>
          }
        />
      </TableCell>
      <TableCell>
        <LobbyStatusBadge status={readableStatus} />
      </TableCell>
    </TableRow>
  );
}

interface NamespaceMatchmakerLobbiesProps {
  gameId: string;
  namespaceId: string;
}

export function NamespaceMatchmakerLobbies({
  gameId,
  namespaceId,
}: NamespaceMatchmakerLobbiesProps) {
  const { data: regions } = useSuspenseQuery(gameRegionsQueryOptions(gameId));

  const {
    data: { lobbies },
  } = useSuspenseQuery(
    gameNamespaceLobbiesLiveQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MatchmakerLobbyBreadcrumbs
            title="Lobby"
            gameId={gameId}
            namespaceId={namespaceId}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lobbies.map((lobby) => (
              <LobbyRow
                key={lobby.lobbyId}
                {...lobby}
                regions={regions}
                gameId={gameId}
                namespaceId={namespaceId}
              />
            ))}
            {lobbies.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No lobbies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
