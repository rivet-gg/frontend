import { GroupGames } from "@/domains/game/queries";
import { Flex, LargeText, Grid } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { GameCard } from "../../game/components/game-card";
import { GroupAvatar } from "./group-avatar";

interface GroupProps extends GroupGames {}

export function Group(props: GroupProps) {
  const { groupId, displayName, games } = props;

  return (
    <Flex direction="col" my="4">
      <Link to="/teams/$groupId/" params={{ groupId }}>
        <Flex direction="row" justify="between" my="4">
          <Flex direction="row" items="center" gap="4">
            <GroupAvatar {...props} />
            <LargeText>{displayName}</LargeText>
          </Flex>
        </Flex>
      </Link>
      <Grid columns="4" gap="4">
        {games.map((game) => (
          <GameCard key={game.gameId} {...game} />
        ))}
      </Grid>
    </Flex>
  );
}
