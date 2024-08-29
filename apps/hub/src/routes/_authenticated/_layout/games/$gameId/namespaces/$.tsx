import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$",
)({
  beforeLoad: ({ params, location }) => {
    throw redirect({
      to: location.pathname.replace("/namespaces/", "/environments/"),
    });
  },
});
