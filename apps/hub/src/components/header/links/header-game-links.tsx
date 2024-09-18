import { faCircleDollar, faFolder, faGear, faKey } from "@rivet-gg/icons";
import { Link } from "@tanstack/react-router";
import { HeaderLink } from "../header-link";

interface HeaderGameLinksProps {
  gameId: string;
}

export function HeaderGameLinks({ gameId }: HeaderGameLinksProps) {
  return (
    <>
      <HeaderLink icon={faFolder}>
        <Link
          to="/games/$gameId"
          activeOptions={{ exact: true }}
          params={{ gameId }}
        >
          Environments
        </Link>
      </HeaderLink>
      <HeaderLink icon={faKey}>
        <Link to="/games/$gameId/tokens" params={{ gameId }}>
          Tokens
        </Link>
      </HeaderLink>
      <HeaderLink icon={faCircleDollar}>
        <Link to="/games/$gameId/billing" params={{ gameId }}>
          Billing
        </Link>
      </HeaderLink>
      <HeaderLink icon={faGear}>
        <Link to="/games/$gameId/settings" params={{ gameId }}>
          Settings
        </Link>
      </HeaderLink>
    </>
  );
}
