import { gameNamespacesQueryOptions } from "@/domains/game/queries";
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
import { Icon, faPlus } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { GameNamespaceTableActions } from "../components/game-namespace-table-actions";

interface GameNamespacesViewProps {
  gameId: string;
}

export function GameNamespacesView({ gameId }: GameNamespacesViewProps) {
  const { data } = useSuspenseQuery(gameNamespacesQueryOptions(gameId));

  const navigate = useNavigate();

  return (
    <Card w="full">
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Environments</CardTitle>
          <Button variant="secondary" size="icon" asChild>
            <Link to="." search={{ modal: "create-environment" }}>
              <Icon icon={faPlus} />
            </Link>
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
                    to: "/games/$gameId/environments/$namespaceId",
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
