import {
  projectEnvironmentQueryOptions,
  projectMetadataQueryOptions,
} from "@/domains/project/queries";
import { GuardEnterprise } from "@/lib/guards";
import {
  faChessKnight,
  faCodeBranch,
  faGlobe,
  faKey,
  faPuzzle,
  faPuzzlePiece,
  faServer,
} from "@rivet-gg/icons";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { HeaderLink } from "../header-link";

interface EnvironmentLinksProps {
  environmentId: string;
  projectId: string;
}

export function HeaderEnvironmentLinks({
  projectId,
  environmentId,
}: EnvironmentLinksProps) {
  const [
    { data },
    {
      data: { legacyLobbiesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [
      projectEnvironmentQueryOptions({ projectId, environmentId }),
      projectMetadataQueryOptions({ projectId }),
    ],
  });

  return (
    <>
      <HeaderLink icon={faServer}>
        <Link
          to="/projects/$projectId/environments/$environmentId/servers"
          params={{ projectId, environmentId }}
        >
          Servers
        </Link>
      </HeaderLink>
      <GuardEnterprise>
        <HeaderLink icon={faPuzzle}>
          <Link
            to="/projects/$projectId/environments/$environmentId/backend"
            params={{ projectId, environmentId }}
          >
            Backend
          </Link>
        </HeaderLink>
        <HeaderLink icon={faPuzzlePiece}>
          <Link
            to="/projects/$projectId/environments/$environmentId/modules"
            params={{ projectId, environmentId }}
          >
            Modules
          </Link>
        </HeaderLink>
      </GuardEnterprise>
      {legacyLobbiesEnabled ? (
        <>
          <HeaderLink icon={faCodeBranch}>
            <Link
              to="/projects/$projectId/environments/$environmentId/versions"
              params={{ projectId, environmentId }}
            >
              Versions
            </Link>
          </HeaderLink>
          {data.namespace.config.matchmaker ? (
            <HeaderLink icon={faChessKnight}>
              <Link
                to="/projects/$projectId/environments/$environmentId/lobbies"
                params={{ projectId, environmentId }}
              >
                Lobbies
              </Link>
            </HeaderLink>
          ) : null}
          {data.namespace.config.cdn ? (
            <HeaderLink icon={faGlobe}>
              <Link
                to="/projects/$projectId/environments/$environmentId/cdn"
                params={{ projectId, environmentId }}
              >
                CDN
              </Link>
            </HeaderLink>
          ) : null}
        </>
      ) : null}
      <HeaderLink icon={faKey}>
        <Link
          to="/projects/$projectId/environments/$environmentId/tokens"
          params={{ projectId, environmentId }}
        >
          Tokens
        </Link>
      </HeaderLink>
    </>
  );
}
