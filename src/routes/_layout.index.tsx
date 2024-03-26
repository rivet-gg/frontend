import { AppIndexView } from "@/views/AppIndexView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: () => {
    return <AppIndexView />;
  },
});
