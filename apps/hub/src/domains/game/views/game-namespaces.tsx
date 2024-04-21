import { gameNamespacesQueryOptions } from "@/domains/game/queries";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";

interface GameNamespacesViewProps {
  gameId: string;
}

export function GameNamespacesView({ gameId }: GameNamespacesViewProps) {
  const { data } = useSuspenseQuery(gameNamespacesQueryOptions(gameId));

  const { open, dialog } = useDialog.CreateNamespace({ gameId });

  return (
    <Card w="full">
      {dialog}
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Namespaces</CardTitle>
          <Button variant="secondary" size="icon" onClick={open}>
            <Plus />
          </Button>
        </Flex>
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
                    to="/games/$gameId/namespaces/$namespaceId/"
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
