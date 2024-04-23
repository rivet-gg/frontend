import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
  useNamespaceAuthTypeMutation,
  useNamespaceDomainPublichAuthMutation,
} from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { Rivet } from "@rivet-gg/api";
import {
  ActionCard,
  Button,
  Code,
  Grid,
  Ol,
  Switch,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function DomainBasedAuthOption() {
  const { mutate, isPending } = useNamespaceDomainPublichAuthMutation();

  const { gameId, namespaceId } = Route.useParams();
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));

  return (
    <ActionCard
      title="Domain-based authentication"
      action={
        <Switch
          checked={namespace.config.cdn.enableDomainPublicAuth}
          disabled={isPending}
          onCheckedChange={(enabled) => {
            mutate({ enabled, gameId, namespaceId });
          }}
        />
      }
    >
      <Text>
        Allows for clients to authenticate with this namespace based on the
        domain they make requests from. This should only be used for namespaces
        intended to be publicly accessible.
      </Text>
    </ActionCard>
  );
}

function PasswordAuthOption() {
  const { mutate, isPending } = useNamespaceAuthTypeMutation();

  const { gameId, namespaceId } = Route.useParams();
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));

  const { dialog, open } = useDialog.ManageCdnAuthUsers({
    gameId,
    namespaceId,
  });

  return (
    <>
      {dialog}
      <ActionCard
        title="Password authentication"
        action={
          <Switch
            checked={
              namespace.config.cdn.authType === Rivet.cloud.CdnAuthType.Basic
            }
            disabled={isPending}
            onCheckedChange={(enabled) => {
              mutate({
                authType: enabled
                  ? Rivet.cloud.CdnAuthType.Basic
                  : Rivet.cloud.CdnAuthType.None,
                gameId,
                namespaceId,
              });
            }}
          />
        }
        footer={<Button onClick={open}>Manage users</Button>}
      >
        <Text>
          Restricts CDN access to select authenticated users. Authentication is
          done via HTTP basic access authentication.
        </Text>
      </ActionCard>
    </>
  );
}

function CustomDomainsOption({ nameId }: { nameId: string }) {
  const { gameId, namespaceId } = Route.useParams();
  const { dialog, open } = useDialog.ManageCdnCustomDomains({
    gameId,
    namespaceId,
  });

  return (
    <>
      {dialog}
      <ActionCard
        title="Custom domains"
        footer={<Button onClick={open}>Manage domains</Button>}
      >
        <Ol>
          <li>
            Add a CNAME record pointed at <Code>{nameId}.rivet.game</Code> to
            your domain's DNS config.
          </li>
          <li>Add your domain below.</li>
          <li>
            Once added, your domain will be verified by Cloudflare. This should
            take around 5 minutes.
          </li>
        </Ol>
      </ActionCard>
    </>
  );
}

function NamespaceCdnRoute() {
  const { gameId } = Route.useParams();
  const {
    data: { game },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  return (
    <Grid columns="2" gap="4" items="start">
      <DomainBasedAuthOption />
      <PasswordAuthOption />
      <CustomDomainsOption nameId={game.nameId} />
    </Grid>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/cdn",
)({
  component: NamespaceCdnRoute,
});
