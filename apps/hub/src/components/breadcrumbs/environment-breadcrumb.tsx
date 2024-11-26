import { EnvironmentSelect } from "@/domains/project/components/environment-select";
import { projectEnvironmentQueryOptions } from "@/domains/project/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { NavItem } from "../header/nav-item";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";
import { ProjectBreadcrumb } from "./project-breadcrumb";
import { Separator } from "./separator";

interface EnvironmentBreadcrumbProps {
  environmentId: string;
  projectId: string;
}

export function EnvironmentBreadcrumb({
  environmentId,
  projectId,
}: EnvironmentBreadcrumbProps) {
  const { data } = useSuspenseQuery(
    projectEnvironmentQueryOptions({ projectId, environmentId }),
  );
  const navigate = useNavigate();

  const handleEnvironmentChange = (environmentId: string) => {
    navigate({
      to: "/projects/$projectId/environments/$environmentId",
      params: { projectId, environmentId },
    });
  };
  const isMobile = useContext(MobileBreadcrumbsContext);

  const Element = isMobile ? NavItem : Fragment;

  return (
    <>
      <ProjectBreadcrumb projectId={projectId} />
      <Separator />
      <Element>
        <Link
          to="/projects/$projectId/environments/$environmentId"
          params={{ projectId, environmentId }}
          className="flex items-center gap-2"
        >
          {data.namespace.displayName}
        </Link>
        <EnvironmentSelect
          variant="discrete"
          projectId={projectId}
          value={environmentId}
          onCreateClick={() =>
            navigate({ to: ".", search: { modal: "create-environment" } })
          }
          showCreateEnvironment
          onValueChange={handleEnvironmentChange}
        />
      </Element>
    </>
  );
}
