import type { Rivet } from "@rivet-gg/api";
import { Button, LogsView, WithTooltip } from "@rivet-gg/components";
import { Icon, faSave } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import { serverLogsQueryOptions } from "../../queries";

interface ServerLogsTabProps {
  projectId: string;
  environmentId: string;
  serverId: string;
  logType: Rivet.servers.LogStream;
}

export function ServerLogsTab({
  projectId,
  environmentId,
  serverId,
  logType,
}: ServerLogsTabProps) {
  const {
    data: { timestamps, lines },
  } = useSuspenseQuery(
    serverLogsQueryOptions({
      projectId,
      environmentId,
      serverId,
      stream: logType,
    }),
  );

  return (
    <LogsView
      timestamps={timestamps}
      lines={lines}
      empty="No logs available."
      sidebar={
        <WithTooltip
          content="Download logs"
          trigger={
            <Button
              variant="outline"
              aria-label="Download logs"
              size="icon"
              onClick={() =>
                saveAs(
                  new Blob([lines.join("\n")], {
                    type: "text/plain;charset=utf-8",
                  }),
                  "logs.txt",
                )
              }
            >
              <Icon icon={faSave} />
            </Button>
          }
        />
      }
    />
  );
}

ServerLogsTab.Skeleton = () => {
  return (
    <div className="px-4 pt-4">
      <LogsView.Skeleton />
    </div>
  );
};
