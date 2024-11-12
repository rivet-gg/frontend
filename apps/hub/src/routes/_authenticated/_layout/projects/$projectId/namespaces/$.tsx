import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/namespaces/$",
)({
  beforeLoad: ({ params, location }) => {
    throw redirect({
      to: location.pathname.replace("/namespaces/", "/environments/"),
    });
  },
});
