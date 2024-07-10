import { faDatabase, faExternalLink } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { Button } from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, forwardRef } from "react";
import { useGameBackendProjectEnvDatabasePreview } from "../../queries";

interface GameBackendEnvironmentDatabaseLinkProps {
  projectId: string;
  environmentId: string;
  asChild?: boolean;
  children?: ReactNode;
}

export const GameBackendEnvironmentDatabaseLink = forwardRef<
  HTMLButtonElement,
  GameBackendEnvironmentDatabaseLinkProps
>(({ projectId, environmentId, asChild, children }, ref) => {
  const { isLoading, data } = useGameBackendProjectEnvDatabasePreview({
    projectId,
    environmentId,
  });

  const C = asChild ? Slot : Button;
  const navigate = useNavigate();

  return (
    <C
      ref={ref}
      onClick={async (e) => {
        e?.preventDefault();
        if (isLoading) {
          return;
        }
        if (!data) {
          return navigate({ search: { modal: "database" } });
        }
        if (typeof data === "string") {
          window.open(data, "_blank", "noreferrer,noopener");
        }
      }}
      isLoading={isLoading}
      startIcon={<FontAwesomeIcon icon={faDatabase} className={"size-4"} />}
      endIcon={
        data ? (
          <FontAwesomeIcon icon={faExternalLink} className={"size-4"} />
        ) : undefined
      }
    >
      {children}
    </C>
  );
});
