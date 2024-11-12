import { ErrorComponent } from "@/components/error-component";
import { BillingProvider } from "@/domains/project/components/billing/billing-context";
import { BillingOverageWarning } from "@/domains/project/components/billing/billing-overage-warning";
import * as Layout from "@/domains/project/layouts/project-layout";
import { projectQueryOptions } from "@/domains/project/queries";
import { useDialog } from "@/hooks/use-dialog";
import { ls } from "@/lib/ls";
import { safeAsync } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function ProjectIdErrorComponent(props: ErrorComponentProps) {
  return (
    <Layout.EmptyRoot>
      <ErrorComponent {...props} />
    </Layout.EmptyRoot>
  );
}

function Modals() {
  const navigate = Route.useNavigate();
  const { projectId } = Route.useParams();
  const { modal } = Route.useSearch();

  const GenerateProjectCloudTokenDialog =
    useDialog.GenerateProjectCloudToken.Dialog;
  const CreateEnvironmentDialog = useDialog.CreateEnvironment.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <GenerateProjectCloudTokenDialog
        projectId={projectId}
        dialogProps={{
          open: modal === "cloud-token",
          onOpenChange: handleonOpenChange,
        }}
      />
      <CreateEnvironmentDialog
        projectId={projectId}
        dialogProps={{
          open: modal === "create-environment",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function ProjectIdRoute() {
  const { projectId } = Route.useParams();

  const {
    data: { developerGroupId },
  } = useSuspenseQuery(projectQueryOptions(projectId));

  return (
    <Layout.Root>
      <BillingProvider projectId={projectId} groupId={developerGroupId}>
        <BillingOverageWarning />
        <Outlet />
      </BillingProvider>
      <Modals />
    </Layout.Root>
  );
}

const searchSchema = z.object({
  modal: z
    .enum(["cloud-token", "service-token", "create-environment"])
    .or(z.string())
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId",
)({
  validateSearch: zodSearchValidator(searchSchema),
  component: ProjectIdRoute,
  errorComponent: ProjectIdErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
  beforeLoad: async ({
    context: { queryClient, auth },
    params: { projectId },
  }) => {
    const [response] = await safeAsync(
      queryClient.fetchQuery(projectQueryOptions(projectId)),
    );

    if (response) {
      ls.set(
        `rivet-lastteam-${auth.profile?.identity.identityId}`,
        response.game.developerGroupId,
      );
    }
  },
});
