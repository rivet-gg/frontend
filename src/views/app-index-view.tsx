import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Flex } from "@/components/ui/flex";
import { LargeText } from "@/components/ui/typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupGames, gamesQueryOptions } from "@/queries/games";
import { GroupAvatar } from "@/components/group-avatar";
import { GameCard } from "@/components/game-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { CtaCard } from "@/components/cta-card";
import { Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { useAuth } from "@/contexts/auth";
import { NarrowPage } from "@/components/narrow-page";

interface GroupProps {
  group: GroupGames;
}

function Group({ group }: GroupProps) {
  return (
    <Flex direction="col" my="4">
      <Flex direction="row" justify="between" my="4">
        <Flex direction="row" items="center" gap="4">
          <GroupAvatar {...group} />
          <LargeText>{group.displayName}</LargeText>
        </Flex>
      </Flex>
      <Grid columns="4" gap="4">
        {group.games.map((game) => (
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
          <Group key={group.groupId} group={group} />
        ))}
      </Flex>
    </NarrowPage>
  );
}
