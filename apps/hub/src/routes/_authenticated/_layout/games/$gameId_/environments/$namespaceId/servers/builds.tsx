import { GameServerTags } from "@/domains/game/components/game-servers/game-server-tags";
import {
  gameBuildsQueryOptions,
  usePatchBuildTagsMutation,
} from "@/domains/game/queries";
import {
  faCheckCircle,
  faInfoCircle,
  faRefresh,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Rivet } from "@rivet-gg/api";
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
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function GameBuildsRoute() {
  const { gameId, namespaceId } = Route.useParams();
  const {
    data: builds,
    isRefetching,
    refetch,
  } = useSuspenseQuery(
    gameBuildsQueryOptions({ gameId, environmentId: namespaceId }),
  );

  return (
    <Card w="full">
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Builds</CardTitle>
          <Button
            size="icon"
            isLoading={isRefetching}
            variant="outline"
            onClick={() => refetch()}
          >
            <FontAwesomeIcon icon={faRefresh} />
          </Button>
        </Flex>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <WithTooltip
                  content="Servers will be created with this build if a version is not explicitly specified."
                  trigger={
                    <span>
                      Current <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  }
                />
              </TableHead>
              <TableHead>
                <WithTooltip
                  content="Determines if game servers can be created with this build."
                  trigger={
                    <span>
                      Enabled <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  }
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {builds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Text className="text-center">There's no builds yet.</Text>
                </TableCell>
              </TableRow>
            ) : null}
            {builds.map((build) => (
              <TableRow key={build.id}>
                <TableCell>{build.name}</TableCell>
                <TableCell>{build.createdAt.toLocaleString()}</TableCell>
                <TableCell>
                  <GameServerTags {...build} excludeBuiltIn />
                </TableCell>
                <TableCell>
                  <GameBuildLatestButton
                    gameId={gameId}
                    environmentId={namespaceId}
                    {...build}
                  />
                </TableCell>
                <TableCell>
                  <GameBuildEnabledButton
                    gameId={gameId}
                    environmentId={namespaceId}
                    {...build}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface GameBuildActionButtonProps extends Rivet.servers.Build {
  gameId: string;
  environmentId: string;
}

function GameBuildEnabledButton({
  tags,
  id,
  gameId,
  environmentId,
}: GameBuildActionButtonProps) {
  const { mutate, isPending } = usePatchBuildTagsMutation();
  if (tags.enabled === "true") {
    return (
      <Button
        variant="outline"
        size="sm"
        isLoading={isPending}
        onClick={() => {
          mutate({
            buildId: id,
            gameId,
            environmentId,
            tags: { enabled: null },
          });
        }}
      >
        Disable
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      isLoading={isPending}
      onClick={() => {
        mutate({
          buildId: id,
          gameId,
          environmentId,
          tags: { enabled: "true" },
        });
      }}
    >
      Enable
    </Button>
  );
}

function GameBuildLatestButton({
  tags,
  id,
  gameId,
  environmentId,
}: GameBuildActionButtonProps) {
  const { mutate, isPending } = usePatchBuildTagsMutation();

  if (tags.current !== "true") {
    return (
      <Button
        variant="outline"
        size="sm"
        isLoading={isPending}
        onClick={() => {
          mutate({
            buildId: id,
            gameId,
            environmentId,
            tags: { current: "true" },
            exclusiveTags: ["current"],
          });
        }}
      >
        Make current
      </Button>
    );
  }

  return <FontAwesomeIcon icon={faCheckCircle} className="fill-primary" />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/servers/builds",
)({
  component: GameBuildsRoute,
});
