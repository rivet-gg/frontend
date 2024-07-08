import { useAuth } from "@/domains/auth/contexts/auth";
import { Button } from "@rivet-gg/components";
import { Header as RivetHeader } from "@rivet-gg/components/header";
import { Link } from "@tanstack/react-router";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { MobileBreadcrumbs } from "../breadcrumbs/mobile-breadcrumbs";
import { CommandPanel } from "../command-panel";
import { HeaderRouteLoader } from "./header-route-loader";
import { HeaderSubNav } from "./header-sub-nav";
import { MobileHeaderSubNav } from "./mobile-header-sub-nav";
import { NavItem } from "./nav-item";

const UserProfileButton = () => {
  const { profile } = useAuth();
  if (!profile?.identity.isRegistered) {
    return null;
  }
  return (
    <Button asChild variant="secondary" size="icon" className="rounded-full">
      <Link to="/my-profile">
        <img
          src={profile.identity.avatarUrl}
          alt="User avatar"
          className="size-7 rounded-full"
        />
      </Link>
    </Button>
  );
};

export function Header() {
  return (
    <RivetHeader
      addons={<HeaderRouteLoader />}
      mobileBreadcrumbs={
        <>
          <MobileBreadcrumbs />
          <MobileHeaderSubNav />
        </>
      }
      breadcrumbs={<Breadcrumbs />}
      links={
        <>
          <CommandPanel />
          <NavItem asChild className="hidden md:inline-block">
            <a href="https://rivet.gg/docs" target="_blank" rel="noreferrer">
              Docs
            </a>
          </NavItem>
          <NavItem asChild className="hidden md:inline-block">
            <Link search={{ modal: "feedback" }}>Feedback</Link>
          </NavItem>
          <UserProfileButton />
        </>
      }
      subnav={<HeaderSubNav />}
    />
  );
}
