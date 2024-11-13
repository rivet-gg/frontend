import { CommandPanel } from "@/components/command-panel";
import { NavItem } from "@/components/header/nav-item";
import { publicUrl } from "@/lib/utils";
import { cn } from "@rivet-gg/components";
import { Icon, faDiscord, faGithub, faXTwitter } from "@rivet-gg/icons";
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
    <footer className="text-muted-foreground bg-background p-4 text-center text-sm border-t mt-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center justify-between w-full lg:w-auto lg:justify-normal">
            <div className="flex gap-4 items-center">
              <img
                src={publicUrl("/icon-white-borderless.svg")}
                alt="Rivet"
                className="h-6"
              />
              &copy; {new Date().getFullYear()}
            </div>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://rivet-gg.betteruptime.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="size-2 animate-pulse bg-green-600 rounded-full" />
              All services are online
            </a>
          </div>
          <div>
            <CommandPanel />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between mt-4 gap-4 lg:gap-0 lg:mt-8 mb-4">
          <div className="text-base flex items-center gap-4">
            <NavItem
              href="https://rivet.gg/discord"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={faDiscord} />
            </NavItem>
            <NavItem
              href="https://github.com/rivet-gg"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={faGithub} />
            </NavItem>
            <NavItem
              href="https://x.com/rivet_gg"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={faXTwitter} />
            </NavItem>
          </div>
          <div className="flex items-center flex-wrap justify-between lg:justify-normal w-full lg:w-auto gap-4 lg:gap-8">
            <NavItem href="https://rivet.gg" target="_blank" rel="noreferrer">
              Home
            </NavItem>
            <NavItem
              href="https://rivet.gg/support"
              target="_blank"
              rel="noreferrer"
            >
              Help
            </NavItem>
            <NavItem
              href="https://rivet.gg/pricing"
              target="_blank"
              rel="noreferrer"
            >
              Pricing
            </NavItem>
            <NavItem
              href="https://rivet.gg/docs"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </NavItem>
            <NavItem
              href="https://calendly.com/d/zvq-v4z-84t/rivet-founders-15-minute"
              target="_blank"
              rel="noreferrer"
            >
              Enterprise
            </NavItem>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Root, Main, Header, Footer };
