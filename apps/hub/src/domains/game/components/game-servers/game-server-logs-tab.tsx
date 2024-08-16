import type { Rivet } from "@rivet-gg/api";
import { LogsView } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serverLogsQueryOptions } from "../../queries";

interface GameServerLogsTabProps {
  gameId: string;
  environmentId: string;
  serverId: string;
  logType: Rivet.servers.LogStream;
}

export function GameServerLogsTab({
  gameId,
  environmentId,
  serverId,
  logType,
}: GameServerLogsTabProps) {
  const {
    data: { timestamps, lines },
  } = useSuspenseQuery(
    serverLogsQueryOptions({
      gameId,
      environmentId,
      serverId,
      stream: logType,
    }),
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
