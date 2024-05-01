import { Page } from "@rivet-gg/components";
import { ReactNode } from "react";

interface MatchmakerPageProps {
  children: ReactNode;
}

function NamespacePage({ children }: MatchmakerPageProps) {
  return <Page>{children}</Page>;
}

function EmptyRoot({ children }: { children: ReactNode }) {
  return <Page>{children}</Page>;
}

export { NamespacePage as Root, EmptyRoot };
