import { gameNamespacesQueryOptions } from "@/queries/games";
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

interface GameNamespacesProps {
  gameId: string;
}

export function GameNamespaces({ gameId }: GameNamespacesProps) {
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
