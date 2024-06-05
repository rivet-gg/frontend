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
  gameNamespacesQueryOptions,
  gameVersionsQueryOptions,
} from "../queries";

interface NamespaceVersionRowProps extends Rivet.cloud.version.Summary {
  isCurrent: boolean;
  deployedNamespaces: Rivet.cloud.NamespaceSummary[];
  gameId: string;
  namespaceId: string;
}

function NamespaceVersionRow({
  isCurrent,
  displayName,
  versionId,
  gameId,
  namespaceId,
  createTs,
  deployedNamespaces,
}: NamespaceVersionRowProps) {
  const { dialog, open } = useDialog.DeployNamespaceVersion({
    gameId,
    versionId,
    namespaceId,
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
          {deployedNamespaces.map((namespace, index, array) => (
            <Fragment key={namespace.namespaceId}>
              <Link
                to="/games/$gameId/namespaces/$namespaceId"
                params={{
                  gameId,
                  namespaceId: namespace.namespaceId,
                }}
              >
                {namespace.displayName}
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

interface NamespaceVersionsProps {
  gameId: string;
  namespaceId: string;
}

export function NamespaceVersions({
  gameId,
  namespaceId,
}: NamespaceVersionsProps) {
  const { data: versions } = useSuspenseQuery(gameVersionsQueryOptions(gameId));
  const { data: namespaces } = useSuspenseQuery(
    gameNamespacesQueryOptions(gameId),
  );
  const currentNamespace = namespaces.find(
    (namespace) => namespace.namespaceId === namespaceId,
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
                version.versionId === currentNamespace?.versionId;
              const deployedNamespaces = namespaces.filter(
                (namespace) => namespace.versionId === version.versionId,
              );
              return (
                <NamespaceVersionRow
                  key={version.versionId}
                  {...version}
                  isCurrent={isCurrentVersion}
                  gameId={gameId}
                  namespaceId={namespaceId}
                  deployedNamespaces={deployedNamespaces}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
