import { Page } from "@/components/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H3, Ol } from "@/components/ui/typography";
import { gameQueryOptions } from "@/queries/games";
import { useSuspenseQuery } from "@tanstack/react-query";

interface GameViewProps {
  gameId: string;
}

export function GameView({ gameId }: GameViewProps) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  return (
    <Page title={data?.game.displayName}>
      <Card>
        <CardHeader>
          <CardTitle>Namespaces</CardTitle>
        </CardHeader>
        <CardContent>
          <Ol>
            {data?.game.namespaces.map((namespace) => (
              <li key={namespace.namespaceId}>{namespace.displayName}</li>
            ))}
          </Ol>
        </CardContent>
      </Card>
    </Page>
  );
}
