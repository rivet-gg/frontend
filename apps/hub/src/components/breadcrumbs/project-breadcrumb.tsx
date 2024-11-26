import { GroupProjectSelect } from "@/domains/project/components/group-project-select";
import { ProjectAvatar } from "@/domains/project/components/project-avatar";
import {
  projectQueryOptions,
  projectsCountQueryOptions,
} from "@/domains/project/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useContext } from "react";
import { NavItem } from "../header/nav-item";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";
import { Separator } from "./separator";

interface ProjectBreadcrumbProps {
  projectId: string;
}

export function ProjectBreadcrumb({ projectId }: ProjectBreadcrumbProps) {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));
  const { data: projectsCount } = useSuspenseQuery(
    projectsCountQueryOptions(data.developerGroupId),
  );

  const navigate = useNavigate();
  const handleProjectChange = (projectId: string) => {
    navigate({
      to: "/projects/$projectId",
      params: { projectId },
    });
  };

  const isMobile = useContext(MobileBreadcrumbsContext);

  const Element = isMobile ? NavItem : Fragment;

  return (
    <>
      <GroupBreadcrumb groupId={data.developerGroupId} />
      <Separator />
      <Element>
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="flex items-center gap-2"
        >
          <ProjectAvatar
            displayName={data.displayName}
            logoUrl={data.logoUrl}
            className={isMobile ? "size-4" : "size-5"}
          />
          {data.displayName}
        </Link>
        {projectsCount > 1 ? (
          <GroupProjectSelect
            variant="discrete"
            showCreateProject
            onCreateClick={() =>
              navigate({
                to: ".",
                search: {
                  modal: "create-project",
                  groupId: data.developerGroupId,
                },
              })
            }
            groupId={data.developerGroupId}
            value={projectId}
            onValueChange={handleProjectChange}
          />
        ) : null}
      </Element>
    </>
  );
}
