import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameNamespacesQueryOptions,
  gameQueryOptions,
  gameVersionsQueryOptions,
} from "../queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  Text,
  Button,
  Badge,
  WithTooltip,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { useDeployNamespaceVersionDialog } from "../hooks/use-deploy-namespace-version-dialog";

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

  const { dialog, open } = useDeployNamespaceVersionDialog({
    gameId,
    namespaceId,
  });

  const currentNamespace = namespaces.find(
    (namespace) => namespace.namespaceId === namespaceId,
  );

  return (
    <>
      {dialog}
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
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => {
                const isCurrentVersion =
                  version.versionId === currentNamespace?.versionId;
                return (
                  <TableRow key={version.versionId}>
                    <TableCell>
                      <Badge>{version.displayName}</Badge>
                    </TableCell>
                    <TableCell>
                      <Text>{version.createTs.toLocaleString()}</Text>
                    </TableCell>
                    <TableCell>
                      {namespaces
                        .filter(
                          (namespace) =>
                            namespace.versionId === version.versionId,
                        )
                        .map((namespace, index, array) => (
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
                      {isCurrentVersion ? (
                        <Button variant="outline" disabled>
                          Current version
                        </Button>
                      ) : (
                        <Button
                          onClick={() => open({ versionId: version.versionId })}
                        >
                          Deploy
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
