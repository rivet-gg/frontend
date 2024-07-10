import type { Rivet } from "@rivet-gg/api-ee";
import { CommandItem } from "@rivet-gg/components";
import { useCommandPanelNavigation } from "./command-panel-navigation-provider";

interface EnvironmentsCommandPanelItemsProps {
  environments: Rivet.ee.backend.Environment[];
  gameId: string;
}

export function EnvironmentsCommandPanelItems({
  environments,
  gameId,
}: EnvironmentsCommandPanelItemsProps) {
  const { changePage } = useCommandPanelNavigation();
  return (
    <>
      {environments.map((environment) => (
        <CommandItem
          key={environment.environmentId}
          onSelect={() => {
            changePage({
              key: "environment",
              params: { gameId, environmentId: environment.environmentId },
            });
          }}
        >
          {environment.displayName}
        </CommandItem>
      ))}
    </>
  );
}
