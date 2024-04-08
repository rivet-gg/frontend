import { Link, useRouter } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
  Button,
  Flex,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@rivet-gg/components";
import { useAuth } from "@/contexts/auth";
import { NavItem } from "./nav-item";
import { HeaderSubNav } from "./header-sub-nav";

const UserProfileButton = () => {
  const { profile } = useAuth();
  if (!profile?.identity.isRegistered) {
    return null;
  }
  return (
    <Button asChild variant="secondary" size="icon" className="rounded-full">
      <Link href="#">
        <img
          src={profile.identity.avatarUrl}
          alt="User avatar"
          className="h-7 w-7 rounded-full"
        />
      </Link>
    </Button>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 flex py-2 backdrop-blur z-10 items-center gap-4 border-b bg-background/60">
      <div className="container flex flex-col gap-4">
        <div className="flex items-center gap-4 w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium min-h-full">
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
          <nav className="font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 flex-1">
            <Link to="/">
              <img
                className="h-6"
                alt="Rivet Logo"
                src="https://assets2.rivet.gg/logo/cream.svg"
              />
            </Link>
          </nav>
          <div className="font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm gap-6">
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
