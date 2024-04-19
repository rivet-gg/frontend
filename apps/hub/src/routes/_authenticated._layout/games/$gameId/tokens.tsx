import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@rivet-gg/components";

function GameTokensRoute() {
  return <Text>Tokens</Text>;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/tokens",
)({
  component: GameTokensRoute,
});
