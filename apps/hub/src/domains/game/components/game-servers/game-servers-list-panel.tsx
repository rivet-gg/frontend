import type { Rivet } from "@rivet-gg/api";
import {
  Badge,
  Button,
  Flex,
  ScrollArea,
  SmallText,
  Uptime,
  WithTooltip,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { LobbyLifecycle } from "../game-matchmaker/lobby-lifecycle";
import { GameServerTags } from "./game-server-tags";

interface GameServersListPanelProps {
  servers: Rivet.servers.Server[];
  serverId: string | undefined;
}

export function GameServersListPanel({
  serverId,
  servers,
}: GameServersListPanelProps) {
  return (
    <ScrollArea className="overflow-auto h-full truncate min-w-0">
      <Flex direction="col" gap="2" my="4" mx="4" className="truncate min-w-0">
        <>
          {servers.map((server) => (
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
        </>
      </Flex>
    </ScrollArea>
  );
}
