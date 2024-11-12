import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/matchmaker",
)({
  loader: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/environments/$environmentId/lobbies",
      params,
    });
  },
});
