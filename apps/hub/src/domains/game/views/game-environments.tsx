import { gameEnvironmentsQueryOptions } from "@/domains/game/queries";
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
import { GameEnvironmentTableActions } from "../components/game-environment-table-actions";

interface GameEnvironmentsViewProps {
  gameId: string;
}

export function GameEnvironmentsView({ gameId }: GameEnvironmentsViewProps) {
  const { data } = useSuspenseQuery(gameEnvironmentsQueryOptions(gameId));

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
            {data.map((environment) => (
              <TableRow
                key={environment.namespaceId}
                isClickable
                onClick={() => {
                  navigate({
                    to: "/games/$gameId/environments/$environmentId",
                    params: {
                      gameId,
                      environmentId: environment.namespaceId,
                    },
                  });
                }}
              >
                <TableCell>
                  <Text>{environment.displayName}</Text>
                </TableCell>
                <TableCell>
                  <Code>{environment.nameId}</Code>
                </TableCell>
                <TableCell>
                  <Badge>{environment.version?.displayName}</Badge>
                </TableCell>
                <TableCell>
                  <GameEnvironmentTableActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
