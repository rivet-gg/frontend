import type { Rivet } from "@rivet-gg/api";
import { LogsView } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serverLogsQueryOptions } from "../../queries";

interface GameServerLogsTabProps {
  gameId: string;
  serverId: string;
  logType: Rivet.servers.LogStream;
}

export function GameServerLogsTab({
  gameId,
  serverId,
  logType,
}: GameServerLogsTabProps) {
  const {
    data: { timestamps, lines },
  } = useSuspenseQuery(
    serverLogsQueryOptions(
      {
        gameId,
        serverId,
        stream: logType,
      },
      { refetchInterval: 1000 },
    ),
  );

  return (
    <LogsView
      timestamps={timestamps}
      lines={lines}
      showTurncatedLogsInfo
      empty="No logs available."
    />
  );
}

GameServerLogsTab.Skeleton = () => {
  return (
    <div className="px-4 pt-4">
      <LogsView.Skeleton />
    </div>
  );
};
