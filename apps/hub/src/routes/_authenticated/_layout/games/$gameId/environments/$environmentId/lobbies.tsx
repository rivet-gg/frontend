import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";

function MatchmakerLayoutErrorComponent(props: ErrorComponentProps) {
  const { environmentId, gameId } = Route.useParams();
  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function MatchmakerLayoutView() {
  const { environmentId, gameId } = Route.useParams();

  return (
    <Layout.Root environmentId={environmentId} gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/lobbies",
)({
  component: MatchmakerLayoutView,
  errorComponent: MatchmakerLayoutErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
