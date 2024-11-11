import {
  gameEnvironmentQueryOptions,
  gameQueryOptions,
  useEnvironmentAuthTypeMutation,
  useEnvironmentDomainPublicAuthMutation,
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
  const { mutate, isPending } = useEnvironmentDomainPublicAuthMutation();

  const { gameId, environmentId } = Route.useParams();
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(gameEnvironmentQueryOptions({ gameId, environmentId }));

  return (
    <ActionCard
      title="Domain-based authentication"
      action={
        <Switch
          checked={environment.config.cdn.enableDomainPublicAuth}
          disabled={isPending}
          onCheckedChange={(enabled) => {
            mutate({ enabled, gameId, environmentId });
          }}
        />
      }
    >
      <Text>
        Allows for clients to authenticate with this environment based on the
        domain they make requests from. This should only be used for
        environments intended to be publicly accessible.
      </Text>
    </ActionCard>
  );
}

function PasswordAuthOption() {
  const { mutate, isPending } = useEnvironmentAuthTypeMutation();

  const { gameId, environmentId } = Route.useParams();
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(gameEnvironmentQueryOptions({ gameId, environmentId }));

  return (
    <>
      <ActionCard
        title="Password authentication"
        action={
          <Switch
            checked={
              environment.config.cdn.authType === Rivet.cloud.CdnAuthType.Basic
            }
            disabled={isPending}
            onCheckedChange={(enabled) => {
              mutate({
                authType: enabled
                  ? Rivet.cloud.CdnAuthType.Basic
                  : Rivet.cloud.CdnAuthType.None,
                gameId,
                environmentId,
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
  const { gameId, environmentId } = Route.useParams();
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
        environmentId={environmentId}
        dialogProps={{
          open: modal === "cdn-users",
          onOpenChange: handleonOpenChange,
        }}
      />
      <ManageCdnCustomDomains
        gameId={gameId}
        environmentId={environmentId}
        dialogProps={{
          open: modal === "cdn-domains",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function EnvironmentCdnRoute() {
  const { gameId, environmentId } = Route.useParams();
  const [
    { data: game },
    {
      data: { namespace: environment },
    },
  ] = useSuspenseQueries({
    queries: [
      gameQueryOptions(gameId),
      gameEnvironmentQueryOptions({ gameId, environmentId }),
    ],
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
      <DomainBasedAuthOption />
      <PasswordAuthOption />
      <CustomDomainsOption
        nameId={game.nameId}
        namespaceNameId={environment.nameId}
      />
      <Modals />
    </Grid>
  );
}

const searchSchema = z.object({
  modal: z.enum(["cdn-users", "cdn-domains"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/cdn",
)({
  validateSearch: zodSearchValidator(searchSchema),
  component: EnvironmentCdnRoute,
});
