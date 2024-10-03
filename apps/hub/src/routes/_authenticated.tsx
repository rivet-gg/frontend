import { useAuth } from "@/domains/auth/contexts/auth";
import { FullscreenLoading } from "@rivet-gg/components";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useLocation,
} from "@tanstack/react-router";

function Authenticated() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isProfileLoading) {
    return <FullscreenLoading />;
  }

  if (!auth.profile?.identity.isRegistered) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }
  return <Outlet />;
}

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});
