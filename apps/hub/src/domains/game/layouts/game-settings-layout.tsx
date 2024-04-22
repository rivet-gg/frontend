import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

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
            params={{ gameId }}
            className="text-foreground font-semibold"
          >
            General
          </Link>
        </SidebarNavigation>
      }
    >
      {children}
    </SidebarPageContent>
  );
}

export { GroupSettingsPage as Root };
