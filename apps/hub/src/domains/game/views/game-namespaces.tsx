import { gameNamespacesQueryOptions } from "@/domains/game/queries";
import {
  Badge,
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
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

interface GameNamespacesViewProps {
  gameId: string;
}

export function GameNamespacesView({ gameId }: GameNamespacesViewProps) {
  const { data } = useSuspenseQuery(gameNamespacesQueryOptions(gameId));

  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Namespaces</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead w="full">Name</TableHead>
              <TableHead>Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((namespace) => (
              <TableRow key={namespace.namespaceId}>
                <TableCell>
                  <Link
                    to="/games/$gameId/namespaces/$namespaceId"
                    params={{ gameId, namespaceId: namespace.namespaceId }}
                  >
                    {namespace.displayName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge>{namespace.version?.displayName}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
