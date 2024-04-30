import {
  ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import * as Layout from "@/domains/game/layouts/matchmaker-layout";
import { ErrorComponent } from "@/components/error-component";

function MatchmakerLayoutErrorComponent(props: ErrorComponentProps) {
  const { namespaceId, gameId } = Route.useParams();
  return (
    <Layout.Root namespaceId={namespaceId} gameId={gameId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function MatchmakerLayoutView() {
  const { namespaceId, gameId } = Route.useParams();

  return (
    <Layout.Root namespaceId={namespaceId} gameId={gameId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker",
)({
  component: MatchmakerLayoutView,
  errorComponent: MatchmakerLayoutErrorComponent,
});
