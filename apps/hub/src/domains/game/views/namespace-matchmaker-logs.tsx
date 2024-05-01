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
} from "@rivet-gg/components";
import { LobbyStatusBadge } from "../components/lobby-status";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameRegionsQueryOptions,
  gameNamespaceLogsLobbiesQueryOptions,
} from "../queries";
import { Rivet } from "@rivet-gg/api";
import { type LobbyStatus } from "../data/lobby-status";
import { LobbyRegion } from "../components/lobby-region";
import { useNavigate } from "@tanstack/react-router";
import { MatchmakerLobbyBreadcrumbs } from "../components/lobby-logs-breadcrumbs";

interface LobbyRowProps extends Rivet.cloud.LogsLobbySummary {
  readableStatus: LobbyStatus;
  regions: Rivet.cloud.RegionSummary[];
  gameId: string;
  namespaceId: string;
}

function LobbyRow({
  lobbyId,
  lobbyGroupNameId,
  createTs,
  readyTs,
  status,
  startTs,
  readableStatus,
  regionId,
  regions,
  gameId,
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
      <TableCell>{createTs.toLocaleString()}</TableCell>
      <TableCell display={{ initial: "hidden", md: "table-cell" }}>
        {readyTs?.toLocaleString() || "-"}
      </TableCell>
      <TableCell display={{ initial: "hidden", md: "table-cell" }}>
        {startTs?.toLocaleString() || "-"}
      </TableCell>
      <TableCell display={{ initial: "hidden", md: "table-cell" }}>
        {status.stopped?.stopTs?.toLocaleString() || "-"}
      </TableCell>
      <TableCell>
        <LobbyStatusBadge status={readableStatus} />
      </TableCell>
    </TableRow>
  );
}

interface NamespaceMatchmakerLogsProps {
  gameId: string;
  namespaceId: string;
}

export function NamespaceMatchmakerLogs({
  gameId,
  namespaceId,
}: NamespaceMatchmakerLogsProps) {
  const { data: regions } = useSuspenseQuery(gameRegionsQueryOptions(gameId));

  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MatchmakerLobbyBreadcrumbs
            title="Logs"
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
              <TableHead>Created</TableHead>
              <TableHead display={{ initial: "hidden", md: "table-cell" }}>
                Ready
              </TableHead>
              <TableHead display={{ initial: "hidden", md: "table-cell" }}>
                Started
              </TableHead>
              <TableHead display={{ initial: "hidden", md: "table-cell" }}>
                Stopped / Finished
              </TableHead>
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
                <TableCell colSpan={7} className="text-center">
                  No lobby logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
