import { Link } from "@rivet-gg/components";

interface GameBackendDeploymentLinkProps {
  url: string;
}

export function GameBackendDeploymentLink({
  url,
}: GameBackendDeploymentLinkProps) {
  return (
    <Link href={url} target="_blank" rel="noreferrer">
      {url}
    </Link>
  );
}
