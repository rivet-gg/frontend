import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/project/layouts/matchmaker-layout";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function MatchmakerLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, projectId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function MatchmakerLayoutView() {
  const { environmentId, projectId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} projectId={projectId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/lobbies",
)({
  component: MatchmakerLayoutView,
  errorComponent: MatchmakerLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
