import {
  gameEnvironmentQueryOptions,
  gameMetadataQueryOptions,
} from "@/domains/game/queries";
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
  gameId: string;
}

export function HeaderEnvironmentLinks({
  gameId,
  environmentId,
}: EnvironmentLinksProps) {
  const [
    { data },
    {
      data: { legacyLobbiesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [
      gameEnvironmentQueryOptions({ gameId, environmentId }),
      gameMetadataQueryOptions({ gameId }),
    ],
  });

  return (
    <>
      <HeaderLink icon={faServer}>
        <Link
          to="/games/$gameId/environments/$environmentId/servers"
          params={{ gameId, environmentId }}
        >
          Servers
        </Link>
      </HeaderLink>
      <GuardEnterprise>
        <HeaderLink icon={faPuzzle}>
          <Link
            to="/games/$gameId/environments/$environmentId/backend"
            params={{ gameId, environmentId }}
          >
            Backend
          </Link>
        </HeaderLink>
        <HeaderLink icon={faPuzzlePiece}>
          <Link
            to="/games/$gameId/environments/$environmentId/modules"
            params={{ gameId, environmentId }}
          >
            Modules
          </Link>
        </HeaderLink>
      </GuardEnterprise>
      {legacyLobbiesEnabled ? (
        <>
          <HeaderLink icon={faCodeBranch}>
            <Link
              to="/games/$gameId/environments/$environmentId/versions"
              params={{ gameId, environmentId }}
            >
              Versions
            </Link>
          </HeaderLink>
          {data.namespace.config.matchmaker ? (
            <HeaderLink icon={faChessKnight}>
              <Link
                to="/games/$gameId/environments/$environmentId/lobbies"
                params={{ gameId, environmentId }}
              >
                Lobbies
              </Link>
            </HeaderLink>
          ) : null}
          {data.namespace.config.cdn ? (
            <HeaderLink icon={faGlobe}>
              <Link
                to="/games/$gameId/environments/$environmentId/cdn"
                params={{ gameId, environmentId }}
              >
                CDN
              </Link>
            </HeaderLink>
          ) : null}
        </>
      ) : null}
      <HeaderLink icon={faKey}>
        <Link
          to="/games/$gameId/environments/$environmentId/tokens"
          params={{ gameId, environmentId }}
        >
          Tokens
        </Link>
      </HeaderLink>
    </>
  );
}
