import { GroupGames } from "@/domains/game/queries";
import { Flex, LargeText, Grid } from "@rivet-gg/components";
import { GameCard } from "@rivet-gg/components/game";
import { Link } from "@tanstack/react-router";
import { GroupAvatar } from "./group-avatar";
import { GroupEmptyCard } from "./group-empty-card";

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
      {games.length === 0 ? (
        <GroupEmptyCard groupId={groupId} />
      ) : (
        <Grid columns="4" gap="4">
          {games.map((game) => (
            <Link
              key={game.gameId}
              to="/games/$gameId/"
              params={{ gameId: game.gameId }}
            >
              <GameCard {...game} />
            </Link>
          ))}
        </Grid>
      )}
    </Flex>
  );
}
