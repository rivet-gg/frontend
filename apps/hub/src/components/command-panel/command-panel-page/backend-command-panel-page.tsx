import {
  gameBackendProjectEnvsQueryOptions,
  gameBackendProjectQueryOptions,
} from "@/domains/game/queries";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";
import { EnvironmentsCommandPanelItems } from "../environments-command-panel-items";

interface BackendCommandPanelPage {
  gameId: string;
}

export function BackendCommandPanelPage({ gameId }: BackendCommandPanelPage) {
  const {
    data: { project },
  } = useSuspenseQuery(gameBackendProjectQueryOptions(gameId));

  if (!project) throw new Error("Project not found");

  const { data } = useSuspenseQuery(
    gameBackendProjectEnvsQueryOptions(project.projectId),
  );

  const { navigate } = useCommandPanelNavigation();

  return (
    <>
      <CommandGroup heading="Environments">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/backend",
              search: { modal: "create-environment" },
              params: { gameId },
            });
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create a new environment
        </CommandItem>
        <EnvironmentsCommandPanelItems gameId={gameId} environments={data} />
      </CommandGroup>
    </>
  );
}
