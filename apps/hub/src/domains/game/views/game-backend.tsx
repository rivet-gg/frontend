import { useDialog } from "@/hooks/use-dialog";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Link,
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
import { Plus } from "lucide-react";
import { GameBackendEnvTableActions } from "../components/game-backend-env-table-actions";
import { gameBackendProjectEnvsQueryOptions } from "../queries";

interface GameBackendViewProps {
  projectId: string;
  gameId: string;
}

export function GameBackendView({ projectId, gameId }: GameBackendViewProps) {
  const { data } = useSuspenseQuery(
    gameBackendProjectEnvsQueryOptions(projectId),
  );

  const { open, dialog } = useDialog.CreateBackendEnv({ projectId, gameId });

  const navigate = useNavigate();

  return (
    <Card w="full">
      {dialog}
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Environments</CardTitle>
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
              <TableHead>Url</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Text textAlign="center">There's no environments yet.</Text>
                </TableCell>
              </TableRow>
            ) : null}
            {data.map((env) => (
              <TableRow
                key={env.environmentId}
                isClickable
                onClick={() => {
                  navigate({
                    to: "/games/$gameId/backend/$environmentId",
                    params: { gameId, environmentId: env.environmentId },
                  });
                }}
              >
                <TableCell>{env.displayName}</TableCell>
                <TableCell>
                  <Link href={`https://${env.nameId}.opengb.rivet.gg`}>
                    {env.nameId}.opengb.rivet.gg
                  </Link>
                </TableCell>
                <TableCell>
                  <GameBackendEnvTableActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
