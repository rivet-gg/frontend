import { Page } from "@/components/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ol } from "@/components/ui/typography";
import { gameQueryOptions } from "@/queries/games";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function GameIdRoute() {
  const { gameId } = Route.useParams();
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

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId")({
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
