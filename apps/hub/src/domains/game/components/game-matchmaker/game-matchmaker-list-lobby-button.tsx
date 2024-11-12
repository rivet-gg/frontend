import {
  Badge,
  Button,
  Flex,
  SmallText,
  Uptime,
  WithTooltip,
} from "@rivet-gg/components";
import { Icon, faUsers } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  type LiveLobbyLogs,
  type LobbySummary,
  gameEnvironmentLobbyQueryOptions,
} from "../../queries";
import { LobbyRegion } from "./lobby-region";
import { LobbyStatusBadge } from "./lobby-status";

type GameMatchmakerListLobbyButtonProps = (LobbySummary | LiveLobbyLogs) & {
  gameId: string;
  isActive?: boolean;
};
export function GameMatchmakerListLobbyButton({
  isActive,
  lobbyId,
  regionId,
  gameId,
  lobbyGroupNameId,
  readableStatus,
  createTs,
  ...props
}: GameMatchmakerListLobbyButtonProps) {
  return (
    <Button key={lobbyId} variant={isActive ? "secondary" : "outline"} asChild>
      <Link
        to="."
        search={(old) => ({ ...old, lobbyId: lobbyId })}
        className="truncate min-w-0"
      >
        <Flex gap="2" items="center" w="full">
          <Badge variant="outline">
            <LobbyRegion gameId={gameId} regionId={regionId} />
          </Badge>
          <LobbyStatusBadge status={readableStatus} />
          <span className="flex-1 text-left">{lobbyGroupNameId}</span>
          {"totalPlayerCount" in props ? (
            <Badge variant="outline">
              <Flex gap="2">
                <span>
                  {props.totalPlayerCount} / {props.maxPlayersNormal}
                </span>

                <Icon className="size-4" icon={faUsers} />
              </Flex>
            </Badge>
          ) : null}
          <SmallText>
            {["closed", "failed"].includes(readableStatus) ? (
              createTs.toLocaleString()
            ) : (
              <WithTooltip
                trigger={
                  <SmallText>
                    <Uptime createTs={createTs} />
                  </SmallText>
                }
                content={createTs.toLocaleString()}
              />
            )}
          </SmallText>
        </Flex>
      </Link>
    </Button>
  );
}

interface GameMatchmakerListLobbyPrefilledButtonProps {
  gameId: string;
  environmentId: string;
  lobbyId: string;
  isActive?: boolean;
}

export function GameMatchmakerListLobbyPrefilledButton({
  gameId,
  environmentId,
  lobbyId,
  isActive,
}: GameMatchmakerListLobbyPrefilledButtonProps) {
  const {
    data: { lobby },
  } = useSuspenseQuery(
    gameEnvironmentLobbyQueryOptions({ gameId, environmentId, lobbyId }),
  );

  return (
    <GameMatchmakerListLobbyButton
      isActive={isActive}
      gameId={gameId}
      {...lobby}
    />
  );
}
