import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { LargeText } from "@/components/ui/typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupGames, gamesQueryOptions } from "@/queries/games";
import { GroupAvatar } from "@/components/group-avatar";
import { GameCard } from "@/components/game-card";

interface GroupProps {
  group: GroupGames;
}

const Group = ({ group }: GroupProps) => {
  return (
    <Flex direction="col" my="4">
      <Flex direction="row" justify="between" my="4">
        <Flex direction="row" items="center" gap="4">
          <GroupAvatar {...group} />
          <LargeText>{group.displayName}</LargeText>
        </Flex>
        <Flex direction="row" gap="4">
          <Button>Analytics</Button>
          <Button>Settings</Button>
        </Flex>
      </Flex>
      <Grid columns="4" gap="4">
        {group.games.map((game) => (
          <GameCard key={game.gameId} {...game} />
        ))}
      </Grid>
    </Flex>
  );
};

export const AppIndexView = () => {
  const { data } = useSuspenseQuery(gamesQueryOptions());
  return (
    <Flex direction="col">
      {data.map((group) => (
        <Group key={group.groupId} group={group} />
      ))}
    </Flex>
  );
};
