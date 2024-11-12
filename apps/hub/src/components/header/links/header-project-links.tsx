import { GuardEnterprise } from "@/lib/guards";
import { faCircleDollar, faFolder, faGear } from "@rivet-gg/icons";
import { Link } from "@tanstack/react-router";
import { HeaderLink } from "../header-link";

interface HeaderProjectLinksProps {
  projectId: string;
}

export function HeaderProjectLinks({ projectId }: HeaderProjectLinksProps) {
  return (
    <>
      <HeaderLink icon={faFolder}>
        <Link
          to="/projects/$projectId"
          activeOptions={{ exact: true }}
          params={{ projectId }}
        >
          Environments
        </Link>
      </HeaderLink>
      <GuardEnterprise>
        <HeaderLink icon={faCircleDollar}>
          <Link to="/projects/$projectId/billing" params={{ projectId }}>
            Billing
          </Link>
        </HeaderLink>
      </GuardEnterprise>
      <HeaderLink icon={faGear}>
        <Link to="/projects/$projectId/settings" params={{ projectId }}>
          Settings
        </Link>
      </HeaderLink>
    </>
  );
}
