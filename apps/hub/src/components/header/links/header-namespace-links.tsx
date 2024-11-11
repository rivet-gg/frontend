import {
  gameMetadataQueryOptions,
  gameNamespaceQueryOptions,
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
      <HeaderLink icon={faServer}>
        <Link
          to="/games/$gameId/environments/$namespaceId/servers"
          params={{ gameId, namespaceId }}
        >
          Servers
        </Link>
      </HeaderLink>
      <GuardEnterprise>
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
      </GuardEnterprise>
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
