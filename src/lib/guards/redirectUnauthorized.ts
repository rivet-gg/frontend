import { RouterContext } from "@/routes/__root";
import { redirect } from "@tanstack/react-router";

export const redirectUnauthorized = (context: RouterContext) => {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: "/login",
      search: {
        redirect: location.href,
      },
    });
  }
};
