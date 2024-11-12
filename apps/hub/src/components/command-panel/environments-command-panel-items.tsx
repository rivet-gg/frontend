import type { Environment } from "@/domains/project/queries";
import { Badge, CommandItem } from "@rivet-gg/components";
import { useCommandPanelNavigation } from "./command-panel-navigation-provider";

interface EnvironmentsCommandPanelItemsProps {
  namespaces: Environment[];
  projectId: string;
}

export function EnvironmentsCommandPanelItems({
  namespaces,
  projectId,
}: EnvironmentsCommandPanelItemsProps) {
  const { changePage } = useCommandPanelNavigation();
  return (
    <>
      {namespaces.map((environment) => (
        <CommandItem
          key={environment.namespaceId}
          onSelect={() => {
            changePage({
              key: "environment",
              params: { projectId, environmentId: environment.namespaceId },
            });
          }}
        >
          {environment.displayName}{" "}
          {environment.version ? (
            <Badge className="ml-2">{environment.version?.displayName}</Badge>
          ) : null}
        </CommandItem>
      ))}
    </>
  );
}
