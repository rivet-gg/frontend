import { ModulesStore, loadModuleCategories } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function GameIdModules() {
  const { categories } = Route.useLoaderData();
  return (
    <>
      <ModulesStore categories={categories} includeModulesDocumentation />
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/modules",
)({
  component: GameIdModules,
  loader: async () => {
    const categories = await loadModuleCategories();
    return {
      categories,
    };
  },
});
