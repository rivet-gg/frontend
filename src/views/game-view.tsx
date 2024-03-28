import { Flex } from "@/components/ui/flex";
import { H1, H3, Ol } from "@/components/ui/typography";
import { gameQueryOptions } from "@/queries/games";
import { useSuspenseQuery } from "@tanstack/react-query";

interface GameViewProps {
  gameId: string;
}

export const GameView = ({ gameId }: GameViewProps) => {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  return (
    <Flex mt="4" direction="col">
      <H1>{data?.game.displayName}</H1>
      <H3>Namespaces</H3>
      <Ol>
        {data?.game.namespaces.map((namespace) => (
          <li key={namespace.namespaceId}>{namespace.displayName}</li>
        ))}
      </Ol>
    </Flex>
  );
};
