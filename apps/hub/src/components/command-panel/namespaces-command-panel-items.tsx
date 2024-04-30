import { Badge, CommandItem } from "@rivet-gg/components";
import { useCommandPanelNavigation } from "./command-panel-navigation-provider";
import { Namespace } from "@/domains/game/queries";

interface NamespacesCommandPanelItemsProps {
  namespaces: Namespace[];
  gameId: string;
}

export function NamespacesCommandPanelItems({
  namespaces,
  gameId,
}: NamespacesCommandPanelItemsProps) {
  const { changePage } = useCommandPanelNavigation();
  return (
    <>
      {namespaces.map((namespace) => (
        <CommandItem
          key={namespace.namespaceId}
          onSelect={() => {
            changePage({
              key: "namespace",
              params: { gameId, namespaceId: namespace.namespaceId },
            });
          }}
        >
          {namespace.displayName}{" "}
          {namespace.version ? (
            <Badge className="ml-2">{namespace.version?.displayName}</Badge>
          ) : null}
        </CommandItem>
      ))}
    </>
  );
}
