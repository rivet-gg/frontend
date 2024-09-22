import { Link, cn } from "@rivet-gg/components";
import { useMatches } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header as UiHeader } from "../components/header/header";

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  const matches = useMatches();
  return (
    <div
      className={cn("flex min-h-screen flex-col", {
        "h-screen": matches[matches.length - 1].staticData.layout === "full",
      })}
    >
      {children}
    </div>
  );
};

const Main = ({ children }: RootProps) => {
  return (
    <main className="bg-background flex flex-1 flex-col h-full min-h-0">
      {children}
    </main>
  );
};

const Header = () => {
  return <UiHeader />;
};

const Footer = () => {
  return (
    <footer className="text-muted-foreground bg-background p-4 text-center text-sm">
      <div className="container">
        <Link href="https://rivet.gg/support" target="_blank" rel="noreferrer">
          Support
        </Link>
        <p>
          &copy; {new Date().getFullYear()} Rivet Gaming, Inc. All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export { Root, Main, Header, Footer };
