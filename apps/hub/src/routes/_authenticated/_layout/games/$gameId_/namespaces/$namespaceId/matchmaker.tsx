import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker",
)({
  loader: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/namespaces/$namespaceId/lobbies",
      params,
    });
  },
});
