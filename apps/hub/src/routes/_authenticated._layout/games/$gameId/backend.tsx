import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@rivet-gg/components";

function GameBackendRoute() {
  return <Text>Backend</Text>;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend",
)({
  component: GameBackendRoute,
});
