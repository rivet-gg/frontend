import { EnvironmentSelect } from "@/domains/game/components/environment-select";
import { useNavigate } from "@tanstack/react-router";
import { GameBreadcrumb } from "./game-breadcrumb";
import { Separator } from "./separator";

interface NamespaceBreadcrumbProps {
  namespaceId: string;
  gameId: string;
}

export function NamespaceBreadcrumb({
  namespaceId,
  gameId,
}: NamespaceBreadcrumbProps) {
  const navigate = useNavigate();

  const handleNamespaceChange = (namespaceId: string) => {
    navigate({
      to: "/games/$gameId/environments/$namespaceId",
      params: { gameId, namespaceId },
    });
  };

  return (
    <>
      <GameBreadcrumb gameId={gameId} />
      <Separator />
      <div>
        <EnvironmentSelect
          gameId={gameId}
          value={namespaceId}
          onCreateClick={() =>
            navigate({ to: ".", search: { modal: "create-environment" } })
          }
          showCreateEnvironment
          onValueChange={handleNamespaceChange}
        />
      </div>
    </>
  );
}
