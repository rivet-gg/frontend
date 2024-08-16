import { GameServersListPreview } from "@/domains/game/components/game-servers/game-servers-list-preview";
import { gameServersQueryOptions } from "@/domains/game/queries";
import { faRefresh } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function GameServersRoute() {
  const { gameId, namespaceId } = Route.useParams();
  const {
    data: servers,
    refetch,
    isRefetching,
  } = useSuspenseQuery(
    gameServersQueryOptions({ gameId, environmentId: namespaceId }),
  );
  const { serverId } = Route.useSearch();

  return (
    <Card w="full" h="full" className="flex flex-col">
      <CardHeader className="border-b flex flex-row justify-between items-center">
        <CardTitle>Servers</CardTitle>
        <Button
          size="icon"
          isLoading={isRefetching}
          variant="outline"
          onClick={() => refetch()}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        {servers.servers.length === 0 ? (
          <div className="flex items-center mx-auto flex-col gap-2 my-10">
            <Text textAlign="center">No servers found.</Text>
          </div>
        ) : (
          <GameServersListPreview
            gameId={gameId}
            environmentId={namespaceId}
            serverId={serverId}
            servers={servers.servers}
          />
        )}
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  serverId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/servers/",
)({
  validateSearch: (search) => searchSchema.parse(search),
  staticData: {
    layout: "full",
  },
  component: GameServersRoute,
});
