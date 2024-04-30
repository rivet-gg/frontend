import { Page } from "@rivet-gg/components";
import { PropsWithChildren, ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameQueryOptions } from "../queries";

interface GamePageProps {
  gameId: string;
  children: ReactNode;
}

function GamePage({ children, gameId }: GamePageProps) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  return <Page title={data.displayName}>{children}</Page>;
}

function EmptyGamePage({ children }: PropsWithChildren) {
  return <Page title="Unknown Game">{children}</Page>;
}

export { GamePage as Root, EmptyGamePage as EmptyRoot };
