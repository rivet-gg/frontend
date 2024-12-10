import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface GroupPageProps {
  projectId: string;
  children: ReactNode;
}

function GroupSettingsPage({ children, projectId }: GroupPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <Link
            to="/projects/$projectId/settings"
            activeOptions={{ exact: true }}
            params={{ projectId }}
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
