import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/matchmaker",
)({
  loader: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/environments/$namespaceId/lobbies",
      params,
    });
  },
});
