import {
  Badge,
  Button,
  Flex,
  ScrollArea,
  SmallText,
  Uptime,
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { gameServersQueryOptions } from "../../queries";
import { LobbyLifecycle } from "../game-matchmaker/lobby-lifecycle";
import { GameServerTags } from "./game-server-tags";

interface GameServersListPanelProps {
  gameId: string;
  environmentId: string;
  serverId: string | undefined;
}

export function GameServersListPanel({
  serverId,
  gameId,
  environmentId,
}: GameServersListPanelProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      gameServersQueryOptions({ gameId, environmentId }),
    );

  return (
    <ScrollArea className="overflow-auto h-full truncate min-w-0">
      <Flex direction="col" gap="2" my="4" mx="4" className="truncate min-w-0">
        <>
          {data.map((server) => (
            <WithTooltip
              key={server.id}
              trigger={
                <Button
                  className="h-auto justify-between"
                  variant={serverId === server.id ? "secondary" : "outline"}
                  asChild
                >
                  <Link
                    search={{ serverId: server.id }}
                    className="min-w-0 flex flex-wrap gap-2"
                  >
                    <span className="flex gap-2 items-start">
                      <Badge className="truncate inline-block">
                        {server.id.split("-")[0]}
                      </Badge>
                      <Badge variant="secondary">{server.datacenter}</Badge>
                    </span>
                    <SmallText>
                      <Uptime createTs={new Date(server.createdAt)} />
                    </SmallText>
                  </Link>
                </Button>
              }
              content={
                <div className="flex flex-col gap-4">
                  <LobbyLifecycle
                    createTs={
                      server.createdAt ? new Date(server.createdAt) : new Date()
                    }
                    readyTs={
                      server.startedAt ? new Date(server.startedAt) : undefined
                    }
                    stopTs={
                      server.destroyedAt
                        ? new Date(server.destroyedAt)
                        : undefined
                    }
                  />
                  <GameServerTags {...server} />
                </div>
              }
            />
          ))}
          {hasNextPage ? (
            <Button
              variant="outline"
              mx="4"
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Load more
            </Button>
          ) : null}
        </>
      </Flex>
    </ScrollArea>
  );
}
