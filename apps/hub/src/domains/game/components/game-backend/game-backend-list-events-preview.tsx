import { faUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Flex,
  LogsSelect,
  SmallText,
  Text,
  Uptime,
  WithTooltip,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { ResponseStatus } from "../../data/response-status";
import type { BackendEvent } from "../../queries";
import { GameBackendEventSummary } from "./game-backend-event-summary";

interface GameBackendListEventsPreviewProps {
  events: BackendEvent[];
  environmentId: string;
  projectId: string;
  eventId?: string;
}

export function GameBackendListEventsPreview({
  events,
  eventId,
  environmentId,
  projectId,
}: GameBackendListEventsPreviewProps) {
  if (events.length === 0) {
    return (
      <Text my="10" textAlign="center">
        No events found.
      </Text>
    );
  }

  return (
    <LogsSelect
      list={
        <>
          {events.map((event) => (
            <Button
              key={event.eventTimestamp}
              variant={
                eventId === event.eventTimestamp ? "secondary" : "outline"
              }
              asChild
            >
              <Link search={{ eventId: event.eventTimestamp }}>
                <Flex gap="2" items="center" w="full">
                  <ResponseStatus status={event.event.response.status} />
                  {event.backendCall ? (
                    <>
                      <Badge className="hidden md:flex">CALL</Badge>
                      <span className="flex-1 text-left truncate">
                        {event.backendCall.moduleName}.
                        {event.backendCall.scriptName}
                      </span>
                    </>
                  ) : (
                    <>
                      <Badge className="hidden md:flex" variant="outline">
                        {event.event.request.method}
                      </Badge>
                      <span className="flex-1 text-left truncate">
                        {event.event.request.pathname}
                      </span>
                    </>
                  )}
                  <WithTooltip
                    trigger={
                      <SmallText>
                        <Uptime createTs={new Date(+event.eventTimestamp)} />{" "}
                        ago
                      </SmallText>
                    }
                    content={new Date(+event.eventTimestamp).toLocaleString()}
                  />
                </Flex>
              </Link>
            </Button>
          ))}
        </>
      }
      content={
        !eventId ? (
          <Text my="10" textAlign="center">
            Please select select event.
          </Text>
        ) : (
          <GameBackendEventSummary
            environmentId={environmentId}
            projectId={projectId}
            eventId={eventId}
          />
        )
      }
    />
  );
}
