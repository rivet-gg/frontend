import { ProjectAvatar } from "@/domains/project/components/project-avatar";
import type { Rivet } from "@rivet-gg/api";
import { CommandItem } from "@rivet-gg/components";
import { useCommandPanelNavigation } from "./command-panel-navigation-provider";

interface ProjectsCommandPanelItemsProps {
  projects: Rivet.game.Summary[];
  groupId: string;
}

export function ProjectsCommandPanelItems({
  projects,
}: ProjectsCommandPanelItemsProps) {
  const { changePage } = useCommandPanelNavigation();
  return (
    <>
      {projects.map((project) => (
        <CommandItem
          key={project.gameId}
          value={project.gameId}
          keywords={[project.displayName]}
          onSelect={() => {
            changePage({
              key: "project",
              params: { projectId: project.gameId },
            });
          }}
        >
          <ProjectAvatar
            className="mr-2 size-4"
            displayName={project.displayName}
            logoUrl={project.logoUrl}
          />
          {project.displayName}
        </CommandItem>
      ))}
    </>
  );
}
