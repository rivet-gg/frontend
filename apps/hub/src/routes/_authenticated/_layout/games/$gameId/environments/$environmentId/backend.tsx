import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/game/layouts/backend-layout";
import { guardEnterprise } from "@/lib/guards";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function BackendLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, gameId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function BackendLayoutView() {
  const { environmentId, gameId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/backend",
)({
  component: BackendLayoutView,
  errorComponent: BackendLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
  beforeLoad: async ({ context: { queryClient } }) => {
    await guardEnterprise({ queryClient });
  },
});
