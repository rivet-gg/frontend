import * as Layout from "@/components/layouts/page-wizard";
import { LoginView } from "@/views/LoginView";
import { createFileRoute } from "@tanstack/react-router";

const LoginPage = () => {
  return (
    <Layout.Root>
      <LoginView />
    </Layout.Root>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
