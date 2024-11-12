import * as Layout from "@/domains/project/layouts/project-layout";
import { projectEnvironmentQueryOptions } from "@/domains/project/queries";
import { useDialog } from "@/hooks/use-dialog";
import { Button, CopyArea, DocsCard, Grid, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function EnvironmentTokensRoute() {
  const { projectId, environmentId } = Route.useParams();
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(
    projectEnvironmentQueryOptions({ projectId, environmentId }),
  );

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
            Development tokens are built to let you develop your project on your
            local machine with access to production APIs.
          </Text>
          <Text mb="2">Run the following in your terminal:</Text>
          <CopyArea value={`rivet token create dev -n ${environment.nameId}`} />
        </DocsCard>
        <Modals />
      </Grid>
    </>
  );
}

function PublicTokenCard() {
  return (
    <>
      <DocsCard
        title="Public token"
        href="https://rivet.gg/docs/general/concepts/handling-project-tokens#public-environment-tokens"
        footer={
          <Button asChild>
            <Link to="." search={{ modal: "public-token" }}>
              Generate
            </Link>
          </Button>
        }
      >
        <Text>
          Public tokens are used from the project client. These are safe to
          share with the public.
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
        href="https://rivet.gg/docs/general/concepts/handling-project-tokens#public-environment-tokens"
        footer={
          <Button asChild>
            <Link to="." search={{ modal: "service-token" }}>
              Generate
            </Link>
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
  const { projectId, environmentId } = Route.useParams();
  const { modal } = Route.useSearch();

  const GenerateEnvironmentPublicTokenDialog =
    useDialog.GenerateEnvironmentPublicToken.Dialog;
  const GenerateProjectEnvServiceTokenDialog =
    useDialog.GenerateProjectEnvServiceToken.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <GenerateEnvironmentPublicTokenDialog
        projectId={projectId}
        environmentId={environmentId}
        dialogProps={{
          open: modal === "public-token",
          onOpenChange: handleonOpenChange,
        }}
      />
      <GenerateProjectEnvServiceTokenDialog
        projectId={projectId}
        environmentId={environmentId}
        dialogProps={{
          open: modal === "service-token",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["public-token", "service-token"]).optional().catch(undefined),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/tokens",
)({
  validateSearch: zodSearchValidator(searchSchema),
  component: EnvironmentTokensRoute,
  pendingComponent: Layout.Root.Skeleton,
});
