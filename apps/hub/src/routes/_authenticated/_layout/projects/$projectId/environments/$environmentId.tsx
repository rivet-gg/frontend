import { ErrorComponent } from "@/components/error-component";
import { tryCreateBackend } from "@/domains/project/helpers/try-create-backend";
import * as Layout from "@/domains/project/layouts/project-layout";
import {
  projectEnvironmentQueryOptions,
  projectQueryOptions,
} from "@/domains/project/queries";
import { useDialog } from "@/hooks/use-dialog";
import { queryClient } from "@/queries/global";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
  notFound,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { projectId, environmentId } = Route.useParams();
  const { modal, buildId } = Route.useSearch();

  const ConfirmOuterbaseConnectionDialog =
    useDialog.ConfirmOuterbaseConnection.Dialog;

  const CreateDynamicServerDialog = useDialog.CreateDynamicServer.Dialog;
  const EditBuildTagsDialog = useDialog.EditBuildTags.Dialog;

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <ConfirmOuterbaseConnectionDialog
        environmentId={environmentId}
        projectId={projectId}
        dialogProps={{
          open: modal === "database",
          onOpenChange: handleOpenChange,
        }}
      />
      <CreateDynamicServerDialog
        environmentId={environmentId}
        projectId={projectId}
        dialogProps={{
          open: modal === "create-server",
          onOpenChange: handleOpenChange,
        }}
      />
      <EditBuildTagsDialog
        // biome-ignore lint/style/noNonNullAssertion: at this point we know buildId is defined
        buildId={buildId!}
        environmentId={environmentId}
        projectId={projectId}
        dialogProps={{
          open: modal === "edit-tags",
          onOpenChange: handleOpenChange,
        }}
      />
    </>
  );
}

function EnvironmentErrorComponent(props: ErrorComponentProps) {
  return <ErrorComponent {...props} />;
}

function environmentIdRoute() {
  return (
    <>
      <Outlet />
      <Modals />
    </>
  );
}
const searchSchema = z.object({
  modal: z
    .enum(["database", "create-server", "edit-tags"])
    .or(z.string())
    .optional()
    .catch(undefined),
  buildId: z.string().optional().catch(undefined),
});
export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId",
)({
  validateSearch: zodSearchValidator(searchSchema),
  loader: async ({ params: { projectId, environmentId } }) => {
    const { game: project } = await queryClient.ensureQueryData(
      projectQueryOptions(projectId),
    );
    const { namespace: environment } = await queryClient.ensureQueryData(
      projectEnvironmentQueryOptions({ projectId, environmentId }),
    );

    const version = project.versions.find(
      (version) => version.versionId === environment.versionId,
    );

    if (!environment || !project || !version) {
      throw notFound();
    }

    await tryCreateBackend({
      projectId,
      environmentId: environmentId,
      queryClient,
    });

    return { environment, version };
  },
  component: environmentIdRoute,
  errorComponent: EnvironmentErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
