import { gameNamespacesQueryOptions } from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Code,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { GameNamespaceTableActions } from "../components/game-namespace-table-actions";

interface GameNamespacesViewProps {
  gameId: string;
}

export function GameNamespacesView({ gameId }: GameNamespacesViewProps) {
  const { data } = useSuspenseQuery(gameNamespacesQueryOptions(gameId));

  const { open, dialog } = useDialog.CreateNamespace({ gameId });

  const navigate = useNavigate();

  return (
    <Card w="full">
      {dialog}
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Namespaces</CardTitle>
          <Button variant="secondary" size="icon" onClick={open}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Flex>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead w="1/2">Name</TableHead>
              <TableHead w="1/2">Slug</TableHead>
              <TableHead>Version</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((namespace) => (
              <TableRow
                key={namespace.namespaceId}
                isClickable
                onClick={() => {
                  navigate({
                    to: "/games/$gameId/namespaces/$namespaceId",
                    params: { gameId, namespaceId: namespace.namespaceId },
                  });
                }}
              >
                <TableCell>
                  <Text>{namespace.displayName}</Text>
                </TableCell>
                <TableCell>
                  <Code>{namespace.nameId}</Code>
                </TableCell>
                <TableCell>
                  <Badge>{namespace.version?.displayName}</Badge>
                </TableCell>
                <TableCell>
                  <GameNamespaceTableActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
