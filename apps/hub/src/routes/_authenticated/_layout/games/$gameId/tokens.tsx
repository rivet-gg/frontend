import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/tokens",
)({
  loader: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/settings/tokens",
      params,
    });
  },
});
