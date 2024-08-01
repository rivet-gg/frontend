import { Flex, ScrollArea } from "@rivet-gg/components";
import type { ReactNode } from "react";
import type { LiveLobbyLogs, LobbySummary } from "../../queries";
import { GameMatchmakerListLobbyButton } from "./game-matchmaker-list-lobby-button";

interface GameMatchmakerLobbyListPanelProps {
  gameId: string;
  lobbies: (LobbySummary | LiveLobbyLogs)[];
  lobbyId?: string;
  children?: ReactNode;
}

export function GameMatchmakerLobbyListPanel({
  lobbies,
  gameId,
  lobbyId,
  children,
}: GameMatchmakerLobbyListPanelProps) {
  return (
    <ScrollArea className="overflow-auto h-full truncate min-w-0">
      <Flex direction="col" gap="2" my="4" mx="4" className="truncate min-w-0">
        <>
          {children}
          {lobbies.map((lobby) => (
            <GameMatchmakerListLobbyButton
              key={lobby.lobbyId}
              gameId={gameId}
              isActive={lobby.lobbyId === lobbyId}
              {...lobby}
            />
          ))}
        </>
      </Flex>
    </ScrollArea>
  );
}
