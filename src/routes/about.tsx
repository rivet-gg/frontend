import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}
