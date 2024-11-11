import * as Layout from "@/domains/game/layouts/game-layout";
import { modulesCategoriesQueryOptions } from "@/domains/game/queries";
import { ModulesStore } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function GameIdModules() {
  const { data } = useSuspenseQuery(modulesCategoriesQueryOptions());

  return <ModulesStore categories={data} includeModulesDocumentation />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId/modules",
)({
  component: GameIdModules,
  pendingComponent: Layout.Root.Skeleton,
});
