import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/servers",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/projects/$projectId/environments/$environmentId/actors",
      params,
    });
  },
});
