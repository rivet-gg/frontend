import { gameNamespaceQueryOptions } from "@/domains/game/queries";
import { Button, CopyArea, DocsCard, Grid, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function NamespaceTokensRoute() {
  const { gameId, namespaceId } = Route.useParams();
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));

  return (
    <Grid columns="2" gap="4" items="start">
      <DocsCard
        title="Public token"
        href="https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens"
        description={
          <Text>
            Public tokens are used from the game client. These are safe to share
            with the public.
          </Text>
        }
        footer={<Button>Generate</Button>}
      />
      <DocsCard
        title="Development token"
        href="https://rivet.gg/docs/general/concepts/dev-tokens"
        description={
          <>
            <Text>
              Development tokens are built to let you develop your game on your
              local machine with access to production APIs.
            </Text>
            <Text mb="2">Run the following in your terminal:</Text>
            <CopyArea value={`rivet token create dev -n ${namespace.nameId}`} />
          </>
        }
      />
      <DocsCard
        title="Service token"
        href="https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens"
        description={
          <Text>
            Service tokens are used from private API servers. These should never
            be shared.
          </Text>
        }
        footer={<Button>Generate</Button>}
      />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/tokens",
)({
  component: NamespaceTokensRoute,
});
