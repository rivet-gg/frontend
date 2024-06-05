import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface GroupPageProps {
  groupId: string;
  children: ReactNode;
}

function GroupSettingsPage({ children, groupId }: GroupPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <Link
            to="/teams/$groupId/settings"
            params={{ groupId }}
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
