import {
  Badge,
  Flex,
  Grid,
  Skeleton,
  Uptime,
  ValueDisplay,
  WithTooltip,
  formatDuration,
  formatExitCodeMessage,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { gameNamespaceLogsLobbyQueryOptions } from "../queries";
import { LobbyRegion } from "./lobby-region";
import { LobbyStatusBadge } from "./lobby-status";

function Container({ children }: PropsWithChildren) {
  return (
    <Flex gap="4" direction="col" mb="6">
      {children}
    </Flex>
  );
}

function Row({ children }: PropsWithChildren) {
  return (
    <Grid columns={{ initial: "2", md: "4" }} gap="4">
      {children}
    </Grid>
  );
}

interface LobbyLogsSummaryProps {
  gameId: string;
  namespaceId: string;
  lobbyId: string;
}

export function LobbyLogsSummary({
  gameId,
  namespaceId,
  lobbyId,
}: LobbyLogsSummaryProps) {
  const {
    data: {
      lobby: { status, readableStatus, regionId, readyTs, createTs, startTs },
    },
  } = useSuspenseQuery(
    gameNamespaceLogsLobbyQueryOptions({ gameId, namespaceId, lobbyId }),
  );

  return (
    <Container>
      <Row>
        <ValueDisplay
          label="Status"
          value={<LobbyStatusBadge status={readableStatus} />}
        />
        {status.stopped ? (
          <ValueDisplay
            label="Exit code"
            value={
              <WithTooltip
                content={formatExitCodeMessage(status.stopped.exitCode)}
                trigger={
                  <Badge variant="outline">{status.stopped.exitCode}</Badge>
                }
              />
            }
          />
        ) : null}
        <ValueDisplay
          label="Region"
          value={<LobbyRegion gameId={gameId} regionId={regionId} showLabel />}
        />
      </Row>
      <Row>
        <ValueDisplay
          label="Created at"
          value={createTs?.toLocaleString() || "-"}
        />
        <ValueDisplay
          label="Started at"
          value={startTs?.toLocaleString() || "-"}
        />
        <ValueDisplay
          label="Ready at"
          value={readyTs?.toLocaleString() || "-"}
        />
        <ValueDisplay
          label="Stopped / finished at"
          value={status.stopped?.stopTs?.toLocaleString() || "-"}
        />
      </Row>
      <Row>
        {status.stopped ? (
          <ValueDisplay
            label="Duration"
            value={formatDuration(
              status.stopped.stopTs.getTime() - createTs.getTime(),
              { showSeconds: true },
            )}
          />
        ) : (
          <ValueDisplay
            label="Since created"
            value={<Uptime createTs={createTs} showSeconds />}
          />
        )}
        {startTs ? (
          <ValueDisplay
            label="Start duration"
            value={formatDuration(startTs?.getTime() - createTs.getTime(), {
              showSeconds: true,
            })}
          />
        ) : null}
        {readyTs ? (
          <ValueDisplay
            label="Ready duration"
            value={formatDuration(readyTs?.getTime() - createTs.getTime(), {
              showSeconds: true,
            })}
          />
        ) : null}
      </Row>
    </Container>
  );
}

LobbyLogsSummary.Skeleton = function LobbyLogsSummarySkeleton() {
  return (
    <Container>
      <Row>
        <ValueDisplay
          label="Status"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
        <ValueDisplay
          label="Exit code"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
      </Row>
      <Row>
        <ValueDisplay
          label="Created at"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
        <ValueDisplay
          label="Started at"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
        <ValueDisplay
          label="Ready at"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
        <ValueDisplay
          label="Stopped / finished at"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
        <ValueDisplay
          label="Duration"
          value={<Skeleton className="mt-1 h-6 w-32" />}
        />
      </Row>
    </Container>
  );
};
