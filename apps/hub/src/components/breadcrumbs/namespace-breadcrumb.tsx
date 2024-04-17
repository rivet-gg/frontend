import { gameNamespacesQueryOptions } from "@/domains/game/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Separator } from "./separator";
import { GameBreadcrumb } from "./game-breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";

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
      to: "/games/$gameId/namespaces/$namespaceId",
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
            <SelectValue placeholder="Select expiration" />
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
