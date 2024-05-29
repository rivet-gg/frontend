import { Link } from "@rivet-gg/components";
import type { ReactNode } from "react";
import { Header as UiHeader } from "../components/header";

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  return <div className="flex min-h-screen flex-col">{children}</div>;
};

const Main = ({ children }: RootProps) => {
  return <main className="bg-muted/20 flex flex-1 flex-col">{children}</main>;
};

const Header = () => {
  return <UiHeader />;
};

const Footer = () => {
  return (
    <footer className="text-muted-foreground bg-muted/20 p-4 text-center text-sm">
      <div className="container">
        &copy; {new Date().getFullYear()} Rivet Gaming, Inc. All rights reserved
        &bull; <Link href="https://old.rivet.gg">Old version</Link>
      </div>
    </footer>
  );
};

export { Root, Main, Header, Footer };
