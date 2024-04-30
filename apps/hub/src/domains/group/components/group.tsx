import { GroupGames } from "@/domains/game/queries";
import {
  Flex,
  LargeText,
  Grid,
  CardHeader,
  CardContent,
  Card,
} from "@rivet-gg/components";
import { GameTile } from "@rivet-gg/components/game";
import { Link } from "@tanstack/react-router";
import { GroupAvatar } from "./group-avatar";
import { GroupEmptyAlert } from "./group-empty-alert";
import { ArrowRight } from "lucide-react";

interface GroupProps extends GroupGames {}

export function Group(props: GroupProps) {
  const { groupId, displayName, avatarUrl, games } = props;

  return (
    <Card my="4">
      <CardHeader>
        <Link to="/teams/$groupId/" params={{ groupId }}>
          <Flex direction="row" justify="between">
            <Flex direction="row" items="center" gap="4">
              <GroupAvatar displayName={displayName} avatarUrl={avatarUrl} />
              <LargeText>{displayName}</LargeText>
            </Flex>
            <ArrowRight />
          </Flex>
        </Link>
      </CardHeader>
      <CardContent>
        {games.length === 0 ? (
          <GroupEmptyAlert groupId={groupId} />
        ) : (
          <Grid columns="4" gap="4">
            {games.map((game) => (
              <Link
                key={game.gameId}
                to="/games/$gameId/"
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
