import { faDownload } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Rivet } from "@rivet-gg/api";
import {
  Button,
  LogsView,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  gameNamespaceLogsLobbyLogsQueryOptions,
  useExportLobbyLogsMutation,
} from "../queries";

interface LobbyLogsProps {
  gameId: string;
  lobbyId: string;
}

export function LobbyLogs({ gameId, lobbyId }: LobbyLogsProps) {
  const [logType, setLogType] =
    useState<Rivet.cloud.games.LogStream>("std_out");

  const {
    data: { timestamps, lines },
  } = useSuspenseQuery(
    gameNamespaceLogsLobbyLogsQueryOptions({
      gameId,
      lobbyId,
      stream: logType,
    }),
  );

  const { mutate: download, isPending } = useExportLobbyLogsMutation();

  return (
    <>
      <Tabs
        value={logType}
        onValueChange={(value) =>
          setLogType(value as Rivet.cloud.games.LogStream)
        }
      >
        <TabsList>
          <TabsTrigger value="std_out">stdout</TabsTrigger>
          <TabsTrigger value="std_err">stderr</TabsTrigger>
        </TabsList>
      </Tabs>
      <LogsView
        timestamps={timestamps}
        lines={lines}
        showTurncatedLogsInfo
        sidebar={
          <Button
            isLoading={isPending}
            disabled={timestamps.length === 0 || lines.length === 0}
            variant="outline"
            aria-label="Download logs"
            size="icon"
            onClick={() => download({ lobbyId, gameId, stream: logType })}
          >
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        }
      />
    </>
  );
}

LobbyLogs.Skeleton = LogsView.Skeleton;
