import { ReactNode } from "react";

export interface SidebarPageContentProps {
  sidebar?: ReactNode;
  children: ReactNode;
}

export const SidebarPageContent = ({
  children,
  sidebar,
}: SidebarPageContentProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      {sidebar}
      {children}
    </div>
  );
};
