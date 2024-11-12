import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/tokens",
)({
  loader: ({ params }) => {
    throw redirect({
      to: "/projects/$projectId/settings/tokens",
      params,
    });
  },
});
