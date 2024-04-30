import { CommandPanel } from "@/components/command-panel";
import { useAuth } from "@/domains/auth/contexts/auth";
import { LoginView } from "@/domains/auth/views/login-view/login-view";
import * as Layout from "@/layouts/page-centered";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function Authenticated() {
  const { profile } = useAuth();

  if (!profile?.identity.isRegistered) {
    return (
      <Layout.Root>
        <LoginView />
      </Layout.Root>
    );
  }

  return (
    <>
      <Outlet />
      <CommandPanel />
    </>
  );
}

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});
