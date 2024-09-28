import { useAuth } from "@/domains/auth/contexts/auth";
import {
  Navigate,
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";

function Authenticated() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.profile?.identity.isRegistered) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }
  return <Outlet />;
}

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  beforeLoad: async ({ context: { auth }, location }) => {
    if (!auth.profile?.identity.isRegistered) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
