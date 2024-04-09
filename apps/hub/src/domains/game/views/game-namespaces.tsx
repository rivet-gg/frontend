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
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((namespace) => (
              <TableRow key={namespace.namespaceId}>
                <TableCell>{namespace.displayName}</TableCell>
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
