import { gameNamespacesQueryOptions } from "@/domains/game/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
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
  const { data } = useSuspenseQuery(gameNamespacesQueryOptions(gameId));

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
        <Select value={namespaceId} onValueChange={handleNamespaceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select environment..." />
          </SelectTrigger>
          <SelectContent>
            {data.map((namespace) => (
              <SelectItem
                key={namespace.namespaceId}
                value={namespace.namespaceId}
              >
                {namespace.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
