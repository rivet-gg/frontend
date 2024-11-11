import { useDialog } from "@/hooks/use-dialog";
import type { Rivet } from "@rivet-gg/api";
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
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import {
  gameEnvironmentsQueryOptions,
  gameVersionsQueryOptions,
} from "../queries";

interface EnvironmentVersionRowProps extends Rivet.cloud.version.Summary {
  isCurrent: boolean;
  deployedEnvironments: Rivet.cloud.NamespaceSummary[];
  gameId: string;
  environmentId: string;
}

function EnvironmentVersionRow({
  isCurrent,
  displayName,
  versionId,
  gameId,
  environmentId,
  createTs,
  deployedEnvironments,
}: EnvironmentVersionRowProps) {
  const { dialog, open } = useDialog.DeployEnvironmentVersion({
    gameId,
    versionId,
    environmentId,
  });
  return (
    <>
      {dialog}
      <TableRow>
        <TableCell>
          <Badge>{displayName}</Badge>
        </TableCell>
        <TableCell>
          <Text>{createTs.toLocaleString()}</Text>
        </TableCell>
        <TableCell>
          {deployedEnvironments.map((environment, index, array) => (
            <Fragment key={environment.namespaceId}>
              <Link
                to="/games/$gameId/environments/$environmentId"
                params={{
                  gameId,
                  environmentId: environment.namespaceId,
                }}
              >
                {environment.displayName}
              </Link>
              {index !== array.length - 1 ? (
                <Text asChild>
                  <span>{", "}</span>
                </Text>
              ) : null}
            </Fragment>
          ))}
        </TableCell>
        <TableCell>
          {isCurrent ? (
            <Button variant="outline" disabled>
              Current version
            </Button>
          ) : (
            <Button onClick={() => open()}>Deploy</Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

interface EnvironmentVersionsProps {
  gameId: string;
  environmentId: string;
}

export function EnvironmentVersions({
  gameId,
  environmentId,
}: EnvironmentVersionsProps) {
  const { data: versions } = useSuspenseQuery(gameVersionsQueryOptions(gameId));
  const { data: namespaces } = useSuspenseQuery(
    gameEnvironmentsQueryOptions(gameId),
  );
  const currentEnvironment = namespaces.find(
    (environment) => environment.namespaceId === environmentId,
  );

  return (
    <Card w="full">
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Versions</CardTitle>
        </Flex>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Deployed to</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {!versions || versions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Text>There's no versions yet.</Text>
                </TableCell>
              </TableRow>
            ) : null}
            {versions?.map((version) => {
              const isCurrentVersion =
                version.versionId === currentEnvironment?.versionId;
              const deployedEnvironments = namespaces.filter(
                (environment) => environment.versionId === version.versionId,
              );
              return (
                <EnvironmentVersionRow
                  key={version.versionId}
                  {...version}
                  isCurrent={isCurrentVersion}
                  gameId={gameId}
                  environmentId={environmentId}
                  deployedEnvironments={deployedEnvironments}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
