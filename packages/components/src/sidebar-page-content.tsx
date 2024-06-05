import type { ReactNode } from "react";

export interface SidebarPageContentProps {
  sidebar?: ReactNode;
  children: ReactNode;
}

export const SidebarPageContent = ({
  children,
  sidebar,
}: SidebarPageContentProps) => {
  return (
    <div className="flex flex-col md:grid gap-6 md:grid-cols-[150px_1fr] lg:grid-cols-[150px_1fr]">
      {sidebar}
      {children}
    </div>
  );
};
