import { useSuspenseQuery } from "@tanstack/react-query";
import { gameNamespaceLogsLobbyLogsQueryOptions } from "../queries";
import { ScrollArea } from "@rivet-gg/components";

interface LobbyLogsProps {
  gameId: string;
  lobbyId: string;
}

export function LobbyLogs({ gameId, lobbyId }: LobbyLogsProps) {
  const {
    data: { timestamps, lines },
  } = useSuspenseQuery(
    gameNamespaceLogsLobbyLogsQueryOptions({
      gameId,
      lobbyId,
      stream: "std_out",
    }),
  );

  if (timestamps.length === 0 || lines.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        <p>No logs available</p>
        <p>Logs older than 48 hours will not show up here.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="my-4 h-72 w-full">
      <div className="flex gap-4">
        <div className="">
          {timestamps.map((timestamp) => (
            <div
              key={timestamp}
              className="text-muted-foreground my-1 font-mono text-sm"
            >
              {timestamp}
            </div>
          ))}
        </div>
        <div className="">
          {lines.map((line) => (
            <div key={line} className="my-1 font-mono text-sm">
              {window.atob(line)}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
