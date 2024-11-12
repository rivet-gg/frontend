import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/project/layouts/backend-layout";
import { guardEnterprise } from "@/lib/guards";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function BackendLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, projectId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function BackendLayoutView() {
  const { environmentId, projectId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/backend",
)({
  component: BackendLayoutView,
  errorComponent: BackendLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
  beforeLoad: async ({ context: { queryClient } }) => {
    await guardEnterprise({ queryClient });
  },
});
