import { EnvironmentSelect } from "@/domains/game/components/environment-select";
import { useNavigate } from "@tanstack/react-router";
import { GameBreadcrumb } from "./game-breadcrumb";
import { Separator } from "./separator";

interface EnvironmentBreadcrumbProps {
  environmentId: string;
  gameId: string;
}

export function EnvironmentBreadcrumb({
  environmentId,
  gameId,
}: EnvironmentBreadcrumbProps) {
  const navigate = useNavigate();

  const handleEnvironmentChange = (environmentId: string) => {
    navigate({
      to: "/games/$gameId/environments/$environmentId",
      params: { gameId, environmentId },
    });
  };

  return (
    <>
      <GameBreadcrumb gameId={gameId} />
      <Separator />
      <div>
        <EnvironmentSelect
          gameId={gameId}
          value={environmentId}
          onCreateClick={() =>
            navigate({ to: ".", search: { modal: "create-environment" } })
          }
          showCreateEnvironment
          onValueChange={handleEnvironmentChange}
        />
      </div>
    </>
  );
}
