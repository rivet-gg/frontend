import * as Layout from "@/domains/game/layouts/game-layout";
import { NamespaceVersions } from "@/domains/game/views/namespace-versions";
import { createFileRoute } from "@tanstack/react-router";

function NamespaceVersionsRoute() {
  const { gameId, namespaceId } = Route.useParams();
  return <NamespaceVersions gameId={gameId} namespaceId={namespaceId} />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/versions",
)({
  component: NamespaceVersionsRoute,
  pendingComponent: Layout.Root.Skeleton,
});
