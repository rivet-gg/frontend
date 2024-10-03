import { Page, Skeleton } from "@rivet-gg/components";
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

GamePage.Skeleton = Page.Skeleton;

function Content({ children }: PropsWithChildren) {
  return <>{children}</>;
}

Content.Skeleton = function ContentSkeleton() {
  return (
    <>
      <Skeleton className="my-4 h-12 w-1/3" />
      <div className="flex flex-row gap-4">
        <Skeleton className="h-64 w-2/3" />
        <Skeleton className="h-64 w-1/3" />
      </div>
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </>
  );
};

function EmptyGamePage({ children }: PropsWithChildren) {
  const matches = useMatches();
  return (
    <Page layout={matches[matches.length - 1].staticData.layout}>
      {children}
    </Page>
  );
}

export { GamePage as Root, EmptyGamePage as EmptyRoot, Content };
