import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface GroupPageProps {
  gameId: string;
  children: ReactNode;
}

function GroupSettingsPage({ children, gameId }: GroupPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <Link
            to="/games/$gameId/settings"
            activeOptions={{ exact: true }}
            params={{ gameId }}
            className="aria-current-page:text-foreground aria-current-page:font-semibold"
          >
            General
          </Link>
          <Link
            to="/games/$gameId/settings/tokens"
            params={{ gameId }}
            className="aria-current-page:text-foreground aria-current-page:font-semibold"
          >
            Tokens
          </Link>
        </SidebarNavigation>
      }
    >
      {children}
    </SidebarPageContent>
  );
}

export { GroupSettingsPage as Root };
