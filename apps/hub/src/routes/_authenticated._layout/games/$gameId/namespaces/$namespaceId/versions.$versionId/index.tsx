import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/versions/$versionId/",
)({
  component: () => (
    <div>
      Hello
      /_authenticated/_layout/games/$gameId/namespaces/$namespaceId/versions/$versionId/!
    </div>
  ),
});
