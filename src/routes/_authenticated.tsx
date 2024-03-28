import * as Layout from "@/components/layouts/page-wizard";
import { useAuth } from "@/contexts/auth";
import { LoginView } from "@/views/login-view";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Authenticated = () => {
  const { profile } = useAuth();

  if (!profile?.identity.isRegistered) {
    return (
      <Layout.Root>
        <LoginView />
      </Layout.Root>
    );
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});
