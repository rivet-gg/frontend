import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
  useNamespaceAuthTypeMutation,
  useNamespaceDomainPublicAuthMutation,
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
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function DomainBasedAuthOption() {
  const { mutate, isPending } = useNamespaceDomainPublicAuthMutation();

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
        domain they make requests from. This should only be used for
        environments intended to be publicly accessible.
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

  return (
    <>
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
        footer={
          <Button asChild>
            <Link to="." search={{ modal: "cdn-users" }}>
              Manage users
            </Link>
          </Button>
        }
      >
        <Text>
          Restricts CDN access to select authenticated users. Authentication is
          done via HTTP basic access authentication.
        </Text>
      </ActionCard>
    </>
  );
}

interface CustomDomainsOptionProps {
  nameId: string;
  namespaceNameId: string;
}

function CustomDomainsOption({
  nameId,
  namespaceNameId,
}: CustomDomainsOptionProps) {
  return (
    <>
      <ActionCard
        title="Custom domains"
        footer={
          <Button asChild>
            <Link to="." search={{ modal: "cdn-domains" }}>
              Manage domains
            </Link>
          </Button>
        }
      >
        <Ol>
          <li>
            Add a CNAME record pointed at{" "}
            <Code>
              {nameId}--{namespaceNameId}.rivet.game
            </Code>{" "}
            to your domain's DNS config.
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

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId, namespaceId } = Route.useParams();
  const { modal } = Route.useSearch();

  const ManageCdnAuthUsersDialog = useDialog.ManageCdnAuthUsers.Dialog;
  const ManageCdnCustomDomains = useDialog.ManageCdnCustomDomains.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <ManageCdnAuthUsersDialog
        gameId={gameId}
        namespaceId={namespaceId}
        dialogProps={{
          open: modal === "cdn-users",
          onOpenChange: handleonOpenChange,
        }}
      />
      <ManageCdnCustomDomains
        gameId={gameId}
        namespaceId={namespaceId}
        dialogProps={{
          open: modal === "cdn-domains",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function NamespaceCdnRoute() {
  const { gameId, namespaceId } = Route.useParams();
  const [
    { data: game },
    {
      data: { namespace },
    },
  ] = useSuspenseQueries({
    queries: [
      gameQueryOptions(gameId),
      gameNamespaceQueryOptions({ gameId, namespaceId }),
    ],
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
      <DomainBasedAuthOption />
      <PasswordAuthOption />
      <CustomDomainsOption
        nameId={game.nameId}
        namespaceNameId={namespace.nameId}
      />
      <Modals />
    </Grid>
  );
}

const searchSchema = z.object({
  modal: z.enum(["cdn-users", "cdn-domains"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/cdn",
)({
  validateSearch: zodSearchValidator(searchSchema),
  component: NamespaceCdnRoute,
});
