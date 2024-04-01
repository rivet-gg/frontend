import * as Layout from "@/layouts/page-centered";
import { useAuth } from "@/contexts/auth";
import { LoginView } from "@/views/auth/login-view/login-view";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";

function Authenticated() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile?.identity.isRegistered) {
    return (
      <Layout.Root>
        <LoginView
          onSuccess={async () => {
            await navigate({ to: "/" });
          }}
        />
      </Layout.Root>
    );
  }

  return <Outlet />;
}

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
});
