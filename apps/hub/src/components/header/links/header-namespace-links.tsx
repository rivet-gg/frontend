import {
  gameMetadataQueryOptions,
  gameNamespaceQueryOptions,
} from "@/domains/game/queries";
import {
  faChessKnight,
  faCodeBranch,
  faGlobe,
  faHome,
  faKey,
  faPuzzle,
  faPuzzlePiece,
  faServer,
} from "@rivet-gg/icons";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { HeaderLink } from "../header-link";

interface NamespaceLinksProps {
  namespaceId: string;
  gameId: string;
}

export function HeaderNamespaceLinks({
  gameId,
  namespaceId,
}: NamespaceLinksProps) {
  const [
    { data },
    {
      data: { legacyLobbiesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [
      gameNamespaceQueryOptions({ gameId, namespaceId }),
      gameMetadataQueryOptions({ gameId }),
    ],
  });

  return (
    <>
      <HeaderLink icon={faHome}>
        <Link
          to="/games/$gameId/environments/$namespaceId"
          activeOptions={{ exact: true }}
          params={{ gameId, namespaceId }}
        >
          Overview
        </Link>
      </HeaderLink>
      <>
        <HeaderLink icon={faServer}>
          <Link
            to="/games/$gameId/environments/$namespaceId/servers"
            params={{ gameId, namespaceId }}
          >
            Servers
          </Link>
        </HeaderLink>
        <HeaderLink icon={faPuzzle}>
          <Link
            to="/games/$gameId/environments/$namespaceId/backend"
            params={{ gameId, namespaceId }}
          >
            Backend
          </Link>
        </HeaderLink>
        <HeaderLink icon={faPuzzlePiece}>
          <Link
            to="/games/$gameId/environments/$namespaceId/modules"
            params={{ gameId, namespaceId }}
          >
            Modules
          </Link>
        </HeaderLink>
      </>
      {legacyLobbiesEnabled ? (
        <>
          <HeaderLink icon={faCodeBranch}>
            <Link
              to="/games/$gameId/environments/$namespaceId/versions"
              params={{ gameId, namespaceId }}
            >
              Versions
            </Link>
          </HeaderLink>
          {data.namespace.config.matchmaker ? (
            <HeaderLink icon={faChessKnight}>
              <Link
                to="/games/$gameId/environments/$namespaceId/lobbies"
                params={{ gameId, namespaceId }}
              >
                Lobbies
              </Link>
            </HeaderLink>
          ) : null}
          {data.namespace.config.cdn ? (
            <HeaderLink icon={faGlobe}>
              <Link
                to="/games/$gameId/environments/$namespaceId/cdn"
                params={{ gameId, namespaceId }}
              >
                CDN
              </Link>
            </HeaderLink>
          ) : null}
        </>
      ) : null}
      <HeaderLink icon={faKey}>
        <Link
          to="/games/$gameId/environments/$namespaceId/tokens"
          params={{ gameId, namespaceId }}
        >
          Tokens
        </Link>
      </HeaderLink>
    </>
  );
}
