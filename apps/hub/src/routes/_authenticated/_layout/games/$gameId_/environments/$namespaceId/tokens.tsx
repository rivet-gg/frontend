import { gameNamespaceQueryOptions } from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { Button, CopyArea, DocsCard, Grid, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function PublicTokenCard() {
  return (
    <>
      <DocsCard
        title="Public token"
        href="https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens"
        footer={
          <Button asChild>
            <Link search={{ modal: "public-token" }}>Generate</Link>
          </Button>
        }
      >
        <Text>
          Public tokens are used from the game client. These are safe to share
          with the public.
        </Text>
      </DocsCard>
    </>
  );
}

function ServiceTokenCard() {
  return (
    <>
      <DocsCard
        title="Service token"
        href="https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens"
        footer={
          <Button asChild>
            <Link search={{ modal: "service-token" }}>Generate</Link>
          </Button>
        }
      >
        <Text>
          Service tokens are used from private API servers. These should never
          be shared.
        </Text>
      </DocsCard>
    </>
  );
}

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId, namespaceId } = Route.useParams();
  const { modal } = Route.useSearch();

  const GenerateNamespacePublicTokenDialog =
    useDialog.GenerateNamespacePublicToken.Dialog;
  const GenerateGameEnvServiceTokenDialog =
    useDialog.GenerateGameEnvServiceToken.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <GenerateNamespacePublicTokenDialog
        gameId={gameId}
        namespaceId={namespaceId}
        dialogProps={{
          open: modal === "public-token",
          onOpenChange: handleonOpenChange,
        }}
      />
      <GenerateGameEnvServiceTokenDialog
        gameId={gameId}
        environmentId={namespaceId}
        dialogProps={{
          open: modal === "service-token",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function NamespaceTokensRoute() {
  const { gameId, namespaceId } = Route.useParams();
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
        <PublicTokenCard />
        <ServiceTokenCard />
        <DocsCard
          title="Development token"
          href="https://rivet.gg/docs/general/concepts/dev-tokens"
        >
          <Text>
            Development tokens are built to let you develop your game on your
            local machine with access to production APIs.
          </Text>
          <Text mb="2">Run the following in your terminal:</Text>
          <CopyArea value={`rivet token create dev -n ${namespace.nameId}`} />
        </DocsCard>
        <Modals />
      </Grid>
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["public-token", "service-token"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/tokens",
)({
  validateSearch: (search) => searchSchema.parse(search),
  component: NamespaceTokensRoute,
});
