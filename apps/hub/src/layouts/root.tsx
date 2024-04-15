import { ReactNode } from "react";
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
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container">Footer</div>
    </footer>
  );
};

export { Root, Main, Header, Footer };
