import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/project/layouts/servers-layout";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function ServersLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, projectId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function ServersLayoutView() {
  const { environmentId, projectId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/servers",
)({
  component: ServersLayoutView,
  errorComponent: ServersLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
