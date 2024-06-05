import { useDialog } from "@/hooks/use-dialog";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { GameBackendEnvTableActions } from "../components/game-backend-env-table-actions";
import { GameBackendDeploymentLink } from "../components/game-backend/game-backend-deployment-link";
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
            <FontAwesomeIcon icon={faPlus} />
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
                  <GameBackendDeploymentLink
                    gameId={gameId}
                    environmentNameId={env.nameId}
                  />
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
