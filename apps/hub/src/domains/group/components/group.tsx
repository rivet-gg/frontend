import type { GroupGames } from "@/domains/game/queries";
import {
  Card,
  CardContent,
  CardHeader,
  Flex,
  Grid,
  LargeText,
  Skeleton,
} from "@rivet-gg/components";
import { GameTile } from "@rivet-gg/components/game";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GroupAvatar } from "./group-avatar";
import { GroupEmptyAlert } from "./group-empty-alert";

interface GroupProps extends GroupGames {}

export function Group(props: GroupProps) {
  const { groupId, displayName, avatarUrl, games } = props;

  return (
    <Card my="4">
      <CardHeader>
        <Link to="/teams/$groupId" params={{ groupId }}>
          <Flex direction="row" justify="between">
            <Flex direction="row" items="center" gap="4">
              <GroupAvatar displayName={displayName} avatarUrl={avatarUrl} />
              <LargeText>{displayName}</LargeText>
            </Flex>
            <ArrowRight className="text-muted-foreground" />
          </Flex>
        </Link>
      </CardHeader>
      <CardContent>
        {games.length === 0 ? (
          <GroupEmptyAlert groupId={groupId} />
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
