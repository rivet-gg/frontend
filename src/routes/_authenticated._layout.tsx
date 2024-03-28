import * as Layout from "@/components/layouts/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <Layout.Root>
        <Outlet />
      </Layout.Root>
    );
  },
});
