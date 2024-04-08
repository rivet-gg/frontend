import { ReactNode } from "react";
import { Page, PageProps } from "./page";

export interface SidebarPageProps extends PageProps {
  sidebar?: ReactNode;
}

export const SidebarPage = ({
  children,
  sidebar,
  ...props
}: SidebarPageProps) => {
  return (
    <Page {...props}>
      <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        {sidebar}
        {children}
      </div>
    </Page>
  );
};
