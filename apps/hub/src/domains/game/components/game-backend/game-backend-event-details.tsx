import {
  Badge,
  CopyArea,
  Flex,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameBackendEnvEventQueryOptions } from "../../queries";
import { GameBackendEventDetailsHeadersTab } from "./game-backend-event-details/game-backend-event-details-headers-tab";
import { GameBackendEventDetailsLogsTab } from "./game-backend-event-details/game-backend-event-details-logs-tab";
import { GameBackendEventDetailsWipTab } from "./game-backend-event-details/game-backend-event-details-wip-tab";
import { GameBackendResponseBadge } from "./game-backend-response-badge";

interface GameBackendEventDetailsProps {
  eventId: string;
  gameId: string;
  environmentId: string;
}

export function GameBackendEventDetails({
  eventId,
  gameId,
  environmentId,
}: GameBackendEventDetailsProps) {
  const { data } = useSuspenseQuery(
    gameBackendEnvEventQueryOptions({
      eventId,
      gameId,
      environmentId,
    }),
  );

  if (!data) {
    return (
      <Flex items="center" justify="center" className="h-full">
        <Text my="10" textAlign="center">
          No event found.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="col" className="h-full w-full">
      <div className="flex gap-2 px-4 items-center pt-4 flex-wrap">
        <GameBackendResponseBadge {...data} />
        <Badge variant="secondary">@ {data.eventDate}</Badge>
        <div className="flex-1 md:contents min-w-0 w-full basis-full">
          <CopyArea
            className="flex-1 truncate min-w-0 w-full"
            variant="discrete"
            value={data.event.request.fmtUrl}
          />
        </div>
      </div>
      <Tabs defaultValue="logs" className="flex-1 min-h-0 flex flex-col mt-4">
        <TabsList className="overflow-auto">
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>
        <TabsContent value="headers" className="min-h-0 flex-1 mt-0">
          <GameBackendEventDetailsHeadersTab event={data.event} />
        </TabsContent>
        <TabsContent value="request" className="min-h-0 flex-1 mt-0">
          <GameBackendEventDetailsWipTab />
        </TabsContent>
        <TabsContent value="response" className="min-h-0 flex-1 mt-0">
          <GameBackendEventDetailsWipTab />
        </TabsContent>
        <TabsContent value="logs" className="min-h-0 flex-1 mt-0">
          <GameBackendEventDetailsLogsTab
            logs={data.logs}
            logTimestamps={data.logTimestamps}
          />
        </TabsContent>
      </Tabs>
    </Flex>
  );
}
