import { ReactNode } from "react";
import { Header as UiHeader } from "../components/header";

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};

const Main = ({ children }: RootProps) => {
  return <main className="flex-1 flex flex-col">{children}</main>;
};

const Header = () => {
  return <UiHeader />;
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container">Footer</div>
    </footer>
  );
};

export { Root, Main, Header, Footer };
