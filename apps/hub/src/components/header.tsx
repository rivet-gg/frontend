import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
  Button,
  Flex,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@rivet-gg/components";
import { NavItem } from "./nav-item";
import { HeaderSubNav } from "./header-sub-nav";
import { useAuth } from "@/domains/auth/contexts/auth";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs";

const UserProfileButton = () => {
  const { profile } = useAuth();
  if (!profile?.identity.isRegistered) {
    return null;
  }
  return (
    <Button as="a" variant="secondary" size="icon" className="rounded-full">
      <img
        src={profile.identity.avatarUrl}
        alt="User avatar"
        className="size-7 rounded-full"
      />
    </Button>
  );
};

export function Header() {
  return (
    <header className="bg-background/60 sticky top-0 z-10 flex items-center gap-4 border-b py-2 backdrop-blur">
      <div className="container flex min-h-10 flex-col gap-4">
        <div className="flex w-full items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid min-h-full gap-6 text-lg font-medium">
                <div className="flex-1">
                  <Flex direction="col" gap="6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <img
                        className="h-6"
                        src="https://assets2.rivet.gg/logo/text-cream.svg"
                        alt="Rivet logo"
                      />
                    </Link>
                  </Flex>
                </div>
                <Flex direction="col" justify="end" gap="6">
                  <NavItem asChild>
                    <a href="https://rivet.gg/docs" target="_blank">
                      Docs
                    </a>
                  </NavItem>
                  <NavItem asChild>
                    <a href="https://rivet.gg/support" target="_blank">
                      Support
                    </a>
                  </NavItem>
                </Flex>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="flex-1 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link to="/">
              <img
                className="h-6"
                alt="Rivet Logo"
                src="https://assets2.rivet.gg/logo/cream.svg"
              />
            </Link>
            <Breadcrumbs />
          </nav>
          <div className="gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm">
            <NavItem asChild className="hidden md:inline-block">
              <a href="https://rivet.gg/docs" target="_blank">
                Docs
              </a>
            </NavItem>
            <NavItem asChild className="hidden md:inline-block">
              <a href="https://rivet.gg/support" target="_blank">
                Support
              </a>
            </NavItem>
            <UserProfileButton />
          </div>
        </div>
        <HeaderSubNav />
      </div>
    </header>
  );
}
