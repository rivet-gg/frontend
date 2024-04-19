import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

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
