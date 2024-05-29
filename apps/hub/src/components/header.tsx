import { useAuth } from "@/domains/auth/contexts/auth";
import { Button } from "@rivet-gg/components";
import { Header as RivetHeader } from "@rivet-gg/components/header";
import { Link } from "@tanstack/react-router";
import { Breadcrumbs } from "./breadcrumbs/breadcrumbs";
import { MobileBreadcrumbs } from "./breadcrumbs/mobile-breadcrumbs";
import { HeaderRouteLoader } from "./header-route-loader";
import { HeaderSubNav } from "./header-sub-nav";

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
      mobileBreadcrumbs={<MobileBreadcrumbs />}
      breadcrumbs={<Breadcrumbs />}
      subnav={<HeaderSubNav />}
      user={<UserProfileButton />}
    />
  );
}
