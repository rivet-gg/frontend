import {
  gameNamespaceLogsLobbiesQueryOptions,
  gameRegionsQueryOptions,
} from "@/domains/game/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function MatchmakerLogsView() {
  const { gameId, namespaceId } = Route.useParams();

  const { data: regions } = useSuspenseQuery(gameRegionsQueryOptions(gameId));

  const { data: lobbies } = useSuspenseQuery(
    gameNamespaceLogsLobbiesQueryOptions({ gameId, namespaceId }),
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Group Name</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Ready</TableHead>
          <TableHead>Started</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lobbies.map((lobby) => (
          <TableRow key={lobby.lobbyId}>
            <TableCell>{lobby.lobbyGroupNameId}</TableCell>
            <TableCell>
              {
                regions.find((region) => region.regionId === lobby.regionId)
                  ?.regionDisplayName
              }
            </TableCell>
            <TableCell>{lobby.createTs.toLocaleString()}</TableCell>
            <TableCell>{lobby.readyTs?.toLocaleString()}</TableCell>
            <TableCell>{lobby.startTs?.toLocaleString()}</TableCell>
            <TableCell>unknown</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/logs",
)({
  component: MatchmakerLogsView,
});
