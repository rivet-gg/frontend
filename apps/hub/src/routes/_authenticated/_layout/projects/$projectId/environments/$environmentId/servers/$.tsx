import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/servers/$",
)({
  beforeLoad: ({ params, location }) => {
    if (location.href.endsWith("/builds")) {
      throw redirect({
        to: "/projects/$projectId/environments/$environmentId/builds",
        params,
      });
    }
  },
});
