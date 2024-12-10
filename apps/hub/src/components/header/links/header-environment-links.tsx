import {
  projectEnvironmentQueryOptions,
  projectMetadataQueryOptions,
} from "@/domains/project/queries";
import { GuardEnterprise } from "@/lib/guards";
import {
  faActorsBorderless,
  faChessKnight,
  faCodeBranch,
  faGlobe,
  faHammer,
  faKey,
  faPuzzle,
  faPuzzlePiece,
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
      data: { legacyLobbiesEnabled, backendModulesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [
      projectEnvironmentQueryOptions({ projectId, environmentId }),
      projectMetadataQueryOptions({ projectId, environmentId }),
    ],
  });

  return (
    <>
      <HeaderLink icon={faActorsBorderless}>
        <Link
          to="/projects/$projectId/environments/$environmentId/actors"
          params={{ projectId, environmentId }}
        >
          Actors
        </Link>
      </HeaderLink>
      <HeaderLink icon={faHammer}>
        <Link
          to="/projects/$projectId/environments/$environmentId/builds"
          params={{ projectId, environmentId }}
        >
          Builds
        </Link>
      </HeaderLink>
      {backendModulesEnabled ? (
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
      ) : null}
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
