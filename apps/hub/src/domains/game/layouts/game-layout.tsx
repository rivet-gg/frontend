import { Page } from "@rivet-gg/components";
import type { PropsWithChildren, ReactNode } from "react";

interface GamePageProps {
  children: ReactNode;
}

function GamePage({ children }: GamePageProps) {
  return <Page>{children}</Page>;
}

function EmptyGamePage({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}

export { GamePage as Root, EmptyGamePage as EmptyRoot };
