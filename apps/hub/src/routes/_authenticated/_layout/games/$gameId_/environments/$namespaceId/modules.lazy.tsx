import { modulesCategoriesQueryOptions } from "@/domains/game/queries";
import { ModulesStore } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

function GameIdModules() {
  const { data } = useSuspenseQuery(modulesCategoriesQueryOptions());

  return <ModulesStore categories={data} includeModulesDocumentation />;
}

export const Route = createLazyFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/modules",
)({
  component: GameIdModules,
});
