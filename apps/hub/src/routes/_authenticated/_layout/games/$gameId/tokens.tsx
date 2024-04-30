import { Link, createFileRoute } from "@tanstack/react-router";
import { Button, DocsCard, Grid, Text } from "@rivet-gg/components";

function CloudTokenCard() {
  return (
    <>
      <DocsCard
        title="Cloud token"
        href="https://rivet.gg/docs/general/concepts/token-types#cloud"
        footer={
          <Button asChild>
            <Link search={{ modal: "cloud-token" }}>Generate</Link>
          </Button>
        }
      >
        <Text>
          Cloud tokens are used to access Rivet Cloud. They are used by the
          client to access Rivet Cloud.
        </Text>
      </DocsCard>
    </>
  );
}

function GameTokensRoute() {
  return (
    <Grid columns="2" gap="4" items="start">
      <CloudTokenCard />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/tokens",
)({
  component: GameTokensRoute,
});
