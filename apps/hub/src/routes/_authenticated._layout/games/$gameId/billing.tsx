import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@rivet-gg/components";

function GameBillingRoute() {
  return <Text>Billng</Text>;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/billing",
)({
  component: GameBillingRoute,
});
