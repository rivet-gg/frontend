import {
  faExternalLink,
  faSpinnerThird,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@rivet-gg/components";
import { useGameBackendProjectEnvDatabasePreview } from "../../queries";

interface GameBackendDatabaseLinkProps {
  projectId: string;
  environmentId: string;
}

export function GameBackendDatabaseLink({
  projectId,
  environmentId,
}: GameBackendDatabaseLinkProps) {
  const { isLoading, data, mutateAsync } =
    useGameBackendProjectEnvDatabasePreview({
      projectId,
      environmentId,
    });

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        if (isLoading) {
          return;
        }
        if (!data) {
          const value = await mutateAsync({ projectId, environmentId });
          return window.open(value, "_blank", "noreferrer,noopener");
        }
        if (typeof data === "string") {
          window.open(data, "_blank", "noreferrer,noopener");
        }
      }}
      rel="noopener noreferrer"
      className={cn(
        "data-active:text-foreground text-left data-active:font-semibold",
        isLoading && "opacity-50",
      )}
    >
      Database
      <FontAwesomeIcon
        icon={isLoading ? faSpinnerThird : faExternalLink}
        className={cn("ml-2 size-3", isLoading && "animate-spin")}
      />
    </button>
  );
}
