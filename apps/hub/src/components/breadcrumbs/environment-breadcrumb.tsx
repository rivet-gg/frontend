import { EnvironmentSelect } from "@/domains/project/components/environment-select";
import { useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();

  const handleEnvironmentChange = (environmentId: string) => {
    navigate({
      to: "/projects/$projectId/environments/$environmentId",
      params: { projectId, environmentId },
    });
  };

  return (
    <>
      <ProjectBreadcrumb projectId={projectId} />
      <Separator />
      <div>
        <EnvironmentSelect
          projectId={projectId}
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
