import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { LargeText } from "@/components/ui/typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupGames, gamesQueryOptions } from "@/queries/games";
import { GroupAvatar } from "@/components/group-avatar";
import { GameCard } from "@/components/game-card";
import { CtaCard } from "@/components/cta-card";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";
import { NarrowPage } from "@/components/narrow-page";

interface GroupProps extends GroupGames {}

function Group(props: GroupProps) {
  const { groupId, displayName, games } = props;

  return (
    <Flex direction="col" my="4">
      <Link to="/teams/$groupId" params={{ groupId }}>
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

export function AppIndexView() {
  const { profile } = useAuth();
  const { data } = useSuspenseQuery(gamesQueryOptions());

  return (
    <NarrowPage title={`Welcome to Rivet, ${profile?.identity.displayName}!`}>
      <Grid columns="2" gap="4">
        <a href="https://rivet.gg/learn">
          <CtaCard title="Learn" description="Get started with your engine" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="Docs" description="Lorem ipsum" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="Discord" description="Lorem ipsum" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="GitHub" description="Lorem ipsum" />
        </a>
      </Grid>
      <Flex direction="col">
        {data.map((group) => (
          <Group key={group.groupId} {...group} />
        ))}
      </Flex>
    </NarrowPage>
  );
}
