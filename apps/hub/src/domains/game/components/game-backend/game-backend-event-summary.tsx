import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Dd,
  Dl,
  Dt,
  LogsView,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameBackendProjectEnvEventQueryOptions } from "../../queries";
import { GameBackendCallDetails } from "./game-backend-call-details";

interface GameBackendEventSummaryProps {
  eventId: string;
  projectId: string;
  environmentId: string;
}

export function GameBackendEventSummary({
  eventId,
  projectId,
  environmentId,
}: GameBackendEventSummaryProps) {
  const { data } = useSuspenseQuery(
    gameBackendProjectEnvEventQueryOptions({
      eventId,
      projectId,
      environmentId,
    }),
  );

  if (!data) {
    return (
      <Text my="10" textAlign="center">
        No event found.
      </Text>
    );
  }

  return (
    <>
      {data.backendCall ? (
        <>
          <Dl w="1/2">
            <Dt>Module</Dt>
            <Dd>{data.backendCall.moduleName}</Dd>
            <Dt>Script</Dt>
            <Dd>{data.backendCall.scriptName}</Dd>
          </Dl>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Advanced</AccordionTrigger>
              <AccordionContent>
                <GameBackendCallDetails {...data} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <GameBackendCallDetails {...data} />
      )}
      <LogsView
        timestamps={data.logTimestamps}
        lines={data.logs.map((log) => log.message.join("\n"))}
        showFollowToggle={false}
        empty={<p>No logs available.</p>}
      />
    </>
  );
}
