import { Page } from "@rivet-gg/components";
import type { ReactNode } from "react";

interface GroupPageProps {
  children: ReactNode;
}

function GroupPage({ children }: GroupPageProps) {
  return <Page>{children}</Page>;
}

export { GroupPage as Root };
