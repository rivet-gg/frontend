import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/game/layouts/servers-layout";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function ServersLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, gameId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function ServersLayoutView() {
  const { environmentId, gameId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/servers",
)({
  component: ServersLayoutView,
  errorComponent: ServersLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
