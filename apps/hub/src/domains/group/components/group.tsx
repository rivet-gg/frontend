import type { GroupGames } from "@/domains/game/queries";
import { faArrowRight, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Flex,
  Grid,
  LargeText,
  Skeleton,
} from "@rivet-gg/components";

import { GameTile } from "@/domains/game/components/game-tile";
import { Link } from "@tanstack/react-router";
import { GroupAvatar } from "./group-avatar";
import { GroupEmptyAlert } from "./group-empty-alert";

interface GroupProps extends GroupGames {}

export function Group(props: GroupProps) {
  const { groupId, displayName, avatarUrl, games, isDeveloper } = props;

  return (
    <Card my="4">
      <CardHeader>
        <Flex direction="row" justify="between">
          <Flex asChild direction="row" items="center" gap="4">
            <Link to="/teams/$groupId" params={{ groupId }}>
              <GroupAvatar displayName={displayName} avatarUrl={avatarUrl} />
              <LargeText>{displayName}</LargeText>
            </Link>
          </Flex>
          <Flex>
            {isDeveloper ? (
              <Button asChild variant="ghost" size="icon">
                <Link to="/" search={{ modal: "create-game", groupId }}>
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="ghost" size="icon">
              <Link to="/teams/$groupId" params={{ groupId }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Button>
          </Flex>
        </Flex>
      </CardHeader>
      <CardContent>
        {games.length === 0 ? (
          <GroupEmptyAlert groupId={groupId} showCreateButton={isDeveloper} />
        ) : (
          <Grid columns={{ initial: "1", md: "4" }} gap="4">
            {games.map((game) => (
              <Link
                key={game.gameId}
                to="/games/$gameId"
                params={{ gameId: game.gameId }}
              >
                <GameTile {...game} />
              </Link>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

Group.Skeleton = () => {
  return <Skeleton className="my-4 h-64 w-full" />;
};
