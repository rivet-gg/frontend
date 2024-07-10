import { Page } from "@rivet-gg/components";
import { useMatches } from "@tanstack/react-router";
import type { PropsWithChildren, ReactNode } from "react";

interface GamePageProps {
  children: ReactNode;
}

function GamePage({ children }: GamePageProps) {
  const matches = useMatches();
  return (
    <Page layout={matches[matches.length - 1].staticData.layout}>
      {children}
    </Page>
  );
}

function EmptyGamePage({ children }: PropsWithChildren) {
  const matches = useMatches();
  return (
    <Page layout={matches[matches.length - 1].staticData.layout}>
      {children}
    </Page>
  );
}

export { GamePage as Root, EmptyGamePage as EmptyRoot };
