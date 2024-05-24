import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId/variables",
)({
  component: () => <div>Hello</div>,
});
